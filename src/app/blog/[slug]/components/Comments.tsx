import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Link, MessageCircle } from 'lucide-react'

export default function Comments() {
	return (
		<section className="mt-16 pt-8 border-t border-border">
			<div className="max-w-4xl">
				<h3 className="text-2xl font-bold mb-8 flex items-center">
					<MessageCircle className="h-6 w-6 mr-2" />
					Comentarios
				</h3>

				<Card className="shadow-elegant">
					<CardContent className="pt-6">
						<div className="text-center py-12">
							<MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<p className="text-muted-foreground mb-4">
								¿Qué te pareció este artículo? ¡Me encantaría conocer tu opinión!
							</p>
							<Button variant="outline" asChild>
								<Link href="/contact">Enviar comentario</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}
