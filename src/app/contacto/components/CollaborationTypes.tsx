'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Coffee, MessageCircle, Sparkles } from 'lucide-react'
import type { ContactCategory } from '@/app/lib/contact-schema'

type CollabType = {
	icon: typeof Coffee
	title: string
	description: string
	category: ContactCategory
}

const collaborationTypes: CollabType[] = [
	{
		icon: Coffee,
		title: 'Consultoría',
		description: 'Asesoramiento técnico y revisión de arquitectura para tu proyecto.',
		category: 'consultoria',
	},
	{
		icon: MessageCircle,
		title: 'Desarrollo',
		description: 'Desarrollo full-stack de aplicaciones web y móviles desde cero.',
		category: 'desarrollo',
	},
	{
		icon: Calendar,
		title: 'Mentoría',
		description: 'Sesiones de mentoría para desarrolladores junior y mid-level.',
		category: 'mentoria',
	},
	{
		icon: Sparkles,
		title: 'Otro',
		description: '¿Algo distinto en mente? Cuéntamelo y vemos cómo encajarlo.',
		category: 'otro',
	},
]

export default function CollaborationTypes() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
			className="steam-panel relative overflow-hidden rounded-2xl bg-card/95 p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
		>
			<h3 className="text-xl font-bold">Tipos de colaboración</h3>
			<p className="mt-1 text-sm text-muted-foreground">Haz clic para pre-rellenar el formulario.</p>

			<ul className="mt-5 space-y-2.5">
				{collaborationTypes.map(type => (
					<li key={type.title}>
						<Link
							href={`/contacto?type=${type.category}#contact-form`}
							scroll
							className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/40"
						>
							<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
								<type.icon
									className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110"
									aria-hidden="true"
								/>
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-1.5 text-sm font-medium">
									{type.title}
									<ArrowUpRight
										className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
										aria-hidden="true"
									/>
								</div>
								<p className="text-sm text-muted-foreground">{type.description}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</motion.div>
	)
}
