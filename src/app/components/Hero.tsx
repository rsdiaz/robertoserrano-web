'use client'

import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Linkedin } from 'lucide-react'
import Image from 'next/image'

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
		mobilePosition: { bottom: '0%', right: '-8%' },
		desktopPosition: { bottom: '0%', right: '-24%' },
		delay: 0.7,
	},
]

export default function Hero() {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_oklch(0.45_0.15_285_/_0.05),transparent_50%)]" />

			<div className="container relative z-10 mt-16 mx-auto max-w-7xl px-4 md:px-6">
				<div className="flex flex-col items-center justify-center text-center">
					<motion.span
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="rounded-full bg-accent/10 px-3.5 py-1 text-sm font-semibold tracking-wider text-accent md:text-base"
					>
						Hello
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="mt-2 mb-12 text-2xl font-bold text-foreground md:text-6xl lg:text-7xl"
					>
						Soy Roberto Serrano
						<br />
						<span className="text-gradient text-xl font-light lg:text-5xl">Software Engineer</span>
					</motion.h1>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: 1,
							scale: 1,
							y: [0, -8, 0],
						}}
						transition={{
							opacity: { duration: 0.6, delay: 0.2 },
							scale: { duration: 0.6, delay: 0.2 },
							y: {
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							},
						}}
						className="relative mt-6 mb-16 h-[280px] w-[280px] md:h-[400px] md:w-[400px]"
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted via-card to-secondary/30 backdrop-blur-sm" />

						<div className="absolute inset-0 flex items-center justify-center">
							<motion.div
								animate={{
									scale: [1, 1.08, 1],
									opacity: [0.2, 0.38, 0.2],
								}}
								transition={{
									duration: 3.5,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className="absolute h-[210px] w-[210px] rounded-full bg-accent/20 blur-3xl md:h-[300px] md:w-[300px]"
							/>
						</div>

						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 30,
								repeat: Infinity,
								ease: 'linear',
							}}
							className="absolute inset-[7%] rounded-full border border-accent/15 border-dashed"
						/>

						<div className="absolute inset-0 flex items-center justify-center">
							<div className="relative flex h-[240px] w-[240px] items-center justify-center md:h-[340px] md:w-[340px]">
								<motion.div
									animate={{
										scale: [1, 1.04, 1],
										rotate: [0, 3, 0],
										borderRadius: [
											'42% 58% 55% 45% / 40% 42% 58% 60%',
											'58% 42% 48% 52% / 44% 58% 42% 56%',
											'42% 58% 55% 45% / 40% 42% 58% 60%',
										],
									}}
									transition={{
										duration: 8,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
									className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 blur-sm"
								/>

								<div className="absolute inset-6 rounded-full bg-accent/20 blur-2xl" />

								<div className="relative z-10 h-[210px] w-[210px] overflow-hidden rounded-full border-[3px] border-accent/20 shadow-2xl md:h-[290px] md:w-[290px]">
									<Image
										width={200}
										height={200}
										src="/static/profile.png"
										alt="Foto de perfil de Roberto Serrano"
										className="h-full w-full object-cover object-center grayscale contrast-110 brightness-105"
									/>
								</div>
							</div>
						</div>

						<div className="md:hidden">
							{skills.map((skill, index) => (
								<motion.div
									key={`mobile-${index}`}
									initial={{ opacity: 0, scale: 0 }}
									animate={{
										opacity: 1,
										scale: 1,
										y: [0, index % 2 === 0 ? -4 : 4, 0],
									}}
									transition={{
										opacity: {
											duration: 0.4,
											delay: 0.5 + skill.delay,
										},
										scale: {
											duration: 0.4,
											delay: 0.5 + skill.delay,
											type: 'spring',
											stiffness: 200,
										},
										y: {
											duration: 3 + index * 0.2,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: index * 0.12,
										},
									}}
									className="absolute"
									style={skill.mobilePosition}
								>
									<div className="whitespace-nowrap rounded-full border border-border/60 bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
										<span className="text-xs font-medium text-foreground/90">{skill.label}</span>
									</div>
								</motion.div>
							))}
						</div>

						<div className="hidden md:block">
							{skills.map((skill, index) => (
								<motion.div
									key={`desktop-${index}`}
									initial={{ opacity: 0, scale: 0 }}
									animate={{
										opacity: 1,
										scale: 1,
										y: [0, index % 2 === 0 ? -6 : 6, 0],
									}}
									transition={{
										opacity: {
											duration: 0.4,
											delay: 0.5 + skill.delay,
										},
										scale: {
											duration: 0.4,
											delay: 0.5 + skill.delay,
											type: 'spring',
											stiffness: 200,
										},
										y: {
											duration: 3.2 + index * 0.2,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: index * 0.15,
										},
									}}
									className="absolute"
									style={skill.desktopPosition}
								>
									<div className="whitespace-nowrap rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
										<span className="text-sm font-medium text-foreground/90">{skill.label}</span>
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
							<Button size="lg" className="font-semibold bg-primary hover:bg-primary/90">
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
