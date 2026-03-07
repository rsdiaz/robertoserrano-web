import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react'
import { Button } from './ui/button'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	const socialLinks = [
		{ icon: Github, href: 'https://github.com/rsdiaz', label: 'GitHub' },
		{ icon: Linkedin, href: 'https://linkedin.com/in/roberto-serrano', label: 'LinkedIn' },
		{ icon: Twitter, href: 'https://twitter.com/roberto_dev', label: 'Twitter' },
		{ icon: Mail, href: 'mailto:roberto@serrano.dev', label: 'Email' },
	]

	const footerPhrases = [
		'Entre bugs, deploys y buenas ideas: aquí sigo creando. ⚡',
		'Compilando ideas, debuggeando el mundo, happy hacking. 🚀',
		'Code, coffee & creatividad: mi stack esencial. ☕💻',
		'Entre commits y café, siempre construyendo algo nuevo. 🔧',
		'Un bug menos, una idea más. ✨',
		'Aquí no paro: deploy tras deploy, idea tras idea. ⚡',
	]

	function getRandomPhrase() {
		return footerPhrases[Math.floor(Math.random() * footerPhrases.length)]
	}

	const quickLinks = [
		{ name: 'Home', href: '/' },
		/* { name: 'Proyectos', href: '/proyectos' }, */
		/* 		{ name: 'Blog', href: '/blog' },
		{ name: 'Contacto', href: '/contacto' }, */
	]

	return (
		<footer className="bg-muted/30 border-t border-border">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand Section */}
					<div className="space-y-4">
						<Link href="/" className="flex items-center space-x-2">
							<Code2 />
							<span className="text-lg font-bold">Roberto Serrano - Software Enginner</span>
						</Link>
						<p className="text-muted-foreground max-w-xs">{getRandomPhrase()}</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Navegación</h3>
						<ul className="space-y-2">
							{quickLinks.map(link => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="font-semibold text-muted-foreground hover:text-accent transition-smooth"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Links */}
					<div className="space-y-4">
						<h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Conecta conmigo</h3>
						<div className="flex space-x-2">
							{socialLinks.map(social => (
								<Button key={social.label} variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-full" asChild>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										className="hover:text-accent transition-smooth"
									>
										<social.icon className="!size-5" />
									</a>
								</Button>
							))}
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
					<p className="text-muted-foreground text-sm">
						© {currentYear} Roberto Serrano. Todos los derechos reservados.
					</p>
					<p className="text-muted-foreground text-sm mt-2 sm:mt-0">Construido con ❤️, React y MongoDB</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
