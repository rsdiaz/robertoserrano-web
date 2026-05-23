'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type ContactGridProps = {
	form: ReactNode
	info: ReactNode
	social: ReactNode
	collaboration: ReactNode
}

export default function ContactGrid({ form, info, social, collaboration }: ContactGridProps) {
	const reduceMotion = useReducedMotion()
	const fadeUp = (delay: number) =>
		reduceMotion
			? {}
			: {
					initial: { opacity: 0, y: 22 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true, margin: '-80px' },
					transition: { duration: 0.55, delay, ease: 'easeOut' as const },
				}

	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
			<motion.div {...fadeUp(0.1)} className="lg:col-span-2">
				{form}
			</motion.div>

			<div className="space-y-6">
				<motion.div {...fadeUp(0.16)}>{info}</motion.div>
				<motion.div {...fadeUp(0.22)}>{social}</motion.div>
				<motion.div {...fadeUp(0.28)}>{collaboration}</motion.div>
			</div>
		</div>
	)
}
