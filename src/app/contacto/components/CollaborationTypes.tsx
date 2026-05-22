import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Calendar, Coffee, MessageCircle } from 'lucide-react'

const collaborationTypes = [
	{
		icon: Coffee,
		title: 'Consultoría',
		description: 'Asesoramiento técnico y revisión de arquitectura para tu proyecto.',
	},
	{
		icon: MessageCircle,
		title: 'Desarrollo',
		description: 'Desarrollo full-stack de aplicaciones web y móviles desde cero.',
	},
	{
		icon: Calendar,
		title: 'Mentoría',
		description: 'Sesiones de mentoría para desarrolladores junior y mid-level.',
	},
]

export default function CollaborationTypes() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
		>
			<Card className="border-border/60 bg-card/95 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
				<CardHeader>
					<CardTitle className="text-xl">Tipos de colaboración</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{collaborationTypes.map((type, index) => (
						<div
							key={index}
							className="group rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/50"
						>
							<div className="flex items-start space-x-3">
								<div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
									<type.icon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" />
								</div>
								<div className="flex-1">
									<div className="font-medium text-sm">{type.title}</div>
									<p className="text-sm text-muted-foreground">{type.description}</p>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</motion.div>
	)
}
