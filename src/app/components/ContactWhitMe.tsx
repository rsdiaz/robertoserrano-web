'use client'

import { motion } from 'motion/react'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

export default function ContactWithMe() {
	const socialLinks = [
		{
			icon: Github,
			name: 'GitHub',
			href: siteMetadata.socialLinks.github,
			description: 'Código abierto y proyectos',
		},
		{
			icon: Linkedin,
			name: 'LinkedIn',
			href: siteMetadata.socialLinks.linkedin,
			description: 'Perfil profesional y network',
		},
		{
			icon: Twitter,
			name: 'Twitter / X',
			href: siteMetadata.socialLinks.twitter,
			description: 'Pensamientos varios',
		},
	]

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
			className="steam-panel relative overflow-hidden rounded-2xl bg-card/95 p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
		>
			<h3 className="text-xl font-bold">Conecta conmigo</h3>
			<p className="mt-1 text-sm text-muted-foreground">Sígueme en redes para más contenido y actualizaciones.</p>

			<ul className="mt-5 space-y-2.5">
				{socialLinks.map(social => (
					<li key={social.name}>
						<Link
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-3 transition-smooth hover:border-accent/30 hover:shadow-glow"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
								<social.icon
									className="h-5 w-5 text-primary transition-smooth group-hover:text-accent"
									aria-hidden="true"
								/>
							</div>
							<div className="flex-1">
								<div className="font-medium transition-smooth group-hover:text-accent">{social.name}</div>
								<p className="text-sm text-muted-foreground">{social.description}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</motion.div>
	)
}
