'use client'

import { motion, useReducedMotion } from 'motion/react'

const technologies = [
	{ name: 'n8n', description: 'Automatización self-hosted' },
	{ name: 'Make', description: 'Integraciones visuales' },
	{ name: 'OpenAI API', description: 'Modelos de lenguaje' },
	{ name: 'LangChain', description: 'Orquestación IA' },
	{ name: 'Docker', description: 'Despliegue reproducible' },
	{ name: 'REST / GraphQL', description: 'APIs a medida' },
	{ name: 'Webhooks', description: 'Eventos en tiempo real' },
	{ name: 'PostgreSQL + Redis', description: 'Datos y caché' },
]

export default function TechnologiesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="tech-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="tech-heading" className="text-3xl font-bold sm:text-4xl">
					Tecnologías <span className="text-gradient">que utilizo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Elijo la herramienta adecuada para cada problema, sin atarme a un solo stack.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{technologies.map((tech, index) => (
					<motion.div
						key={tech.name}
						initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
					>
						<div className="steam-panel group flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
							<span className="text-base font-bold text-foreground transition-colors group-hover:text-accent">
								{tech.name}
							</span>
							<span className="mt-1 text-xs text-muted-foreground">{tech.description}</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
