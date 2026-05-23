'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ChevronRight, List } from 'lucide-react'

type TocItem = {
	value: string
	url: string
	depth: number
}

type Props = {
	toc: TocItem[]
}

export default function TableOfContents({ toc }: Props) {
	const items = useMemo(() => toc.filter(i => i.depth === 2 || i.depth === 3), [toc])
	const [activeId, setActiveId] = useState<string | null>(null)
	const [open, setOpen] = useState(false)

	const { scrollYProgress } = useScroll()
	const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

	useEffect(() => {
		if (!items.length) return

		const ids = items.map(i => i.url.replace(/^#/, ''))
		const headings = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))

		if (!headings.length) return

		const observer = new IntersectionObserver(
			entries => {
				const visible = entries.filter(e => e.isIntersecting)
				if (visible.length) {
					visible.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
					setActiveId(visible[0].target.id)
				}
			},
			{ rootMargin: '-120px 0px -65% 0px', threshold: [0, 1] },
		)
		headings.forEach(h => observer.observe(h))
		return () => observer.disconnect()
	}, [items])

	if (!items.length) return null

	const list = (
		<nav className="relative">
			<div className="absolute left-0 top-0 bottom-0 w-px bg-border/60" aria-hidden="true" />
			<motion.div
				className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-accent to-primary"
				style={{ scaleY, height: '100%' }}
				aria-hidden="true"
			/>
			<ul className="space-y-1.5 text-sm pl-4">
				{items.map(item => {
					const id = item.url.replace(/^#/, '')
					const isActive = activeId === id
					return (
						<li key={item.url}>
							<a
								href={item.url}
								onClick={() => setOpen(false)}
								aria-current={isActive ? 'location' : undefined}
								className={[
									'block py-1 transition-colors leading-snug',
									item.depth === 3 ? 'pl-3 text-xs' : '',
									isActive ? 'text-accent font-medium' : 'text-muted-foreground hover:text-foreground',
								].join(' ')}
							>
								{item.value}
							</a>
						</li>
					)
				})}
			</ul>
		</nav>
	)

	return (
		<>
			{/* Mobile collapsible */}
			<details
				className="lg:hidden glass rounded-xl border border-border/60 mb-8 open:shadow-elegant"
				open={open}
				onToggle={e => setOpen((e.target as HTMLDetailsElement).open)}
			>
				<summary className="flex cursor-pointer items-center justify-between px-4 py-3 list-none">
					<span className="flex items-center gap-2 text-sm font-medium">
						<List className="h-4 w-4 text-accent" />
						Contenido del artículo
					</span>
					<ChevronRight className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
				</summary>
				<div className="px-4 pb-4 pt-1">{list}</div>
			</details>

			{/* Desktop sidebar */}
			<div className="glass hidden max-h-[calc(100vh-10rem)] overflow-y-auto rounded-2xl border border-border/60 p-5 lg:block">
				<div className="mb-4 flex items-center gap-2">
					<List className="h-4 w-4 text-accent" />
					<h3 className="text-sm font-semibold tracking-tight">En este artículo</h3>
				</div>
				{list}
			</div>
		</>
	)
}
