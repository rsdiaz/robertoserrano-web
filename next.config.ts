import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
}

const plugins = [withContentlayer, withBundleAnalyzer]
export default plugins.reduce((acc, next) => next(acc), nextConfig)
