'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/app/components/ui/sheet'
import { Menu, Moon, Sun, Code2, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import siteMetadata from '@/data/siteMetadata'

type NavItem =
	| { type: 'link'; name: string; href: string }
	| { type: 'dropdown'; name: string; children: { name: string; href: string }[] }

const navItems: NavItem[] = [
	{ type: 'link', name: 'Home', href: '/' },
	{ type: 'link', name: 'Blog', href: '/blog' },
	{
		type: 'dropdown',
		name: 'Servicios',
		children: [
			{ name: 'Desarrollo Web', href: '/desarrollo-web' },
			{ name: 'Automatizaciones', href: '/automatizaciones-para-empresas' },
			{ name: 'Consultoría IA', href: '/consultoria-ia' },
		],
	},
	{ type: 'link', name: 'Sobre mí', href: '/sobre-mi' },
	{ type: 'link', name: 'Contacto', href: '/contacto' },
]

const dropdownItem = navItems.find(it => it.type === 'dropdown') as
	{ type: 'dropdown'; name: string; children: { name: string; href: string }[] } | undefined

const servicePaths = dropdownItem ? dropdownItem.children.map(c => c.href) : []

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

function activeDotClass(active: boolean) {
	return `absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent/80 shadow-[0_0_12px_hsl(var(--accent)/0.5)] transition-all duration-300 ${
		active ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-80'
	}`
}

function navLinkClass(active: boolean) {
	return `group relative inline-flex items-center h-10 px-1 font-medium transition-smooth ${
		active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
	}`
}

export default function Header() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const [servicesOpen, setServicesOpen] = useState(false)
	const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
	const dropdownRef = useRef<HTMLLIElement>(null)

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

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setServicesOpen(false)
			}
		}
		if (servicesOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [servicesOpen])

	const isActive = (href: string) => {
		if (href === '/' && pathname === '/') return true
		if (href !== '/' && pathname.startsWith(href)) return true
		return false
	}

	const isServiceActive = servicePaths.some(p => pathname.startsWith(p))

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
					style={servicesOpen ? { overflow: 'visible' } : undefined}
				>
					<div className="flex h-12 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
						<Link href="/" className="flex items-center gap-3 transition-smooth md:justify-self-start">
							<Code2 className="h-7 w-7 text-accent" />
							<span className="font-display text-lg font-semibold text-foreground">{siteMetadata.portfolioTitle}</span>
						</Link>

						{/* Desktop nav */}
						<div className="hidden md:flex items-center justify-center">
							<ul className="flex items-center gap-6">
								{navItems.map(item => {
									if (item.type === 'dropdown') {
										return (
											<li
												key={item.name}
												ref={dropdownRef}
												className="relative"
												onMouseEnter={() => setServicesOpen(true)}
												onMouseLeave={() => setServicesOpen(false)}
											>
												<button
													onClick={() => setServicesOpen(!servicesOpen)}
													className={navLinkClass(isServiceActive)}
												>
													{item.name}
													<ChevronDown
														className={`ml-1 h-4 w-4 transition-transform duration-200 ${
															servicesOpen ? 'rotate-180' : ''
														}`}
													/>
													<span className={activeDotClass(isServiceActive)} />
												</button>
												<AnimatePresence>
													{servicesOpen && (
														<motion.div
															initial={{ opacity: 0, y: -6, scale: 0.96 }}
															animate={{ opacity: 1, y: 0, scale: 1 }}
															exit={{ opacity: 0, y: -6, scale: 0.96 }}
															transition={{ duration: 0.2, ease: 'easeOut' }}
															className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
														>
															<div className="steam-panel rounded-xl py-2 px-1 shadow-elegant min-w-[220px]">
																{item.children.map(child => (
																	<Link
																		key={child.name}
																		href={child.href}
																		onClick={() => setServicesOpen(false)}
																		className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-smooth ${
																			isActive(child.href)
																				? 'text-accent bg-accent/10'
																				: 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
																		}`}
																	>
																		{child.name}
																	</Link>
																))}
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</li>
										)
									}

									return (
										<li key={item.href}>
											<Link href={item.href} className={navLinkClass(isActive(item.href))}>
												{item.name}
												<span className={activeDotClass(isActive(item.href))} />
											</Link>
										</li>
									)
								})}
							</ul>
						</div>

						<div className="flex items-center space-x-4 md:justify-self-end">
							<ThemeToggle theme={theme} setTheme={setTheme} />

							{/* Mobile nav */}
							<Sheet>
								<SheetTrigger asChild className="md:hidden">
									<Button variant="ghost" size="sm" className="w-9 h-9 p-0">
										<Menu className="h-4 w-4 text-foreground" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-80">
									<div className="flex flex-col space-y-4 mt-8">
										{navItems.map(item => {
											if (item.type === 'dropdown') {
												return (
													<div key={item.name}>
														<button
															onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
															className={`flex w-full items-center justify-between text-lg font-medium uppercase tracking-[0.2em] transition-smooth hover:text-accent ${
																isServiceActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
															}`}
														>
															{item.name}
															<ChevronDown
																className={`h-4 w-4 transition-transform duration-200 ${
																	mobileServicesOpen ? 'rotate-180' : ''
																}`}
															/>
														</button>
														<AnimatePresence>
															{mobileServicesOpen && (
																<motion.div
																	initial={{ height: 0, opacity: 0 }}
																	animate={{ height: 'auto', opacity: 1 }}
																	exit={{ height: 0, opacity: 0 }}
																	transition={{ duration: 0.2, ease: 'easeOut' }}
																	className="overflow-hidden"
																>
																	<div className="mt-3 ml-4 flex flex-col space-y-2 border-l-2 border-border/60 pl-4">
																		{item.children.map(child => (
																			<SheetClose asChild key={child.name}>
																				<Link
																					href={child.href}
																					className={`text-base font-medium transition-smooth hover:text-accent ${
																						isActive(child.href)
																							? 'text-accent'
																							: 'text-muted-foreground hover:text-foreground'
																					}`}
																				>
																					{child.name}
																				</Link>
																			</SheetClose>
																		))}
																	</div>
																</motion.div>
															)}
														</AnimatePresence>
													</div>
												)
											}

											return (
												<SheetClose asChild key={item.href}>
													<Link
														href={item.href}
														className={`text-lg font-medium uppercase tracking-[0.2em] transition-smooth hover:text-accent ${
															isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
														}`}
													>
														{item.name}
													</Link>
												</SheetClose>
											)
										})}
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
