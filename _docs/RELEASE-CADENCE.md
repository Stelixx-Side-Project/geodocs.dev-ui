# Release Cadence and Documentation Standard

Last updated: 2026-04-23

This document standardizes how Geodocs ships code and updates docs.

## 1. Branch Policy

- Default flow: always work on a feature branch.
- `main` is release-ready and should only receive reviewed, intentional changes.

Recommended branch names:

- `feature/<scope>-<short-name>`
- `docs/<scope>-<short-name>`
- `fix/<scope>-<short-name>`

Examples:

- `feature/homepage-geo-cta-polish`
- `docs/release-cadence-v1`
- `fix/topnav-button-hover`

## 2. Definition of Done Before Merge

Before opening or updating a PR, run:

```sh
npm run lint
npm run typecheck
npm run build
```

Known legacy broken-anchor warnings are allowed if they are pre-existing and unchanged.

## 3. Documentation Update Timing

Use `/document-release` after implementation is complete and before merge.

Target docs for each release pass:

- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `_docs/README.md` (if new internal docs are added)

Optional docs based on scope:

- `_docs/GEODOCS-FOUNDATION.md`
- `_docs/GEODOCS-TAXONOMY-SCHEMA.md`
- `_docs/CONTENT-PIPELINE.md`
- `_docs/DEPLOY.md`

## 4. CHANGELOG Convention

Use this top section pattern for current work:

```md
## Unreleased (YYYY-MM-DD)

### Features
- ...

### Design and UX
- ...

### Infrastructure
- ...
```

Rules:

- Do not rewrite old historical versions.
- Only add or polish wording in current release scope.
- Keep entries outcome-focused and user-readable.

## 5. Standard Release Sequence

1. Start from latest `main`.
2. Create feature branch.
3. Implement code changes.
4. Run checks (`lint`, `typecheck`, `build`).
5. Run `/document-release` to sync docs with shipped changes.
6. Commit and push branch.
7. Open PR and include a concise documentation diff summary.
8. Merge after review.

## 6. PR Description Template (Docs Section)

Use this section in PR body:

```md
## Documentation

- README.md: <what changed>
- CONTRIBUTING.md: <what changed>
- CHANGELOG.md: <what changed>
- _docs/<file>.md: <what changed>
```

## 7. Exceptions

- Emergency production fixes may use direct maintainer intervention.
- If a one-off change lands on `main`, run `/document-release` immediately afterward to normalize docs.
