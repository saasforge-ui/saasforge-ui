import type * as React from "react";

import RevenueAnalyticsExample from "@/examples/revenue-analytics-card.example";
import UsageMetricsExample from "@/examples/usage-metrics-card.example";
import AnalyticsChartExample from "@/examples/analytics-chart-card.example";
import EmptyStateExample from "@/examples/empty-state.example";
import ConfirmationDialogExample from "@/examples/confirmation-dialog.example";

import revenueAnalyticsSource from "@/examples/revenue-analytics-card.example.tsx?raw";
import usageMetricsSource from "@/examples/usage-metrics-card.example.tsx?raw";
import analyticsChartSource from "@/examples/analytics-chart-card.example.tsx?raw";
import emptyStateSource from "@/examples/empty-state.example.tsx?raw";
import confirmationDialogSource from "@/examples/confirmation-dialog.example.tsx?raw";

import { DashboardOverview } from "@/components/premium-preview/dashboard-overview";
import { UserManagementTable } from "@/components/premium-preview/user-management-table";
import { SubscriptionStatusCard } from "@/components/premium-preview/subscription-status-card";
import { PricingPlanComparison } from "@/components/premium-preview/pricing-plan-comparison";
import { ActivityTimeline } from "@/components/premium-preview/activity-timeline";
import { NotificationsCenter } from "@/components/premium-preview/notifications-center";
import { InvoiceList } from "@/components/premium-preview/invoice-list";
import { PaymentMethodCard } from "@/components/premium-preview/payment-method-card";
import { TeamMembersManager } from "@/components/premium-preview/team-members-manager";
import { RolePermissionMatrix } from "@/components/premium-preview/role-permission-matrix";
import { ApiKeyManager } from "@/components/premium-preview/api-key-manager";
import { OrganizationSwitcher } from "@/components/premium-preview/organization-switcher";
import { FilterToolbar } from "@/components/premium-preview/filter-toolbar";
import { DataExportMenu } from "@/components/premium-preview/data-export-menu";
import { SettingsForm } from "@/components/premium-preview/settings-form";

export interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface ComponentDocEntry {
  slug: string;
  installDeps?: string[];
  props?: PropRow[];
  states?: string[];
  accessibility?: string[];
  customization?: string[];
  responsive?: string[];
  source?: string;
  preview: React.ReactNode;
}

