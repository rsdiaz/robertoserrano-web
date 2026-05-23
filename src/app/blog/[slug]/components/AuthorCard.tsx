import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import siteMetadata from '@/data/siteMetadata'

type Props = {
	author: string
}

export default function AuthorCard({ author }: Props) {
	return (
		<aside className="card-conic-border glass relative overflow-hidden rounded-2xl border border-border/60 p-6 sm:p-8 shadow-elegant">
			<div
				className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,_hsl(var(--accent)/0.18),_transparent_70%)]"
				aria-hidden="true"
			/>
			<div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
				<Image
					src="/static/profile2.png"
					width={80}
					height={80}
					alt={author}
					className="rounded-full ring-2 ring-accent/30 shadow-elegant"
				/>
				<div className="flex-1">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Escrito por</p>
					<h4 className="text-xl font-bold tracking-tight">{author}</h4>
					<p className="mt-2 text-sm text-muted-foreground leading-relaxed">{siteMetadata.profileDescription}</p>
					<div className="mt-4 flex flex-wrap items-center gap-2">
						<Button variant="default" size="sm" asChild>
							<Link href="/contacto">
								Contáctame
								<ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
							</Link>
						</Button>
						<Button variant="outline" size="icon" asChild aria-label="GitHub">
							<a href={siteMetadata.socialLinks.github} target="_blank" rel="noopener noreferrer">
								<Github className="h-4 w-4" />
							</a>
						</Button>
						<Button variant="outline" size="icon" asChild aria-label="LinkedIn">
							<a href={siteMetadata.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
								<Linkedin className="h-4 w-4" />
							</a>
						</Button>
						<Button variant="outline" size="icon" asChild aria-label="Twitter">
							<a href={siteMetadata.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
								<Twitter className="h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>
			</div>
		</aside>
	)
}
