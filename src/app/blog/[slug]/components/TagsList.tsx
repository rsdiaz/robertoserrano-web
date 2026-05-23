import Link from 'next/link'
import { Hash } from 'lucide-react'

type Props = {
	tags: string[]
}

export default function TagsList({ tags }: Props) {
	if (!tags?.length) return null

	return (
		<div className="mt-14 border-t border-border/60 pt-8">
			<h3 className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Etiquetas</h3>
			<div className="flex flex-wrap gap-2">
				{tags.map(tag => (
					<Link
						key={tag}
						href={`/blog?tag=${encodeURIComponent(tag)}`}
						className="group inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground transition-smooth hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
					>
						<Hash className="h-3 w-3 opacity-70 group-hover:opacity-100" aria-hidden="true" />
						{tag}
					</Link>
				))}
			</div>
		</div>
	)
}
