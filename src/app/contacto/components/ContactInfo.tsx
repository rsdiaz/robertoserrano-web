'use client'

import { motion } from 'motion/react'
import { Clock, Mail, MapPin } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'
import AvailabilityBadge from './AvailabilityBadge'

export default function ContactInfo() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
			className="steam-panel relative overflow-hidden rounded-2xl bg-card/95 p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
		>
			<h3 className="text-xl font-bold">Información de contacto</h3>

			<ul className="mt-5 space-y-4">
				<li className="group rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/40">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Mail
								className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110"
								aria-hidden="true"
							/>
						</div>
						<div className="flex-1">
							<div className="font-medium">Email</div>
							<a href={`mailto:${siteMetadata.contactEmail}`} className="text-accent transition-smooth hover:underline">
								{siteMetadata.contactEmail}
							</a>
							<p className="text-sm text-muted-foreground">Consultas profesionales y colaboraciones</p>
						</div>
					</div>
				</li>

				<li className="group rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/40">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<MapPin
								className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110"
								aria-hidden="true"
							/>
						</div>
						<div className="flex-1">
							<div className="font-medium">Ubicación</div>
							<div className="text-foreground">{siteMetadata.location}</div>
							<p className="text-sm text-muted-foreground">Trabajo remoto y presencial</p>
						</div>
					</div>
				</li>

				<li className="group rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-border/60 hover:bg-secondary/40">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
							<Clock
								className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110"
								aria-hidden="true"
							/>
						</div>
						<div className="flex-1">
							<div className="font-medium">Horario</div>
							<div className="text-foreground">Lun – Vie · 8:00 – 20:00 CET</div>
							<div className="mt-1">
								<AvailabilityBadge />
							</div>
						</div>
					</div>
				</li>
			</ul>
		</motion.div>
	)
}
