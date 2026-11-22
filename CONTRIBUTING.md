# Contributing to SaaSForge UI

Thanks for your interest in improving SaaSForge UI! It's free forever and open source (MIT), and contributions of
all sizes are welcome: bug reports, fixes, docs, accessibility improvements and new components.

By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** — open an issue with the bug report template. Include the component, steps to reproduce and
  what you expected.
- **Request a component** — open an issue with the component request template and describe the use case.
- **Fix something** — issues labelled `good first issue` are a good place to start. For anything larger than a
  small fix, open an issue first so we can agree on the approach before you invest time.
- **Report a security issue** — please don't open a public issue; see [SECURITY.md](SECURITY.md).

## Development setup

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/saasforge-ui/saasforge-ui.git
cd saasforge-ui
npm install
npm run dev
```

No backend, API keys or environment variables are needed.

Before opening a pull request, make sure these all pass — CI runs the same checks:

```bash
npm run lint
npm run test:run
npm run build
```

## Project structure

```text
src/
  components/ui/      shared primitives (button, dialog, tabs, ...) used by every component
  components/saas/    the components, grouped by category folder
  templates/          full-page templates composed from the components
  examples/           one usage example per component (shown on its docs page)
  data/components.ts      component registry (name, category, description, tags, ...)
  data/component-docs.tsx docs for each component (props, states, accessibility, ...)
  data/templates.ts       template registry
  lib/category-icons.tsx  icon for each category
```

## Adding a new component

1. **Source** — `src/components/saas/<category>/<slug>.tsx`. Props-driven, fully typed, no hardcoded business
   data. Reuse the primitives in `src/components/ui/` instead of hand-rolling overlays, inputs or buttons.
2. **Example** — `src/examples/<slug>.example.tsx`, a small realistic usage example as the default export.
3. **Registry** — add an entry to `componentRegistry` in `src/data/components.ts`.
4. **Docs** — add an entry to `src/data/component-docs.tsx` (props, states, accessibility, customization,
   responsive notes, plus the `?raw` imports for the example and component source).
5. **New category?** — add it to the `ComponentCategory` union in `src/types/index.ts` and give it an icon in
   `src/lib/category-icons.tsx` (the build fails without it).
6. **Tests** — add `<slug>.test.tsx` next to the component for anything with real logic (state, validation,
   keyboard handling). We use Vitest and Testing Library.

New templates go in `src/templates/<slug>.tsx` plus an entry in `src/data/templates.ts`; the template pages pick
them up automatically.

## Conventions

**Accessibility** — every interactive element is keyboard reachable with a visible `focus-visible` ring, has an
accessible name, and uses the right ARIA roles. Don't rely on hover alone to reveal functionality (touch devices).

**States** — handle loading, empty and error states where they apply, and long content (truncate or wrap).

**Motion** — the library follows a consistent motion system:

- Use the `ease-out-strong` easing token (defined in `src/index.css`) for enter/exit and interactions,
  `ease-in-out-strong` for on-screen movement, and `linear` only for constant motion like progress bars. Never
  `ease-in`, and no bouncy/overshoot curves on functional UI.
- Keep UI animations at or under 300ms, and make exits faster than entrances.
- Pressable elements get `active:scale-[0.97]`. Tailwind v4's `scale-*` utilities set the CSS `scale` property,
  so a custom transition list must include `scale` (e.g. `transition-[background-color,scale]`).
- No hover-scale on buttons or controls. Never animate from `scale(0)`.
- Popovers scale from their trigger (the shared primitives already do this); modals stay centered.
- Reduced motion is handled globally — don't bypass it.

**Styling** — Tailwind CSS only, using the theme tokens (`bg-background`, `text-muted-foreground`, ...) so
components work in light and dark mode. Use `cn()` from `@/lib/utils` for conditional classes.

## Pull requests

- Keep PRs focused: one fix or one component per PR.
- Describe what changed and why, and add a screenshot or short clip for visual changes.
- Make sure lint, tests and the build pass.
- PRs are merged with rebase, so keep commits meaningful (squash fixups before review).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
