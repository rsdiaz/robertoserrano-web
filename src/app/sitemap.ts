import { MetadataRoute } from 'next'
import { allBlogPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const baseUrl = siteMetadata.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contacto`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	]

	const postRoutes: MetadataRoute.Sitemap = allBlogPosts
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.filter(post => (post as any).draft !== true)
		.map(post => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		}))

	return [...staticRoutes, ...postRoutes]
}
