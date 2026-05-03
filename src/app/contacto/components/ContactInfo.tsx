import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Clock, MapPin } from 'lucide-react'

const contactInfo = [
	/* 	{
		icon: Mail,
		label: 'Email',
		value: 'roberto@serrano.dev',
		href: 'mailto:roberto@serrano.dev',
		description: 'Para consultas profesionales y colaboraciones',
	}, */
	{
		icon: MapPin,
		label: 'Ubicación',
		value: 'Tarragona, España',
		href: null,
		description: 'Disponible para trabajo remoto y presencial',
	},
	{
		icon: Clock,
		label: 'Horario',
		value: 'Lun - Vie, 8:00 - 20:00 CET',
		href: null,
		description: 'Respondo mensajes dentro de 24 horas',
	},
]

export default function ContactInfo() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
		>
			<Card className="border-border/60 bg-card/95 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
				<CardHeader>
					<CardTitle className="text-xl">Información de contacto</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{contactInfo.map((info, index) => (
						<div
							key={index}
							className="group rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/50"
						>
							<div className="flex items-start space-x-3">
								<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
									<info.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
								</div>
								<div className="flex-1">
									<div className="font-medium">{info.label}</div>
									{info.href ? (
										<a href={info.href} className="text-accent hover:underline transition-smooth">
											{info.value}
										</a>
									) : (
										<div className="text-foreground">{info.value}</div>
									)}
									<p className="text-sm text-muted-foreground">{info.description}</p>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</motion.div>
	)
}
