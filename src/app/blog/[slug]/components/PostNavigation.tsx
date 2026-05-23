import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlogPost } from 'contentlayer/generated'

type Props = {
	prev: BlogPost | null
	next: BlogPost | null
}

export default function PostNavigation({ prev, next }: Props) {
	if (!prev && !next) return null

	return (
		<nav aria-label="Navegación entre artículos" className="mt-16 grid gap-4 sm:grid-cols-2">
			{prev ? (
				<Link
					href={`/blog/${prev.slug}`}
					className="card-conic-border group relative flex flex-col rounded-2xl border border-border/60 bg-card/40 p-5 transition-smooth hover:bg-card/70"
				>
					<span className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
						<ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
						Artículo anterior
					</span>
					<div className="flex items-center gap-3">
						{prev.image?.url && (
							<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
								<Image src={prev.image.url} alt="" fill sizes="56px" className="object-cover" aria-hidden="true" />
							</div>
						)}
						<h4 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-accent transition-smooth">
							{prev.title}
						</h4>
					</div>
				</Link>
			) : (
				<div aria-hidden="true" />
			)}
			{next ? (
				<Link
					href={`/blog/${next.slug}`}
					className="card-conic-border group relative flex flex-col items-end rounded-2xl border border-border/60 bg-card/40 p-5 text-right transition-smooth hover:bg-card/70"
				>
					<span className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
						Siguiente artículo
						<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
					</span>
					<div className="flex flex-row-reverse items-center gap-3">
						{next.image?.url && (
							<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
								<Image src={next.image.url} alt="" fill sizes="56px" className="object-cover" aria-hidden="true" />
							</div>
						)}
						<h4 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-accent transition-smooth">
							{next.title}
						</h4>
					</div>
				</Link>
			) : (
				<div aria-hidden="true" />
			)}
		</nav>
	)
}
