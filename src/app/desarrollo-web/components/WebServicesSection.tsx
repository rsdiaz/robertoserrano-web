'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Bolt, Code2, Database, Lightbulb, ShoppingCart, Smartphone } from 'lucide-react'

const services = [
	{
		icon: Bolt,
		title: 'Landing pages de alto rendimiento',
		description:
			'Páginas optimizadas para Core Web Vitals, con puntuaciones 90+ en Lighthouse. Diseño a medida, copys persuasivos y formularios que convierten visitas en leads cualificados.',
	},
	{
		icon: Code2,
		title: 'Aplicaciones web full-stack',
		description:
			'Plataformas completas con autenticación, roles, dashboards, pagos y lógica de negocio compleja. Todo lo que necesita un SaaS o producto digital para funcionar.',
	},
	{
		icon: ShoppingCart,
		title: 'E-commerce y tiendas online',
		description:
			'Tiendas rápidas, con buena experiencia de compra y optimizadas para conversión. Integración con pasarelas de pago, gestión de inventario y panel de administración.',
	},
	{
		icon: Smartphone,
		title: 'PWAs y aplicaciones móviles web',
		description:
			'Progressive Web Apps instalables, con funcionamiento offline, notificaciones push y experiencia nativa sin pasar por las tiendas de aplicaciones.',
	},
	{
		icon: Database,
		title: 'APIs REST y GraphQL',
		description:
			'Backends robustos y bien documentados que conectan tu frontend con bases de datos, servicios externos y lógica de negocio. Escalables y con tests automatizados.',
	},
	{
		icon: Lightbulb,
		title: 'Consultoría y auditoría técnica',
		description:
			'Reviso tu código, arquitectura y rendimiento actual. Te entrego un informe con recomendaciones accionables y una hoja de ruta para mejorar.',
	},
]

export default function WebServicesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24" aria-labelledby="web-services-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="web-services-heading" className="text-3xl font-bold sm:text-4xl">
					Servicios de <span className="text-gradient">desarrollo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Del concepto al deployment. Soluciones web que resuelven problemas reales de negocio.
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
