'use client'

import { useEffect, useState } from 'react'
import { Heart, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { SharePost } from './SharePost'
import { useToast } from '@/app/hooks/use-toast'

type Props = {
	slug: string
	title: string
	baseUrl: string
	initialLikes: number
}

const MAX_PER_USER = 10

export default function PostActions({ slug, title, baseUrl, initialLikes }: Props) {
	const [likes, setLikes] = useState(initialLikes)
	const [userLikes, setUserLikes] = useState(0)
	const [bookmarked, setBookmarked] = useState(false)
	const [pulse, setPulse] = useState(false)
	const { toast } = useToast()

	// Hydrate per-slug state from localStorage
	useEffect(() => {
		try {
			const raw = localStorage.getItem(`post:likes:${slug}`)
			if (raw) {
				const parsed = parseInt(raw, 10)
				if (!Number.isNaN(parsed)) setUserLikes(Math.min(MAX_PER_USER, Math.max(0, parsed)))
			}
			const bk = localStorage.getItem(`post:bookmark:${slug}`)
			setBookmarked(bk === '1')
		} catch {
			// ignore
		}
	}, [slug])

	const handleLike = async () => {
		if (userLikes >= MAX_PER_USER) {
			toast({ title: 'Máximo alcanzado', description: `Solo puedes dar ${MAX_PER_USER} likes por artículo.` })
			return
		}
		const next = userLikes + 1
		setUserLikes(next)
		setLikes(l => l + 1)
		setPulse(true)
		setTimeout(() => setPulse(false), 350)
		try {
			localStorage.setItem(`post:likes:${slug}`, String(next))
		} catch {
			// ignore
		}
		try {
			const res = await fetch(`/api/likes/${slug}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ delta: 1 }),
				cache: 'no-store',
			})
			if (res.ok) {
				const data = (await res.json()) as { likes?: number }
				if (typeof data.likes === 'number') setLikes(data.likes)
			}
		} catch {
			// rollback silently? keep optimistic
		}
	}

	const handleBookmark = () => {
		const next = !bookmarked
		setBookmarked(next)
		try {
			if (next) {
				localStorage.setItem(`post:bookmark:${slug}`, '1')
				localStorage.setItem(`post:bookmark:${slug}:title`, title)
				localStorage.setItem(`post:bookmark:${slug}:at`, new Date().toISOString())
				toast({ title: 'Guardado', description: 'Añadido a tus marcadores locales.' })
			} else {
				localStorage.removeItem(`post:bookmark:${slug}`)
				localStorage.removeItem(`post:bookmark:${slug}:title`)
				localStorage.removeItem(`post:bookmark:${slug}:at`)
				toast({ title: 'Eliminado', description: 'Quitado de tus marcadores.' })
			}
		} catch {
			// ignore
		}
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Button
				variant="outline"
				size="sm"
				onClick={handleLike}
				aria-label={`Me gusta. ${likes} likes en total`}
				aria-pressed={userLikes > 0}
				className={`group ${userLikes > 0 ? 'border-accent/50 text-accent' : ''}`}
			>
				<Heart
					className={`h-4 w-4 mr-2 transition-transform ${pulse ? 'scale-125' : ''} ${
						userLikes > 0 ? 'fill-current' : ''
					}`}
					aria-hidden="true"
				/>
				<span className="tabular-nums">{likes}</span>
			</Button>

			<Button
				variant="outline"
				size="sm"
				onClick={handleBookmark}
				aria-label={bookmarked ? 'Quitar de marcadores' : 'Guardar artículo'}
				aria-pressed={bookmarked}
				className={bookmarked ? 'border-accent/50 text-accent' : ''}
			>
				{bookmarked ? (
					<BookmarkCheck className="h-4 w-4 mr-2 fill-current" aria-hidden="true" />
				) : (
					<Bookmark className="h-4 w-4 mr-2" aria-hidden="true" />
				)}
				{bookmarked ? 'Guardado' : 'Guardar'}
			</Button>

			<SharePost title={title} slug={slug} baseUrl={baseUrl} />
		</div>
	)
}
