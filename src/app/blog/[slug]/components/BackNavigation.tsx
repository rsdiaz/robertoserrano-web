import { Button } from '@/app/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BackNavigation() {
	return (
		<div className="mb-8">
			<Button variant="ghost" asChild className="hover:bg-muted">
				<Link href="/blog" className="flex items-center">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Volver al blog
				</Link>
			</Button>
		</div>
	)
}
