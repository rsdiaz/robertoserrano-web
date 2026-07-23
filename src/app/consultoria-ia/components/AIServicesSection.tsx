'use client'

import { motion, useReducedMotion } from 'motion/react'
import { BookOpen, Brain, GraduationCap, Lightbulb, Puzzle, Search } from 'lucide-react'

const services = [
	{
		icon: Lightbulb,
		title: 'Estrategia de IA para tu negocio',
		description:
			'Identifico áreas donde la IA genera más impacto en tu empresa y diseño una hoja de ruta realista con prioridades, plazos y costes estimados.',
	},
	{
		icon: Search,
		title: 'Análisis de viabilidad técnica',
		description:
			'Evalúo si tu idea de IA es factible con la tecnología actual, qué datos necesitas y qué modelo o enfoque es el más adecuado antes de invertir.',
	},
	{
		icon: Brain,
		title: 'Pruebas de concepto y prototipos',
		description:
			'Construyo un PoC funcional con tus datos para validar la idea en pocos días. Ves resultados tangibles antes de comprometer un desarrollo completo.',
	},
	{
		icon: Puzzle,
		title: 'Integración de IA en sistemas existentes',
		description:
			'Conecto modelos de IA con tus APIs, CRMs, bases de datos y flujos de trabajo actuales para que la inteligencia artificial funcione donde ya trabajas.',
	},
	{
		icon: GraduationCap,
		title: 'Formación de equipos',
		description:
			'Capacito a tu equipo técnico y de negocio para entender, usar y mantener soluciones de IA de forma autónoma. Talleres prácticos adaptados a tu sector.',
	},
	{
		icon: BookOpen,
		title: 'Auditoría de soluciones IA existentes',
		description:
			'Reviso tus implementaciones actuales de IA: costes, precisión, sesgos, seguridad y rendimiento. Te entrego un informe con recomendaciones accionables.',
	},
]

export default function AIServicesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="ai-services-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="ai-services-heading" className="text-3xl font-bold sm:text-4xl">
					Servicios de <span className="text-gradient">consultoría</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Desde la estrategia hasta la implementación. Te acompaño en cada fase del camino.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((service, index) => {
					const Icon = service.icon
					return (
						<motion.div
							key={service.title}
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
						>
							<div className="h-full card-conic-border rounded-2xl bg-card/95 p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
									<Icon className="h-5 w-5 text-accent" aria-hidden="true" />
								</div>
								<h3 className="mt-4 text-lg font-bold">{service.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
							</div>
						</motion.div>
					)
				})}
			</div>
		</section>
	)
}
