import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		host: siteMetadata.siteUrl,
		sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
	}
}
