'use client'

import { motion } from 'motion/react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Code2, Zap, Users, ArrowRight, ExternalLink, Github, Clock } from 'lucide-react'
import Link from 'next/link'
import Hero from './components/Hero'
import { getLatestPosts } from '@/app/lib/blog-posts'
import { allProjects } from 'contentlayer/generated'
import Image from 'next/image'

const features = [
	{
		icon: Code2,
		title: 'Full-Stack Moderno',
		description: 'De frontend a backend: construyo soluciones completas.',
	},
	{
		icon: Zap,
		title: 'Alto Rendimiento',
		description:
			'Código optimizado y escalable. Desde arquitectura hasta deployment en Docker, todo pensado para producción.',
	},
	{
		icon: Users,
		title: '+15 Años de Experiencia',
		description:
			'Soluciones validadas por el tiempo. No experimento con tu inversión; entrego productos que funcionan, miden y crecen.',
	},
]

export default function Home() {
	const recentPosts = getLatestPosts(4)
	const featuredProjects = allProjects.slice(0, 4)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<Hero />

			{/* Features Section */}
			{/* 			<section className="py-24 bg-muted/30 border-t border-b border-border">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Por qué confiarme tu próximo gran proyecto?</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							No solo escribo líneas de código; diseño activos digitales que impulsan tu negocio, escalan sin fricciones
							y entregan valor desde el primer día.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<motion.div
									key={index}
									whileHover={{ y: -8 }}
									transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
								>
									<Card className="h-full border border-border/30 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
										<CardHeader className="pb-3">
											<div className="flex items-center gap-4">
												<motion.div
													whileHover={{ rotate: 12, scale: 1.1 }}
													className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center"
												>
													<Icon className="w-6 h-6 text-accent" />
												</motion.div>
												<CardTitle className="text-lg">{feature.title}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
										</CardContent>
									</Card>
								</motion.div>
							)
						})}
					</div>
				</div>
			</section> */}

			{/* Last Posts Section */}
			<section className="py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="flex items-center justify-between mb-12"
					>
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold">Últimos Artículos</h2>
							<p className="text-muted-foreground mt-2">Aprende sobre desarrollo web, DevOps y tecnologías modernas</p>
						</div>
						<Link href="/blog">
							<Button variant="outline" className="gap-2 hidden sm:flex">
								Ver todos <ArrowRight className="w-4 h-4" />
							</Button>
						</Link>
					</motion.div>

					{recentPosts.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{recentPosts.map((post, index) => (
								<motion.div
									key={post.slug}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									whileHover={{ y: -8 }}
									transition={{
										default: { duration: 0.3, type: 'spring', stiffness: 200 },
										opacity: { duration: 0.6, delay: index * 0.1 },
									}}
									viewport={{ once: true }}
								>
									<Link href={`/blog/${post.slug}`}>
										<Card className="group h-full border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
											<div className="flex h-full">
												{/* Imagen */}
												<div className="relative w-2/5 flex-shrink-0 overflow-hidden">
													{post.image?.url ? (
														<Image
															src={post.image.url}
															alt={post.image.alt ?? post.title}
															fill
															className="object-cover group-hover:scale-105 transition-transform duration-500"
														/>
													) : (
														<div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-muted flex items-center justify-center">
															<Code2 className="w-10 h-10 text-accent/40" />
														</div>
													)}
													{/* Category badge */}
													{post.category && (
														<span className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border/50">
															{post.category}
														</span>
													)}
												</div>

												{/* Contenido */}
												<div className="flex flex-col justify-between p-5 w-3/5">
													<div className="space-y-3">
														{/* Meta */}
														<div className="flex items-center gap-3 text-xs text-muted-foreground">
															<span>
																{new Date(post.date).toLocaleDateString('es-ES', {
																	year: 'numeric',
																	month: 'long',
																	day: 'numeric',
																})}
															</span>
															{post.readingTime?.text && (
																<>
																	<span>·</span>
																	<span className="flex items-center gap-1">
																		<Clock className="w-3 h-3" />
																		{post.readingTime.text}
																	</span>
																</>
															)}
														</div>

														{/* Título */}
														<h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
															{post.title}
														</h3>

														{/* Excerpt */}
														<p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
													</div>

													{/* Read more */}
													<div className="mt-4 flex items-center gap-1.5 text-accent text-sm font-medium">
														Leer artículo
														<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
													</div>
												</div>
											</div>
										</Card>
									</Link>
								</motion.div>
							))}
						</div>
					) : (
						<Card className="border-border/50">
							<CardContent className="pt-6">
								<p className="text-muted-foreground text-center">
									Próximamente: artículos sobre desarrollo web, DevOps y tecnologías modernas.
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</section>

			{/* Featured Projects Section */}
			{/* <section className="py-24 bg-muted/30 border-t border-b border-border">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="flex items-center justify-between mb-12"
					>
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold">Proyectos Destacados</h2>
							<p className="text-muted-foreground mt-2">Casos reales donde he aplicado mi expertise</p>
						</div>
					</motion.div>

					{featuredProjects.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{featuredProjects.map((project, index) => (
								<motion.div
									key={project._id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<Card className="h-full border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col">
										<CardHeader>
											<CardTitle className="text-xl">{project.title}</CardTitle>
											<CardDescription>{project.description}</CardDescription>
										</CardHeader>
										<CardContent className="flex-1">
											<div className="flex flex-wrap gap-2 mb-4">
												{project.tech?.map(tech => (
													<Badge key={tech} variant="outline">
														{tech}
													</Badge>
												))}
											</div>
											<p className="text-sm text-muted-foreground">{project.description}</p>
										</CardContent>
										<CardContent className="pt-0 flex gap-2">
											{project.projectUrl && (
												<a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
													<Button size="sm" variant="outline" className="gap-2">
														Ver <ExternalLink className="w-3.5 h-3.5" />
													</Button>
												</a>
											)}
											{project.repoUrl && (
												<a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
													<Button size="sm" variant="outline" className="gap-2">
														Código <Github className="w-3.5 h-3.5" />
													</Button>
												</a>
											)}
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					) : (
						<Card className="border-border/50">
							<CardContent className="pt-6">
								<p className="text-muted-foreground text-center">
									Proyectos en construcción. Pronto verás casos reales aquí.
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</section> */}

			{/* CTA Section */}
			<section className="py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center max-w-2xl mx-auto"
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Listo para trabajar juntos?</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Tengo experiencia resolviendo retos reales. Cuéntame tu idea y exploraremos cómo puedo ayudarte a llevarla
							a producción.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/contacto">
								<Button size="lg" className="font-semibold bg-primary hover:bg-primary/90 gap-2">
									Iniciar conversación <ArrowRight className="w-4 h-4" />
								</Button>
							</Link>
							<a
								href="https://www.linkedin.com/in/roberto-serrano-diaz-grande"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button size="lg" variant="outline">
									LinkedIn
								</Button>
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
