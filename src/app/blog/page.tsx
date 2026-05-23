import { Metadata } from 'next'
import { allBlogPosts } from 'contentlayer/generated'

import BlogHeader from './components/BlogHero'
import BlogPageContent from './components/BlogPageContent'
import { FeaturedPost } from './components/FeaturedPost'
import { ScrollProgress } from './components/ScrollProgress'
import { generatedPageMetadata } from '../lib/seo'
import { getViewsForSlugs } from '../lib/views'

export const metadata: Metadata = generatedPageMetadata({
	title: 'Blog',
})

const MAX_FEATURED = 2

export default async function BlogPage() {
	const sortedByDate = [...allBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const featuredSlugs = sortedByDate
		.filter(post => post.featured === true)
		.slice(0, MAX_FEATURED)
		.map(post => post.slug)

	const viewsBySlug = await getViewsForSlugs(featuredSlugs)

	const categoriesSet = new Set(allBlogPosts.map(p => (p.category && p.category.trim() ? p.category : 'General')))

	const latestDate = sortedByDate[0]?.date ?? null

	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
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
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
					<BlogHeader totalPosts={allBlogPosts.length} totalCategories={categoriesSet.size} latestDate={latestDate} />
					<FeaturedPost viewsBySlug={viewsBySlug} />
					<BlogPageContent excludeSlugs={featuredSlugs} />
				</div>
			</div>
		</>
	)
}
