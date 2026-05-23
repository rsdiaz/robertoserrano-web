'use client'

import { motion } from 'motion/react'
import { FileText, FolderOpen, Sparkles } from 'lucide-react'
import BlobsEffect from '@/app/components/BlobsEffect'

type BlogHeaderProps = {
	totalPosts: number
	totalCategories: number
	latestDate?: string | null
}

export default function BlogHeader({ totalPosts, totalCategories, latestDate }: BlogHeaderProps) {
	const latest = latestDate
		? new Date(latestDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
		: null

	return (
		<section className="relative">
			<BlobsEffect />
			<div className="relative z-10 mx-auto max-w-4xl text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: 'easeOut' }}
					className="mb-12 text-center"
				>
					<motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<span className="steam-label">Bienvenido</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
						className="mt-16 mb-6 text-4xl font-bold sm:text-5xl"
					>
						Mi <span className="text-gradient">Blog</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
						className="mx-auto max-w-3xl text-xl text-muted-foreground"
					>
						Mi rincón digital para hablar de lo que me mueve: software, innovación y cómo escribir mejor código (sin
						perder la cabeza en el intento).
					</motion.p>

					{/* Stat row */}
					<motion.dl
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
						className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
					>
						<div className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
							<FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
							<dt className="sr-only">Artículos publicados</dt>
							<dd>
								<span className="font-semibold text-foreground">{totalPosts}</span>{' '}
								<span className="font-semibold text-muted-foreground">artículos</span>
							</dd>
						</div>
						<div className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
							<FolderOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
							<dt className="sr-only">Categorías</dt>
							<dd>
								<span className="font-semibold text-foreground">{totalCategories}</span>{' '}
								<span className="font-semibold text-muted-foreground">categorías</span>
							</dd>
						</div>
						{latest && (
							<div className="steam-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
								<Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
								<dt className="sr-only">Última publicación</dt>
								<dd>
									<span className="font-semibold text-muted-foreground">último:</span>{' '}
									<span className="font-semibold text-foreground">{latest}</span>
								</dd>
							</div>
						)}
					</motion.dl>
				</motion.div>
			</div>
		</section>
	)
}
