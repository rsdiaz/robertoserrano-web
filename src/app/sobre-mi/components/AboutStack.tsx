'use client'

import { motion } from 'motion/react'

const stackGroups = [
	{
		title: 'Frontend',
		items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Astro'],
	},
	{
		title: 'Backend',
		items: ['Node.js', 'Express', 'NestJS', 'APIs REST', 'GraphQL'],
	},
	{
		title: 'Bases de datos',
		items: ['MongoDB', 'PostgreSQL', 'Redis', 'SQLite'],
	},
	{
		title: 'DevOps e infraestructura',
		items: ['Docker', 'Linux', 'CI/CD', 'GitHub Actions', 'PM2'],
	},
	{
		title: 'IA y automatización',
		items: ['OpenAI API', 'RAG', 'Agentes IA', 'n8n', 'Make'],
	},
]

export default function AboutStack() {
	return (
		<section className="mb-20">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent mb-4">
					Stack tecnológico
				</span>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">Tecnologías con las que trabajo</h2>
			</motion.div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{stackGroups.map((group, groupIndex) => (
					<motion.div
						key={group.title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
						viewport={{ once: true }}
						className="steam-panel rounded-2xl border border-border/50 p-6"
					>
						<h3 className="text-base font-bold mb-4">{group.title}</h3>
						<div className="flex flex-wrap gap-2">
							{group.items.map(item => (
								<span
									key={item}
									className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/70 border border-border/40 text-muted-foreground"
								>
									{item}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
