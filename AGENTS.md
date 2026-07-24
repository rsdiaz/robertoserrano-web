# AGENTS.md

Next.js 15 (App Router) + TypeScript portfolio/blog. MDX via Contentlayer2, MongoDB for views, Resend for contact, OpenAI for post generation.

## Commands

- `npm run dev` — runs `build:content` then `next dev --turbopack`
- `npm run build` — runs `build:content` then `next build --turbopack`
- `npm run build:content` — Contentlayer build (see quirk below). Required before any `next` command; both `dev` and `build` already chain it.
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript` + prettier-as-error)
- `npm run format` — Prettier write
- `npm run post:generate` — `tsx scripts/generate-post.ts` with `--env-file=.env.local` (do not run without that env file)
- No test suite is configured.
- No typecheck script; rely on `next build` (tsc `noEmit` via Next).

Run order when verifying changes: `lint` → `build` (build performs typecheck implicitly).

## Contentlayer quirk (important)

`scripts/build-content.mjs` exists because on Windows Contentlayer2 writes generated output to `~/.contentlayer/generated` instead of the project. The script invokes `contentlayer2 build` then copies `~/.contentlayer/generated` → `./.contentlayer/generated`. Do not replace this with a plain `contentlayer2 build` call. Imports use the alias `contentlayer/generated` (see `tsconfig.json` paths).

`contentDirPath` is `src/data` (not the default `data/`). Blog posts: `src/data/blog-posts/**/*.mdx`. Projects: `src/data/projects/**/*.mdx`. Required frontmatter for `BlogPost`: `title`, `date`, `excerpt`. For `Project`: `title`, `description`.

## Layout

- `src/app/` — App Router. Pages: `/`, `/blog`, `/contacto`, plus `not-found.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`. API routes: `api/contact`, `api/views`, `api/likes`.
- `src/app/components/`, `src/app/hooks/`, `src/app/lib/` — colocated under `app/` (non-standard; `@/*` → `./src/*`). Shared modules in `lib/`: `db.ts` (Mongo client), `views.ts`, `seo.ts`, `contact-schema.ts` (Zod), `blog-posts.ts`, `blog-format.ts`.
- `src/data/` — MDX content sources (plus `siteMetadata.ts`).
- `scripts/` — `build-content.mjs`, `generate-post.ts` (OpenAI post scaffolding; image generation was removed, frontmatter `image.url` is left empty for manual fill).
- `next.config.ts` — `output: 'standalone'` (for Docker), Cloudinary remote images allowlisted, optional bundle analyzer via `ANALYZE=true`.

## Style

Prettier config is unusual: **tabs**, no semicolons, single quotes, trailing commas all, printWidth 120, `endOfLine: auto`. Prettier violations fail lint (`prettier/prettier: error`).

## Env

Required env (loaded by Next from `.env.local`, or passed at runtime in Docker):
`MONGODB_URI`, `MONGODB_PASSWORD`, `MONGODB_DB_NAME`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `OPENAI_API_KEY` (only for `post:generate`), `CLOUDINARY_*` (image upload tooling).

⚠️ The committed `.env.local` in this working tree contains real-looking secrets. Do not commit it, do not echo its contents in PRs/issues, and treat any keys you see there as already-leaked — they should be rotated rather than reused.

## OpenCode local config

Skills live in `.agents/skills/` (tracked by `skills-lock.json`). Repo-specific ones worth knowing:

- **`blog-review`** — Checklist-driven review of an existing `.mdx`: frontmatter, structure, SEO, encoding, then `build:content`. Use when asked to review/fix/improve a post.
- **`commit-writer`** — Drafts Conventional Commit messages from the diff. Has a `validate_commit_message.py` validator under the skill's `scripts/`.

Generic skills (`frontend-design`, `skill-creator`) are also installed.

Project-local OpenCode pieces under `.opencode/`:

- `commands/prompt.md` — slash command that rewrites a prompt against Anthropic best practices.

## Deploy

Push to `main` → `.github/workflows/docker-publish.yml` builds image, pushes to GHCR, deploys to VPS via SSH. Secrets required: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `MONGODB_URI`. The `generate-post.yml` workflow is `workflow_dispatch` only and opens a PR with an AI-generated `.mdx`.
