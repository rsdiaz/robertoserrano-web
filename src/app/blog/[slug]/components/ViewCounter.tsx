'use client'

import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

type ViewCounterProps = {
	slug: string
	initialViews: number
}

export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
	const [views, setViews] = useState(initialViews)

	useEffect(() => {
		const key = `post-viewed:${slug}`
		const alreadyCounted = sessionStorage.getItem(key)

		if (alreadyCounted) {
			return
		}

		sessionStorage.setItem(key, '1')

		const incrementView = async () => {
			try {
				const res = await fetch(`/api/views/${slug}`, {
					method: 'POST',
					cache: 'no-store',
				})

				if (!res.ok) return

				const data = (await res.json()) as { views?: number }
				if (typeof data.views === 'number') {
					setViews(data.views)
				}
			} catch {
				// Ignore transient tracking failures.
			}
		}

		void incrementView()
	}, [slug])

	return (
		<span className="flex items-center">
			<Eye className="h-4 w-4 mr-1" />
			{views.toLocaleString('es-ES')} visualizaciones
		</span>
	)
}
