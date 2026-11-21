export const siteConfig = {
  name: "SaaSForge UI",
  tagline: "Free, open-source React components for modern SaaS dashboards — and growing.",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://saasforge-ui.github.io/saasforge-ui",
  githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/saasforge-ui/saasforge-ui",
  /** Optional Ko-fi page for donations. When unset, every "Support" link is hidden instead of pointing nowhere. */
  kofiUrl: import.meta.env.VITE_KOFI_URL || "",
} as const;
