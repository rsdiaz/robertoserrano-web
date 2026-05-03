import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { v2 as cloudinary } from 'cloudinary'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const topic = process.argv[2]
const category = process.argv[3] || 'Development'
const tags = process.argv[4] || category

if (!topic) {
	console.error('Uso: npm run post:generate "Tema del post" "Categoría" "tag1,tag2"')
	process.exit(1)
}

const SYSTEM_PROMPT = `Eres Roberto Serrano, Software Engineer con +15 años de experiencia en desarrollo Full-Stack.
Escribes artículos técnicos en español para tu blog personal en robertoserrano.pro.

ESTILO:
- Tono directo, técnico pero accesible. Primera persona ocasional.
- Usa emojis en los títulos de secciones (🤔, 🚀, 💡, ⚡, 🛠️, etc.)
- Explica el "por qué" antes del "cómo"
- Incluye siempre bloques de código con sintaxis real y comentarios
- Usa subtítulos descriptivos con h2 (##) y h3 (###/####)
- Longitud: mínimo 800 palabras de contenido técnico real

FORMATO DE SALIDA — devuelve SOLO el MDX sin ningún texto adicional:
---
title: 'Título del post en español'
excerpt: 'Resumen de una sola frase que enganche, máx 160 chars'
date: YYYY-MM-DD
category: 'Categoría'
tags: ["tag1", "tag2"]
featured: true
author: 'Roberto Serrano'
image:
    url: ''
    alt: 'descripción de la imagen'
---
## contenido...`

async function generateImage(title: string, altText: string): Promise<string> {
	console.log(`🎨 Generando imagen con DALL-E 3...`)

	const imagePrompt = `Minimalist space-themed illustration inspired by "${title}", dark navy blue gradient background with smooth abstract shapes.
Small glowing stars scattered across the scene, stylized planets partially visible in the corners, and bright shooting comets with soft glow trails.
Clean vector illustration style, modern and friendly tech branding aesthetic.
Soft lighting, subtle gradients, rounded shapes, high contrast but elegant.
No text, no letters, no words.
High resolution, 16:9 aspect ratio.`

	const imageResponse = await client.images.generate({
		model: 'dall-e-3',
		prompt: imagePrompt,
		size: '1792x1024',
		quality: 'standard',
		n: 1,
	})

	const imageUrl = (imageResponse.data && imageResponse.data[0].url) || ''
	console.log(`☁️  Subiendo imagen a Cloudinary...`)

	const uploadResult = await cloudinary.uploader.upload(imageUrl, {
		folder: 'blog-posts',
		public_id: altText
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-'),
		overwrite: false,
	})

	return uploadResult.secure_url
}

async function generatePost() {
	console.log(`⚡ Generando post sobre: "${topic}"...`)

	const response = await client.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{ role: 'system', content: SYSTEM_PROMPT },
			{
				role: 'user',
				content: `Escribe un artículo técnico completo sobre: "${topic}"\nCategoría: ${category}\nTags: ${tags}`,
			},
		],
		temperature: 0.7,
		max_tokens: 4000,
	})

	let content = response.choices[0].message.content!
	const today = new Date().toISOString().split('T')[0]

	// Extraer title y alt del frontmatter generado para el prompt de imagen
	const titleMatch = content.match(/title:\s*['"](.+?)['"]/m)
	const altMatch = content.match(/alt:\s*['"](.+?)['"]/m)
	const postTitle = titleMatch?.[1] ?? topic
	const altText = altMatch?.[1] ?? topic

	// Generar y subir imagen
	let imageUrl = ''
	try {
		imageUrl = await generateImage(postTitle, altText)
		console.log(`✅ Imagen subida: ${imageUrl}`)
	} catch (err) {
		console.warn(`⚠️  No se pudo generar/subir la imagen: ${err instanceof Error ? err.message : err}`)
	}

	// Slug desde el topic
	const slug = topic
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '_')

	// Limpiar si el modelo envolvió el output en un bloque de código ```mdx ... ```
	content = content
		.replace(/^```(?:mdx)?\n?/m, '')
		.replace(/\n?```\s*$/m, '')
		.trim()

	// Reemplazar placeholders
	content = content.replace(/date: YYYY-MM-DD/, `date: ${today}`)
	// Inyectar la URL de imagen en el frontmatter (sea cual sea lo que puso el modelo)
	if (imageUrl) {
		content = content.replace(/(image:\s*\n\s+url:\s*)['"].*?['"]/m, `$1'${imageUrl}'`)
	}

	const outputPath = path.join(__dirname, `../src/data/blog-posts/${slug}.mdx`)
	fs.writeFileSync(outputPath, content, 'utf-8')

	console.log(`✅ Post generado: src/data/blog-posts/${slug}.mdx`)
}

generatePost().catch(console.error)
