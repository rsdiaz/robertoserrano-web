import { FAQPageJsonLd } from '@/app/components/JsonLd'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, CrossIcon, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const AUTOMATION_FAQ_ITEMS = [
	{
		question: '¿Cuánto tiempo toma una automatización?',
		answer:
			'Depende de la complejidad. Un workflow simple con n8n o Make puede estar listo en 2-5 días. Integraciones complejas con APIs a medida suelen tomar de 2 a 4 semanas. Te doy una estimación precisa tras el análisis inicial.',
	},
	{
		question: '¿Qué diferencia hay entre n8n y Make?',
		answer:
			'Make es ideal para flujos rápidos y conexiones SaaS con su interfaz visual drag-and-drop. n8n es más potente para lógica compleja, permite self-hosting (tus datos nunca salen de tu servidor) y tiene mejor soporte para ramificaciones condicionales y sub-workflows.',
	},
	{
		question: '¿Mis datos están seguros?',
		answer:
			'Sí. Todas las automatizaciones que implemento siguen el principio de mínimo privilegio. Con n8n self-hosted, tus datos nunca pasan por servidores externos. Además, documento todas las credenciales y rotaciones necesarias.',
	},
	{
		question: '¿Qué pasa si algo falla en producción?',
		answer:
			'Cada automatización incluye manejo de errores con reintentos y notificaciones. Puedo configurar alertas por email, Slack o Telegram para que sepas al instante si algo no va como esperabas. También ofrezco mantenimiento mensual.',
	},
	{
		question: '¿Necesito tener conocimientos técnicos para usar las automatizaciones?',
		answer:
			'No. Te entrego la automatización funcionando y te doy una sesión de traspaso para que entiendas qué hace y cómo monitorizarla. Si prefieres no tocarla, ofrezco planes de mantenimiento donde me encargo yo de todo.',
	},
	{
		question: '¿Trabajas con herramientas específicas o te adaptas a lo que ya uso?',
		answer:
			'Me adapto a tu stack actual. Puedo integrar con CRMs como HubSpot o Salesforce, ERPs, hojas de cálculo de Google, Notion, Airtable, Slack, Telegram, email... Si tiene API, puedo conectarlo.',
	},
]

export default function AutomationFAQ() {
	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="faq-heading">
			<FAQPageJsonLd items={AUTOMATION_FAQ_ITEMS} />
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
					Preguntas <span className="text-gradient">frecuentes</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Respuestas directas a las dudas más comunes sobre automatización.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
				{AUTOMATION_FAQ_ITEMS.map(item => (
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
								<h3 className="text-lg font-bold sm:text-xl">¿Hablamos de tu proyecto?</h3>
								<p className="mt-1 text-sm text-muted-foreground sm:text-base">
									Cuéntame qué proceso quieres automatizar y te propongo una solución sin compromiso.
								</p>
							</div>
						</div>
						<Button asChild size="lg" className="w-full shrink-0 shadow-glow sm:w-auto">
							<Link href="/contacto">
								Solicitar consultoría
								<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
