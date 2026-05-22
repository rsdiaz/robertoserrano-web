import { Metadata } from 'next'
import { allBlogPosts } from 'contentlayer/generated'

import BlogHeader from './components/BlogHeader'
import BlogPageContent from './components/BlogPageContent'
import { FeaturedPost } from './components/FeaturedPost'
import { generatedPageMetadata } from '../lib/seo'
import { getViewsForSlugs } from '../lib/views'

export const metadata: Metadata = generatedPageMetadata({
	title: 'Blog',
})

const MAX_FEATURED = 2

export default async function BlogPage() {
	const featuredSlugs = allBlogPosts
		.filter(post => post.featured === true)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, MAX_FEATURED)
		.map(post => post.slug)

	const viewsBySlug = await getViewsForSlugs(featuredSlugs)

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background pt-64 pb-16">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_hsl(var(--accent)/0.12),_transparent_40%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,_hsl(var(--primary)/0.1),_transparent_42%)]" />
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<BlogHeader />
				<FeaturedPost viewsBySlug={viewsBySlug} />
				<BlogPageContent excludeSlugs={featuredSlugs} />
			</div>
		</div>
	)
}
