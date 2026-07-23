'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Clock, DollarSign, ShieldCheck, TrendingUp } from 'lucide-react'

const benefits = [
	{
		icon: Clock,
		title: 'Ahorro de tiempo',
		description: 'Elimina horas de trabajo manual cada semana. Tus empleados se centran en tareas de alto valor.',
	},
	{
		icon: ShieldCheck,
		title: 'Reducción de errores',
		description:
			'Las máquinas no se despistan. Elimina errores humanos en procesos críticos como facturación o gestión de datos.',
	},
	{
		icon: TrendingUp,
		title: 'Escalabilidad sin fricción',
		description: 'Un proceso automatizado crece contigo. Multiplica tu capacidad operativa sin multiplicar la nómina.',
	},
	{
		icon: DollarSign,
		title: 'ROI medible desde el primer mes',
		description:
			'Cada automatización lleva métricas claras para que sepas exactamente cuánto tiempo y dinero estás ahorrando.',
	},
]

export default function BenefitsSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="benefits-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="benefits-heading" className="text-3xl font-bold sm:text-4xl">
					Beneficios <span className="text-gradient">reales</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">Más allá de la tecnología, esto es lo que tu empresa gana.</p>
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