export const componentDocs: Record<string, ComponentDocEntry> = {
  "revenue-analytics-card": {
    slug: "revenue-analytics-card",
    installDeps: ["recharts", "lucide-react"],
    props: [
      { name: "title", type: "string", required: true, description: "Card title, e.g. \"Monthly Revenue\"." },
      { name: "value", type: "number", required: true, description: "Current value for the period." },
      { name: "currency", type: "string", default: "\"USD\"", description: "ISO currency code used for formatting." },
      { name: "formatAsCurrency", type: "boolean", default: "true", description: "Format value as currency vs a plain number." },
      { name: "change", type: "number", required: true, description: "Percentage change vs the previous period." },
      { name: "trend", type: '"up" | "down" | "neutral"', description: "Overrides the trend derived from `change`." },
      { name: "comparisonLabel", type: "string", default: '"vs previous period"', description: "Label under the change percentage." },
      { name: "data", type: "ChartPoint[]", required: true, description: "Sparkline series data." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Normal", "Loading (skeleton)", "Positive trend", "Negative trend"],
    accessibility: [
      "Trend direction is communicated with both an icon and text, not color alone.",
      "The sparkline is decorative; the numeric value and percentage change carry the information.",
    ],
    customization: [
      "Pass `formatAsCurrency={false}` to display raw numeric metrics (e.g. signups) instead of currency.",
      "Override `trend` explicitly when the sign of `change` doesn't match business meaning.",
    ],
    responsive: ["Card stacks value and sparkline on narrow containers; wrap in a grid for dashboard layouts."],
    source: revenueAnalyticsSource,
    preview: (
      <div className="max-w-sm">
        <RevenueAnalyticsExample />
      </div>
    ),
  },
  "usage-metrics-card": {
    slug: "usage-metrics-card",
    installDeps: ["lucide-react"],
    props: [
      { name: "label", type: "string", required: true, description: "Metric label, e.g. \"API requests\"." },
      { name: "used", type: "number", required: true, description: "Current usage amount." },
      { name: "limit", type: "number", required: true, description: "Plan limit (ignored when unlimited)." },
      { name: "unit", type: "string", default: '""', description: "Unit suffix shown after numbers." },
      { name: "level", type: '"normal" | "warning" | "critical" | "unlimited"', description: "Overrides the computed level." },
      { name: "warningThreshold", type: "number", default: "0.75", description: "Ratio at which the warning state kicks in." },
      { name: "criticalThreshold", type: "number", default: "0.9", description: "Ratio at which the critical state kicks in." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Normal", "Warning (near limit)", "Critical (limit reached)", "Unlimited", "Loading"],
    accessibility: [
      "The progress bar has an `aria-label` describing the metric and percentage used.",
      "Critical state adds a text warning, not just a color change.",
    ],
    customization: ["Tune `warningThreshold` / `criticalThreshold` per metric type (storage vs. seats vs. API calls)."],
    responsive: ["Designed to sit in a responsive grid of 2-4 cards; scales down gracefully to a single column."],
    source: usageMetricsSource,
    preview: (
      <div className="max-w-sm">
        <UsageMetricsExample />
      </div>
    ),
  },
  "analytics-chart-card": {
    slug: "analytics-chart-card",
    installDeps: ["recharts", "lucide-react"],
    props: [
      { name: "title", type: "string", required: true, description: "Chart card title." },
      { name: "description", type: "string", description: "Optional supporting description." },
      { name: "data", type: "ChartPoint[]", required: true, description: "Series data to plot." },
      { name: "variant", type: '"line" | "area" | "bar"', default: '"area"', description: "Chart type." },
      { name: "ranges", type: "string[]", description: "Date range options rendered in a select control." },
      { name: "defaultRange", type: "string", description: "Initially selected range." },
      { name: "onRangeChange", type: "(range: string) => void", description: "Called when the user changes the range." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Normal", "Loading (skeleton)", "Empty (no data)", "Line / Area / Bar variants"],
    accessibility: ["Range selector is a fully keyboard-operable Radix Select.", "Chart data is also available via the tooltip on focus/hover."],
    customization: ["Swap `variant` per use case — area for trends, bar for discrete comparisons, line for precise series."],
    responsive: ["Chart container is fully responsive via Recharts' ResponsiveContainer."],
    source: analyticsChartSource,
    preview: <AnalyticsChartExample />,
  },
  "empty-state": {
    slug: "empty-state",
    installDeps: ["lucide-react"],
    props: [
      { name: "icon", type: "LucideIcon", default: "Inbox", description: "Icon rendered inside the empty state." },
      { name: "title", type: "string", required: true, description: "Primary heading." },
      { name: "description", type: "string", description: "Supporting description text." },
      { name: "primaryAction", type: "{ label: string; onClick: () => void }", description: "Primary call to action." },
      { name: "secondaryAction", type: "{ label: string; onClick: () => void }", description: "Secondary call to action." },
    ],
    states: ["Default", "With one action", "With two actions"],
    accessibility: ["Root element uses `role=\"status\"` so assistive tech announces the empty state when it appears."],
    customization: ["Swap the `icon` per context — a search icon for empty search results, a folder icon for empty project lists."],
    responsive: ["Content is centered and constrained to a max width so it reads well at any container size."],
    source: emptyStateSource,
    preview: <EmptyStateExample />,
  },
  "confirmation-dialog": {
    slug: "confirmation-dialog",
    installDeps: ["@radix-ui/react-alert-dialog", "lucide-react"],
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls dialog visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the dialog is dismissed." },
      { name: "title", type: "string", required: true, description: "Dialog heading." },
      { name: "description", type: "string", description: "Supporting description." },
      { name: "variant", type: '"destructive" | "warning" | "information"', default: '"information"', description: "Visual style and icon." },
      { name: "confirmLabel", type: "string", default: '"Confirm"', description: "Label for the confirm button." },
      { name: "cancelLabel", type: "string", default: '"Cancel"', description: "Label for the cancel button." },
      { name: "isLoading", type: "boolean", default: "false", description: "Disables actions and shows a spinner while confirming." },
      { name: "onConfirm", type: "() => void", required: true, description: "Called when the user confirms the action." },
    ],
    states: ["Information", "Warning", "Destructive", "Loading (confirming)"],
    accessibility: [
      "Built on Radix AlertDialog: focus is trapped and returned to the trigger on close.",
      "Uses `AlertDialogPrimitive.Title` / `Description` so screen readers announce both automatically.",
    ],
    customization: ["Use the `destructive` variant only for irreversible actions to keep the signal meaningful."],
    responsive: ["Dialog width is capped and centers on all viewport sizes; buttons stack on very narrow screens."],
    source: confirmationDialogSource,
    preview: <ConfirmationDialogExample />,
  },
  "dashboard-overview": {
    slug: "dashboard-overview",
    preview: <DashboardOverview />,
  },
  "user-management-table": {
    slug: "user-management-table",
    preview: <UserManagementTable />,
  },
  "subscription-status-card": {
    slug: "subscription-status-card",
    preview: <SubscriptionStatusCard />,
  },
  "pricing-plan-comparison": {
    slug: "pricing-plan-comparison",
    preview: <PricingPlanComparison />,
  },
  "activity-timeline": {
    slug: "activity-timeline",
    preview: (
      <div className="max-w-md">
        <ActivityTimeline />
      </div>
    ),
  },
  "notifications-center": {
    slug: "notifications-center",
    preview: <NotificationsCenter />,
  },
  "invoice-list": {
    slug: "invoice-list",
    preview: <InvoiceList />,
  },
  "payment-method-card": {
    slug: "payment-method-card",
    preview: <PaymentMethodCard />,
  },
  "team-members-manager": {
    slug: "team-members-manager",
    preview: <TeamMembersManager />,
  },
  "role-permission-matrix": {
    slug: "role-permission-matrix",
    preview: <RolePermissionMatrix />,
  },
  "api-key-manager": {
    slug: "api-key-manager",
    preview: <ApiKeyManager />,
  },
  "organization-switcher": {
    slug: "organization-switcher",
    preview: <OrganizationSwitcher />,
  },
  "filter-toolbar": {
    slug: "filter-toolbar",
    preview: <FilterToolbar />,
  },
  "data-export-menu": {
    slug: "data-export-menu",
    preview: <DataExportMenu />,
  },
  "settings-form": {
    slug: "settings-form",
    preview: <SettingsForm />,
  },
};
