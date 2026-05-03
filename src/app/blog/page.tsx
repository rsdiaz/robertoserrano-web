import { Metadata } from 'next'
import BlogHeader from './components/BlogHeader'
import BlogPageContent from './components/BlogPageContent'
import { FeaturedPost } from './components/FeaturedPost'
import { generatedPageMetadata } from '../lib/seo'

export const metadata: Metadata = generatedPageMetadata({
	title: 'Blog',
})

export default function BlogPage() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background pt-64 pb-16">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_hsl(var(--accent)/0.12),_transparent_40%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,_hsl(var(--primary)/0.1),_transparent_42%)]" />
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<BlogHeader />
				<FeaturedPost />
				<BlogPageContent />
			</div>
		</div>
	)
}
