'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { Github, Linkedin, Twitter, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import siteMetadata from '@/data/siteMetadata'

export default function AboutHero() {
	return (
		<section className="mb-20">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="grid gap-12 items-center lg:grid-cols-[auto_1fr]"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mx-auto lg:mx-0"
				>
					<div className="steam-frame relative overflow-hidden rounded-[28px] p-4">
						<div className="absolute inset-0 steam-noise" />
						<div className="relative overflow-hidden rounded-[22px] border border-border/60">
							<Image
								width={320}
								height={380}
								src="/static/profile2.webp"
								alt="Roberto Serrano Díaz-Grande"
								className="h-[380px] w-[320px] object-cover object-center grayscale contrast-110"
								priority
							/>
						</div>
					</div>
				</motion.div>

				<div className="space-y-6">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
					>
						<span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
							Sobre mí
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
					>
						<span className="text-gradient">Roberto Serrano</span> Díaz-Grande
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.25 }}
						className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
					>
						{siteMetadata.profileDescription}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
					>
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="w-4 h-4 text-accent" />
							{siteMetadata.location}
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Calendar className="w-4 h-4 text-accent" />
							Más de 15 años de experiencia
						</span>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.35 }}
						className="flex flex-wrap gap-3"
					>
						<Button asChild variant="outline" size="sm" className="gap-2">
							<a href={siteMetadata.socialLinks.github} target="_blank" rel="noopener noreferrer">
								<Github className="w-4 h-4" /> GitHub
							</a>
						</Button>
						<Button asChild variant="outline" size="sm" className="gap-2">
							<a href={siteMetadata.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
								<Linkedin className="w-4 h-4" /> LinkedIn
							</a>
						</Button>
						<Button asChild variant="outline" size="sm" className="gap-2">
							<a href={siteMetadata.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
								<Twitter className="w-4 h-4" /> Twitter
							</a>
						</Button>
					</motion.div>
				</div>
			</motion.div>
		</section>
	)
}
