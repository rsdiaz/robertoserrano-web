'use client'

import { motion, useReducedMotion } from 'motion/react'
import { BarChart3, DollarSign, TrendingUp, Zap } from 'lucide-react'

const benefits = [
	{
		icon: TrendingUp,
		title: 'Ventaja competitiva real',
		description:
			'No se trata de usar IA porque está de moda. Identifico aplicaciones que te diferencian de tu competencia y generan valor medible desde el primer trimestre.',
	},
	{
		icon: BarChart3,
		title: 'Decisiones basadas en datos',
		description:
			'Modelos predictivos, análisis de sentimiento y clustering que transforman datos en decisiones accionables, no en dashboards que nadie mira.',
	},
	{
		icon: DollarSign,
		title: 'Reducción de costes operativos',
		description:
			'Automatización cognitiva de tareas que antes requerían intervención humana: clasificación de documentos, atención al cliente, extracción de datos no estructurados.',
	},
	{
		icon: Zap,
		title: 'Innovación acelerada',
		description:
			'Prototipo, valido e itero en semanas, no en meses. Metodología lean aplicada a IA para que falles rápido, aprendas y escales solo lo que funciona.',
	},
]

export default function AIBenefitsSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="ai-benefits-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="ai-benefits-heading" className="text-3xl font-bold sm:text-4xl">
					Beneficios <span className="text-gradient">estratégicos</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Lo que tu empresa gana al integrar IA con cabeza, no con hype.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
				{benefits.map((benefit, index) => {
					const Icon = benefit.icon
					return (
						<motion.div
							key={benefit.title}
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
						>
							<div className="card-conic-border flex items-start gap-4 rounded-2xl bg-card/95 p-5 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
								<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
									<Icon className="h-5 w-5 text-accent" aria-hidden="true" />
								</div>
								<div>
									<h3 className="text-lg font-bold">{benefit.title}</h3>
									<p className="mt-1 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>
		</section>
	)
}
