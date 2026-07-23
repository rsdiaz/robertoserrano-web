import { allBlogPosts } from 'contentlayer/generated'

function publishedPosts() {
	return allBlogPosts.filter(p => !p.draft)
}

export function getLatestPosts(limit?: number) {
	return publishedPosts()
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, limit ?? allBlogPosts.length)
}
