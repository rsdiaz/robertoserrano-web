import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
	title: string
	description?: string
	image?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export function generatedPageMetadata({ title, description }: PageSEOProps): Metadata {
	return {
		title,
		description: description || siteMetadata.description,
	}
}
