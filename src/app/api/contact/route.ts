import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema, CONTACT_CATEGORY_LABELS } from '@/app/lib/contact-schema'

type RateLimitEntry = {
	count: number
	resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

declare global {
	// Cache simple en memoria por instancia (suficiente para anti-spam básico).
	var _contactRateLimitStore: Map<string, RateLimitEntry> | undefined
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
}

function getClientIp(req: Request): string {
	const forwarded = req.headers.get('x-forwarded-for')
	if (forwarded) {
		return forwarded.split(',')[0]?.trim() || 'unknown'
	}

	const realIp = req.headers.get('x-real-ip')
	if (realIp) return realIp

	return 'unknown'
}

function checkRateLimit(ip: string): boolean {
	if (!globalThis._contactRateLimitStore) {
		globalThis._contactRateLimitStore = new Map<string, RateLimitEntry>()
	}

	const now = Date.now()
	const current = globalThis._contactRateLimitStore.get(ip)

	if (!current || now > current.resetAt) {
		globalThis._contactRateLimitStore.set(ip, {
			count: 1,
			resetAt: now + RATE_LIMIT_WINDOW_MS,
		})
		return true
	}

	if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
		return false
	}

	current.count += 1
	globalThis._contactRateLimitStore.set(ip, current)
	return true
}

export async function POST(req: Request) {
	try {
		const rawPayload = (await req.json()) as Record<string, unknown>
		const clientIp = getClientIp(req)

		// Honeypot: si el bot rellena este campo oculto, devolvemos éxito silencioso.
		if (typeof rawPayload.website === 'string' && rawPayload.website.trim().length > 0) {
			return NextResponse.json({ ok: true })
		}

		if (!checkRateLimit(clientIp)) {
			return NextResponse.json(
				{ ok: false, message: 'Has enviado demasiados mensajes. Inténtalo de nuevo en unos minutos.' },
				{ status: 429 },
			)
		}

		const parsed = contactFormSchema.safeParse(rawPayload)

		if (!parsed.success) {
			const firstError = parsed.error.issues[0]?.message ?? 'Los datos enviados no son válidos.'
			return NextResponse.json({ ok: false, message: firstError }, { status: 400 })
		}

		const { name, email, subject, category, message } = parsed.data

		const apiKey = process.env.RESEND_API_KEY
		const toEmail = process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL
		const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

		if (!apiKey) {
			return NextResponse.json(
				{ ok: false, message: 'Falta configurar RESEND_API_KEY en el servidor.' },
				{ status: 500 },
			)
		}

		if (!toEmail) {
			return NextResponse.json(
				{ ok: false, message: 'Falta configurar CONTACT_TO_EMAIL o RESEND_TO_EMAIL en el servidor.' },
				{ status: 500 },
			)
		}

		const resend = new Resend(apiKey)
		const categoryLabel = category ? CONTACT_CATEGORY_LABELS[category] : 'General'
		const subjectPrefix = `[Contacto Web][${categoryLabel}]`

		const result = await resend.emails.send({
			from: fromEmail,
			to: [toEmail],
			replyTo: email,
			subject: `${subjectPrefix} ${subject}`,
			text: `Nuevo mensaje de contacto\n\nNombre: ${name}\nEmail: ${email}\nCategoría: ${categoryLabel}\n\nMensaje:\n${message}`,
			html: `
				<h2>Nuevo mensaje de contacto</h2>
				<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Categoría:</strong> ${escapeHtml(categoryLabel)}</p>
				<p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
				<hr />
				<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
			`,
		})

		if (result.error) {
			return NextResponse.json({ ok: false, message: 'No se pudo enviar el mensaje en este momento.' }, { status: 502 })
		}

		// Auto-respuesta al remitente (si falla, no bloquea el flujo principal).
		await resend.emails.send({
			from: fromEmail,
			to: [email],
			subject: `Recibí tu mensaje: ${subject}`,
			text: `Hola ${name},\n\nGracias por escribirme. He recibido tu mensaje y te responderé lo antes posible.\n\nResumen de tu consulta:\n- Categoría: ${categoryLabel}\n- Asunto: ${subject}\n- Mensaje: ${message}\n\nUn saludo,\nRoberto Serrano`,
			html: `
				<h2>¡Gracias por tu mensaje, ${escapeHtml(name)}!</h2>
				<p>He recibido tu consulta y te responderé lo antes posible.</p>
				<p><strong>Categoría:</strong> ${escapeHtml(categoryLabel)}</p>
				<p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
				<p><strong>Resumen:</strong></p>
				<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
				<hr />
				<p>Un saludo,<br/>Roberto Serrano</p>
			`,
		})

		return NextResponse.json({ ok: true, id: result.data?.id })
	} catch {
		return NextResponse.json({ ok: false, message: 'Error inesperado procesando el formulario.' }, { status: 500 })
	}
}
