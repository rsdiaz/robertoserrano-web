'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export default function AboutCTA() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}
			className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/40 to-accent/5 p-10 sm:p-16"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--accent)/0.08),_transparent_60%)]"
				aria-hidden="true"
			/>

			<div className="relative max-w-2xl mx-auto text-center space-y-6">
				<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">¿Hablamos de tu proyecto?</h2>
				<p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
					Si buscas un perfil técnico con experiencia real construyendo software que escala, automatizando procesos o
					integrando IA en tu negocio, estaré encantado de escucharte.
				</p>
				<Link href="/contacto">
					<Button size="lg" className="font-semibold gap-2 shadow-elegant">
						Escríbeme <ArrowRight className="w-4 h-4" />
					</Button>
				</Link>
			</div>
		</motion.section>
	)
}
