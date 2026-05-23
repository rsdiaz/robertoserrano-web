'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { useToast } from '@/app/hooks/use-toast'
import { CheckCircle2, Loader2, Mail, MessageSquare, Send, Tag, User } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
	CONTACT_CATEGORIES,
	CONTACT_CATEGORY_LABELS,
	CONTACT_LIMITS,
	contactFormSchema,
	isValidCategory,
	type ContactCategory,
	type ContactFormInput,
} from '@/app/lib/contact-schema'

type FormState = ContactFormInput
type FieldErrors = Partial<Record<keyof FormState, string>>

const EMPTY_STATE: FormState = {
	name: '',
	email: '',
	subject: '',
	category: undefined,
	message: '',
	website: '',
}

const STORAGE_KEY = 'contact-form-draft-v1'

function loadDraft(): FormState | null {
	if (typeof window === 'undefined') return null
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (!raw) return null
		const parsed = JSON.parse(raw) as Partial<FormState>
		return {
			name: parsed.name ?? '',
			email: parsed.email ?? '',
			subject: parsed.subject ?? '',
			category: isValidCategory(parsed.category) ? (parsed.category as ContactCategory) : undefined,
			message: parsed.message ?? '',
			website: '',
		}
	} catch {
		return null
	}
}

function hasContent(state: FormState) {
	return Boolean(state.name || state.email || state.subject || state.message || state.category)
}

