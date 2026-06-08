'use client'

import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Linkedin, ArrowRight, Radar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const signals = [
	{ label: 'TypeScript', desktopPosition: { top: '4%', left: '-18%' }, delay: 0 },
	{ label: 'Node.js', desktopPosition: { top: '24%', left: '-28%' }, delay: 0.1 },
	{ label: 'React', desktopPosition: { top: '44%', left: '-22%' }, delay: 0.2 },
	{ label: 'MongoDB', desktopPosition: { bottom: '22%', left: '-18%' }, delay: 0.3 },
	{ label: 'Web Apps', desktopPosition: { top: '10%', right: '-22%' }, delay: 0.4 },
	{ label: 'Mobile Apps', desktopPosition: { top: '38%', right: '-28%' }, delay: 0.5 },
	{ label: 'APIs', desktopPosition: { bottom: '26%', right: '-24%' }, delay: 0.6 },
	{ label: 'IA Generativa', desktopPosition: { bottom: '6%', right: '-18%' }, delay: 0.7 },
]

export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-background pb-20 pt-56">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsl(var(--steam-glow)/0.14),_transparent_45%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_hsl(var(--steam-cyan)/0.18),_transparent_45%)]" />
			<div className="absolute inset-0 steam-grid" />
			<div className="absolute inset-0 steam-noise" />

			<div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
				<div className="grid items-center gap-16 md:grid-cols-[1.05fr_0.95fr]">
					<div className="space-y-8">
						<motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
							<span className="steam-label">Bienvenido</span>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.1 }}
						>
							<h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
								Soy <span className="text-gradient">Roberto Serrano</span>, ingeniero de software
							</h1>
							<p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
								Construyo software a medida que combinan ingeniería, pasión y compromiso. Mi misión es transformar ideas
								en soluciones digitales que impulsen el éxito de tu idea
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="flex flex-wrap gap-3"
						>
							<div className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
								<Radar className="h-4 w-4 text-accent" />
								Desarrollo full-stack
							</div>
							<div className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
								<ArrowRight className="h-4 w-4 text-accent" />
								+15 años de trayectoria
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="grid gap-4 sm:grid-cols-2"
						>
							<div className="steam-panel rounded-2xl p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
									Desarrollo de software
								</p>
								<p className="mt-3 text-lg font-semibold text-foreground">Plataformas escalables</p>
								<p className="mt-2 text-sm text-muted-foreground">
									Front, backend y DevOps sincronizados para crecer sin sustos.
								</p>
							</div>
							<div className="steam-panel rounded-2xl p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
									AI Solutions Architect
								</p>
								<p className="mt-3 text-lg font-semibold text-foreground">IA con impacto medible</p>
								<p className="mt-2 text-sm text-muted-foreground">
									La IA es practica y diferencial pero sin sentido no sirve.
								</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="flex flex-wrap gap-4"
						>
							<Link href="/contacto" className="w-full sm:w-auto">
								<Button
									size="lg"
									className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
								>
									Pide una propuesta en 24h <ArrowRight className="!size-4" />
								</Button>
							</Link>
							<a
								href="https://www.linkedin.com/in/roberto-serrano-diaz-grande"
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto"
							>
								<Button size="lg" variant="outline" className="w-full sm:w-auto border-border/60">
									<Linkedin className="!size-5" />
									LinkedIn
								</Button>
							</a>
						</motion.div>
					</div>

					<div className="relative">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.15 }}
							className="relative"
						>
							<div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--steam-copper)/0.2),_transparent_60%)]" />
							<div className="steam-frame relative overflow-hidden rounded-[28px] p-4">
								<div className="absolute inset-0 steam-noise" />
								<div className="absolute inset-0 steam-scanlines" />
								<div className="relative overflow-hidden rounded-[22px] border border-border/60">
									<Image
										width={460}
										height={540}
										src="/static/profile2.png"
										alt="Foto de perfil de Roberto Serrano"
										className="h-[420px] w-full object-cover object-center grayscale contrast-110"
									/>
								</div>
								<div className="mt-4 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
									<span>GNU/Linux Lover 💗</span>
								</div>
							</div>

							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
								className="absolute -right-6 top-10 h-24 w-24 rounded-full border border-accent/40 border-dashed"
							/>
						</motion.div>

						{/* <div className="hidden lg:block">
							{signals.map(signal => (
								<motion.div
									key={signal.label}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.4 + signal.delay }}
									className="absolute"
									style={signal.desktopPosition}
								>
									<div className="steam-panel rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
										{signal.label}
									</div>
								</motion.div>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</section>
	)
}
