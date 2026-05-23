import { FAQPageJsonLd } from '@/app/components/JsonLd'

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
								+
							</span>
						</summary>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.answer}</p>
					</details>
				))}
			</div>
		</section>
	)
}
