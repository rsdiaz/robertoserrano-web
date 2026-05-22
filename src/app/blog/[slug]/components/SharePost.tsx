'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Share2, Copy, Check, Twitter, Linkedin, Facebook } from 'lucide-react'
import { useToast } from '@/app/hooks/use-toast'

interface SharePostProps {
	title: string
	slug: string
	baseUrl: string
}

export function SharePost({ title, slug, baseUrl }: SharePostProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const { toast } = useToast()

	const postUrl = `${baseUrl}/blog/${slug}`
	const shareText = `Mira este artículo: "${title}"`

	const handleWebShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					text: shareText,
					url: postUrl,
				})
				setIsOpen(false)
			} catch (error) {
				if ((error as Error).name !== 'AbortError') {
					console.error('Error sharing:', error)
				}
			}
		} else {
			handleCopyUrl()
		}
	}

	const handleCopyUrl = () => {
		navigator.clipboard.writeText(postUrl)
		setCopied(true)
		toast({
			title: 'Enlace copiado',
			description: 'La URL del artículo ha sido copiada al portapapeles',
		})
		setTimeout(() => setCopied(false), 2000)
		setIsOpen(false)
	}

	const shareOptions = [
		{
			name: 'Compartir',
			icon: Share2,
			action: handleWebShare,
			className: 'hover:bg-primary/10',
		},
		{
			name: 'Twitter',
			icon: Twitter,
			action: () => {
				const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`
				window.open(url, '_blank', 'width=550,height=420')
				setIsOpen(false)
			},
			className: 'hover:bg-blue-500/10',
		},
		{
			name: 'LinkedIn',
			icon: Linkedin,
			action: () => {
				const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
				window.open(url, '_blank', 'width=550,height=420')
				setIsOpen(false)
			},
			className: 'hover:bg-blue-600/10',
		},
		{
			name: 'Facebook',
			icon: Facebook,
			action: () => {
				const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
				window.open(url, '_blank', 'width=550,height=420')
				setIsOpen(false)
			},
			className: 'hover:bg-blue-400/10',
		},
		{
			name: 'Copiar enlace',
			icon: copied ? Check : Copy,
			action: handleCopyUrl,
			className: 'hover:bg-green-500/10',
		},
	]

	return (
		<div className="relative">
			<Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
				<Share2 className="h-4 w-4" />
				<span>Compartir</span>
			</Button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
						{shareOptions.map(option => {
							const Icon = option.icon
							return (
								<button
									key={option.name}
									onClick={option.action}
									className={`w-full px-4 py-2 flex items-center space-x-2 text-sm transition-colors ${option.className}`}
								>
									<Icon className="h-4 w-4" />
									<span>{option.name}</span>
								</button>
							)
						})}
					</div>
				</>
			)}
		</div>
	)
}
