import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { BreadcrumbListJsonLd } from '@/app/components/JsonLd'

const pageUrl = `${siteMetadata.siteUrl}/privacidad`

export const metadata: Metadata = {
	title: 'Política de Privacidad',
	description:
		'Política de privacidad de Roberto Serrano Díaz-Grande. Información sobre qué datos se recogen, cómo se usan y tus derechos.',
	alternates: { canonical: pageUrl },
	openGraph: {
		title: 'Política de Privacidad · Roberto Serrano',
		description: 'Cómo protejo tus datos y gestiono tu información personal.',
		url: pageUrl,
		type: 'website',
	},
}

export default function PrivacyPage() {
	return (
		<>
			<div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-background via-secondary/20 to-background pt-32 sm:pt-40 lg:pt-56 pb-16">
				<BreadcrumbListJsonLd
					items={[
						{ name: 'Inicio', item: siteMetadata.siteUrl },
						{ name: 'Política de Privacidad', item: pageUrl },
					]}
				/>

				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_hsl(var(--accent)/0.14),_transparent_42%)] blog-blob"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,_hsl(var(--primary)/0.12),_transparent_44%)] blog-blob-2"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_hsl(var(--accent)/0.06),_transparent_45%)]"
					aria-hidden="true"
				/>

				<article className="container relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Política de Privacidad</h1>
					<p className="text-sm text-muted-foreground mb-10">Última actualización: Julio 2026</p>

					<div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold">1. Responsable del tratamiento</h2>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Responsable:</strong> Roberto Serrano Díaz-Grande
								</li>
								<li>
									<strong>Correo electrónico:</strong> {siteMetadata.contactEmail}
								</li>
								<li>
									<strong>Domicilio:</strong> {siteMetadata.location}
								</li>
								<li>
									<strong>Sitio web:</strong> {siteMetadata.siteUrl}
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold">2. Datos que recopilo</h2>
							<p className="text-muted-foreground">
								A través del formulario de contacto de este sitio web, los datos personales que me proporcionas
								voluntariamente son:
							</p>
							<ul className="list-disc pl-6 space-y-1 text-muted-foreground">
								<li>Nombre</li>
								<li>Dirección de correo electrónico</li>
								<li>Contenido del mensaje que decides enviar</li>
							</ul>
							<p className="text-muted-foreground">
								No recojo datos de navegación mediante cookies propias ni utilizo servicios de analítica de terceros que
								identifiquen personalmente a los visitantes.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">3. Finalidad del tratamiento</h2>
							<p className="text-muted-foreground">
								Tus datos se utilizan exclusivamente para responder a la consulta o solicitud que me dirijas a través
								del formulario de contacto. No se emplean para fines comerciales, envío de newsletters ni se ceden a
								terceros.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">4. Legitimación</h2>
							<p className="text-muted-foreground">
								La base legal para el tratamiento de tus datos es el consentimiento que otorgas al enviar
								voluntariamente el formulario de contacto.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">5. Conservación de los datos</h2>
							<p className="text-muted-foreground">
								Los datos se conservan durante el tiempo necesario para gestionar tu solicitud y, posteriormente,
								durante los plazos legales exigidos por la normativa aplicable. Si no se inicia una relación
								profesional, los datos se eliminan en un plazo máximo de 12 meses.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">6. Servicio de envío de correos (Resend)</h2>
							<p className="text-muted-foreground">
								Los mensajes del formulario de contacto se envían mediante el servicio Resend, que actúa como encargado
								del tratamiento. Resend cumple con el RGPD y mantiene los datos en servidores dentro del Espacio
								Económico Europeo.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">7. Tus derechos</h2>
							<p className="text-muted-foreground">
								Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
								enviando un correo a {siteMetadata.contactEmail}. También puedes presentar una reclamación ante la
								Agencia Española de Protección de Datos si consideras que no se han respetado tus derechos.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">8. Seguridad</h2>
							<p className="text-muted-foreground">
								Este sitio utiliza HTTPS para proteger la transmisión de datos. Se aplican medidas técnicas y
								organizativas para garantizar la seguridad de la información personal.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold">9. Modificaciones</h2>
							<p className="text-muted-foreground">
								Esta política puede actualizarse para adaptarse a cambios normativos. La fecha de última actualización
								figura al inicio de esta página.
							</p>
						</section>
					</div>
				</article>
			</div>
		</>
	)
}
