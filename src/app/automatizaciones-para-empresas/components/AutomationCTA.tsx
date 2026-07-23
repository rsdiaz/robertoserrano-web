'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

export default function AutomationCTA() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16">
			<motion.div
				initial={reduceMotion ? false : { opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-80px' }}
				transition={{ duration: 0.55, ease: 'easeOut' }}
				className="mx-auto max-w-3xl text-center"
			>
				<div className="steam-panel-strong rounded-3xl p-8 sm:p-12">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
						<Sparkles className="h-7 w-7 text-accent" aria-hidden="true" />
					</div>
					<h2 className="mt-6 text-2xl font-bold sm:text-3xl">
						Empieza a <span className="text-gradient">automatizar</span> hoy
					</h2>
					<p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
						La primera consulta es gratuita. Analizo tu caso, te propongo una solución y te doy una estimación sin
						compromiso.
					</p>
					<Button asChild size="lg" className="mt-8 shadow-glow">
						<Link href="/contacto">
							Háblame de tu proyecto
							<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
						</Link>
					</Button>
				</div>
			</motion.div>
		</section>
	)
}
