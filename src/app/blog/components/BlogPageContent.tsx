'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, Filter, Search } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { allBlogPosts } from 'contentlayer/generated'
import { Input } from '@/app/components/ui/input'
import { motion } from 'motion/react'

export default function BlogPageContent() {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
	const sortedPosts = useMemo(
		() => [...allBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		[],
	)

	const filteredPosts = sortedPosts.filter(post => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post?.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

		const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory

		return matchesSearch && matchesCategory
	})

	const categories = sortedPosts.reduce(
		(acc, post) => {
			const category = post.category || 'General'
			const existingCategory = acc.find(cat => cat.id === category)
			if (existingCategory) {
				existingCategory.count += 1
			} else {
				acc.push({ id: category, label: category, count: 1 })
			}
			return acc
		},
		[{ id: 'all', label: 'Todas', count: sortedPosts.length }] as { id: string; label: string; count: number }[],
	)

	return (
		<>
			{/* Search and Filters */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
				className="mb-12 flex flex-col gap-8 lg:flex-row"
			>
				<div className="lg:w-2/3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar artículos, temas, tecnologías..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>

				<div className="lg:w-1/2">
					<div className="flex gap-2 overflow-x-auto pb-2">
						{categories.map(category => (
							<Button
								key={category.id}
								variant={selectedCategory === category.id ? 'default' : 'outline'}
								size="sm"
								onClick={() => setSelectedCategory(category.id)}
								className="whitespace-nowrap"
							>
								<Filter className="h-4 w-4 mr-2" />
								{category.label} ({category.count})
							</Button>
						))}
					</div>
				</div>
			</motion.div>

			{/* All Posts */}
			<section>
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
					className="mb-8 flex items-center"
				>
					<BookOpen className="h-5 w-5 text-primary mr-2" />
					<h2 className="text-2xl font-bold">Todos los artículos ({filteredPosts.length})</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredPosts.map((post, index) => (
						<motion.div
							key={post.slug}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.18 + index * 0.05, ease: 'easeOut' }}
							whileHover={{ y: -6 }}
						>
							<Card className="group overflow-hidden border-border/60 bg-card/95 shadow-elegant transition-smooth hover:shadow-glow">
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
										<Badge variant="outline" className="text-xs capitalize">
											{post.category || 'General'}
										</Badge>
										<div className="flex items-center text-xs text-muted-foreground">
											<Clock className="h-3 w-3 mr-1" />
											{post.readingTime.text}
										</div>
									</div>

									<CardTitle className="text-lg group-hover:text-accent transition-smooth line-clamp-2">
										<Link href={`/blog/${post.slug}`} className="hover:text-accent transition-smooth">
											{post.title}
										</Link>
									</CardTitle>
									<CardDescription className="text-sm leading-relaxed line-clamp-3">{post.excerpt}</CardDescription>
								</CardHeader>

								<CardContent>
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
										<span className="flex items-center">
											<Calendar className="h-3 w-3 mr-1" />
											{new Date(post.date).toLocaleDateString('es-ES', {
												year: 'numeric',
												month: 'short',
											})}
										</span>
										{/* <span>{post.views.toLocaleString()} views</span> */}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</section>
		</>
	)
}