export default function ContactForm() {
	const { toast } = useToast()
	const searchParams = useSearchParams()
	const [formData, setFormData] = useState<FormState>(EMPTY_STATE)
	const [errors, setErrors] = useState<FieldErrors>({})
	const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submittedSummary, setSubmittedSummary] = useState<{ name: string; email: string; subject: string } | null>(
		null,
	)
	const [draftAvailable, setDraftAvailable] = useState(false)
	const initialApplied = useRef(false)

	// Cargar borrador / aplicar query param ?type=
	useEffect(() => {
		if (initialApplied.current) return
		initialApplied.current = true

		const queryType = searchParams.get('type')
		const draft = loadDraft()

		if (draft && hasContent(draft)) {
			setDraftAvailable(true)
			// No restauramos automáticamente; mostramos banner.
		}

		if (queryType && isValidCategory(queryType)) {
			setFormData(prev => ({ ...prev, category: queryType }))
		}
	}, [searchParams])

	// Persistir borrador (debounced)
	useEffect(() => {
		if (submittedSummary) return
		if (typeof window === 'undefined') return
		if (!hasContent(formData)) {
			window.localStorage.removeItem(STORAGE_KEY)
			return
		}
		const id = window.setTimeout(() => {
			const persistable = {
				name: formData.name,
				email: formData.email,
				subject: formData.subject,
				category: formData.category,
				message: formData.message,
			}
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable))
		}, 500)
		return () => window.clearTimeout(id)
	}, [formData, submittedSummary])

	const messageLength = formData.message.length
	const messageWarning = messageLength > CONTACT_LIMITS.message.max - 200

	const charCounterId = 'message-counter'
	const errorId = (field: keyof FormState) => `${field}-error`

	const restoreDraft = () => {
		const draft = loadDraft()
		if (draft) {
			setFormData(prev => ({ ...draft, category: prev.category ?? draft.category }))
		}
		setDraftAvailable(false)
	}

	const discardDraft = () => {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem(STORAGE_KEY)
		}
		setDraftAvailable(false)
	}

	const validateField = (name: keyof FormState, value: unknown) => {
		const parse = contactFormSchema.shape[name].safeParse(value)
		setErrors(prev => {
			const next = { ...prev }
			if (parse.success) {
				delete next[name]
			} else {
				next[name] = parse.error.issues[0]?.message ?? 'Valor no válido.'
			}
			return next
		})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		const key = name as keyof FormState
		setFormData(prev => ({ ...prev, [key]: value }))
		if (touched[key]) validateField(key, value)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const key = e.target.name as keyof FormState
		setTouched(prev => ({ ...prev, [key]: true }))
		validateField(key, e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const parsed = contactFormSchema.safeParse(formData)
		if (!parsed.success) {
			const fieldErrors: FieldErrors = {}
			parsed.error.issues.forEach(issue => {
				const key = issue.path[0] as keyof FormState
				if (!fieldErrors[key]) fieldErrors[key] = issue.message
			})
			setErrors(fieldErrors)
			setTouched({ name: true, email: true, subject: true, message: true, category: true })
			toast({
				title: 'Revisa el formulario',
				description: 'Hay campos con errores.',
				variant: 'destructive',
			})
			return
		}

		setIsSubmitting(true)
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			})
			const result = (await res.json()) as { ok: boolean; message?: string }
			if (!res.ok || !result.ok) throw new Error(result.message || 'No se pudo enviar el mensaje.')

			setSubmittedSummary({
				name: parsed.data.name,
				email: parsed.data.email,
				subject: parsed.data.subject,
			})
			if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
			toast({
				title: '¡Mensaje enviado!',
				description: 'Gracias por contactarme. Te responderé pronto.',
			})
		} catch (error) {
			const description = error instanceof Error ? error.message : 'Hubo un problema enviando el formulario.'
			toast({ title: 'No se pudo enviar', description, variant: 'destructive' })
		} finally {
			setIsSubmitting(false)
		}
	}

	const resetForNewMessage = () => {
		setFormData(EMPTY_STATE)
		setErrors({})
		setTouched({})
		setSubmittedSummary(null)
	}

	const fieldClasses = (field: keyof FormState) =>
		errors[field] && touched[field] ? 'border-destructive/70 focus-visible:ring-destructive/40' : ''

	const errorAria = useMemo(() => {
		return (field: keyof FormState) =>
			errors[field] && touched[field] ? { 'aria-invalid': true as const, 'aria-describedby': errorId(field) } : {}
	}, [errors, touched])

	return (
		<div
			id="contact-form"
			className="card-conic-border relative overflow-hidden rounded-2xl bg-card/95 shadow-elegant scroll-mt-32"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--accent)/0.12),_transparent_45%)]"
				aria-hidden="true"
			/>
			<div className="relative p-6 sm:p-8">
				<div className="mb-6 flex items-start gap-3">
					<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
						<Send className="h-5 w-5 text-primary" aria-hidden="true" />
					</div>
					<div>
						<h2 className="text-2xl font-bold">Envíame un mensaje</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Cuéntame sobre tu proyecto, idea o consulta. Te respondo en menos de 24 horas.
						</p>
					</div>
				</div>

				<AnimatePresence mode="wait">
					{submittedSummary ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.35, ease: 'easeOut' }}
							className="rounded-xl border border-emerald-500/30 bg-emerald-500/8 p-6 text-left"
							role="status"
							aria-live="polite"
						>
							<div className="flex items-start gap-3">
								<CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500" aria-hidden="true" />
								<div className="flex-1">
									<h3 className="text-lg font-semibold text-foreground">¡Mensaje enviado, {submittedSummary.name}!</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										He recibido tu consulta y recibirás una confirmación en{' '}
										<span className="font-medium text-foreground">{submittedSummary.email}</span>. Te responderé en
										menos de 24 horas.
									</p>
									<dl className="mt-4 grid gap-2 rounded-lg border border-border/60 bg-background/60 p-3 text-sm">
										<div className="flex gap-2">
											<dt className="font-medium text-muted-foreground">Asunto:</dt>
											<dd className="text-foreground">{submittedSummary.subject}</dd>
										</div>
									</dl>
									<Button onClick={resetForNewMessage} variant="outline" size="sm" className="mt-5">
										Enviar otro mensaje
									</Button>
								</div>
							</div>
						</motion.div>
					) : (
						<motion.form
							key="form"
							onSubmit={handleSubmit}
							className="space-y-5"
							noValidate
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
						>
							{draftAvailable ? (
								<div
									className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-accent/30 bg-accent/8 px-4 py-3 text-sm"
									role="status"
								>
									<span className="text-foreground">Tienes un borrador guardado en este dispositivo.</span>
									<div className="flex gap-2">
										<Button type="button" size="sm" variant="ghost" onClick={discardDraft}>
											Descartar
										</Button>
										<Button type="button" size="sm" onClick={restoreDraft}>
											Restaurar
										</Button>
									</div>
								</div>
							) : null}

							{/* Honeypot */}
							<div className="sr-only" aria-hidden="true">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									name="website"
									value={formData.website ?? ''}
									onChange={handleChange}
									tabIndex={-1}
									autoComplete="off"
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="flex flex-col space-y-2">
									<Label htmlFor="name" className="flex items-center gap-1.5">
										<User className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
										Nombre completo
									</Label>
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Tu nombre"
										maxLength={CONTACT_LIMITS.name.max}
										required
										disabled={isSubmitting}
										className={fieldClasses('name')}
										{...errorAria('name')}
									/>
									{errors.name && touched.name ? (
										<p id={errorId('name')} className="text-xs text-destructive">
											{errors.name}
										</p>
									) : null}
								</div>

								<div className="flex flex-col space-y-2">
									<Label htmlFor="email" className="flex items-center gap-1.5">
										<Mail className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="tu@email.com"
										maxLength={CONTACT_LIMITS.email.max}
										required
										disabled={isSubmitting}
										className={fieldClasses('email')}
										{...errorAria('email')}
									/>
									{errors.email && touched.email ? (
										<p id={errorId('email')} className="text-xs text-destructive">
											{errors.email}
										</p>
									) : null}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="flex flex-col space-y-2">
									<Label htmlFor="subject" className="flex items-center gap-1.5">
										<MessageSquare className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
										Asunto
									</Label>
									<Input
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="¿En qué puedo ayudarte?"
										maxLength={CONTACT_LIMITS.subject.max}
										required
										disabled={isSubmitting}
										className={fieldClasses('subject')}
										{...errorAria('subject')}
									/>
									{errors.subject && touched.subject ? (
										<p id={errorId('subject')} className="text-xs text-destructive">
											{errors.subject}
										</p>
									) : null}
								</div>

								<div className="flex flex-col space-y-2">
									<Label htmlFor="category" className="flex items-center gap-1.5">
										<Tag className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
										Categoría <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
									</Label>
									<select
										id="category"
										name="category"
										value={formData.category ?? ''}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={isSubmitting}
										className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<option value="">Selecciona una opción…</option>
										{CONTACT_CATEGORIES.map(cat => (
											<option key={cat} value={cat}>
												{CONTACT_CATEGORY_LABELS[cat]}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="message" className="flex items-center gap-1.5">
										<MessageSquare className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
										Mensaje
									</Label>
									<span
										id={charCounterId}
										className={`text-xs tabular-nums ${messageWarning ? 'text-amber-500' : 'text-muted-foreground'}`}
										aria-live="polite"
									>
										{messageLength}/{CONTACT_LIMITS.message.max}
									</span>
								</div>
								<Textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Describe tu proyecto, idea o consulta con el mayor detalle posible…"
									rows={7}
									maxLength={CONTACT_LIMITS.message.max}
									required
									disabled={isSubmitting}
									className={fieldClasses('message')}
									aria-describedby={
										errors.message && touched.message ? `${errorId('message')} ${charCounterId}` : charCounterId
									}
									aria-invalid={errors.message && touched.message ? true : undefined}
								/>
								{errors.message && touched.message ? (
									<p id={errorId('message')} className="text-xs text-destructive">
										{errors.message}
									</p>
								) : null}
							</div>

							<Button type="submit" size="lg" className="w-full shadow-glow" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
										Enviando…
									</>
								) : (
									<>
										<Send className="mr-2 h-4 w-4" aria-hidden="true" />
										Enviar mensaje
									</>
								)}
							</Button>

							<p className="text-center text-xs text-muted-foreground">
								Al enviar aceptas que recibiré tu mensaje por email. Nunca compartiré tus datos.
							</p>
						</motion.form>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
