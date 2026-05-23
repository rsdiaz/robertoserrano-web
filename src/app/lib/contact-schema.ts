import { z } from 'zod'

export const CONTACT_CATEGORIES = ['consultoria', 'desarrollo', 'mentoria', 'otro'] as const

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number]

export const CONTACT_CATEGORY_LABELS: Record<ContactCategory, string> = {
	consultoria: 'Consultoría',
	desarrollo: 'Desarrollo',
	mentoria: 'Mentoría',
	otro: 'Otro',
}

export const CONTACT_LIMITS = {
	name: { min: 2, max: 80 },
	email: { max: 120 },
	subject: { min: 3, max: 120 },
	message: { min: 10, max: 2000 },
} as const

export const contactFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(CONTACT_LIMITS.name.min, 'El nombre debe tener al menos 2 caracteres.')
		.max(CONTACT_LIMITS.name.max, `El nombre no puede superar ${CONTACT_LIMITS.name.max} caracteres.`),
	email: z
		.string()
		.trim()
		.email('El email no es válido.')
		.max(CONTACT_LIMITS.email.max, `El email es demasiado largo.`),
	subject: z
		.string()
		.trim()
		.min(CONTACT_LIMITS.subject.min, 'El asunto debe tener al menos 3 caracteres.')
		.max(CONTACT_LIMITS.subject.max, `El asunto no puede superar ${CONTACT_LIMITS.subject.max} caracteres.`),
	category: z.enum(CONTACT_CATEGORIES).optional(),
	message: z
		.string()
		.trim()
		.min(CONTACT_LIMITS.message.min, 'El mensaje debe tener al menos 10 caracteres.')
		.max(CONTACT_LIMITS.message.max, `El mensaje no puede superar ${CONTACT_LIMITS.message.max} caracteres.`),
	website: z.string().max(0).optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

export function isValidCategory(value: string | null | undefined): value is ContactCategory {
	return !!value && (CONTACT_CATEGORIES as readonly string[]).includes(value)
}
