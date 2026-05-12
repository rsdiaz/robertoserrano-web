---
name: blog-review
description: Review and fix an existing MDX blog post for robertoserrano.pro. Use when the user asks to review, check, fix, improve or validate a blog post.
---

Eres editor técnico del blog de Roberto Serrano. Revisa el post indicado y aplica todos los fixes necesarios directamente.

## 1. Localizar el archivo

Busca en `src/data/blog-posts/` el `.mdx` que coincida con el slug o nombre proporcionado.
Si no se especificó ninguno, lista todos los posts disponibles y pregunta cuál revisar.

## 2. Checklist completo de revisión

### Frontmatter — corrige directamente si hay problemas

| Campo       | Criterio                                   | Acción si falla                        |
| ----------- | ------------------------------------------ | -------------------------------------- |
| `title`     | Sin caracteres garbled, no vacío           | Corregir encoding o pedir al usuario   |
| `excerpt`   | ≤ 160 chars, engancha, no repite el título | Reescribir el excerpt                  |
| `date`      | Fecha real en formato `YYYY-MM-DD`         | Reemplazar con fecha del archivo o hoy |
| `category`  | Una de las categorías válidas              | Corregir al valor más cercano          |
| `tags`      | Array con al menos 1 elemento              | Inferir del contenido si está vacío    |
| `featured`  | `true` o `false`                           | Añadir `featured: true` si falta       |
| `author`    | `'Roberto Serrano'`                        | Corregir si difiere                    |
| `image.url` | No vacío, apunta a `res.cloudinary.com`    | Marcar como pendiente si está vacío    |
| `image.alt` | Describe la imagen en español              | Reescribir si es genérica o vacía      |

**Categorías válidas:** `DevOps` | `AI` | `Frontend` | `Backend` | `NodeJS` | `React` | `NextJS` | `TypeScript` | `MongoDB` | `Astro`

### Estructura del contenido

- [ ] No hay bloque ` ```mdx ` envolviendo todo el archivo — el archivo empieza con `---`
- [ ] Mínimo 2 secciones `##`
- [ ] Al menos 1 bloque de código con lenguaje especificado (` ```js `, ` ```ts `, ` ```bash `, etc.)
- [ ] Está escrito en español (los bloques de código pueden estar en inglés)
- [ ] Tiene introducción antes del primer `##`

### Encoding

- Si ves `Ã³`, `Â`, `â€™` u otros caracteres garbled → el archivo tiene problema de encoding; informa al usuario, no intentes corregir manualmente

### SEO

- [ ] El `excerpt` aparecería bien en Google (descriptivo, con palabras clave)
- [ ] El `title` tiene la palabra clave principal
- [ ] El nombre del archivo (slug) es descriptivo y en minúsculas con `_`

## 3. Aplicar todos los fixes

Edita el archivo directamente. No pidas confirmación para arreglos menores de formato o frontmatter.

## 4. Compilar el contenido

```bash
npm run build:content
```

## 5. Mostrar informe de revisión

```
✅ Revisión completada: <nombre-archivo>.mdx

FRONTMATTER
  ✅ title: "<título>"
  ✅ excerpt: "<excerpt>" (N chars)
  ✅ date: YYYY-MM-DD
  ✅/⚠️ image.url: <url o "pendiente">
  ...

CONTENIDO
  ✅ N secciones ##
  ✅ N bloques de código
  ✅/⚠️ Escrito en español

FIXES APLICADOS
  - <descripción de cada cambio hecho>

PENDIENTE (requiere acción manual)
  - <lo que no se pudo corregir automáticamente>
```
