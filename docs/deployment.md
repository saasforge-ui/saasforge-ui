# Deployment

## Local development

```bash
npm install
npm run dev
```

No environment variables are required for local development. The app runs entirely client-side against mock data.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` runs `tsc -b` followed by `vite build`. The output is written to `dist/`.

## GitHub Pages deployment

This repository is configured to deploy automatically via GitHub Actions on every push to `main`
(see [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)).

### One-time setup

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or trigger the workflow manually from the **Actions** tab).
5. Once the workflow finishes, the deployed URL is shown in the workflow run summary and on the
   **Settings → Pages** screen — typically `https://<username>.github.io/<repo-name>/`.

No manual `dist/` upload is required — the workflow builds and deploys on every push.

### Base path

GitHub Pages project sites are served from a subpath (`/<repo-name>/`), not the domain root. The workflow sets
`VITE_BASE_PATH` automatically to `/${{ github.event.repository.name }}/` at build time, which feeds into
`vite.config.ts`'s `base` option. Vite exposes the resolved value as `import.meta.env.BASE_URL`, which is used
directly as the React Router `basename` (see `src/main.tsx`) so client-side routes resolve correctly under the
subpath.

For local development, leave `VITE_BASE_PATH` unset — it defaults to `/`.

### Environment variables

Copy `.env.example` to `.env` and adjust as needed for a custom deployment:

| Variable | Purpose |
| --- | --- |
| `VITE_BASE_PATH` | Base path for the built assets. `/` locally, `/<repo-name>/` on GitHub Pages. |
| `VITE_SITE_URL` | Canonical site URL used for SEO / Open Graph metadata. |
| `VITE_GITHUB_URL` | Repository URL used by "View on GitHub" links. |
| `VITE_KOFI_PRODUCT_URL` | Ko-fi checkout URL for the Pro tier. |
| `VITE_KOFI_ULTIMATE_URL` | Ko-fi checkout URL for the Ultimate tier. |

### Ko-fi setup (selling Pro / Ultimate)

`VITE_KOFI_PRODUCT_URL` and `VITE_KOFI_ULTIMATE_URL` power every purchase CTA in the app (`PurchaseButton`, used in
the header, hero, footer, pricing cards, and on every Pro component's detail page). Until they're set, those buttons
open placeholder Ko-fi URLs. To go live:

1. Create (or use an existing) account at [ko-fi.com](https://ko-fi.com).
2. Go to **Shop → Add new item → Digital Download** and create two products: "SaaSForge UI Pro" ($19) and
   "SaaSForge UI Ultimate" ($49).
3. Copy each product's public page URL into `VITE_KOFI_PRODUCT_URL` / `VITE_KOFI_ULTIMATE_URL` in `.env` for local
   development, and into **Settings → Secrets and variables → Actions** on GitHub (same two names) so the deploy
   workflow picks them up — it already reads `secrets.VITE_KOFI_PRODUCT_URL` / `secrets.VITE_KOFI_ULTIMATE_URL` at
   build time (see `.github/workflows/deploy.yml`).
4. Redeploy — no other code changes are needed; every CTA reads from `siteConfig` in `src/lib/config.ts`.

### Pro component previews (private source, public demo)

This repo is public, but the `/components/:slug` live previews for the 15 Pro components are real, working
components — not screenshots. Their source lives in the **private** `saasforge-ui-pro` repo (under
`demo-previews/`), never in this repo's git history:

- `src/components/premium-preview/` is gitignored here.
- Locally: clone `saasforge-ui-pro` as a sibling directory and run `./scripts/sync-premium-preview.sh` to copy the
  preview sources into place before `npm run dev`.
- In CI: the deploy workflow checks out `saasforge-ui-pro` using a **fine-grained personal access token** (repo
  contents: read-only, scoped to that single repository) stored as the `PRO_REPO_TOKEN` secret on this repo, copies
  `demo-previews/*.tsx` into `src/components/premium-preview/`, then deletes the checkout before building. The
  compiled (minified) result ships in the deployed site; the readable source never touches this repo's git history.

To set this up: generate the token at **github.com/settings/personal-access-tokens/new** with resource owner set to
the org, repository access limited to `saasforge-ui-pro`, and Contents permission set to Read-only. Add it as
**Settings → Secrets and variables → Actions → New repository secret** named `PRO_REPO_TOKEN` on this repo.

### Custom domain

To use a custom domain instead of `https://<username>.github.io/<repo-name>/`:

1. Add a `public/CNAME` file containing your domain, e.g. `saasforgeui.example.com` (do not use a real domain
   unless you control it).
2. Set `VITE_BASE_PATH=/` (a custom domain is served from the root, not a subpath).
3. Update `VITE_SITE_URL` to the custom domain.
4. Configure the DNS records for your domain to point at GitHub Pages, per GitHub's custom domain documentation.

### Troubleshooting

- **Broken assets / blank page after deploying**: usually means `VITE_BASE_PATH` doesn't match the actual serving
  path. Confirm it matches the repository name exactly (case-sensitive), including leading and trailing slashes.
- **Client-side routes 404 on direct navigation or refresh**: GitHub Pages is a static host with no server-side
  rewrite rules. This project avoids the issue by keeping all routes under the `BrowserRouter` mounted from a single
  `index.html`; if you add a custom 404 handling requirement, add a `public/404.html` that redirects to `index.html`.
- **GitHub Actions fails with a permissions error on deploy**: confirm the repository's **Settings → Actions →
  General → Workflow permissions** allows "Read and write permissions", and that Pages is set to deploy via
  **GitHub Actions** (not "Deploy from a branch").
- **Custom domain not resolving**: DNS propagation can take up to 24 hours; verify the `CNAME` file survived the
  build (it must be under `public/` so Vite copies it into `dist/` unchanged).

## Migrating to another static host

The app has no GitHub-specific dependencies in application code — `VITE_BASE_PATH`, `VITE_SITE_URL` and friends are
plain environment variables. To move to Vercel, Netlify, or Cloudflare Pages, set `VITE_BASE_PATH=/`, run
`npm run build`, and serve the `dist/` directory as a static site.
