'use client'

import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Linkedin } from 'lucide-react'

const profileBlobPath =
	'M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.4C26.4,83.8,10,86,-6.5,85.1C-23,84.2,-46,80.2,-62.3,70.1C-78.6,60,-88.2,43.8,-91.7,26.3C-95.2,8.8,-92.6,-10,-84.8,-25.5C-77,-41,-64,-53.2,-49.3,-60.2C-34.6,-67.2,-18.3,-69,0,-69C18.3,-69,30.6,-83.6,44.7,-76.4Z'

const skills = [
	{
		label: 'TypeScript',
		mobilePosition: { top: '-4%', left: '-10%' },
		desktopPosition: { top: '-5%', left: '-24%' },
		delay: 0,
	},
	{
		label: 'NodeJS',
		mobilePosition: { top: '16%', left: '-14%' },
		desktopPosition: { top: '16%', left: '-30%' },
		delay: 0.1,
	},
	{
		label: 'React',
		mobilePosition: { top: '44%', left: '-12%' },
		desktopPosition: { top: '46%', left: '-28%' },
		delay: 0.2,
	},
	{
		label: 'MongoDB',
		mobilePosition: { bottom: '12%', left: '-8%' },
		desktopPosition: { bottom: '8%', left: '-22%' },
		delay: 0.3,
	},
	{
		label: 'Web Apps',
		mobilePosition: { top: '8%', right: '-10%' },
		desktopPosition: { top: '8%', right: '-24%' },
		delay: 0.4,
	},
	{
		label: 'Mobile Apps',
		mobilePosition: { top: '34%', right: '-14%' },
		desktopPosition: { top: '34%', right: '-30%' },
		delay: 0.5,
	},
	{
		label: 'API Services',
		mobilePosition: { bottom: '12%', right: '-10%' },
		desktopPosition: { bottom: '25%', right: '-34%' },
		delay: 0.6,
	},
	{
		label: 'AI Generative',
		mobilePosition: { bottom: '12%', right: '-10%' },
		desktopPosition: { bottom: '0%', right: '-24%' },
		delay: 0.7,
	},
]

export default function Hero() {
	return (
		<section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_oklch(0.45_0.15_285_/_0.05),transparent_50%)]" />
			<div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
				<div className="flex flex-col items-center justify-center text-center">
					<motion.span
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-accent font-display text-sm md:text-base font-semibold mb-4 tracking-wider bg-accent/10 rounded-full px-3.5 py-1"
					>
						Hello
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="mt-8 font-bold text-5xl md:text-7xl lg:text-8xl text-foreground mb-12"
					>
						Soy Roberto Serrano
						<br />
						<span className="font-light text-5xl text-gradient">Software Enginner</span>
					</motion.h1>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] mb-16"
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted via-card to-secondary/30 backdrop-blur-sm" />

						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/5 flex items-center justify-center overflow-hidden">
								<motion.svg
									className="w-full h-full"
									viewBox="0 0 200 200"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-label="Foto de perfil de Roberto Serrano con efecto orgánico"
								>
									<defs>
										<clipPath id="hero-profile-blob">
											<path d={profileBlobPath} transform="translate(100 100) scale(1.02)" />
										</clipPath>
										<linearGradient id="hero-profile-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
											<stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
											<stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
										</linearGradient>
										<radialGradient id="hero-profile-overlay" cx="50%" cy="35%" r="75%">
											<stop offset="0%" stopColor="white" stopOpacity="0.2" />
											<stop offset="60%" stopColor="transparent" stopOpacity="0" />
											<stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.2" />
										</radialGradient>
										<filter id="hero-profile-glow" x="-35%" y="-35%" width="170%" height="170%">
											<feGaussianBlur stdDeviation="6" result="blur" />
											<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
										</filter>
									</defs>

									<path
										d={profileBlobPath}
										transform="translate(100 100) scale(1.08)"
										fill="hsl(var(--accent) / 0.6)"
										filter="url(#hero-profile-glow)"
									/>

									<image
										href="/static/profile.png"
										x="0"
										y="0"
										width="200"
										height="200"
										preserveAspectRatio="xMidYMid slice"
										clipPath="url(#hero-profile-blob)"
									/>

									<path d={profileBlobPath} transform="translate(100 100)" fill="url(#hero-profile-overlay)" />

									<path
										d={profileBlobPath}
										transform="translate(100 100)"
										fill="none"
										stroke="url(#hero-profile-stroke)"
										strokeWidth="3"
									/>
								</motion.svg>
							</div>
						</div>

						<div className="md:hidden">
							{skills.map((skill, index) => (
								<motion.div
									key={`mobile-${index}`}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.4,
										delay: 0.5 + skill.delay,
										type: 'spring',
										stiffness: 200,
									}}
									className="absolute"
									style={skill.mobilePosition}
								>
									<div
										className={`bg-card border border-border px-3 py-1.5 rounded-full shadow-lg dark:bg-card/90 dark:border-border/80 whitespace-nowrap`}
									>
										<span className={'text-xs font-display font-medium text-blue-700 dark:text-blue-200'}>
											{skill.label}
										</span>
									</div>
								</motion.div>
							))}
						</div>

						<div className="hidden md:block">
							{skills.map((skill, index) => (
								<motion.div
									key={`desktop-${index}`}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.4,
										delay: 0.5 + skill.delay,
										type: 'spring',
										stiffness: 200,
									}}
									className="absolute"
									style={skill.desktopPosition}
								>
									<div
										className={`bg-white border border-border px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-card/90 dark:border-border/80 whitespace-nowrap`}
									>
										<span className={`text-sm font-display font-medium`}>{skill.label}</span>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.2 }}
						className="flex gap-4"
					>
						<a href="https://www.linkedin.com/in/roberto-serrano-diaz-grande" target="_blank" rel="noopener noreferrer">
							<Button size="lg" className="font-display font-semibold bg-primary hover:bg-primary/90">
								<Linkedin className="!size-5" />
								Contacto
							</Button>
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
