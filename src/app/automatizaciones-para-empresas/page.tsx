import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd } from '@/app/components/JsonLd'
import AutomationHero from './components/AutomationHero'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import BenefitsSection from './components/BenefitsSection'
import TechnologiesSection from './components/TechnologiesSection'
import AutomationFAQ from './components/AutomationFAQ'
import AutomationCTA from './components/AutomationCTA'
import { ScrollProgress } from '../blog/components/ScrollProgress'

const pageUrl = `${siteMetadata.siteUrl}/automatizaciones-para-empresas`

export const metadata: Metadata = {
	title: 'Automatizaciones para Empresas · Roberto Serrano',
	description:
		'Automatización de procesos con n8n, Make e IA para empresas en Tarragona. Workflows, integraciones API, RPA, agentes IA y reporting automático. Ahorra tiempo y elimina errores.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Automatizaciones para Empresas · Roberto Serrano',
		description:
			'Automatización de procesos para empresas: workflows con n8n y Make, integraciones API, agentes IA y reporting automático.',
		url: pageUrl,
		type: 'website',
		images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}` }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Automatizaciones para Empresas · Roberto Serrano',
		description: 'Automatización de procesos para empresas: n8n, Make, IA, APIs y más.',
	},
}

export default function AutomatizacionesPage() {
	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Automatizaciones para Empresas', item: pageUrl },
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
					<AutomationHero />
					<ServicesSection />
					<ProcessSection />
					<BenefitsSection />
					<TechnologiesSection />
					<AutomationFAQ />
					<AutomationCTA />
				</div>
			</div>
		</>
	)
}
