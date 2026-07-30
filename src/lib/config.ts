export const siteConfig = {
  name: "SaaSForge UI",
  tagline: "20 production-ready React components for modern SaaS dashboards.",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://saasforge-ui.github.io/saasforge-ui",
  githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/saasforge-ui/saasforge-ui",
  kofiProductUrl: import.meta.env.VITE_KOFI_PRODUCT_URL || "https://ko-fi.com/s/your-product-id",
  kofiUltimateUrl: import.meta.env.VITE_KOFI_ULTIMATE_URL || "https://ko-fi.com/s/your-ultimate-id",
} as const;

export const pricingConfig = {
  launchOffer: {
    enabled: false,
    label: "Launch offer",
    originalPrice: 29,
    note: "Early buyers keep lifetime access.",
  },
  tiers: [
    {
      id: "free",
      name: "Free",
      price: 0,
      description: "Try SaaSForge UI with 5 production-ready components.",
      cta: "Start Free",
      href: "#free-components",
      features: [
        "5 components",
        "Basic documentation",
        "Community support",
        "GitHub access",
      ],
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 19,
      description: "Everything you need to ship your SaaS dashboard.",
      cta: "Get SaaSForge UI",
      href: "kofi:pro",
      features: [
        "All 20 components",
        "Full source code",
        "TypeScript & Tailwind",
        "Dark mode",
        "Full documentation",
        "Lifetime updates",
        "Commercial usage",
      ],
      highlighted: true,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: 49,
      description: "Pro plus complete dashboard templates.",
      cta: "Get Ultimate",
      href: "kofi:ultimate",
      features: [
        "Everything in Pro",
        "Complete dashboard templates",
        "Additional page templates",
        "Priority updates",
        "Commercial usage",
      ],
      highlighted: false,
    },
  ],
} as const;
