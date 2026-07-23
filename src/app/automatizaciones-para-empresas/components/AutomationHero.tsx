'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeftRight, Bot, Brain, ChartBar, Cpu, Workflow } from 'lucide-react'
import AvailabilityBadge from '@/app/contacto/components/AvailabilityBadge'
import BlobsEffect from '@/app/components/BlobsEffect'

const chips = [
	{ icon: Workflow, label: 'Workflows · n8n / Make' },
	{ icon: ArrowLeftRight, label: 'Integraciones API / CRM' },
	{ icon: Bot, label: 'Bots & RPA' },
	{ icon: Brain, label: 'Agentes IA' },
	{ icon: ChartBar, label: 'Reporting automático' },
	{ icon: Cpu, label: 'Infraestructura cloud' },
]

export default function AutomationHero() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="relative">
			<BlobsEffect />
			<div className="relative z-10 mx-auto max-w-4xl text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: 'easeOut' }}
					className="mb-12 text-center"
				>
					<span className="steam-label">Automatizaciones</span>
				</motion.div>

				<motion.h1
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
					className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
				>
					Automatizaciones inteligentes para tu <span className="text-gradient">empresa</span>
				</motion.h1>

				<motion.p
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
					className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
				>
					Diseño e implemento workflows que conectan tus sistemas, eliminan tareas repetitivas y liberan a tu equipo
					para lo que realmente importa. Con IA donde suma, sin hype donde no hace falta.
				</motion.p>

				{/* Service chips */}
				<motion.ul
					initial={reduceMotion ? false : { opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.26, ease: 'easeOut' }}
					className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
				>
					{chips.map(chip => (
						<li
							key={chip.label}
							className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground font-semibold"
						>
							<chip.icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
							{chip.label}
						</li>
					))}
				</motion.ul>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.34, ease: 'easeOut' }}
					className="mt-6 flex justify-center"
				>
					<AvailabilityBadge />
				</motion.div>
			</div>
		</section>
	)
}
