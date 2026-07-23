import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd } from '@/app/components/JsonLd'
import WebDevHero from './components/WebDevHero'
import WebServicesSection from './components/WebServicesSection'
import WebProcessSection from './components/WebProcessSection'
import WebBenefitsSection from './components/WebBenefitsSection'
import WebTechnologiesSection from './components/WebTechnologiesSection'
import WebDevFAQ from './components/WebDevFAQ'
import WebDevCTA from './components/WebDevCTA'
import { ScrollProgress } from '../blog/components/ScrollProgress'

const pageUrl = `${siteMetadata.siteUrl}/desarrollo-web`

export const metadata: Metadata = {
	title: 'Desarrollo Web en Tarragona · Roberto Serrano',
	description:
		'Desarrollo web a medida en Tarragona con Next.js, React, TypeScript y Node.js. Landings, aplicaciones full-stack, e-commerce y consultoría técnica para empresas.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Desarrollo Web en Tarragona · Roberto Serrano',
		description:
			'Desarrollo web a medida: landings, aplicaciones full-stack, e-commerce y consultoría técnica. Next.js, React, TypeScript, Node.js.',
		url: pageUrl,
		type: 'website',
		images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}` }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Desarrollo Web en Tarragona · Roberto Serrano',
		description: 'Desarrollo web a medida: landings, apps full-stack, e-commerce y más.',
	},
}

export default function DesarrolloWebPage() {
	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Desarrollo Web', item: pageUrl },
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
					<WebDevHero />
					<WebServicesSection />
					<WebProcessSection />
					<WebBenefitsSection />
					<WebTechnologiesSection />
					<WebDevFAQ />
					<WebDevCTA />
				</div>
			</div>
		</>
	)
}
