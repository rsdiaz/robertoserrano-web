'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Availability = {
	available: boolean
	label: string
	hint: string
}

function computeAvailability(now: Date): Availability {
	// Hora local en Europe/Madrid (CET/CEST)
	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Europe/Madrid',
		weekday: 'short',
		hour: 'numeric',
		hour12: false,
	})
	const parts = formatter.formatToParts(now)
	const weekday = parts.find(p => p.type === 'weekday')?.value ?? ''
	const hourStr = parts.find(p => p.type === 'hour')?.value ?? '0'
	const hour = parseInt(hourStr, 10)
	const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday)
	const inWorkingHours = hour >= 8 && hour < 20

	if (isWeekday && inWorkingHours) {
		return {
			available: true,
			label: 'Disponible ahora',
			hint: 'Respondo en pocas horas',
		}
	}

	return {
		available: false,
		label: 'Fuera de horario',
		hint: 'Respondo en menos de 24 h',
	}
}

export default function AvailabilityBadge() {
	const reduceMotion = useReducedMotion()
	const [status, setStatus] = useState<Availability | null>(null)

	useEffect(() => {
		const update = () => setStatus(computeAvailability(new Date()))
		update()
		const id = window.setInterval(update, 60_000)
		return () => window.clearInterval(id)
	}, [])

	if (!status) {
		return (
			<span className="inline-flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
				<span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
				Calculando disponibilidad…
			</span>
		)
	}

	const color = status.available ? 'bg-emerald-500' : 'bg-amber-500'
	const ring = status.available ? 'ring-emerald-500/30' : 'ring-amber-500/30'

	return (
		<span className="inline-flex items-center gap-2 text-sm" aria-live="polite">
			<span className="relative inline-flex h-2.5 w-2.5">
				{status.available && !reduceMotion ? (
					<motion.span
						className={`absolute inset-0 rounded-full ${color} opacity-60`}
						animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					/>
				) : null}
				<span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color} ring-2 ${ring}`} />
			</span>
			<span className="font-medium text-foreground">{status.label}</span>
			<span className="text-muted-foreground">· {status.hint}</span>
		</span>
	)
}
