'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { allBlogPosts } from 'contentlayer/generated'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, FileText, Hash, Search, X } from 'lucide-react'

import { categoryPillClass } from '@/app/lib/blog-format'

type CommandPaletteProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
	const [query, setQuery] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const router = useRouter()

	const posts = useMemo(
		() => allBlogPosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		[],
	)

	const results = useMemo(() => {
		const term = query.trim().toLowerCase()
		if (!term) return posts.slice(0, 8)
		return posts
			.filter(post => {
				return (
					post.title.toLowerCase().includes(term) ||
					post.excerpt.toLowerCase().includes(term) ||
					post.tags?.some(t => t.toLowerCase().includes(term)) ||
					(post.category ?? '').toLowerCase().includes(term)
				)
			})
			.slice(0, 12)
	}, [posts, query])

	useEffect(() => {
		setActiveIndex(0)
	}, [query, open])

	useEffect(() => {
		if (open) {
			const t = setTimeout(() => inputRef.current?.focus(), 30)
			return () => clearTimeout(t)
		}
	}, [open])

	useEffect(() => {
		if (!open) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				onOpenChange(false)
			} else if (e.key === 'ArrowDown') {
				e.preventDefault()
				setActiveIndex(i => Math.min(results.length - 1, i + 1))
			} else if (e.key === 'ArrowUp') {
				e.preventDefault()
				setActiveIndex(i => Math.max(0, i - 1))
			} else if (e.key === 'Enter') {
				e.preventDefault()
				const target = results[activeIndex]
				if (target) {
					onOpenChange(false)
					router.push(`/blog/${target.slug}`)
				}
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, results, activeIndex, onOpenChange, router])

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 backdrop-blur-sm p-4 pt-[15vh]"
					onClick={() => onOpenChange(false)}
					role="dialog"
					aria-modal="true"
					aria-label="Buscador rápido de artículos"
				>
					<motion.div
						initial={{ opacity: 0, y: -16, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.98 }}
						transition={{ duration: 0.22, ease: 'easeOut' }}
						className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl"
						onClick={e => e.stopPropagation()}
					>
						<div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
							<Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
							<input
								ref={inputRef}
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder="Busca artículos, tags o categorías..."
								aria-label="Buscar"
								className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
							/>
							<button
								type="button"
								onClick={() => onOpenChange(false)}
								className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-[10px] font-mono text-muted-foreground hover:bg-muted/50 transition-colors"
								aria-label="Cerrar"
							>
								<X className="h-3 w-3" />
								ESC
							</button>
						</div>

						<div className="max-h-[60vh] overflow-y-auto p-2">
							{results.length === 0 ? (
								<div className="px-3 py-8 text-center text-sm text-muted-foreground">
									Nada coincide con &quot;{query}&quot;.
								</div>
							) : (
								<ul role="listbox" aria-label="Resultados">
									{results.map((post, idx) => {
										const isActive = idx === activeIndex
										return (
											<li key={post.slug} role="option" aria-selected={isActive}>
												<Link
													href={`/blog/${post.slug}`}
													onClick={() => onOpenChange(false)}
													onMouseEnter={() => setActiveIndex(idx)}
													className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
														isActive ? 'bg-accent/15 text-foreground' : 'hover:bg-muted/40'
													}`}
												>
													<FileText
														className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
														aria-hidden="true"
													/>
													<div className="min-w-0 flex-1">
														<div className="truncate text-sm font-medium">{post.title}</div>
														<div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
															<span
																className={`inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] uppercase tracking-wider ${categoryPillClass(post.category)}`}
															>
																{post.category || 'General'}
															</span>
															{post.tags?.slice(0, 2).map(t => (
																<span key={t} className="inline-flex items-center gap-0.5">
																	<Hash className="h-2.5 w-2.5" />
																	{t}
																</span>
															))}
														</div>
													</div>
													<ArrowRight
														className={`h-4 w-4 flex-shrink-0 transition-transform ${
															isActive ? 'translate-x-0 text-accent' : '-translate-x-2 opacity-0'
														}`}
														aria-hidden="true"
													/>
												</Link>
											</li>
										)
									})}
								</ul>
							)}
						</div>

						<div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
							<div className="flex items-center gap-3">
								<span>
									<kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono">↑↓</kbd>{' '}
									navegar
								</span>
								<span>
									<kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono">↵</kbd> abrir
								</span>
							</div>
							<span>
								<kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono">ESC</kbd> cerrar
							</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
