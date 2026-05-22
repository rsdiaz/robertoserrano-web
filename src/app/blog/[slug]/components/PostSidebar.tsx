import ContactWithMe from '@/app/components/ContactWhitMe'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { BlogPost } from 'contentlayer/generated'

type TocItem = {
	value: string
	url: string
	depth: number
}

export default function PostSidebar({ post }: { post: BlogPost }) {
	return (
		<aside className="lg:col-span-1">
			<div className="sticky top-32 space-y-8">
				{/* Table of Contents */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Contenido</CardTitle>
					</CardHeader>
					<CardContent>
						<nav className="space-y-2 text-sm">
							{post.toc
								.filter((item: TocItem) => item.depth === 2)
								.map((item: TocItem, index: number) => (
									<a
										key={index}
										href={item.url}
										className="block text-muted-foreground hover:text-accent transition-smooth"
									>
										{item.value}
									</a>
								))}
						</nav>
					</CardContent>
				</Card>
				<ContactWithMe />

				{/* Related Posts */}
				{/* {relatedPosts.length > 0 && (
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="text-lg">Artículos relacionados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <div key={relatedPost.id} className="group">
                          <Link
                            to={`/blog/${relatedPost.slug}`}
                            className="block hover:bg-muted/50 p-3 rounded-lg transition-smooth"
                          >
                            <h4 className="font-medium text-sm group-hover:text-accent transition-smooth line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {relatedPost.readTime}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )} */}

				{/* Newsletter */}
				{/* <Card className="shadow-elegant">
					<CardHeader>
						<CardTitle className="text-lg">Newsletter</CardTitle>
						<CardDescription>Recibe los últimos artículos en tu email</CardDescription>
					</CardHeader>
					<CardContent>
						<Button className="w-full" size="sm">
							Suscribirse
						</Button>
					</CardContent>
				</Card> */}
			</div>
		</aside>
	)
}
