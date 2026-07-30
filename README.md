# SaaSForge UI

Production-ready React components for modern SaaS dashboards.

[Live Demo](#) · [Free Components](#free-vs-pro) · [Get Pro](#pricing)

> Stop rebuilding the same SaaS dashboard UI. 20 production-ready React components built with React, TypeScript and
> Tailwind CSS. Copy, customize, ship.

## Screenshots

_Add screenshots/GIFs here once the demo is deployed — see `docs/deployment.md` for the GitHub Pages deploy flow and
`/showcase/:slug` for chrome-free component screenshots suitable for README/social use._

## Why SaaSForge UI?

- **Copy & Customize** — no black-box components; take the source and make it yours.
- **Production Ready** — loading, empty and error states, validation, responsive behavior and accessibility included.
- **TypeScript First** — strong types and predictable component APIs.
- **Built for SaaS** — billing, analytics, users, teams, permissions and settings out of the box.

## Components

20 components across Dashboard, Users, Billing, Analytics, Settings and Utilities. See the full list and live
previews at `/components` in the demo app, or in [`src/data/components.ts`](src/data/components.ts).

### Free vs Pro

**Free (in this repository):**

- Revenue Analytics Card
- Usage Metrics Card
- Analytics Chart Card
- Empty State
- Confirmation Dialog System

**Pro (SaaSForge UI Pro — 15 additional components):** Dashboard Overview, User Management Table, Subscription
Status Card, Pricing Plan Comparison, Recent Activity Timeline, Notifications Center, Invoice List, Payment Method
Card, Team Members Manager, Role & Permission Matrix, API Key Manager, Organization Switcher, Advanced Data Filter
Toolbar, Data Export Menu, SaaS Settings Form.

Every Pro component has a live, working preview (built with mock data) on its `/components/:slug` page and via
`/showcase/:slug` — only the install snippet, source code, and props/docs tables are gated behind "Unlock in Pro".
The fully typed, tested, documented source sold to customers lives in the separate `saasforge-ui-pro` repository.

## Tech Stack

React · TypeScript · Vite · Tailwind CSS · Radix UI · Recharts · React Hook Form · Zod

## Installation

```bash
git clone https://github.com/your-username/saasforge-ui.git
cd saasforge-ui
npm install
```

## Development

```bash
npm run dev
```

No backend, API keys, or environment variables are required to run the demo locally.

## Build

```bash
npm run build
npm run preview
```

## Testing

```bash
npm run test        # watch mode
npm run test:run    # single run (used in CI)
```

## Project Structure

```text
src/
  components/
    ui/               base primitives (button, card, dialog, ...)
    free/             the 5 free, fully open-source components
    marketing/        landing page sections
    common/           shared layout, header/footer, code block, purchase button, etc.
  pages/           routed pages (Home, Pricing, Components/*, Showcase)
  data/            component metadata, mock data
  lib/             config, utils, analytics abstraction
  types/           shared TypeScript types
  examples/        copy-paste usage examples per free component
```

## Customization

- Theme tokens live in [`src/index.css`](src/index.css) as CSS variables (`--primary`, `--background`, etc.) — swap
  them to reskin the whole library without touching component code.
- Pricing, launch offers and Ko-fi links are configuration-driven — see [`src/lib/config.ts`](src/lib/config.ts).
- Component metadata (free/pro flag, category, tags) lives in [`src/data/components.ts`](src/data/components.ts).

## Deployment

See [`docs/deployment.md`](docs/deployment.md) for local dev, production build, GitHub Pages deployment via GitHub
Actions, custom domains, and troubleshooting.

## Pricing

| | Free | Pro | Ultimate |
| --- | --- | --- | --- |
| Price | $0 | $19 | $49 |
| Components | 5 | 20 | 20 |
| Full source | — | ✓ | ✓ |
| Dark mode | ✓ | ✓ | ✓ |
| Commercial usage | — | ✓ | ✓ |
| Dashboard templates | — | — | ✓ |
| Lifetime updates | — | ✓ | ✓ |

Get Pro → configured via `VITE_KOFI_PRODUCT_URL` / `VITE_KOFI_ULTIMATE_URL` (see `.env.example`).

## Roadmap

- [ ] Create the Ko-fi "SaaSForge UI Pro" / "SaaSForge UI Ultimate" products and wire real URLs into `.env` / deploy secrets
- [ ] Publish `saasforge-ui-pro` with the remaining 15 components (full source, types, tests, docs)
- [ ] Complete dashboard page templates (Ultimate tier)
- [ ] Wire up a real analytics provider behind `src/lib/analytics.ts`

## License

Free components in this repository: MIT (see [`LICENSE`](LICENSE)). SaaSForge UI Pro is licensed for use in
purchasers' own projects — see the Pro repository for its license terms.
