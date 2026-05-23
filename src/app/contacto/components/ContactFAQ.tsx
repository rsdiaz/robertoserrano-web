import { FAQPageJsonLd } from '@/app/components/JsonLd'
import { Button } from '@/app/components/ui/button'
import { ArrowDown, CrossIcon, MessageCircleQuestion } from 'lucide-react'

export const FAQ_ITEMS = [
	{
		question: '¿Cuánto tiempo toma un proyecto?',
		answer:
			'Depende de la complejidad, pero proyectos típicos van de 2 a 8 semanas. Te proporciono estimaciones detalladas después de la consulta inicial.',
	},
	{
		question: '¿Trabajas con startups?',
		answer:
			'Sí. Me encanta trabajar con startups y ayudar a convertir ideas innovadoras en productos exitosos. Ofrezco tarifas flexibles según fase.',
	},
	{
		question: '¿Ofreces soporte post-desarrollo?',
		answer:
			'Sí, incluyo 30 días de soporte gratuito tras la entrega. También ofrezco planes de mantenimiento mensual para actualizaciones y mejoras continuas.',
	},
	{
		question: '¿Puedes trabajar con mi equipo?',
		answer:
			'Por supuesto. Tengo experiencia colaborando con equipos de distintos tamaños, desde startups hasta empresas enterprise.',
	},
	{
		question: '¿Cuáles son tus tarifas?',
		answer:
			'Trabajo por hora, por proyecto cerrado o en formato retainer mensual. Te envío una estimación clara tras una consulta inicial gratuita.',
	},
	{
		question: '¿Qué stack utilizas?',
		answer:
			'Principalmente Next.js, React, Node.js y TypeScript. También trabajo con MongoDB, PostgreSQL, Docker y despliegues en AWS o VPS.',
	},
]

export default function ContactFAQ() {
	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="faq-heading">
			<FAQPageJsonLd items={FAQ_ITEMS} />
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
					Preguntas <span className="text-gradient">frecuentes</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">Resuelvo las dudas más comunes antes de que escribas.</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
				{FAQ_ITEMS.map(item => (
					<details
						key={item.question}
						className="group card-conic-border rounded-2xl bg-card/95 p-5 shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
					>
						<summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
							<span className="text-base font-semibold text-foreground sm:text-lg">{item.question}</span>
							<span
								className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border/70 text-accent transition-transform duration-300 group-open:rotate-45"
								aria-hidden="true"
							>
								<CrossIcon className="h-3 w-3" />
							</span>
						</summary>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.answer}</p>
					</details>
				))}
			</div>

			<div className="mx-auto mt-10 max-w-4xl">
				<div className="card-conic-border relative overflow-hidden rounded-2xl bg-card/95 p-6 shadow-elegant sm:p-8">
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--accent)/0.12),_transparent_50%)]"
						aria-hidden="true"
					/>
					<div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-start gap-4">
							<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
								<MessageCircleQuestion className="h-6 w-6 text-accent" aria-hidden="true" />
							</div>
							<div>
								<h3 className="text-lg font-bold sm:text-xl">¿No encontraste respuesta?</h3>
								<p className="mt-1 text-sm text-muted-foreground sm:text-base">
									Escríbeme directamente y te respondo en menos de 24 horas.
								</p>
							</div>
						</div>
						<Button asChild size="lg" className="w-full shrink-0 shadow-glow sm:w-auto">
							<a href="#contact-form">
								Escríbeme ahora
								<ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
							</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
