'use client'

import { motion, useReducedMotion } from 'motion/react'

const technologies = [
	{ name: 'OpenAI', description: 'GPT-4o, o1, Whisper' },
	{ name: 'LangChain', description: 'Orquestación LLM' },
	{ name: 'Vector DBs', description: 'Pinecone, Chroma' },
	{ name: 'RAG', description: 'Respuestas con contexto' },
	{ name: 'Whisper', description: 'Voz a texto' },
	{ name: 'Vision API', description: 'Análisis de imagen' },
	{ name: 'Agentes', description: 'Tareas autónomas' },
	{ name: 'HuggingFace', description: 'Modelos open-source' },
]

export default function AITechnologiesSection() {
	const reduceMotion = useReducedMotion()

	return (
		<section className="mt-24 border-t border-border/60 pt-16" aria-labelledby="ai-tech-heading">
			<div className="mx-auto max-w-3xl text-center">
				<h2 id="ai-tech-heading" className="text-3xl font-bold sm:text-4xl">
					Tecnologías <span className="text-gradient">que utilizo</span>
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					El ecosistema de IA es enorme. Estas son las piezas con las que trabajo a diario.
				</p>
			</div>

			<div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{technologies.map((tech, index) => (
					<motion.div
						key={tech.name}
						initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
					>
						<div className="steam-panel group flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
							<span className="text-base font-bold text-foreground transition-colors group-hover:text-accent">
								{tech.name}
							</span>
							<span className="mt-1 text-xs text-muted-foreground">{tech.description}</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
