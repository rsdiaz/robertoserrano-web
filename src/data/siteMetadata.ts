const siteMetadata = {
	portfolioTitle: 'Roberto Serrano',
	title: 'Desarrollo Web en Tarragona + IA y Automatizaciones | Roberto Serrano',
	description:
		'Desarrollo web a medida en Tarragona con IA y automatizaciones para empresas. Soluciones escalables, enfoque técnico y resultados medibles. Hablemos de tu proyecto.',
	siteUrl: process.env.NODE_ENV === 'production' ? 'https://robertoserrano.pro' : 'http://localhost:3000',
	socialBanner: '/static/opengraph-image.png',
	profileDescription:
		'Ingeniero de software especializado en desarrollo web, IA y automatizaciones para empresas en Tarragona y España. Con más de 15 años de experiencia creando soluciones útiles, escalables y orientadas a resultados.',
	twitterHandle: '@RovBeat',
	contactEmail: 'info@robertoserrano.pro',
	location: 'Tarragona, España',
	socialLinks: {
		github: 'https://github.com/rsdiaz',
		linkedin: 'https://www.linkedin.com/in/roberto-serrano-diaz-grande',
		twitter: 'https://twitter.com/RovBeat',
	},
}

export default siteMetadata
