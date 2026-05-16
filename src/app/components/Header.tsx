'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/app/components/ui/sheet'
import { Menu, Moon, Sun, Code2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import siteMetadata from '@/data/siteMetadata'

function ThemeToggle({ theme, setTheme }: { theme: string | undefined; setTheme: (v: string) => void }) {
	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="w-9 h-9 p-0 flex items-center justify-center rounded-full text-foreground hover:bg-accent/20 hover:text-foreground focus-visible:ring-foreground/40"
		>
			<AnimatePresence mode="wait" initial={false}>
				{theme === 'dark' ? (
					<motion.span
						key="sun"
						initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
					>
						<Sun className="!size-5 text-foreground" />
					</motion.span>
				) : (
					<motion.span
						key="moon"
						initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
					>
						<Moon className="!size-5 text-foreground" />
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	)
}

export default function Header() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		setMounted(true)
		let frameId: number | null = null

		const updateScrollState = () => {
			const nextIsScrolled = window.scrollY > 28
			setIsScrolled(prev => (prev === nextIsScrolled ? prev : nextIsScrolled))
			frameId = null
		}

		const handleScroll = () => {
			if (frameId !== null) return
			frameId = window.requestAnimationFrame(updateScrollState)
		}

		updateScrollState()
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			if (frameId !== null) {
				window.cancelAnimationFrame(frameId)
			}
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contacto', href: '/contacto' },
	]

	const isActive = (href: string) => {
		if (href === '/' && pathname === '/') return true
		if (href !== '/' && pathname.startsWith(href)) return true
		return false
	}

	if (!mounted) return null

	return (
		<header
			className={`header-premium fixed top-0 w-full z-50 ${
				isScrolled ? 'header-premium-scrolled' : 'header-premium-top'
			}`}
		>
			<nav className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
				<div
					className={`header-shell rounded-2xl border px-4 py-3 ${
						isScrolled ? 'header-shell-scrolled' : 'header-shell-top'
					}`}
				>
					<div className="flex h-12 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
						<Link href="/" className="flex items-center gap-3 transition-smooth md:justify-self-start">
							<Code2 className="h-7 w-7 text-accent" />
							<span className="font-display text-lg font-semibold text-foreground">{siteMetadata.portfolioTitle}</span>
						</Link>

						<div className="hidden md:flex items-center justify-center">
							<ul className="flex items-center gap-6">
								{navigation.map(item => (
									<li key={item.name}>
										<Link
											href={item.href}
											className={`group relative inline-flex items-center h-10 px-1 font-medium transition-smooth ${
												isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
											}`}
										>
											{item.name}
											<span
												className={`absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent/80 shadow-[0_0_12px_hsl(var(--accent)/0.5)] transition-all duration-300 ${
													isActive(item.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-80'
												}`}
											/>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="flex items-center space-x-4 md:justify-self-end">
							<ThemeToggle theme={theme} setTheme={setTheme} />

							<Sheet>
								<SheetTrigger asChild className="md:hidden">
									<Button variant="ghost" size="sm" className="w-9 h-9 p-0">
										<Menu className="h-4 w-4 text-foreground" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-80">
									<div className="flex flex-col space-y-4 mt-8">
										{navigation.map(item => (
											<SheetClose asChild key={item.name}>
												<Link
													href={item.href}
													className={`text-lg font-medium uppercase tracking-[0.2em] transition-smooth hover:text-accent ${
														isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
													}`}
												>
													{item.name}
												</Link>
											</SheetClose>
										))}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
