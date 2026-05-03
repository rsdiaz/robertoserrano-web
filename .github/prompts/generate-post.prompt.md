---
description: 'Generate a new blog post for robertoserrano.pro using OpenAI and Cloudinary. Use when: create new post, generate post, write article, nuevo post, generar post, escribir artículo.'
name: 'Generar Post'
argument-hint: 'Tema del post (ej: Cómo usar Redis con Node.js)'
agent: 'agent'
tools: [execute, read, edit]
---

Genera un nuevo post de blog para robertoserrano.pro siguiendo estos pasos:

## 1. Solicitar datos si no se proporcionaron

Si el usuario no especificó tema, categoría o tags, pregúntale:

- **Tema**: ¿Sobre qué trata el post?
- **Categoría**: DevOps / AI / Frontend / Backend / Development
- **Tags**: palabras clave separadas por coma

## 2. Ejecutar el generador

```bash
npm run post:generate "<tema>" "<categoria>" "<tag1,tag2>"
```

## 3. Leer el archivo generado

Lee el `.mdx` creado en `src/data/blog-posts/` e inspecciona el frontmatter completo.

## 4. Validar y corregir automáticamente

Aplica estos fixes sin preguntar:

- Si el archivo empieza con ` ```mdx ` o ` ``` `, elimina esa línea y el cierre ` ``` ` final
- Si `date` sigue siendo `YYYY-MM-DD`, reemplázalo con la fecha de hoy
- Si `image.url` está vacío, déjalo vacío (no inventes URLs)
- Si hay caracteres garbled (`Ã³`, `Â`, etc.), el encoding está roto — informa al usuario

## 5. Compilar el contenido

```bash
npm run build:content
```

## 6. Confirmar resultado

Muestra al usuario:

- Nombre del archivo generado
- URL de la imagen (si se generó)
- Resumen del frontmatter (title, excerpt, date, category, tags)
- Resultado del build (documentos generados)
- Enlace local: `http://localhost:3000/blog/<slug>`
