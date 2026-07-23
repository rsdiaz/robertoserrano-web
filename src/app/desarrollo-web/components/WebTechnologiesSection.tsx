'use client'

import { motion, useReducedMotion } from 'motion/react'

const technologies = [
	{ name: 'Next.js', description: 'React framework' },
	{ name: 'React', description: 'UI components' },
	{ name: 'TypeScript', description: 'Tipado estático' },
	{ name: 'Node.js', description: 'Backend runtime' },
	{ name: 'Tailwind CSS', description: 'Estilado utility-first' },
	{ name: 'MongoDB', description: 'Base de datos NoSQL' },
	{ name: 'PostgreSQL', description: 'Base relacional' },
	{ name: 'Docker', description: 'Contenedores' },
]

export default function WebTechnologiesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="web-tech-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="web-tech-heading" className="text-3xl font-bold sm:text-4xl">
					Tecnologías <span className="text-gradient">que utilizo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Un stack moderno, probado en producción y pensado para durar.
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
