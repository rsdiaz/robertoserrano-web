'use client'

import { motion, useReducedMotion } from 'motion/react'
import { FileCode, Gauge, TrendingUp, Wrench } from 'lucide-react'

const benefits = [
	{
		icon: Gauge,
		title: 'Rendimiento Core Web Vitals',
		description:
			'Páginas que cargan en menos de 2 segundos. Cada milisegundo cuenta para el SEO y la conversión. Optimizo imágenes, fuentes, bundles y caché.',
	},
	{
		icon: TrendingUp,
		title: 'SEO técnico integrado',
		description:
			'No necesitas un plugin de SEO. Metadatos, structured data, sitemaps dinámicos, Open Graph y rendimiento optimizado desde la primera línea de código.',
	},
	{
		icon: Wrench,
		title: 'Código mantenible y documentado',
		description:
			'TypeScript estricto, tests automatizados, arquitectura limpia y documentación clara. Tu equipo o el mío pueden seguir iterando sin fricción.',
	},
	{
		icon: FileCode,
		title: 'Escalabilidad desde el día 1',
		description:
			'Arquitectura preparada para crecer: serverless, edge functions, bases de datos optimizadas y despliegues que soportan picos de tráfico sin caerse.',
	},
]

export default function WebBenefitsSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="web-benefits-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="web-benefits-heading" className="text-3xl font-bold sm:text-4xl">
					Beneficios <span className="text-gradient">técnicos</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Lo que marca la diferencia entre una web que está y una web que funciona.
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
