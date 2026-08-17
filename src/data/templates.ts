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
];

export function getTemplateBySlug(slug: string) {
  return templateRegistry.find((t) => t.slug === slug);
}
