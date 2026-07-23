import { FAQPageJsonLd } from '@/app/components/JsonLd'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, CrossIcon, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const WEB_DEV_FAQ_ITEMS = [
	{
		question: '¿Cuánto cuesta una web a medida?',
		answer:
			'Depende del alcance. Una landing page optimizada puede ir de 800 a 2.500 €. Una aplicación full-stack con autenticación, pagos y dashboard suele estar entre 3.000 y 15.000 €. Te doy un presupuesto detallado tras la consulta inicial gratuita.',
	},
	{
		question: '¿En cuánto tiempo está lista?',
		answer:
			'Una landing page en 1-2 semanas. Una aplicación full-stack básica en 4-6 semanas. Proyectos más complejos los planificamos por sprints para que tengas resultados visibles desde el primer mes.',
	},
	{
		question: '¿Incluye el diseño o necesito un diseñador aparte?',
		answer:
			'Me encargo del diseño UI/UX. Trabajo con Figma para mockups y prototipos que validamos juntos antes de programar. Si ya tienes un diseño, lo implemento fielmente.',
	},
	{
		question: '¿Qué pasa con el hosting y el dominio?',
		answer:
			'Te asesoro en la elección del hosting (VPS, Vercel, AWS) y configuro todo el despliegue con CI/CD. Te entrego la web funcionando en tu dominio sin que tengas que tocar nada técnico.',
	},
	{
		question: '¿Ofreces mantenimiento después del lanzamiento?',
		answer:
			'Sí. Incluyo 30 días de soporte gratuito. Después ofrezco planes de mantenimiento mensual que cubren actualizaciones de seguridad, backups, monitorización y pequeñas mejoras.',
	},
	{
		question: '¿Puedo editar el contenido yo mismo después?',
		answer:
			'Sí. Si el proyecto lo requiere, integro un CMS headless (como Contentlayer, Sanity o Strapi) para que puedas editar textos, imágenes y productos sin tocar código. También puedo usar WordPress como headless CMS.',
	},
]

export default function WebDevFAQ() {
	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="web-faq-heading">
			<FAQPageJsonLd items={WEB_DEV_FAQ_ITEMS} />
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="web-faq-heading" className="text-3xl font-bold sm:text-4xl">
					Preguntas <span className="text-gradient">frecuentes</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Respuestas directas a lo que más me preguntan sobre desarrollo web.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
				{WEB_DEV_FAQ_ITEMS.map(item => (
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
									Cuéntame qué necesitas y te preparo un presupuesto detallado sin compromiso.
								</p>
							</div>
						</div>
						<Button asChild size="lg" className="w-full shrink-0 shadow-glow sm:w-auto">
							<Link href="/contacto">
								Solicitar presupuesto
								<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
