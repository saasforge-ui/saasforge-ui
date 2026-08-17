import type { TemplateProductMetadata } from "@/types";

export const templateRegistry: TemplateProductMetadata[] = [
  {
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    description:
      "A full analytics dashboard page with revenue, usage and goal metrics, a weekly trend chart and recent activity — sidebar navigation included.",
    componentSlugs: [
      "dashboard-overview",
      "revenue-analytics-card",
      "usage-metrics-card",
      "analytics-chart-card",
      "goal-progress-card",
      "activity-timeline",
      "vertical-nav-sidebar",
    ],
    tags: ["dashboard", "analytics", "metrics", "full-page"],
  },
  {
    slug: "billing-settings-panel",
    name: "Billing & Settings Panel",
    description:
      "A complete billing and account settings page: subscription status, plan comparison, invoice history, payment methods and a settings form — sidebar navigation included.",
    componentSlugs: [
      "subscription-status-card",
      "pricing-plan-comparison",
      "invoice-list",
      "payment-method-card",
      "settings-form",
      "vertical-nav-sidebar",
    ],
    tags: ["billing", "settings", "subscription", "full-page"],
  },
  {
    slug: "admin-users-panel",
    name: "Admin & Users Panel",
    description:
      "An admin control panel for managing users, teams, roles and API access: user table, team management, permission matrix, org switcher and API keys — sidebar navigation included.",
    componentSlugs: [
      "user-management-table",
      "team-members-manager",
      "role-permission-matrix",
      "organization-switcher",
      "api-key-manager",
      "vertical-nav-sidebar",
    ],
    tags: ["admin", "users", "permissions", "full-page"],
  },
  {
    slug: "onboarding-flow",
    name: "Onboarding Flow",
    description:
      "A centered, sidebar-less first-run onboarding flow: account creation, workspace details, logo upload and team invites, tracked with a step progress nav.",
    componentSlugs: [
      "onboarding-wizard",
      "signup-form",
      "stepper-wizard-nav",
      "validated-form-wizard",
      "file-upload-dropzone",
      "empty-state",
    ],
    tags: ["onboarding", "auth", "wizard", "full-page"],
  },
  {
    slug: "marketing-landing-page",
    name: "Marketing Landing Page",
    description:
      "A full marketing landing page with a mega menu, feature grid, plan comparison table, pricing, FAQ and a signup CTA — top navigation included.",
    componentSlugs: [
      "feature-grid",
      "cta-banner",
      "faq-accordion",
      "pricing-plan-comparison",
      "comparison-table",
      "mega-menu",
      "signup-form",
      "announcement-banner",
    ],
    tags: ["marketing", "landing-page", "pricing", "full-page"],
  },
  {
    slug: "checkout-flow",
    name: "Checkout Flow",
    description:
      "A centered, sidebar-less checkout page: product browsing and cart, shipping and payment, coupon codes and an order summary, ending in an order confirmation.",
    componentSlugs: [
      "checkout-stepper",
      "shipping-address-form",
      "payment-method-selector",
      "coupon-code-input",
      "order-summary-card",
      "order-confirmation-card",
      "product-card-grid",
      "shopping-cart-drawer",
    ],
    tags: ["ecommerce", "checkout", "cart", "full-page"],
  },
  {
    slug: "support-inbox-page",
    name: "Support / Inbox Page",
    description:
      "A three-pane support inbox: conversation and channel list, message thread with mention replies, and a right-side panel for internal notes and video calls — sidebar navigation included.",
    componentSlugs: [
      "support-inbox-list",
      "chat-channel-sidebar",
      "message-bubble-list",
      "typing-indicator",
      "chat-widget",
      "mention-autocomplete-input",
      "comment-thread",
      "video-call-card",
      "vertical-nav-sidebar",
    ],
    tags: ["support", "inbox", "chat", "full-page"],
  },
];

export function getTemplateBySlug(slug: string) {
  return templateRegistry.find((t) => t.slug === slug);
}
