import type { Metadata } from 'next'
import './css/globals.css'
import Footer from './components/Footer'
import { ThemeProvider } from 'next-themes'
import Header from './components/Header'
import siteMetadata from '@/data/siteMetadata'
// import { Toast } from '@radix-ui/react-toast'
import { Toaster } from './components/ui/toaster'

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.siteUrl),
	title: {
		default: siteMetadata.title,
		template: '%s | Roberto Serrrano Díaz-Grande',
	},
	description: siteMetadata.description,
	openGraph: {
		type: 'website',
		url: siteMetadata.siteUrl,
		siteName: siteMetadata.title,
		images: ['/static/opengraph-image.png'],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@tuusuario',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class">
					<Toaster />
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
