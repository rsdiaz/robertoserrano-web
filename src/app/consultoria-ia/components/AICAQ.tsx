import { FAQPageJsonLd } from '@/app/components/JsonLd'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, CrossIcon, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const AI_FAQ_ITEMS = [
	{
		question: '¿Necesito tener muchos datos para usar IA?',
		answer:
			'No siempre. Depende del caso de uso. Con modelos preentrenados y técnicas como RAG puedes obtener resultados excelentes con pocos documentos. Si necesitas entrenar un modelo propio, ahí sí necesitas un volumen de datos. Te ayudo a evaluarlo.',
	},
	{
		question: '¿En qué se diferencia esto de usar ChatGPT?',
		answer:
			'ChatGPT es una herramienta generalista. Yo diseño soluciones que usan tus datos, respetan tu contexto de negocio y se integran con tus sistemas. Pueden ejecutar acciones, consultar tu base de datos y mantener la privacidad de tu información.',
	},
	{
		question: '¿Mis datos están seguros?',
		answer:
			'Depende de la solución. Para datos sensibles, recomiendo modelos self-hosted o APIs con políticas de privacidad estrictas (zero data retention). Diseño cada solución teniendo la seguridad y compliance como prioridad desde el día 1.',
	},
	{
		question: '¿Cuánto cuesta un proyecto de IA?',
		answer:
			'Una consultoría estratégica inicial ronda los 500-1.500 €. Una prueba de concepto funcional suele estar entre 1.500 y 5.000 €. Proyectos completos en producción se presupuestan tras el PoC, con cifras y expectativas realistas.',
	},
	{
		question: '¿Cuánto tarda en verse resultados?',
		answer:
			'Una prueba de concepto puede estar lista en 1-2 semanas. Proyectos completos de 4 a 12 semanas dependiendo del alcance. La consultoría estratégica inicial te da respuestas en la primera sesión.',
	},
	{
		question: '¿Puedo integrar IA con el software que ya tengo?',
		answer:
			'Sí. Trabajo con APIs y arquitecturas modulares que se acoplan a tu stack actual sin reescribir lo que ya funciona. REST, GraphQL, webhooks, bases de datos... todo es conectable.',
	},
]

export default function AICAQ() {
	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="ai-faq-heading">
			<FAQPageJsonLd items={AI_FAQ_ITEMS} />
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="ai-faq-heading" className="text-3xl font-bold sm:text-4xl">
					Preguntas <span className="text-gradient">frecuentes</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Las dudas que surgen antes de empezar con inteligencia artificial.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
				{AI_FAQ_ITEMS.map(item => (
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
									Cuéntame tu idea y te doy una primera valoración técnica sin compromiso.
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
