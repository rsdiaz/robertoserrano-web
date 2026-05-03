'use client'

import { motion } from 'motion/react'
import ContactWithMe from '../components/ContactWhitMe'
import ContactInfo from './components/ContactInfo'
import CollaborationTypes from './components/CollaborationTypes'
import ContactForm from './components/ContactForm'

const Contact = () => {
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background pt-64 pb-16">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--accent)/0.14),_transparent_45%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,_hsl(var(--primary)/0.12),_transparent_40%)]" />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: 'easeOut' }}
					className="mb-16 text-center"
				>
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
						className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-3.5 py-1 text-sm font-semibold tracking-wide text-accent"
					>
						Contacto
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
						className="mt-4 text-4xl font-bold sm:text-5xl"
					>
						Hablemos de tu <span className="text-gradient"> próximo proyecto</span> 🚀
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
						className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground"
					>
						¿Tienes una idea innovadora? ¿Necesitas ayuda con un proyecto existente? Estoy aquí para convertir tus ideas
						en soluciones digitales.
					</motion.p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
					className="grid grid-cols-1 gap-12 lg:grid-cols-3"
				>
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, y: 22 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
						className="lg:col-span-2"
					>
						<ContactForm />
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 22 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
						className="space-y-8"
					>
						<ContactInfo />
						<ContactWithMe />
						<CollaborationTypes />
					</motion.div>
				</motion.div>

				{/* FAQ Section */}
				{/* <section className="mt-20 pt-12 border-t border-border">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
						<p className="text-xl text-muted-foreground">Respuestas a las dudas más comunes sobre mis servicios</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card className="shadow-elegant">
							<CardHeader>
								<CardTitle className="text-lg">¿Cuánto tiempo toma un proyecto?</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Depende de la complejidad, pero proyectos típicos van de 2-8 semanas. Te proporciono estimaciones
									detalladas después de la consulta inicial.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="shadow-elegant">
							<CardHeader>
								<CardTitle className="text-lg">¿Trabajas con startups?</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									¡Absolutamente! Me encanta trabajar con startups y ayudar a convertir ideas innovadoras en productos
									exitosos. Ofrezco tarifas especiales.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="shadow-elegant">
							<CardHeader>
								<CardTitle className="text-lg">¿Ofreces soporte post-desarrollo?</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Sí, incluyo 30 días de soporte gratuito. También ofrezco planes de mantenimiento mensual para
									actualizaciones y mejoras continuas.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="shadow-elegant">
							<CardHeader>
								<CardTitle className="text-lg">¿Puedes trabajar con mi equipo?</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Por supuesto. Tengo experiencia colaborando con equipos de diferentes tamaños, desde startups hasta
									empresas enterprise.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</section> */}
			</div>
		</div>
	)
}

export default Contact
