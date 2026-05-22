import { MetadataRoute } from 'next'
import { allBlogPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const baseUrl = siteMetadata.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contacto`,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	]

	const postRoutes: MetadataRoute.Sitemap = allBlogPosts
		.filter(post => !('draft' in post) || post.draft !== true)
		.map(post => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		}))

	return [...staticRoutes, ...postRoutes]
}
