'use client'

import { motion } from 'motion/react'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'

export default function ContactWithMe() {
	const socialLinks = [
		{
			icon: Github,
			name: 'GitHub',
			href: 'https://github.com/rsdiaz',
			description: 'Código abierto y proyectos',
		},
		{
			icon: Linkedin,
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/roberto-serrano-diaz-grande',
			description: 'Perfil profesional y network',
		},
		{
			icon: Twitter,
			name: 'Twitter',
			href: 'https://twitter.com/RovBeat',
			description: 'Pensamientos varios',
		},
	]
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
		>
			<Card className="border-border/60 bg-card/95 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
				<CardHeader>
					<CardTitle className="text-xl">Conecta conmigo</CardTitle>
					<CardDescription>Sígueme en redes sociales para más contenido y actualizaciones</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					{socialLinks.map((social, index) => (
						<Link
							key={index}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center space-x-3 rounded-xl border border-border/70 bg-background/70 p-3 transition-smooth hover:border-accent/30 hover:shadow-glow"
						>
							<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<social.icon className="h-5 w-5 text-primary group-hover:text-accent transition-smooth" />
							</div>
							<div className="flex-1">
								<div className="font-medium group-hover:text-accent transition-smooth">{social.name}</div>
								<p className="text-sm text-muted-foreground">{social.description}</p>
							</div>
						</Link>
					))}
				</CardContent>
			</Card>
		</motion.div>
	)
}
