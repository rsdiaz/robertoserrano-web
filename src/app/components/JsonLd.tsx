import siteMetadata from '@/data/siteMetadata'

export function PersonJsonLd() {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Roberto Serrano Díaz-Grande',
		givenName: 'Roberto',
		familyName: 'Serrano Díaz-Grande',
		jobTitle: 'Software Engineer',
		description: siteMetadata.profileDescription,
		url: siteMetadata.siteUrl,
		sameAs: [siteMetadata.socialLinks.github, siteMetadata.socialLinks.linkedin, siteMetadata.socialLinks.twitter],
		image: `${siteMetadata.siteUrl}/static/profile.png`,
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebSiteJsonLd() {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteMetadata.title,
		url: siteMetadata.siteUrl,
		description: siteMetadata.description,
		inLanguage: 'es',
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ArticleJsonLd({
	title,
	description,
	image,
	datePublished,
	url,
}: {
	title: string
	description: string
	image?: string
	datePublished: string
	url: string
}) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		...(image && { image }),
		datePublished,
		author: {
			'@type': 'Person',
			name: 'Roberto Serrano Díaz-Grande',
		},
		publisher: {
			'@type': 'Person',
			name: 'Roberto Serrano Díaz-Grande',
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ContactPageJsonLd({ url, email }: { url: string; email: string }) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		url,
		name: 'Contacto · Roberto Serrano',
		description: 'Contacta con Roberto Serrano para proyectos, consultoría, desarrollo o mentoría.',
		mainEntity: {
			'@type': 'Person',
			name: 'Roberto Serrano Díaz-Grande',
			email,
			url: siteMetadata.siteUrl,
		},
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map(({ question, answer }) => ({
			'@type': 'Question',
			name: question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: answer,
			},
		})),
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbListJsonLd({ items }: { items: { name: string; item: string }[] }) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.item,
		})),
	}

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
