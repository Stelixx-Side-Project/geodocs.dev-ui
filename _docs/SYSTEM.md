# Geodocs.dev System Overview

Last updated: 2026-04-22

## 1) What this project is

This repository is a Docusaurus documentation site (forked from dyte-io/docs) and customized for geodocs.dev.

Main output:
- Static website files generated into build/
- Hosted via Cloudflare Workers Assets under worker geodocs-dev

## 2) Runtime model

Request flow:
1. User opens https://geodocs.dev
2. Cloudflare routes request to worker geodocs-dev
3. Worker serves static assets from build/ uploaded by Wrangler
4. Cloudflare edge cache handles repeated requests

There is no server-side app runtime in this repo for page rendering. The site is static after build.

## 3) Important project paths

- docs/: main product documentation content
- src/: custom React components and Docusaurus theme customizations
- static/: static files copied into final build output
- docusaurus.config.js: site metadata and plugin configuration
- wrangler.jsonc: Cloudflare deployment target for this project
- _docs/: internal operation docs for this project

## 4) Build and deploy commands

From package.json:
- npm run build:cf
  - Runs Docusaurus build (output in build/)
- npm run deploy:cf:dry
  - Builds and runs wrangler deploy dry-run (safe validation)
- npm run deploy:cf
  - Builds and deploys to Cloudflare worker geodocs-dev

## 5) Cloudflare target scope (production)

Configured in wrangler.jsonc:
- account_id: 89120d03ba4cfda8015ef780b890064e
- worker name: geodocs-dev
- workers_dev enabled: true
- assets directory: ./build
- observability.enabled: false
- observability.head_sampling_rate: 1
- observability.logs.enabled: true
- observability.logs.head_sampling_rate: 1
- observability.logs.persist: true
- observability.logs.invocation_logs: true
- observability.traces.enabled: false
- observability.traces.persist: true
- observability.traces.head_sampling_rate: 1

Operational rule:
- Only update existing worker geodocs-dev for this project.
- Do not create new D1/R2/KV/route resources unless explicitly requested.

## 6) Domain and endpoints

Expected endpoints:
- Custom domain: https://geodocs.dev
- Workers URL: https://geodocs-dev.gnokaar.workers.dev

Quick health check:
- curl -I https://geodocs.dev
- curl -I https://geodocs-dev.gnokaar.workers.dev

Both should return HTTP 200 for healthy deployment.

## 7) Known operational notes

- Docusaurus build may report broken-anchor warnings in docs content. These are content quality issues and do not always block deployment.
- MD/MDX comment syntax can break build in some generated reference docs. Prefer MDX-safe comments when needed.
- Keep deployment scope strict to avoid accidental Cloudflare resource drift.

## 8) Related docs

- _docs/DEPLOY.md
- _docs/notes.md
