'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ClipboardCheck, Cog, LineChart, Search } from 'lucide-react'

const steps = [
	{
		icon: Search,
		title: 'Análisis de procesos',
		description:
			'Estudio cómo trabajas hoy: identifico tareas repetitivas, cuellos de botella y oportunidades de automatización con mayor impacto.',
	},
	{
		icon: ClipboardCheck,
		title: 'Diseño del workflow',
		description:
			'Defino la arquitectura de la automatización, selecciono las herramientas adecuadas y valido el flujo contigo antes de implementar.',
	},
	{
		icon: Cog,
		title: 'Implementación',
		description:
			'Construyo la solución, la integro con tus sistemas actuales, ejecuto pruebas exhaustivas y documento todo el proceso.',
	},
	{
		icon: LineChart,
		title: 'Monitorización y mejora',
		description:
			'Una vez en producción, monitorizo el rendimiento, ajusto lo necesario y propongo iteraciones para maximizar el valor a largo plazo.',
	},
]

export default function ProcessSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="process-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="process-heading" className="text-3xl font-bold sm:text-4xl">
					Cómo <span className="text-gradient">trabajo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">Un proceso claro y transparente, de principio a fin.</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{steps.map((step, index) => {
					const Icon = step.icon
					return (
						<motion.div
							key={step.title}
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
							className="relative"
						>
							<div className="steam-panel relative rounded-2xl p-6 text-center">
								<span className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
									{index + 1}
								</span>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
									<Icon className="h-6 w-6 text-accent" aria-hidden="true" />
								</div>
								<h3 className="mt-4 text-base font-bold">{step.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
							</div>
						</motion.div>
					)
				})}
			</div>
		</section>
	)
}
