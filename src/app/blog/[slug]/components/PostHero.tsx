'use client'

import { motion } from 'motion/react'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { categoryPillClass, formatAbsoluteDate, formatRelativeDate } from '@/app/lib/blog-format'
import ViewCounter from './ViewCounter'

type Props = {
	slug: string
	title: string
	excerpt: string
	category?: string
	date: string
	readingTime: string
	initialViews: number
	image?: { url: string; alt?: string }
	author: string
}

export default function PostHero({
	slug,
	title,
	excerpt,
	category,
	date,
	readingTime,
	initialViews,
	image,
	author,
}: Props) {
	const cat = category && category.trim() ? category : 'General'
	const catSlug = cat.toLowerCase()
	const absDate = formatAbsoluteDate(date)
	const relDate = formatRelativeDate(date)

	return (
		<motion.header
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.22, 0.7, 0.15, 1] }}
			className="mb-10"
		>
			{/* Breadcrumb */}
			<nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
				<Link href="/" className="hover:text-foreground transition-smooth">
					Inicio
				</Link>
				<ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
				<Link href="/blog" className="hover:text-foreground transition-smooth">
					Blog
				</Link>
				<ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
				<Link
					href={`/blog?category=${encodeURIComponent(catSlug)}`}
					className="capitalize hover:text-foreground transition-smooth"
				>
					{cat}
				</Link>
			</nav>

			{/* Category pill */}
			<div className="mb-5 flex flex-wrap items-center gap-3">
				<span
					className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${categoryPillClass(cat)}`}
				>
					<span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
					{cat}
				</span>
				<span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
					<Clock className="h-3.5 w-3.5" aria-hidden="true" />
					{readingTime}
				</span>
				<span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
					<Calendar className="h-3.5 w-3.5" aria-hidden="true" />
					<time dateTime={date} title={absDate}>
						{relDate}
					</time>
				</span>
				<span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
					<ViewCounter slug={slug} initialViews={initialViews} />
				</span>
			</div>

			{/* Title */}
			<h1
				id="post-title"
				className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
			>
				{title}
			</h1>

			{/* Excerpt */}
			<p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">{excerpt}</p>

			{/* Author row */}
			<div className="mt-8 flex items-center gap-3">
				<Image
					src="/static/profile.jpg"
					width={44}
					height={44}
					alt={author}
					className="rounded-full ring-2 ring-border/60"
				/>
				<div className="leading-tight">
					<p className="text-sm font-medium">{author}</p>
					<p className="text-xs text-muted-foreground">Ingeniero de Software</p>
				</div>
			</div>

			{/* Hero image */}
			{image?.url && (
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.7, 0.15, 1] }}
					className="card-conic-border group relative mt-10 overflow-hidden rounded-2xl shadow-elegant"
				>
					<div className="relative aspect-[16/9] w-full">
						<Image
							src={image.url}
							alt={image.alt ?? title}
							fill
							priority
							sizes="(min-width: 1024px) 768px, 100vw"
							className="image-tint object-cover"
						/>
						<div
							className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
							aria-hidden="true"
						/>
					</div>
				</motion.div>
			)}
		</motion.header>
	)
}
