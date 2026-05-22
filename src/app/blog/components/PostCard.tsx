'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import { motion } from 'motion/react'
import type { BlogPost } from 'contentlayer/generated'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'

type Variant = 'featured' | 'default'

type PostCardProps = {
	post: BlogPost
	variant?: Variant
	views?: number
	index?: number
}

const MAX_DELAY_STEPS = 6

export function PostCard({ post, variant = 'default', views, index = 0 }: PostCardProps) {
	const delay = 0.14 + Math.min(index, MAX_DELAY_STEPS) * (variant === 'featured' ? 0.08 : 0.05)
	const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'short',
		...(variant === 'featured' ? { day: 'numeric' } : {}),
	})
	const href = `/blog/${post.slug}`

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay, ease: 'easeOut' }}
			whileHover={{ y: -6 }}
		>
			<Link
				href={href}
				aria-label={`Leer artículo: ${post.title}`}
				className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
			>
				<Card className="group h-full overflow-hidden border-border/60 bg-card/95 shadow-elegant transition-smooth hover:shadow-glow">
					{post.image?.url ? (
						<div className="aspect-video bg-muted overflow-hidden">
							<Image
								src={post.image.url}
								alt={post.image.alt ?? post.title}
								width={1000}
								height={1000}
								className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
							/>
						</div>
					) : (
						<div className="aspect-video bg-muted" aria-hidden="true" />
					)}

					<CardHeader>
						<div className="flex justify-between items-start mb-2">
							{variant === 'featured' ? (
								<Badge variant="default" className="text-xs">
									Destacado
								</Badge>
							) : (
								<Badge variant="outline" className="text-xs capitalize">
									{post.category || 'General'}
								</Badge>
							)}

							{variant === 'featured' ? (
								<div className="flex items-center text-sm text-muted-foreground space-x-4">
									<time dateTime={post.date} className="flex items-center">
										<Calendar className="h-4 w-4 mr-1" />
										{formattedDate}
									</time>
									<span className="flex items-center">
										<Clock className="h-4 w-4 mr-1" />
										{post.readingTime.text}
									</span>
								</div>
							) : (
								<div className="flex items-center text-xs text-muted-foreground">
									<Clock className="h-3 w-3 mr-1" />
									{post.readingTime.text}
								</div>
							)}
						</div>

						<CardTitle
							className={
								variant === 'featured'
									? 'text-xl group-hover:text-accent transition-smooth'
									: 'text-lg group-hover:text-accent transition-smooth line-clamp-2'
							}
						>
							{post.title}
						</CardTitle>
						<CardDescription
							className={variant === 'featured' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed line-clamp-3'}
						>
							{post.excerpt}
						</CardDescription>
					</CardHeader>

					<CardContent>
						{variant === 'featured' ? (
							<>
								<div className="flex flex-wrap gap-2 mb-4">
									{post?.tags?.slice(0, 3).map(tag => (
										<Badge key={tag} variant="secondary" className="text-xs">
											<Tag className="h-3 w-3 mr-1" />
											{tag}
										</Badge>
									))}
								</div>

								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">
										{(views ?? 0).toLocaleString('es-ES')} visualizaciones
									</span>
									<Button variant="outline" size="sm" asChild>
										<span>Leer más</span>
									</Button>
								</div>
							</>
						) : (
							<>
								<div className="flex flex-wrap gap-1 mb-4">
									{post?.tags?.slice(0, 2).map(tag => (
										<Badge key={tag} variant="secondary" className="text-xs">
											{tag}
										</Badge>
									))}
									{(post?.tags?.length ?? 0) > 2 && (
										<Badge variant="secondary" className="text-xs">
											+{(post?.tags?.length ?? 0) - 2}
										</Badge>
									)}
								</div>

								<div className="flex justify-between items-center text-xs text-muted-foreground">
									<time dateTime={post.date} className="flex items-center">
										<Calendar className="h-3 w-3 mr-1" />
										{formattedDate}
									</time>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</Link>
		</motion.div>
	)
}
