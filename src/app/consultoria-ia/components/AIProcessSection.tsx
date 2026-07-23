'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ClipboardCheck, FlaskConical, Rocket, Search } from 'lucide-react'

const steps = [
	{
		icon: Search,
		title: 'Diagnóstico del negocio',
		description:
			'Analizo tus procesos, datos disponibles y objetivos. Identifico dónde la IA puede generar más valor y qué problemas concretos puede resolver.',
	},
	{
		icon: ClipboardCheck,
		title: 'Estrategia y roadmap',
		description:
			'Diseño un plan de acción con fases, tecnologías recomendadas, estimación de inversión y KPIs para medir el éxito de cada etapa.',
	},
	{
		icon: FlaskConical,
		title: 'Prueba de concepto',
		description:
			'Construyo un prototipo funcional en 1-2 semanas con tus datos reales. Validamos resultados, iteramos rápido y decidimos si escalar con datos, no con intuiciones.',
	},
	{
		icon: Rocket,
		title: 'Producción y escalado',
		description:
			'Una vez validado, llevo la solución a producción con monitorización, ajustes de rendimiento y un plan de mejora continua.',
	},
]

export default function AIProcessSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="ai-process-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="ai-process-heading" className="text-3xl font-bold sm:text-4xl">
					Cómo <span className="text-gradient">trabajo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Metodología probada: del diagnóstico a la producción con resultados medibles.
				</p>
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
