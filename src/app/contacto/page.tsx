import type { Metadata } from 'next'
import { Suspense } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd, ContactPageJsonLd } from '@/app/components/JsonLd'
import ContactWithMe from '../components/ContactWhitMe'
import ContactInfo from './components/ContactInfo'
import CollaborationTypes from './components/CollaborationTypes'
import ContactForm from './components/ContactForm'
import ContactHero from './components/ContactHero'
import ContactGrid from './components/ContactGrid'
import ContactFAQ from './components/ContactFAQ'
import { ScrollProgress } from '../blog/components/ScrollProgress'

const pageUrl = `${siteMetadata.siteUrl}/contacto`

export const metadata: Metadata = {
	title: 'Contacto · Roberto Serrano',
	description:
		'Cuéntame sobre tu proyecto, idea o consulta. Consultoría, desarrollo y mentoría con respuesta en menos de 24 horas.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Contacto · Roberto Serrano',
		description: 'Hablemos de tu próximo proyecto. Respuesta en menos de 24 horas.',
		url: pageUrl,
		type: 'website',
		images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}` }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Contacto · Roberto Serrano',
		description: 'Hablemos de tu próximo proyecto.',
	},
}

export default function ContactPage() {
	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<ContactPageJsonLd url={pageUrl} email={siteMetadata.contactEmail} />
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Contacto', item: pageUrl },
					]}
				/>

				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_hsl(var(--accent)/0.14),_transparent_42%)] blog-blob"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,_hsl(var(--primary)/0.12),_transparent_44%)] blog-blob-2"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_hsl(var(--accent)/0.06),_transparent_45%)]"
					aria-hidden="true"
				/>

				<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
					<ContactHero />

					<div className="mt-16">
						<Suspense fallback={null}>
							<ContactGrid
								form={<ContactForm />}
								info={<ContactInfo />}
								social={<ContactWithMe />}
								collaboration={<CollaborationTypes />}
							/>
						</Suspense>
					</div>

					<ContactFAQ />
				</div>
			</div>
		</>
	)
}
