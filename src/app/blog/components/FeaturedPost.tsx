'use client'

import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { allBlogPosts } from 'contentlayer/generated'
import { Calendar, Clock, Tag, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function FeaturedPost() {
	const featuredPosts = useMemo(() => allBlogPosts.filter(Boolean), [])
	const [data, setData] = useState<{ slug: string; views: number }[]>([])

	const fetchPostViews = async (slug: string) => {
		const res = await fetch(`/api/views/${slug}`)
		if (!res.ok) return { slug, views: 0 }
		const result = (await res.json()) as { slug: string; views: number }
		return { slug, views: result.views ?? 0 }
	}

	useEffect(() => {
		const loadViews = async () => {
			const views = await Promise.all(featuredPosts.map(post => fetchPostViews(post.slug)))
			setData(views)
		}
		if (featuredPosts.length) loadViews()
	}, [featuredPosts])

	return (
		<>
			{featuredPosts.length > 0 && (
				<section className="mb-16">
					<div className="flex items-center mb-8">
						<TrendingUp className="h-5 w-5 text-accent mr-2" />
						<h2 className="text-2xl font-bold">Artículos destacados</h2>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{featuredPosts.slice(0, 2).map((post, index) => (
							<Card key={index} className="overflow-hidden hover:shadow-glow transition-smooth group">
								<div className="aspect-video bg-muted overflow-hidden">
									<Image
										src={post.image?.url}
										alt={post.image?.alt}
										width={1000}
										height={1000}
										className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
									/>
								</div>
								<CardHeader>
									<div className="flex justify-between items-start mb-2">
										<Badge variant="default" className="text-xs">
											Destacado
										</Badge>
										<div className="flex items-center text-sm text-muted-foreground space-x-4">
											<span className="flex items-center">
												<Calendar className="h-4 w-4 mr-1" />
												{new Date(post.date).toLocaleDateString('es-ES', {
													year: 'numeric',
													month: 'short',
													day: 'numeric',
												})}
											</span>
											<span className="flex items-center">
												<Clock className="h-4 w-4 mr-1" />
												{post.readingTime.text}
											</span>
										</div>
									</div>

									<CardTitle className="text-xl group-hover:text-accent transition-smooth">
										<Link href={`/blog/${post.slug}`} className="hover:text-accent transition-smooth">
											{post.title}
										</Link>
									</CardTitle>
									<CardDescription className="text-base leading-relaxed">{post.excerpt}</CardDescription>
								</CardHeader>

								<CardContent>
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
											{data.find(item => item.slug === post.slug)?.views.toLocaleString('es-ES') || 0} visualizaciones
										</span>
										<Button variant="outline" size="sm" asChild>
											<Link href={`/blog/${post.slug}`}>Leer más</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			)}
		</>
	)
}
