import { allBlogPosts } from 'contentlayer/generated'

export function getLatestPosts(limit?: number) {
	return allBlogPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, limit ?? allBlogPosts.length)
}
