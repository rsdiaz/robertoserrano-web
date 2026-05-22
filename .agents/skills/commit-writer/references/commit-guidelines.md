# Commit Message Guidelines

Use this reference when crafting or validating commit messages for this repository.

## Required format

`type(scope): subject`

Examples:

- `feat(blog): add reading time to post cards`
- `fix(contact): handle resend API timeout`
- `chore(contentlayer): align generated output copy path`

## Project style cues

Based on existing history in this repository:

- Conventional Commit style is already used.
- Most messages are short and direct.
- `feat` and `fix` are common; choose more specific types only when clearly justified.

## Type mapping

- `feat`: introduces a new behavior/capability
- `fix`: corrects incorrect behavior or error handling
- `refactor`: restructures code without changing external behavior
- `docs`: documentation only
- `test`: tests only
- `chore`: maintenance and housekeeping
- `perf`: performance optimization
- `build`: build tooling or dependency build pipeline
- `ci`: CI workflow/configuration

## Scope mapping examples for this codebase

- `blog`: `src/app/blog/**`, `src/data/blog-posts/**`
- `contact`: `src/app/contacto/**`, `src/app/api/contact/**`
- `views`: `src/app/api/views/**`, related counters/hooks
- `contentlayer`: `scripts/build-content.mjs`, content build wiring
- `scripts`: `scripts/**` helper scripts
- `seo`: `robots.txt`, sitemap, metadata routes
- `docker`: Dockerfile, container runtime setup
- `ci`: `.github/workflows/**`

When several areas changed, use the user-facing dominant area.

## Subject rules

- Imperative mood, lowercase start.
- No trailing period.
- Prefer clarity over cleverness.
- Keep it concise (target <= 72 chars).
- Avoid file-by-file wording.

Good:

- `feat(blog): add estimated reading time to cards`
- `fix(api): return 400 when contact payload is invalid`

Avoid:

- `feat(blog): changes`
- `fix: update stuff`

## Breaking changes

Use `type(scope)!: subject` only when the diff indicates a breaking API/contract change.

If relevant, add a body note:

`BREAKING CHANGE: <what changed and migration hint>`

## Multi-concern diffs

If the diff mixes unrelated concerns, recommend split commits instead of one broad message.

## Safety notes

- Do not include secrets or key-like values in commit text.
- If `.env` or credential files appear in changes, explicitly warn before drafting.
