'use client'

import { useMemo } from 'react'
import { allBlogPosts } from 'contentlayer/generated'
import { TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'

import { PostCard } from './PostCard'

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

	return (
		<motion.section
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
			className="mb-16"
			aria-labelledby="featured-heading"
		>
			<div className="mb-8 flex items-center">
				<TrendingUp className="h-5 w-5 text-accent mr-2" />
				<h2 id="featured-heading" className="text-2xl font-bold">
					Artículos destacados
				</h2>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{featuredPosts.map((post, index) => (
					<PostCard key={post.slug} post={post} variant="featured" views={viewsBySlug[post.slug] ?? 0} index={index} />
				))}
			</div>
		</motion.section>
	)
}
