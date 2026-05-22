'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import type { BlogPost } from 'contentlayer/generated'

import { categoryPillClass, formatRelativeDate } from '@/app/lib/blog-format'

type PostCardProps = {
	post: BlogPost
	index?: number
	wide?: boolean
	listView?: boolean
}

const MAX_DELAY_STEPS = 6

export function PostCard({ post, index = 0, wide = false, listView = false }: PostCardProps) {
	const delay = 0.06 + Math.min(index, MAX_DELAY_STEPS) * 0.04
	const href = `/blog/${post.slug}`

	if (listView) {
		return (
			<motion.div
				layout
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.15 }}
				transition={{ duration: 0.45, delay, ease: 'easeOut' }}
			>
				<Link
					href={href}
					aria-label={`Leer artículo: ${post.title}`}
					className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
				>
					<article className="card-conic-border flex gap-4 sm:gap-6 rounded-xl border border-border/60 bg-card/95 p-3 sm:p-4 shadow-elegant transition-smooth hover:shadow-glow">
						<div className="relative h-24 w-28 sm:h-32 sm:w-44 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
							{post.image?.url ? (
								<Image
									src={post.image.url}
									alt={post.image.alt ?? post.title}
									fill
									sizes="(max-width: 640px) 7rem, 11rem"
									className="image-tint object-cover group-hover:scale-105"
								/>
							) : (
								<div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" aria-hidden="true" />
							)}
						</div>
						<div className="flex min-w-0 flex-1 flex-col">
							<div className="flex flex-wrap items-center gap-2">
								<span
									className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryPillClass(post.category)}`}
								>
									{post.category || 'General'}
								</span>
								<span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
									<Clock className="h-3 w-3" aria-hidden="true" />
									{post.readingTime.text}
								</span>
							</div>
							<h3 className="mt-1.5 text-base sm:text-lg font-semibold leading-snug text-foreground group-hover:text-accent transition-smooth line-clamp-2">
								{post.title}
							</h3>
							<p className="mt-1 hidden sm:block text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
							<div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
								<time dateTime={post.date} className="flex items-center gap-1">
									<Calendar className="h-3 w-3" aria-hidden="true" />
									{formatRelativeDate(post.date)}
								</time>
								<span className="inline-flex items-center gap-1 font-medium text-accent transition-transform group-hover:translate-x-1">
									Leer
									<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
								</span>
							</div>
						</div>
					</article>
				</Link>
			</motion.div>
		)
	}

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.5, delay, ease: 'easeOut' }}
			whileHover={{ y: -6 }}
			className={wide ? 'md:col-span-2' : ''}
		>
			<Link
				href={href}
				aria-label={`Leer artículo: ${post.title}`}
				className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
			>
				<article className="card-conic-border relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/95 shadow-elegant transition-smooth hover:shadow-glow">
					<div className={`relative ${wide ? 'aspect-[16/9]' : 'aspect-video'} bg-muted overflow-hidden`}>
						{post.image?.url ? (
							<Image
								src={post.image.url}
								alt={post.image.alt ?? post.title}
								fill
								sizes={wide ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
								className="image-tint object-cover group-hover:scale-105"
							/>
						) : (
							<div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" aria-hidden="true" />
						)}

						{/* Reading time pill */}
						<span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full reading-pill px-2.5 py-1 text-[11px] font-medium text-foreground/80">
							<Clock className="h-3 w-3" aria-hidden="true" />
							{post.readingTime.text}
						</span>

						{/* Hover overlay */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						/>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent/95 px-3 py-1 text-xs font-semibold text-accent-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
						>
							Leer artículo
							<ArrowUpRight className="h-3.5 w-3.5" />
						</span>
					</div>

					<div className="flex flex-1 flex-col p-5">
						<div className="mb-2 flex items-center justify-between gap-2">
							<span
								className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${categoryPillClass(post.category)}`}
							>
								{post.category || 'General'}
							</span>
						</div>

						<h3
							className={`${wide ? 'text-xl' : 'text-lg'} font-semibold leading-snug text-foreground group-hover:text-accent transition-smooth line-clamp-2`}
						>
							{post.title}
						</h3>
						<p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>

						{!!post.tags?.length && (
							<ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Etiquetas">
								{post.tags.slice(0, wide ? 4 : 3).map(tag => (
									<li
										key={tag}
										className="text-[11px] font-medium text-muted-foreground hover:text-accent transition-colors"
									>
										#{tag}
									</li>
								))}
								{(post.tags.length ?? 0) > (wide ? 4 : 3) && (
									<li className="text-[11px] font-medium text-muted-foreground">
										+{post.tags.length - (wide ? 4 : 3)}
									</li>
								)}
							</ul>
						)}

						<div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
							<time
								dateTime={post.date}
								className="flex items-center gap-1"
								title={new Date(post.date).toLocaleDateString('es-ES', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							>
								<Calendar className="h-3 w-3" aria-hidden="true" />
								{formatRelativeDate(post.date)}
							</time>
							<span className="inline-flex items-center gap-1 font-medium text-accent transition-transform group-hover:translate-x-1">
								Leer
								<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
							</span>
						</div>
					</div>
				</article>
			</Link>
		</motion.div>
	)
}
