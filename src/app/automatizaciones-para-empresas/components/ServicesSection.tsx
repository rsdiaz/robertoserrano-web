'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeftRight, BarChart3, Bot, Brain, Lightbulb, Workflow } from 'lucide-react'

const services = [
	{
		icon: Workflow,
		title: 'Workflows con n8n y Make',
		description:
			'Creo flujos de trabajo automatizados que conectan tus herramientas diarias (CRM, email, hojas de cálculo, ERPs) sin necesidad de picar integraciones desde cero.',
	},
	{
		icon: ArrowLeftRight,
		title: 'Integración de APIs y CRMs',
		description:
			'Conecto sistemas que no hablan entre sí: sincronización de datos, migraciones, webhooks y middlewares a medida para tu stack tecnológico.',
	},
	{
		icon: Bot,
		title: 'Bots y RPA para tareas repetitivas',
		description:
			'Automatizo procesos administrativos como facturación, extracción de datos, generación de documentos y enriquecimiento de leads.',
	},
	{
		icon: Brain,
		title: 'Agentes IA inteligentes',
		description:
			'Chatbots con contexto real, clasificación automática de tickets, análisis de sentimiento y asistentes que entienden tu negocio, no solo palabras clave.',
	},
	{
		icon: BarChart3,
		title: 'Reporting y dashboards automáticos',
		description:
			'Genero informes automatizados con datos en tiempo real, alertas inteligentes y dashboards que se actualizan solos sin pulsar un botón.',
	},
	{
		icon: Lightbulb,
		title: 'Consultoría de automatización',
		description:
			'Analizo tus procesos actuales, identifico cuellos de botella y diseño una hoja de ruta de automatización con prioridades y estimaciones realistas.',
	},
]

export default function ServicesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="services-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="services-heading" className="text-3xl font-bold sm:text-4xl">
					Servicios de <span className="text-gradient">automatización</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Soluciones end-to-end: desde el análisis hasta la monitorización en producción.
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
