'use client'

import { motion, useReducedMotion } from 'motion/react'
import { BarChart3, Brain, Eye, FileSearch, MessageSquare, Sparkles } from 'lucide-react'
import AvailabilityBadge from '@/app/contacto/components/AvailabilityBadge'
import BlobsEffect from '@/app/components/BlobsEffect'

const chips = [
	{ icon: Brain, label: 'IA Generativa' },
	{ icon: FileSearch, label: 'RAG · Datos propios' },
	{ icon: Eye, label: 'Computer Vision' },
	{ icon: MessageSquare, label: 'NLP · Chatbots' },
	{ icon: Sparkles, label: 'Agentes autónomos' },
	{ icon: BarChart3, label: 'Analítica predictiva' },
]

export default function AIHero() {
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
					<span className="steam-label">Consultoría IA</span>
				</motion.div>

				<motion.h1
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
					className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
				>
					Consultoría de IA aplicada a <span className="text-gradient">tu negocio</span>
				</motion.h1>

				<motion.p
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
					className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
				>
					Te ayudo a entender qué IA tiene sentido para tu empresa, cómo implementarla sin desperdiciar recursos y qué
					resultados reales puedes esperar. Sin hype, con criterio técnico.
				</motion.p>

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
