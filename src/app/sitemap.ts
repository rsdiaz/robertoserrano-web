import { MetadataRoute } from 'next'
import { allBlogPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const baseUrl = siteMetadata.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: now,
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contacto`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/sobre-mi`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/consultoria-ia`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/desarrollo-web`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/automatizaciones-para-empresas`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/feed.xml`,
			lastModified: now,
			changeFrequency: 'daily',
			priority: 0.5,
		},
	]

	const postRoutes: MetadataRoute.Sitemap = allBlogPosts
		.filter(post => !post.draft)
		.map(post => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		}))

	return [...staticRoutes, ...postRoutes]
}
