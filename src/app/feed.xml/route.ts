import { allBlogPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

function escapeXml(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

export async function GET() {
	const published = allBlogPosts
		.filter(p => !p.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const siteUrl = siteMetadata.siteUrl
	const feedUpdated = published[0]?.date ?? new Date().toISOString()

	const items = published
		.map(post => {
			const url = `${siteUrl}/blog/${post.slug}`
			const date = new Date(post.date).toISOString()
			const author = post.author && post.author.trim() ? escapeXml(post.author) : 'Roberto Serrano Díaz-Grande'

			return `	<entry>
		<title>${escapeXml(post.title)}</title>
		<link href="${escapeXml(url)}"/>
		<id>${escapeXml(url)}</id>
		<published>${date}</published>
		<updated>${date}</updated>
		<author>
			<name>${author}</name>
		</author>
		<summary>${escapeXml(post.excerpt)}</summary>
		${post.category ? `<category term="${escapeXml(post.category)}"/>` : ''}
	</entry>`
		})
		.join('\n')

	const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${escapeXml(siteMetadata.title)}</title>
	<subtitle>${escapeXml(siteMetadata.description)}</subtitle>
	<link href="${escapeXml(siteUrl)}/feed.xml" rel="self"/>
	<link href="${escapeXml(siteUrl)}"/>
	<id>${escapeXml(siteUrl)}/</id>
	<updated>${feedUpdated}</updated>
	<author>
		<name>Roberto Serrano Díaz-Grande</name>
		<email>${escapeXml(siteMetadata.contactEmail)}</email>
	</author>
${items}
</feed>`

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
		},
	})
}
