import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd } from '@/app/components/JsonLd'
import AIHero from './components/AIHero'
import AIServicesSection from './components/AIServicesSection'
import AIProcessSection from './components/AIProcessSection'
import AIBenefitsSection from './components/AIBenefitsSection'
import AITechnologiesSection from './components/AITechnologiesSection'
import AICAQ from './components/AICAQ'
import AICTA from './components/AICTA'
import { ScrollProgress } from '../blog/components/ScrollProgress'

const pageUrl = `${siteMetadata.siteUrl}/consultoria-ia`

export const metadata: Metadata = {
	title: 'Consultoría de IA Aplicada · Roberto Serrano',
	description:
		'Consultoría de inteligencia artificial para empresas. Estrategia, pruebas de concepto, integración y formación. IA generativa, RAG, Computer Vision y agentes autónomos.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Consultoría de IA Aplicada · Roberto Serrano',
		description:
			'Consultoría de IA para empresas: estrategia, PoCs, integración y formación. IA generativa, RAG, Computer Vision y agentes.',
		url: pageUrl,
		type: 'website',
		images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}` }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Consultoría de IA Aplicada · Roberto Serrano',
		description: 'Consultoría de IA para empresas: estrategia, PoCs, integración y formación.',
	},
}

export default function ConsultoriaIAPage() {
	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Consultoría IA', item: pageUrl },
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
					<AIHero />
					<AIServicesSection />
					<AIProcessSection />
					<AIBenefitsSection />
					<AITechnologiesSection />
					<AICAQ />
					<AICTA />
				</div>
			</div>
		</>
	)
}
