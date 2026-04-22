# Deploy Guide (Cloudflare) - geodocs.dev

Last updated: 2026-04-22

This guide is the standard deploy runbook for this repository.

## 1) Deployment policy

Scope:
- Deploy only to existing worker geodocs-dev
- Deploy only in Cloudflare account 89120d03ba4cfda8015ef780b890064e

Do not do by default:
- Create/modify D1, R2, KV, or new routes
- Change Cloudflare account target

## 2) Prerequisites

- Node.js >= 18
- npm installed
- Wrangler available via npx (no global install required)
- Cloudflare auth session active for the correct account

Check auth:
- npx wrangler whoami

Expected account for this project:
- 89120d03ba4cfda8015ef780b890064e

## 3) Deployment config source of truth

wrangler.jsonc must include:
- name = geodocs-dev
- account_id = 89120d03ba4cfda8015ef780b890064e
- assets.directory = ./build
- observability.enabled = false
- observability.head_sampling_rate = 1
- observability.logs.enabled = true
- observability.logs.head_sampling_rate = 1
- observability.logs.persist = true
- observability.logs.invocation_logs = true
- observability.traces.enabled = false
- observability.traces.persist = true
- observability.traces.head_sampling_rate = 1

## 4) Safe deploy sequence

Run from repo root.

Step 1: install dependencies
- npm ci

Step 2: dry-run deploy (required)
- npm run deploy:cf:dry

Dry-run must pass before production deploy.

Step 3: production deploy
- npm run deploy:cf

## 5) Post-deploy verification

Run:
- curl -I https://geodocs-dev.gnokaar.workers.dev
- curl -I https://geodocs.dev
- curl -s https://geodocs.dev | head -n 5

Success criteria:
- HTTP 200 on both endpoints
- Homepage HTML returned on custom domain

## 6) Troubleshooting

A) Build fails on MDX with unexpected character
- Cause: invalid comment syntax in MDX documents
- Fix: update offending comment to MDX-safe form

B) Deploy goes to wrong account
- Check npx wrangler whoami output
- Confirm wrangler.jsonc account_id
- Re-authenticate Wrangler with the correct Cloudflare account

C) Deploy succeeds but custom domain not updated
- Verify worker deployment list:
  - npx wrangler deployments list --config wrangler.jsonc --name geodocs-dev
- Check DNS/route mapping in Cloudflare dashboard

## 7) Release checklist

- [ ] wrangler.jsonc points to geodocs-dev and correct account
- [ ] dry-run passed
- [ ] production deploy passed
- [ ] geodocs.dev responds with HTTP 200
- [ ] workers.dev endpoint responds with HTTP 200
- [ ] deployment version ID recorded in internal notes
