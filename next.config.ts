import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	async redirects() {
		return [
			{
				source: '/:path*{/}',
				has: [
					{
						type: 'host',
						value: 'www.robertoserrano.pro',
					},
				],
				destination: 'https://robertoserrano.pro/:path*',
				permanent: true,
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
}

export default withBundleAnalyzer(nextConfig)
