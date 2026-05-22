'use client'

import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Command, Filter, Grid3x3, List, SearchX, X } from 'lucide-react'
import { allBlogPosts } from 'contentlayer/generated'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { CommandPalette } from './CommandPalette'
import { PostCard } from './PostCard'

type BlogPageContentProps = {
	excludeSlugs?: string[]
}

type ViewMode = 'grid' | 'list'

const SUGGESTED_TAGS = ['nextjs', 'react', 'docker', 'nodejs']

export default function BlogPageContent({ excludeSlugs = [] }: BlogPageContentProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [viewMode, setViewMode] = useState<ViewMode>('grid')
	const [paletteOpen, setPaletteOpen] = useState(false)
	const [isMac, setIsMac] = useState(false)

	useEffect(() => {
		if (typeof navigator !== 'undefined') {
			setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform))
		}
	}, [])

	// CmdK shortcut
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setPaletteOpen(open => !open)
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

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

	const hasActiveFilters = searchTerm.trim() !== '' || selectedCategory !== 'all'

	const clearFilters = () => {
		setSearchTerm('')
		setSelectedCategory('all')
	}

	return (
		<>
			<CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

			{/* Sticky search and filters */}
			<div className="sticky top-24 z-20 mb-10 -mx-2 px-2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
					className="filter-bar-sticky rounded-2xl p-3 sm:p-4"
				>
					<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
						<div className="flex-1">
							<div className="relative">
								<label htmlFor="blog-search" className="sr-only">
									Buscar artículos
								</label>
								<svg
									aria-hidden="true"
									className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="11" cy="11" r="8" />
									<path d="m21 21-4.3-4.3" />
								</svg>
								<Input
									id="blog-search"
									type="search"
									placeholder="Buscar artículos, temas, tecnologías..."
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									className="pl-10 pr-24 h-11"
									aria-label="Buscar artículos, temas, tecnologías"
								/>
								<button
									type="button"
									onClick={() => setPaletteOpen(true)}
									className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/80 px-2 py-1 text-[10px] font-mono text-muted-foreground hover:bg-muted/60 transition-colors"
									aria-label="Abrir paleta de comandos"
								>
									<Command className="h-3 w-3" />
									{isMac ? 'K' : 'Ctrl K'}
								</button>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<nav aria-label="Filtrar por categoría" className="flex-1 lg:flex-none">
								<ul className="flex gap-1.5 overflow-x-auto scrollbar-none">
									{categories.map(category => {
										const isActive = selectedCategory === category.id
										return (
											<li key={category.id}>
												<button
													type="button"
													onClick={() => setSelectedCategory(category.id)}
													className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
														isActive
															? 'border-accent/40 bg-accent text-accent-foreground shadow-sm'
															: 'border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:border-border'
													}`}
													aria-pressed={isActive}
												>
													{category.id === 'all' && <Filter className="h-3 w-3" aria-hidden="true" />}
													{category.label}
													<sub className="ml-0.5 -mb-0.5 text-[10px] opacity-70">{category.count}</sub>
												</button>
											</li>
										)
									})}
								</ul>
							</nav>

							{/* View toggle - hidden on small */}
							<div className="hidden md:flex items-center rounded-full border border-border/60 bg-background/60 p-0.5">
								<button
									type="button"
									onClick={() => setViewMode('grid')}
									aria-pressed={viewMode === 'grid'}
									aria-label="Vista de cuadrícula"
									className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors ${
										viewMode === 'grid' ? 'bg-accent/15 text-accent' : 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Grid3x3 className="h-4 w-4" />
								</button>
								<button
									type="button"
									onClick={() => setViewMode('list')}
									aria-pressed={viewMode === 'list'}
									aria-label="Vista de lista"
									className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors ${
										viewMode === 'list' ? 'bg-accent/15 text-accent' : 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<List className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>

					<AnimatePresence>
						{hasActiveFilters && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.2 }}
								className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"
							>
								<span>Filtros activos.</span>
								<Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs hover:text-accent">
									<X className="h-3 w-3 mr-1" />
									Limpiar
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* All Posts */}
			<section aria-labelledby="all-posts-heading">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
					className="mb-8 flex items-center justify-between"
				>
					<div className="flex items-center">
						<BookOpen className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
						<h2 id="all-posts-heading" className="text-2xl font-bold">
							Todos los artículos{' '}
							<span className="text-base font-normal text-muted-foreground">({filteredPosts.length})</span>
						</h2>
					</div>
				</motion.div>

				{filteredPosts.length === 0 ? (
					<EmptyState onClearFilters={clearFilters} onTagClick={tag => setSearchTerm(tag)} />
				) : (
					<motion.div layout className={viewMode === 'list' ? 'flex flex-col gap-3' : ''}>
						<AnimatePresence mode="popLayout">
							{viewMode === 'grid' ? (
								<motion.div key="grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{filteredPosts.map((post, index) => {
										// Mosaico: cada 5 cards, una ocupa 2 columnas
										const wide = index > 0 && index % 5 === 0
										return <PostCard key={post.slug} post={post} index={index} wide={wide} />
									})}
								</motion.div>
							) : (
								<motion.div key="list" layout className="flex flex-col gap-3">
									{filteredPosts.map((post, index) => (
										<PostCard key={post.slug} post={post} index={index} listView />
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</section>
		</>
	)
}

function EmptyState({ onClearFilters, onTagClick }: { onClearFilters: () => void; onTagClick: (tag: string) => void }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			role="status"
			className="flex flex-col items-center justify-center gap-4 py-16 text-center"
		>
			{/* Decorative SVG */}
			<div className="relative">
				<svg
					width="120"
					height="120"
					viewBox="0 0 120 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					className="opacity-90"
				>
					<defs>
						<linearGradient id="emptyGrad" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
							<stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
						</linearGradient>
					</defs>
					<rect x="20" y="30" width="80" height="60" rx="8" fill="url(#emptyGrad)" stroke="hsl(var(--border))" />
					<rect x="32" y="44" width="40" height="3" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.4" />
					<rect x="32" y="54" width="56" height="3" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.3" />
					<rect x="32" y="64" width="32" height="3" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.3" />
				</svg>
				<SearchX
					className="absolute -bottom-2 -right-2 h-8 w-8 text-accent bg-background rounded-full p-1.5 border border-border"
					aria-hidden="true"
				/>
			</div>

			<div className="space-y-1">
				<p className="text-lg font-semibold text-foreground">No hay artículos que coincidan</p>
				<p className="text-sm text-muted-foreground">Prueba con otros términos o cambia de categoría.</p>
			</div>

			<div className="flex flex-col items-center gap-3 mt-2">
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>Prueba con:</span>
					<ul className="flex flex-wrap gap-1.5">
						{SUGGESTED_TAGS.map(tag => (
							<li key={tag}>
								<button
									type="button"
									onClick={() => onTagClick(tag)}
									className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
								>
									#{tag}
								</button>
							</li>
						))}
					</ul>
				</div>

				<Button variant="outline" size="sm" onClick={onClearFilters} className="mt-2">
					<X className="h-3.5 w-3.5 mr-1.5" />
					Limpiar filtros
				</Button>
			</div>
		</motion.div>
	)
}
