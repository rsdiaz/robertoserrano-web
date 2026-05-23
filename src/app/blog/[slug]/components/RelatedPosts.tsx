import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { BlogPost } from 'contentlayer/generated'
import { categoryPillClass, formatRelativeDate } from '@/app/lib/blog-format'

type Props = {
	posts: BlogPost[]
}

export default function RelatedPosts({ posts }: Props) {
	if (!posts.length) return null

	return (
		<section aria-labelledby="related-heading" className="mt-20">
			<div className="mb-6 flex items-end justify-between">
				<div>
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Más sobre el tema</p>
					<h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
						Artículos relacionados
					</h2>
				</div>
				<Link
					href="/blog"
					className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-smooth"
				>
					Ver todos
					<ArrowUpRight className="h-3.5 w-3.5" />
				</Link>
			</div>
			<div className="grid gap-5 md:grid-cols-3">
				{posts.map(post => {
					const cat = post.category && post.category.trim() ? post.category : 'General'
					return (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="card-conic-border group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-smooth hover:bg-card/70"
						>
							{post.image?.url && (
								<div className="relative aspect-[16/10] w-full overflow-hidden">
									<Image
										src={post.image.url}
										alt={post.image.alt ?? post.title}
										fill
										sizes="(min-width: 768px) 33vw, 100vw"
										className="image-tint object-cover transition-transform duration-500 group-hover:scale-[1.04]"
									/>
								</div>
							)}
							<div className="flex flex-1 flex-col gap-3 p-5">
								<span
									className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium capitalize ${categoryPillClass(cat)}`}
								>
									{cat}
								</span>
								<h3 className="text-base font-semibold leading-snug tracking-tight line-clamp-2 group-hover:text-accent transition-smooth">
									{post.title}
								</h3>
								<p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
								<div className="mt-auto flex items-center gap-3 text-[11px] text-muted-foreground">
									<span className="flex items-center gap-1">
										<Clock className="h-3 w-3" aria-hidden="true" />
										{post.readingTime.text}
									</span>
									<span aria-hidden="true">·</span>
									<time dateTime={post.date}>{formatRelativeDate(post.date)}</time>
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
