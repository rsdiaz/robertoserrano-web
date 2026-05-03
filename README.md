# Roberto Serrano - Portfolio

Portfolio personal y blog técnico de Roberto Serrano.

## 🚀 Tech Stack

- **Next.js 15** - React framework con App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Contentlayer2** - CMS with MDX
- **MongoDB** - Blog views & analytics
- **Radix UI** - Accesible components
- **Framer Motion** - Animations

## 📋 Requisitos previos

- Node.js 18+
- npm o yarn
- MongoDB local o conexión remota

## 🏃 Getting Started

### 1. Clona el repo

```bash
git clone https://github.com/rsdiaz/robertoserrano-web-2025-nextjs.git
cd robertoserrano-web-2025-nextjs
```

### 2. Configura variables de entorno

```bash
cp .env.example .env.local
# Edita .env.local con tus valores
```

### 3. Instala dependencias

```bash
npm install
```

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

## 📚 Estructura del proyecto

```bash
src/
├── app/
│   ├── components/       # Componentes React
│   ├── api/             # API Routes
│   ├── blog/            # Blog pages
│   ├── contacto/        # Contact page
│   └── layout.tsx       # Root layout
├── data/
│   ├── blog-posts/      # .mdx files
│   ├── projects/        # .mdx files
│   └── siteMetadata.ts
└── lib/                 # Utilities
```

## 🔧 Comandos disponibles
```bash
npm run dev               #Dev server con Turbopack
npm run build             # Build para producción
npm run build:content     #Build contentlayer
npm start                 # Inicia servidor producción
npm run lint              #ESLint check
```

## 🐳 Docker
```bash
docker build -t robertoserrano-web:latest .
```

```bash
docker run -d -p 3000:3000 \
  -e MONGODB_URI="mongodb://..." \
  robertoserrano-web:latest
```

## 🚀 Deploy
GitHub Actions

Push a main branch para trigger automático:

- Build Docker image
- Push a GHCR
- Deploy automático a VPS
- Variables de entorno en production

Set en secrets de GitHub Actions:

- VPS_HOST
- VPS_USER
- VPS_SSH_KEY
- MONGODB_URI

## 📝 Escribir un nuevo post
1 - Crea archivo .mdx en blog-posts

2 - Añade frontmatter:
```bash
---
title: "Mi primer post"
date: 2026-03-05
excerpt: "Resumen del post"
tags: ["nextjs", "typescript"]
featured: true
---
```

