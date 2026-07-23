import '@/app/css/prims.css'
import { allBlogPosts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackNavigation from './components/BackNavigation'
import PostSidebar from './components/PostSidebar'
import PostHero from './components/PostHero'
import PostActions from './components/PostActions'
import AuthorCard from './components/AuthorCard'
import PostNavigation from './components/PostNavigation'
import RelatedPosts from './components/RelatedPosts'
import TagsList from './components/TagsList'
import siteMetadata from '@/data/siteMetadata'
import { getStatsForSlug } from '@/app/lib/views'
import { ScrollProgress } from '@/app/blog/components/ScrollProgress'
import { ArticleJsonLd, BreadcrumbListJsonLd } from '@/app/components/JsonLd'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await props.params
	const post = allBlogPosts.find(p => p.slug === slug && !p.draft)

	if (!post) {
		return {
			title: 'Artículo no encontrado - Roberto Serrano Díaz-Grande',
		}
	}

	const ogImage = post.image?.url ?? '/static/opengraph-image.png'
	const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: postUrl,
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: 'article',
			url: postUrl,
			images: [ogImage],
			publishedTime: post.date,
			modifiedTime: post.date,
		},
		twitter: {
			card: 'summary_large_image',
			site: siteMetadata.twitterHandle,
			creator: siteMetadata.twitterHandle,
			images: [ogImage],
		},
	}
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
	const { slug } = await props.params
	const post = allBlogPosts.find(p => p.slug === slug && !p.draft)

	if (!post) {
		return notFound()
	}

	const { views: initialViews, likes: initialLikes } = await getStatsForSlug(slug)

	const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`
	const ogImage = post.image?.url ?? '/static/opengraph-image.png'
	const category = post.category && post.category.trim() ? post.category : 'General'
	const author = post.author && post.author.trim() ? post.author : 'Roberto Serrano Díaz-Grande'

	// Prev / Next by date desc
	const sortedByDate = [...allBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	const idx = sortedByDate.findIndex(p => p.slug === slug)
	const next = idx > 0 ? sortedByDate[idx - 1] : null
	const prev = idx >= 0 && idx < sortedByDate.length - 1 ? sortedByDate[idx + 1] : null

	// Related by category (excluding current), fallback to most recent
	const related = sortedByDate
		.filter(p => p.slug !== slug && (p.category ?? 'General').toLowerCase() === category.toLowerCase())
		.slice(0, 3)
	const relatedFinal = related.length > 0 ? related : sortedByDate.filter(p => p.slug !== slug).slice(0, 3)

	return (
		<>
			<ScrollProgress />
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-36 lg:pt-44 pb-20">
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,_hsl(var(--accent)/0.12),_transparent_45%)] blog-blob"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_28%,_hsl(var(--primary)/0.10),_transparent_46%)] blog-blob-2"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,_hsl(var(--accent)/0.05),_transparent_45%)]"
					aria-hidden="true"
				/>

				<ArticleJsonLd
					title={post.title}
					description={post.excerpt}
					image={ogImage}
					datePublished={post.date}
					url={postUrl}
				/>
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Blog', item: `${siteMetadata.siteUrl}/blog` },
						{
							name: category,
							item: `${siteMetadata.siteUrl}/blog?category=${encodeURIComponent(category.toLowerCase())}`,
						},
						{ name: post.title, item: postUrl },
					]}
				/>

				<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
					<BackNavigation />

					<div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
						{/* Main */}
						<article data-post-article aria-labelledby="post-title" className="min-w-0">
							<PostHero
								slug={slug}
								title={post.title}
								excerpt={post.excerpt}
								category={category}
								date={post.date}
								readingTime={post.readingTime.text}
								initialViews={initialViews}
								image={post.image}
								author={author}
							/>

							{/* Actions bar */}
							<div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm">
								<p className="text-xs text-muted-foreground">
									¿Te resulta útil? Déjame saber con un like o guárdalo para luego.
								</p>
								<PostActions
									slug={slug}
									title={post.title}
									baseUrl={siteMetadata.siteUrl}
									initialLikes={initialLikes}
								/>
							</div>

							{/* Article body */}
							<div className="prose prose-lg prose-post max-w-none dark:prose-invert">
								<MDXLayoutRenderer code={post.body.code} />
							</div>

							<TagsList tags={post.tags ?? []} />

							{/* Bottom actions repeat */}
							<div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/40 p-4">
								<p className="text-xs text-muted-foreground">¿Te ha gustado? Compártelo.</p>
								<PostActions
									slug={slug}
									title={post.title}
									baseUrl={siteMetadata.siteUrl}
									initialLikes={initialLikes}
								/>
							</div>

							<div className="mt-12">
								<AuthorCard author={author} />
							</div>

							<PostNavigation prev={prev} next={next} />

							<RelatedPosts posts={relatedFinal} />
						</article>

						<PostSidebar post={post} />
					</div>
				</div>
			</div>
		</>
	)
}
