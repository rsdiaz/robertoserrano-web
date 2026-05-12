'use client'

import { SiNextdotjs, SiTypescript, SiMongodb } from 'react-icons/si'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Code2 } from 'lucide-react'
import { Button } from './ui/button'
import { motion } from 'motion/react'

const socialLinks = [
	{
		icon: Github,
		href: 'https://github.com/rsdiaz',
		label: 'GitHub',
	},
	{
		icon: Linkedin,
		href: 'https://www.linkedin.com/in/roberto-serrano-diaz-grande',
		label: 'LinkedIn',
	},
	{
		icon: Twitter,
		href: 'https://twitter.com/RovBeat',
		label: 'Twitter',
	},
]

const quickLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contacto', href: '/contacto' },
]

const techStack = [
	{
		name: 'Next.js',
		icon: SiNextdotjs,
	},
	{
		name: 'TypeScript',
		icon: SiTypescript,
	},
	{
		name: 'MongoDB',
		icon: SiMongodb,
	},
]

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border/50">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_hsl(var(--primary)/0.06),_transparent_60%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,_hsl(var(--accent)/0.05),_transparent_50%)]" />

			<div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
					<div className="space-y-5">
						<Link href="/" className="group inline-flex items-center gap-3">
							<motion.div
								whileHover={{ rotate: 15, scale: 1.05 }}
								transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
								className="relative"
							>
								<div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<Code2 className="relative h-8 w-8 text-accent" />
							</motion.div>
							<span className="text-lg font-bold tracking-tight">Roberto Serrano</span>
						</Link>

						<p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">
							Construyendo soluciones digitales que funcionan.
						</p>

						<div className="flex items-center gap-2 flex-wrap">
							{techStack.map((tech, index) => {
								const Icon = tech.icon

								return (
									<motion.span
										key={tech.name}
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 + index * 0.05 }}
										className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-secondary/50 border border-border/40 text-muted-foreground/80"
									>
										<Icon className="w-3 h-3" />
										{tech.name}
									</motion.span>
								)
							})}
						</div>
					</div>

					<div className="space-y-5">
						<h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Navegación</h3>
						<ul className="space-y-3">
							{quickLinks.map(link => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="group relative inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
									>
										<span className="relative">
											{link.name}
											<span className="absolute left-0 -bottom-0.5 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-5">
						<h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Conecta</h3>
						<div className="flex gap-3">
							{socialLinks.map((social, index) => {
								const Icon = social.icon
								return (
									<motion.div
										key={social.label}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2 + index * 0.08 }}
									>
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="relative w-10 h-10 p-0 rounded-full border border-transparent hover:border-accent/30 hover:bg-accent/5"
										>
											<a
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={social.label}
												className="flex items-center justify-center"
											>
												<motion.div
													whileHover={{ scale: 1.15 }}
													whileTap={{ scale: 0.95 }}
													transition={{ duration: 0.2 }}
												>
													<Icon className="w-[18px] h-[18px] text-muted-foreground group-hover:text-accent transition-colors" />
												</motion.div>
												<span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)] transition-all duration-300" />
											</a>
										</Button>
									</motion.div>
								)
							})}
						</div>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border/40">
					<div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
						<p className="text-xs text-muted-foreground/70 font-medium">© {currentYear} Roberto Serrano</p>
						<span className="hidden sm:inline text-muted-foreground/30">·</span>
						<p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">Construido con 💗</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
