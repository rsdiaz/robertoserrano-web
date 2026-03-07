const siteMetadata = {
	title: 'Roberto Serrano Díaz-Grande | Software Engineer',
	description:
		'Bienvenido a mi sitio web personal donde comparto artículos sobre desarrollo web, programación y tecnología.',
	siteUrl: process.env.NODE_ENV === 'production' ? 'https://robertoserrano.pro' : 'http://localhost:3000',
	socialBanner: '/static/images/social-banner.png',
	profileDescription:
		'Ingeniero de Software especializado en crear aplicaciones útiles que resuelven problemas reales. Con más de 15 años de experiencia en desarrollo full-stack y tecnologías modernas.',
}

export default siteMetadata
