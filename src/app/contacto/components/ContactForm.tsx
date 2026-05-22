'use client'

import { motion } from 'motion/react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { useToast } from '@/app/hooks/use-toast'
import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
	const { toast } = useToast()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		website: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const result = (await res.json()) as { ok: boolean; message?: string }

			if (!res.ok || !result.ok) {
				throw new Error(result.message || 'No se pudo enviar el mensaje.')
			}

			toast({
				title: '¡Mensaje enviado!',
				description: 'Gracias por contactarme. Te responderé pronto.',
			})

			setFormData({ name: '', email: '', subject: '', message: '', website: '' })
		} catch (error) {
			const description = error instanceof Error ? error.message : 'Hubo un problema enviando el formulario.'

			toast({
				title: 'No se pudo enviar',
				description,
				variant: 'destructive',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
		>
			<Card className="group relative overflow-hidden border-border/60 bg-card/95 shadow-elegant backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--accent)/0.12),_transparent_40%)]" />
				<CardHeader>
					<CardTitle className="flex items-center text-2xl">
						<Send className="h-6 w-6 mr-2 text-primary" />
						Envíame un mensaje
					</CardTitle>
					<CardDescription className="text-base">
						Cuéntame sobre tu proyecto, idea o consulta. Me pondré en contacto contigo pronto.
					</CardDescription>
				</CardHeader>
				<CardContent className="relative">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="hidden" aria-hidden="true">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									name="website"
									value={formData.website}
									onChange={handleChange}
									tabIndex={-1}
									autoComplete="off"
								/>
							</div>

							<div className="flex flex-col space-y-2">
								<Label htmlFor="name">Nombre completo</Label>
								<Input
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Tu nombre"
									required
								/>
							</div>
							<div className="flex flex-col space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="tu@email.com"
									required
								/>
							</div>
						</div>

						<div className="flex flex-col space-y-2">
							<Label htmlFor="subject">Asunto</Label>
							<Input
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								placeholder="¿En qué puedo ayudarte?"
								required
							/>
						</div>

						<div className="flex flex-col space-y-2">
							<Label htmlFor="message">Mensaje</Label>
							<Textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Describe tu proyecto, idea o consulta con el mayor detalle posible..."
								rows={6}
								required
							/>
						</div>

						<Button type="submit" size="lg" className="w-full shadow-glow" disabled={isSubmitting}>
							{isSubmitting ? (
								'Enviando...'
							) : (
								<>
									<Send className="h-4 w-4 mr-2" />
									Enviar mensaje
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</motion.div>
	)
}
