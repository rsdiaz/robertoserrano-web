import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd } from '@/app/components/JsonLd'
import { ScrollProgress } from '@/app/blog/components/ScrollProgress'
import AboutHero from './components/AboutHero'
import AboutTimeline from './components/AboutTimeline'
import AboutStack from './components/AboutStack'
import AboutCTA from './components/AboutCTA'

const pageUrl = `${siteMetadata.siteUrl}/sobre-mi`

export const metadata: Metadata = {
	title: 'Sobre mí · Roberto Serrano',
	description:
		'Ingeniero de software con más de 15 años de experiencia en desarrollo web, IA y automatizaciones. Conoce mi trayectoria, stack tecnológico y enfoque de trabajo.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Sobre mí · Roberto Serrano',
		description: 'Más de 15 años creando software útil y escalable. Conoce mi trayectoria y stack tecnológico.',
		url: pageUrl,
		type: 'website',
		images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sobre mí · Roberto Serrano',
		description: 'Más de 15 años creando software útil y escalable.',
		images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
	},
}

export default function SobreMiPage() {
	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Sobre mí', item: pageUrl },
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
					<AboutHero />
					<AboutTimeline />
					<AboutStack />
					<AboutCTA />
				</div>
			</div>
		</>
	)
}
