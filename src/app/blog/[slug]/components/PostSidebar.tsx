import ContactWithMe from '@/app/components/ContactWhitMe'
import { BlogPost } from 'contentlayer/generated'
import TableOfContents from './TableOfContents'

export default function PostSidebar({ post }: { post: BlogPost }) {
	return (
		<aside className="lg:h-full">
			<div className="space-y-6 lg:sticky lg:top-32">
				<TableOfContents toc={post.toc} />
				<ContactWithMe />
			</div>
		</aside>
	)
}
