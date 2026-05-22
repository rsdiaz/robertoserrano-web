'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { allBlogPosts, type BlogPost } from 'contentlayer/generated'
import { ArrowUpRight, Calendar, Clock, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'

import { Badge } from '@/app/components/ui/badge'
import { categoryPillClass, formatRelativeDate } from '@/app/lib/blog-format'

const MAX_FEATURED = 2

type FeaturedPostProps = {
	viewsBySlug?: Record<string, number>
}

export function FeaturedPost({ viewsBySlug = {} }: FeaturedPostProps) {
	const featuredPosts = useMemo(
		() =>
			allBlogPosts
				.filter(post => post.featured === true)
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.slice(0, MAX_FEATURED),
		[],
	)

	if (featuredPosts.length === 0) return null

	const [hero, secondary] = featuredPosts
	const single = featuredPosts.length === 1

	return (
		<motion.section
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
			className="mb-16"
			aria-labelledby="featured-heading"
		>
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center">
					<TrendingUp className="h-5 w-5 text-accent mr-2" aria-hidden="true" />
					<h2 id="featured-heading" className="text-2xl font-bold">
						Artículos destacados
					</h2>
				</div>
				<div className="hidden sm:block steam-divider w-24 ml-4" aria-hidden="true" />
			</div>

			<div className={`grid grid-cols-1 gap-6 ${single ? '' : 'lg:grid-cols-5'}`}>
				{/* Hero card */}
				<HeroFeaturedCard post={hero} views={viewsBySlug[hero.slug] ?? 0} className={single ? '' : 'lg:col-span-3'} />

				{/* Secondary card */}
				{secondary && <SecondaryFeaturedCard post={secondary} views={viewsBySlug[secondary.slug] ?? 0} />}
			</div>
		</motion.section>
	)
}

function HeroFeaturedCard({ post, views, className = '' }: { post: BlogPost; views: number; className?: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
			whileHover={{ y: -6 }}
			className={className}
		>
			<Link
				href={`/blog/${post.slug}`}
				aria-label={`Leer artículo destacado: ${post.title}`}
				className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
			>
				<article className="card-conic-border relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-elegant transition-smooth hover:shadow-glow">
					{/* Image with overlay */}
					<div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-muted overflow-hidden">
						{post.image?.url ? (
							<Image
								src={post.image.url}
								alt={post.image.alt ?? post.title}
								fill
								sizes="(max-width: 1024px) 100vw, 60vw"
								className="image-tint object-cover group-hover:scale-[1.04]"
								priority
							/>
						) : (
							<div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" aria-hidden="true" />
						)}

						{/* Gradient overlays */}
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"
						/>
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent"
						/>

						{/* Top-right pills */}
						<div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
							<span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-md">
								<Sparkles className="h-3 w-3" aria-hidden="true" />
								Destacado
							</span>
							<span className="inline-flex items-center gap-1 rounded-full reading-pill px-2.5 py-1 text-xs font-medium text-foreground/80">
								<Clock className="h-3 w-3" aria-hidden="true" />
								{post.readingTime.text}
							</span>
						</div>

						{/* Bottom content overlay */}
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							{post.category && (
								<span
									className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider mb-3 ${categoryPillClass(post.category)}`}
								>
									{post.category}
								</span>
							)}
							<h3 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground group-hover:text-accent transition-smooth">
								{post.title}
							</h3>
							<p className="mt-2 text-sm sm:text-base text-muted-foreground line-clamp-2 max-w-2xl">{post.excerpt}</p>

							<div className="mt-4 flex items-center justify-between gap-3">
								<div className="flex items-center gap-3 text-xs text-muted-foreground">
									<time dateTime={post.date} className="flex items-center gap-1">
										<Calendar className="h-3 w-3" aria-hidden="true" />
										{formatRelativeDate(post.date)}
									</time>
									<span aria-hidden="true">·</span>
									<span>{views.toLocaleString('es-ES')} visualizaciones</span>
								</div>
								<span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
									Leer
									<ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
								</span>
							</div>
						</div>
					</div>
				</article>
			</Link>
		</motion.div>
	)
}

function SecondaryFeaturedCard({ post, views }: { post: BlogPost; views: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
			whileHover={{ y: -6 }}
			className="lg:col-span-2"
		>
			<Link
				href={`/blog/${post.slug}`}
				aria-label={`Leer artículo destacado: ${post.title}`}
				className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
			>
				<article className="card-conic-border relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-elegant transition-smooth hover:shadow-glow flex flex-col">
					<div className="relative aspect-[16/10] bg-muted overflow-hidden">
						{post.image?.url ? (
							<Image
								src={post.image.url}
								alt={post.image.alt ?? post.title}
								fill
								sizes="(max-width: 1024px) 100vw, 40vw"
								className="image-tint object-cover group-hover:scale-[1.05]"
							/>
						) : (
							<div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" aria-hidden="true" />
						)}

						<div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
							<span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent backdrop-blur-md">
								<Sparkles className="h-3 w-3" aria-hidden="true" />
								Destacado
							</span>
							<span className="inline-flex items-center gap-1 rounded-full reading-pill px-2 py-0.5 text-[11px] font-medium text-foreground/80">
								<Clock className="h-3 w-3" aria-hidden="true" />
								{post.readingTime.text}
							</span>
						</div>
					</div>

					<div className="flex flex-1 flex-col p-5">
						{post.category && (
							<span
								className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider mb-2 ${categoryPillClass(post.category)}`}
							>
								{post.category}
							</span>
						)}
						<Badge variant="secondary" className="sr-only">
							Destacado
						</Badge>

						<h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-accent transition-smooth line-clamp-2">
							{post.title}
						</h3>
						<p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

						<div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
							<time dateTime={post.date} className="flex items-center gap-1">
								<Calendar className="h-3 w-3" aria-hidden="true" />
								{formatRelativeDate(post.date)}
							</time>
							<span className="inline-flex items-center gap-1 font-medium text-accent transition-transform group-hover:translate-x-1">
								Leer
								<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
							</span>
						</div>
						<span className="sr-only">{views.toLocaleString('es-ES')} visualizaciones</span>
					</div>
				</article>
			</Link>
		</motion.div>
	)
}
