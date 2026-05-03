'use client'

import { motion } from 'motion/react'

export default function BlogHeader() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			className="mb-12 text-center"
		>
			<motion.span
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
				className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-3.5 py-1 text-sm font-semibold tracking-wide text-accent"
			>
				Artículos
			</motion.span>

			<motion.h1
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
				className="mt-4 mb-6 text-4xl font-bold sm:text-5xl"
			>
				Mi <span className="text-gradient">Blog</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
				className="mx-auto max-w-3xl text-xl text-muted-foreground"
			>
				Mi rincón digital para hablar de lo que me mueve: software, innovación y cómo escribir mejor código (sin perder
				la cabeza en el intento).
			</motion.p>
		</motion.div>
	)
}
