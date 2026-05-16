import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteMetadata.title,
		short_name: siteMetadata.portfolioTitle,
		description: siteMetadata.description,
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
			},
		],
	}
}
