export function formatRelativeDate(input: string | Date): string {
	const date = typeof input === 'string' ? new Date(input) : input
	const now = new Date()
	const diffMs = now.getTime() - date.getTime()
	const seconds = Math.round(diffMs / 1000)
	const minutes = Math.round(seconds / 60)
	const hours = Math.round(minutes / 60)
	const days = Math.round(hours / 24)
	const weeks = Math.round(days / 7)
	const months = Math.round(days / 30)
	const years = Math.round(days / 365)

	const rtf = new Intl.RelativeTimeFormat('es-ES', { numeric: 'auto' })

	if (Math.abs(seconds) < 60) return rtf.format(-seconds, 'second')
	if (Math.abs(minutes) < 60) return rtf.format(-minutes, 'minute')
	if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour')
	if (Math.abs(days) < 7) return rtf.format(-days, 'day')
	if (Math.abs(weeks) < 5) return rtf.format(-weeks, 'week')
	if (Math.abs(months) < 12) return rtf.format(-months, 'month')
	return rtf.format(-years, 'year')
}

export function formatAbsoluteDate(input: string | Date, opts?: Intl.DateTimeFormatOptions): string {
	const date = typeof input === 'string' ? new Date(input) : input
	return date.toLocaleDateString('es-ES', opts ?? { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Devuelve clases de pill por categoría. Mapeo deterministico por nombre normalizado.
 */
export function categoryPillClass(category?: string | null): string {
	const key = (category || 'general').toLowerCase().trim()
	if (key.includes('front')) return 'cat-pill-frontend'
	if (key.includes('back') || key.includes('node') || key.includes('api')) return 'cat-pill-backend'
	if (key.includes('devops') || key.includes('docker') || key.includes('deploy') || key.includes('infra')) {
		return 'cat-pill-devops'
	}
	return 'cat-pill-default'
}
