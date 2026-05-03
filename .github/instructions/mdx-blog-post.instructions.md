---
description: 'Use when writing, editing, reviewing or creating MDX blog posts in src/data/blog-posts/. Covers frontmatter schema, content rules, encoding, Cloudinary image format, and contentlayer build requirements.'
applyTo: 'src/data/blog-posts/**/*.mdx'
---

# Blog Post MDX Standards

## Frontmatter schema

```yaml
---
title: 'Título del post en español' # Requerido. Sin caracteres garbled.
excerpt: 'Resumen de una sola frase' # Requerido. Máx 160 chars.
date: YYYY-MM-DD # Requerido. Fecha real, no placeholder.
category: 'NodeJS' # Requerido. Ver valores válidos abajo.
tags: ['tag1', 'tag2'] # Requerido. Al menos 1 elemento.
featured: true # Requerido. true o false.
author: 'Roberto Serrano' # Requerido. Siempre este valor.
image:
  url: 'https://res.cloudinary.com/...' # Requerido. URL de Cloudinary.
  alt: 'Descripción de la imagen' # Requerido. En español.
---
```

## Categorías válidas

`DevOps` | `AI` | `Frontend` | `Backend`

## Reglas de contenido

- El archivo debe empezar con `---` (frontmatter), nunca con ` ``` ` ni ` ```mdx `
- El contenido está en **español**; los bloques de código pueden estar en inglés
- Mínimo 2 secciones con `##`
- Los bloques de código siempre especifican el lenguaje: ` ```ts `, ` ```bash `, etc.
- Nunca dejar `image.url` vacío en un post publicado

## Encoding

- El archivo se guarda en UTF-8
- Si ves caracteres como `Ã³`, `Â`, `â€™` es un problema de encoding — el archivo debe regenerarse

## Imagen

La imagen la genera `scripts/generate-post.ts` con DALL-E 3 y la sube automáticamente a Cloudinary:

```
https://res.cloudinary.com/rserrano/image/upload/v.../blog-posts/<slug>.png
```

No pongas URLs de placeholder ni dejes `url: ''` en posts finales.

## Build

Después de crear o modificar un post, ejecuta siempre:

```bash
npm run build:content
```

Esto regenera `.contentlayer/generated/` y copia el output al directorio del proyecto.
