---
name: commit-writer
description: Write consistent Conventional Commit messages from the current diff. Use when the user asks to draft, improve, or validate a git commit message for this project.
---

# Commit Writer

Generate commit messages that are consistent, concise, and grounded in the actual git changes.

## When to use this skill

Use this skill whenever the user asks to:

- write a commit message
- improve or rewrite a commit message
- choose the correct Conventional Commit type/scope/subject
- validate whether a message follows project conventions

## Inputs

Collect these inputs before drafting a message:

1. Current `git diff` (staged and unstaged when relevant).
2. Current `git status` (to confirm changed files and scope).
3. Optional: recent `git log --oneline` to match tone and style.

If no real changes exist, state that clearly and do not fabricate a commit message.

## Output contract

Return exactly:

1. One primary commit message in this format:
   `type(scope): subject`
2. One short rationale (1 sentence) explaining why this type/scope/subject match the diff.
3. Optional alternatives (max 2) only when there is a plausible ambiguity.

Keep output compact and actionable.

## Core workflow

1. Inspect the diff and identify the dominant intent (feature, bug fix, refactor, docs, etc.).
2. Select `type` from Conventional Commits based on intent.
3. Infer `scope` from the most impacted module, route, domain, or folder.
4. Write `subject` in imperative, lowercase style, concise and specific.
5. Validate the final line with `scripts/validate_commit_message.py` when available.

## Decision rules

- Prefer the smallest accurate claim. Do not overstate impact.
- Focus on the why/outcome in the subject, not a low-level file list.
- If multiple independent concerns are present, suggest splitting commits.
- If the diff includes secrets or sensitive files, warn before proposing commit text.
- Keep subject concise (target <= 72 chars).

## Type selection defaults

- `feat`: new user-facing capability
- `fix`: bug fix or behavior correction
- `refactor`: internal code change without behavior change
- `docs`: documentation-only changes
- `test`: test-only additions or updates
- `chore`: maintenance, tooling, dependency, or infra task
- `perf`: measurable performance improvement
- `build`: build system or dependency build pipeline changes
- `ci`: CI workflow changes

Use `!` only for breaking changes when clearly supported by the diff.

## Scope heuristics

Prefer one stable scope token in lowercase kebab-case. Good candidates:

- `blog`, `contact`, `views`, `api`, `seo`, `contentlayer`, `scripts`, `docker`, `ci`

For cross-cutting changes, choose the dominant functional area rather than a generic scope.

## Subject heuristics

- Start with an imperative verb: `add`, `fix`, `update`, `refactor`, `remove`.
- Avoid trailing period.
- Avoid vague text like "misc updates".
- Keep it understandable without reading the full diff.

## References and tools

- Read `references/commit-guidelines.md` for detailed rules and project examples.
- Run `python3 .agents/skills/commit-writer/scripts/validate_commit_message.py "<message>"` to validate candidate messages.
