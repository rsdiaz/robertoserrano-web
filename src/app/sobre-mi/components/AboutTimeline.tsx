'use client'

import { motion } from 'motion/react'

const timeline = [
	{
		period: '2023 — Hoy',
		title: 'Ingeniero de software independiente',
		description:
			'Colaboro con empresas en proyectos de desarrollo web a medida, automatización de procesos e integración de IA aplicada a casos reales de negocio.',
	},
	{
		period: '2015 — 2023',
		title: 'Full-stack developer senior',
		description:
			'Diseño e implementación de plataformas web escalables usando TypeScript, Node.js, React y bases de datos NoSQL. Arquitectura orientada a microservicios y despliegues con Docker.',
	},
	{
		period: '2010 — 2015',
		title: 'Backend developer',
		description:
			'Desarrollo de APIs REST, integración de sistemas y administración de servidores Linux. Primer contacto con metodologías ágiles y CI/CD.',
	},
	{
		period: '2008 — 2010',
		title: 'Inicio de carrera',
		description:
			'Primeros pasos como desarrollador: aplicaciones de escritorio, scripting y administración de sistemas. Descubrí mi pasión por resolver problemas con código limpio y mantenible.',
	},
]

export default function AboutTimeline() {
	return (
		<section className="mb-20">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent mb-4">
					Trayectoria
				</span>
				<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">Mi recorrido profesional</h2>
			</motion.div>

			<div className="relative space-y-8">
				<div className="absolute left-[19px] top-3 bottom-3 w-px bg-border/60" aria-hidden="true" />

				{timeline.map((item, index) => (
					<motion.div
						key={item.title}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
						className="relative pl-12"
					>
						<div
							className="absolute left-0 top-1.5 w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.4)]"
							aria-hidden="true"
						/>
						<div className="steam-panel rounded-2xl border border-border/50 p-6">
							<span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{item.period}</span>
							<h3 className="mt-2 text-xl font-bold">{item.title}</h3>
							<p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
