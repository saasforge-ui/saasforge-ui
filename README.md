# SaaSForge UI

Production-ready React components for modern SaaS dashboards.

[Live Demo](https://saasforge-ui.github.io/saasforge-ui/) · [Free Components](#free-vs-pro) · [Get Pro](#pricing)

> Stop rebuilding the same SaaS dashboard UI. Production-ready React components — and growing — built with React,
> TypeScript and Tailwind CSS. Copy, customize, ship.

## Why SaaSForge UI?

- **Copy & Customize** — no black-box components; take the source and make it yours.
- **Production Ready** — loading, empty and error states, validation, responsive behavior and accessibility included.
- **TypeScript First** — strong types and predictable component APIs.
- **Built for SaaS** — billing, analytics, users, teams, permissions and settings out of the box.

## Components

70 components across Dashboard, Users, Billing, Analytics, Settings, Utilities, Auth, Marketing, Ecommerce,
Communication, Data and Navigation — and growing. See the full list and live previews at `/components` in the
demo app, or in [`src/data/components.ts`](src/data/components.ts).

### Free vs Pro

**Free (in this repository):**

- Revenue Analytics Card
- Usage Metrics Card
- Analytics Chart Card
- Empty State
- Confirmation Dialog System
- Login Form
- FAQ Accordion Section
- Signup Form
- Order Summary Card
- Product Card Grid
- Coupon Code Input
- Order Confirmation Card
- Comment Thread
- Typing Indicator
- Announcement Banner
- Comparison Table
- Breadcrumbs
- Stepper / Wizard Nav
- Tab Bar with Overflow
- Pagination Bar

**Pro (SaaSForge UI Pro — 50 additional components):** Dashboard Overview, User Management Table, Subscription
Status Card, Pricing Plan Comparison, Recent Activity Timeline, Notifications Center, Invoice List, Payment Method
Card, Team Members Manager, Role & Permission Matrix, API Key Manager, Organization Switcher, Advanced Data Filter
Toolbar, Data Export Menu, SaaS Settings Form, Onboarding Wizard, Reset Password Flow, Feature Grid Section, CTA
Banner Section, Goal Progress Card, Shopping Cart Drawer, Payment Method Selector, Shipping Address Form, Order
Tracking Timeline, Checkout Stepper, Wishlist Item List, Product Quick View Modal, Chat Widget, Message Bubble
List, Support Inbox List, Mention Autocomplete Input, Chat Channel Sidebar, Video Call Card, Feedback Widget,
Notification Preferences Panel, Kanban Board, Calendar Event View, Data Grid with Inline Edit, Tree View / File
Explorer, Gantt Chart Row, Heatmap Calendar, Pivot-style Summary Table, Virtualized Long List, Timeline Chart,
Command Palette, Vertical Nav Sidebar, Mega Menu, Mobile Bottom Nav, Split Pane Layout, Sticky Table of Contents.

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
    free/             the 20 free, fully open-source components
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

## Pricing

| | Free | Pro | Ultimate |
| --- | --- | --- | --- |
| Price | $0 | $19 | $49 (coming soon) |
| Components | 20 | 70 | 70 |
| Full source | — | ✓ | ✓ |
| Dark mode | ✓ | ✓ | ✓ |
| Commercial usage | — | ✓ | ✓ |
| Dashboard templates | — | — | ✓ |
| Lifetime updates | — | ✓ | ✓ |

## License

Free components in this repository: MIT (see [`LICENSE`](LICENSE)). SaaSForge UI Pro is a separately licensed
commercial product for use in purchasers' own projects.
