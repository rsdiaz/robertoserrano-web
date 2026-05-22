'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Filter, Search, SearchX } from 'lucide-react'
import { allBlogPosts } from 'contentlayer/generated'
import { motion } from 'motion/react'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { PostCard } from './PostCard'

type BlogPageContentProps = {
	excludeSlugs?: string[]
}

export default function BlogPageContent({ excludeSlugs = [] }: BlogPageContentProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')

	const excludeSet = useMemo(() => new Set(excludeSlugs), [excludeSlugs])

	const sortedPosts = useMemo(
		() =>
			[...allBlogPosts]
				.filter(post => !excludeSet.has(post.slug))
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		[excludeSet],
	)

	const filteredPosts = useMemo(() => {
		const term = searchTerm.trim().toLowerCase()
		return sortedPosts.filter(post => {
			const matchesSearch =
				term === '' ||
				post.title.toLowerCase().includes(term) ||
				post.excerpt.toLowerCase().includes(term) ||
				post?.tags?.some(tag => tag.toLowerCase().includes(term))

			const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory

			return matchesSearch && matchesCategory
		})
	}, [sortedPosts, searchTerm, selectedCategory])

	const categories = useMemo(
		() =>
			sortedPosts.reduce(
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
				[{ id: 'all', label: 'Todas', count: sortedPosts.length }] as {
					id: string
					label: string
					count: number
				}[],
			),
		[sortedPosts],
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
						<label htmlFor="blog-search" className="sr-only">
							Buscar artículos
						</label>
						<Search
							aria-hidden="true"
							className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
						/>
						<Input
							id="blog-search"
							type="search"
							placeholder="Buscar artículos, temas, tecnologías..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="pl-10"
							aria-label="Buscar artículos, temas, tecnologías"
						/>
					</div>
				</div>

				<nav aria-label="Filtrar por categoría" className="lg:w-1/3">
					<ul className="flex gap-2 overflow-x-auto pb-2">
						{categories.map(category => {
							const isActive = selectedCategory === category.id
							return (
								<li key={category.id}>
									<Button
										variant={isActive ? 'default' : 'outline'}
										size="sm"
										onClick={() => setSelectedCategory(category.id)}
										className="whitespace-nowrap"
										aria-pressed={isActive}
									>
										<Filter className="h-4 w-4 mr-2" aria-hidden="true" />
										{category.label} ({category.count})
									</Button>
								</li>
							)
						})}
					</ul>
				</nav>
			</motion.div>

			{/* All Posts */}
			<section aria-labelledby="all-posts-heading">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
					className="mb-8 flex items-center"
				>
					<BookOpen className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
					<h2 id="all-posts-heading" className="text-2xl font-bold">
						Todos los artículos ({filteredPosts.length})
					</h2>
				</motion.div>

				{filteredPosts.length === 0 ? (
					<div
						role="status"
						className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground"
					>
						<SearchX className="h-10 w-10" aria-hidden="true" />
						<p className="text-lg font-medium">No hay artículos que coincidan con tu búsqueda.</p>
						<p className="text-sm">Prueba con otros términos o cambia de categoría.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredPosts.map((post, index) => (
							<PostCard key={post.slug} post={post} variant="default" index={index} />
						))}
					</div>
				)}
			</section>
		</>
	)
}
