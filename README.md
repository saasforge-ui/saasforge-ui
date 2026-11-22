# SaaSForge UI

Free forever, open-source React components for modern SaaS dashboards.

[Live Demo](https://saasforge-ui.github.io/saasforge-ui/) · [Components](https://saasforge-ui.github.io/saasforge-ui/components) · [Templates](https://saasforge-ui.github.io/saasforge-ui/templates)

> Stop rebuilding the same SaaS dashboard UI. 95 components and 7 full-page templates built with React, TypeScript
> and Tailwind CSS — free forever and MIT licensed. Copy, customize, ship.

## Why SaaSForge UI?

- **Free forever** — every component and template, with full source, docs and examples. MIT licensed, including
  commercial use. No paid tiers, no locked features, no license keys — now or later.
- **Copy & Customize** — no black-box package; take the source and make it yours.
- **Production Ready** — loading, empty and error states, validation, responsive behavior and accessibility included.
- **TypeScript First** — strong types and predictable component APIs.
- **Built for SaaS** — billing, analytics, users, teams, permissions, AI and developer tooling out of the box.

## What's included

**95 components** across 16 categories: Dashboard, Users, Billing, Analytics, Settings, Utilities, Auth, Marketing,
Ecommerce, Communication, Data, Navigation, Forms, Notifications, AI and Developer. Browse them with live previews at
`/components` in the demo app, or in [`src/data/components.ts`](src/data/components.ts).

**7 full-page templates** composed from those components: Analytics Dashboard, Billing & Settings Panel, Admin & Users
Panel, Onboarding Flow, Marketing Landing Page, Checkout Flow and Support / Inbox Page. See `/templates` in the demo
app, or [`src/templates/`](src/templates).

Every component page includes a live preview, the full component source, a usage example, the props reference,
states, accessibility notes and responsive behavior.

## Using a component

1. Open the component's page in the demo app.
2. Copy the component source into your project (the page shows the suggested path).
3. Install the npm dependencies listed under **Installation**.
4. Make sure the shared primitives it imports from [`src/components/ui`](src/components/ui) and the theme tokens in
   [`src/index.css`](src/index.css) are in your project too.

## Tech Stack

React · TypeScript · Vite · Tailwind CSS v4 · Radix UI · Framer Motion · Recharts · React Hook Form · Zod

## Development

```bash
git clone https://github.com/saasforge-ui/saasforge-ui.git
cd saasforge-ui
npm install
npm run dev
```

No backend, API keys or environment variables are required to run the demo locally.

```bash
npm run build       # production build
npm run preview     # preview the build
npm run test        # tests in watch mode
npm run test:run    # single run (used in CI)
npm run lint
```

## Project Structure

```text
src/
  components/
    ui/          shared primitives (button, card, dialog, tabs, ...)
    saas/        the 95 components, grouped by category
    marketing/   landing page sections
    common/      layout, header/footer, code block, etc.
  templates/     the 7 full-page templates
  examples/      usage example per component
  pages/         routed pages (Home, Components/*, Templates/*, Showcase)
  data/          component and template metadata, docs, mock data
  lib/           config, utils, analytics, category icons
  types/         shared TypeScript types
```

## Customization

- Theme tokens live in [`src/index.css`](src/index.css) as CSS variables (`--primary`, `--background`, motion easing
  tokens, etc.) — swap them to reskin the whole library without touching component code.
- Site links (GitHub, optional Ko-fi donations) are configured via environment variables — see
  [`.env.example`](.env.example) and [`src/lib/config.ts`](src/lib/config.ts).

## Contributing

Issues and pull requests are welcome.

## Support

SaaSForge UI is and will stay free. If it saves you time, you can support its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V31NX2L8)

## License

[MIT](LICENSE) — free forever, for personal and commercial use.
