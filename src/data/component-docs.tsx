import type * as React from "react";

import RevenueAnalyticsExample from "@/examples/revenue-analytics-card.example";
import UsageMetricsExample from "@/examples/usage-metrics-card.example";
import AnalyticsChartExample from "@/examples/analytics-chart-card.example";
import EmptyStateExample from "@/examples/empty-state.example";
import ConfirmationDialogExample from "@/examples/confirmation-dialog.example";
import LoginFormExample from "@/examples/login-form.example";
import FAQAccordionExample from "@/examples/faq-accordion.example";
import SignupFormExample from "@/examples/signup-form.example";
import OrderSummaryCardExample from "@/examples/order-summary-card.example";
import ProductCardGridExample from "@/examples/product-card-grid.example";
import CouponCodeInputExample from "@/examples/coupon-code-input.example";
import OrderConfirmationCardExample from "@/examples/order-confirmation-card.example";
import CommentThreadExample from "@/examples/comment-thread.example";
import TypingIndicatorExample from "@/examples/typing-indicator.example";
import AnnouncementBannerExample from "@/examples/announcement-banner.example";

import revenueAnalyticsSource from "@/examples/revenue-analytics-card.example.tsx?raw";
import usageMetricsSource from "@/examples/usage-metrics-card.example.tsx?raw";
import analyticsChartSource from "@/examples/analytics-chart-card.example.tsx?raw";
import emptyStateSource from "@/examples/empty-state.example.tsx?raw";
import confirmationDialogSource from "@/examples/confirmation-dialog.example.tsx?raw";
import loginFormSource from "@/examples/login-form.example.tsx?raw";
import faqAccordionSource from "@/examples/faq-accordion.example.tsx?raw";
import signupFormSource from "@/examples/signup-form.example.tsx?raw";
import orderSummaryCardSource from "@/examples/order-summary-card.example.tsx?raw";
import productCardGridSource from "@/examples/product-card-grid.example.tsx?raw";
import couponCodeInputSource from "@/examples/coupon-code-input.example.tsx?raw";
import orderConfirmationCardSource from "@/examples/order-confirmation-card.example.tsx?raw";
import commentThreadSource from "@/examples/comment-thread.example.tsx?raw";
import typingIndicatorSource from "@/examples/typing-indicator.example.tsx?raw";
import announcementBannerSource from "@/examples/announcement-banner.example.tsx?raw";

import revenueAnalyticsComponentSource from "@/components/free/revenue-analytics-card.tsx?raw";
import usageMetricsComponentSource from "@/components/free/usage-metrics-card.tsx?raw";
import analyticsChartComponentSource from "@/components/free/analytics-chart-card.tsx?raw";
import emptyStateComponentSource from "@/components/free/empty-state.tsx?raw";
import confirmationDialogComponentSource from "@/components/free/confirmation-dialog.tsx?raw";
import loginFormComponentSource from "@/components/free/login-form.tsx?raw";
import faqAccordionComponentSource from "@/components/free/faq-accordion-section.tsx?raw";
import signupFormComponentSource from "@/components/free/signup-form.tsx?raw";
import orderSummaryCardComponentSource from "@/components/free/order-summary-card.tsx?raw";
import productCardGridComponentSource from "@/components/free/product-card-grid.tsx?raw";
import couponCodeInputComponentSource from "@/components/free/coupon-code-input.tsx?raw";
import orderConfirmationCardComponentSource from "@/components/free/order-confirmation-card.tsx?raw";
import commentThreadComponentSource from "@/components/free/comment-thread.tsx?raw";
import typingIndicatorComponentSource from "@/components/free/typing-indicator.tsx?raw";
import announcementBannerComponentSource from "@/components/free/announcement-banner.tsx?raw";

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
import { OnboardingWizard } from "@/components/premium-preview/onboarding-wizard";
import { ResetPasswordFlow } from "@/components/premium-preview/reset-password-flow";
import { FeatureGridSection } from "@/components/premium-preview/feature-grid";
import { CTABannerSection } from "@/components/premium-preview/cta-banner";
import { GoalProgressCard } from "@/components/premium-preview/goal-progress-card";
import { ShoppingCartDrawer } from "@/components/premium-preview/shopping-cart-drawer";
import { PaymentMethodSelector } from "@/components/premium-preview/payment-method-selector";
import { ShippingAddressForm } from "@/components/premium-preview/shipping-address-form";
import { OrderTrackingTimeline } from "@/components/premium-preview/order-tracking-timeline";
import { CheckoutStepper } from "@/components/premium-preview/checkout-stepper";
import { WishlistItemList } from "@/components/premium-preview/wishlist-item-list";
import { ProductQuickViewModal } from "@/components/premium-preview/product-quick-view-modal";
import { ChatWidget } from "@/components/premium-preview/chat-widget";
import { MessageBubbleList } from "@/components/premium-preview/message-bubble-list";
import { SupportInboxList } from "@/components/premium-preview/support-inbox-list";
import { MentionAutocompleteInput } from "@/components/premium-preview/mention-autocomplete-input";
import { ChatChannelSidebar } from "@/components/premium-preview/chat-channel-sidebar";
import { VideoCallCard } from "@/components/premium-preview/video-call-card";
import { FeedbackWidget } from "@/components/premium-preview/feedback-widget";
import { NotificationPreferencesPanel } from "@/components/premium-preview/notification-preferences-panel";

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
  /** Usage example source (how to call the component). */
  source?: string;
  /** The component's own implementation file — what you actually copy into your project. Free components only. */
  componentSource?: string;
  /** Path shown above the component source block, e.g. "src/components/free/empty-state.tsx". */
  componentSourcePath?: string;
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
    componentSource: revenueAnalyticsComponentSource,
    componentSourcePath: "src/components/free/revenue-analytics-card.tsx",
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
    componentSource: usageMetricsComponentSource,
    componentSourcePath: "src/components/free/usage-metrics-card.tsx",
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
    componentSource: analyticsChartComponentSource,
    componentSourcePath: "src/components/free/analytics-chart-card.tsx",
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
    componentSource: emptyStateComponentSource,
    componentSourcePath: "src/components/free/empty-state.tsx",
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
    componentSource: confirmationDialogComponentSource,
    componentSourcePath: "src/components/free/confirmation-dialog.tsx",
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
  "login-form": {
    slug: "login-form",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers", "lucide-react"],
    props: [
      { name: "onSubmit", type: "(values: LoginFormValues) => void", required: true, description: "Called with validated values on submit." },
      { name: "onForgotPassword", type: "() => void", description: "Shows a \"Forgot password?\" link when provided." },
      { name: "onSignUp", type: "() => void", description: "Shows a \"Don't have an account?\" link when provided." },
      { name: "oauthProviders", type: "OAuthProvider[]", default: "[]", description: "Renders an OAuth button row when non-empty." },
      { name: "onOAuthClick", type: "(providerId: string) => void", description: "Called when an OAuth button is clicked." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables the submit button and shows a spinner." },
      { name: "error", type: "string", description: "Shown as a banner above the fields when set." },
    ],
    states: ["Normal", "Validation errors", "Submitting", "Error banner", "With OAuth providers"],
    accessibility: ["Every field has an associated `Label`; validation errors render directly below their field."],
    customization: ["Omit `oauthProviders` to render a plain email/password form with no divider."],
    responsive: ["Capped at `max-w-sm`; OAuth buttons lay out in an even grid based on the provider count."],
    source: loginFormSource,
    componentSource: loginFormComponentSource,
    componentSourcePath: "src/components/free/login-form.tsx",
    preview: <LoginFormExample />,
  },
  "signup-form": {
    slug: "signup-form",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers", "lucide-react"],
    props: [
      { name: "onSubmit", type: "(values: SignupFormValues) => void", required: true, description: "Called with validated values on submit." },
      { name: "onLogIn", type: "() => void", description: "Shows an \"Already have an account?\" link when provided." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables the submit button and shows a spinner." },
      { name: "error", type: "string", description: "Shown as a banner above the fields when set." },
    ],
    states: ["Normal", "Validation errors", "Password mismatch", "Submitting", "Error banner"],
    accessibility: ["Terms checkbox has its own `Label`; its validation error is rendered directly below it."],
    customization: ["`signupFormSchema` (Zod) is exported — extend it if you need additional fields."],
    responsive: ["Capped at `max-w-sm`; fields stack full-width on any viewport."],
    source: signupFormSource,
    componentSource: signupFormComponentSource,
    componentSourcePath: "src/components/free/signup-form.tsx",
    preview: <SignupFormExample />,
  },
  "onboarding-wizard": {
    slug: "onboarding-wizard",
    preview: <OnboardingWizard />,
  },
  "reset-password-flow": {
    slug: "reset-password-flow",
    preview: <ResetPasswordFlow />,
  },
  "faq-accordion": {
    slug: "faq-accordion",
    installDeps: ["@radix-ui/react-accordion"],
    props: [
      { name: "title", type: "string", default: '"Frequently asked questions"', description: "Section heading." },
      { name: "description", type: "string", description: "Optional supporting text under the heading." },
      { name: "items", type: "FAQItem[]", required: true, description: "Question/answer pairs, rendered in order." },
    ],
    states: ["Collapsed (default)", "One item expanded"],
    accessibility: ["Built on Radix Accordion: triggers are real buttons and expose `aria-expanded` automatically."],
    customization: ["Swap `type=\"single\"` for `type=\"multiple\"` on the underlying `Accordion` to allow several open at once."],
    responsive: ["Capped at `max-w-2xl`; reads well as a centered section on a landing page."],
    source: faqAccordionSource,
    componentSource: faqAccordionComponentSource,
    componentSourcePath: "src/components/free/faq-accordion-section.tsx",
    preview: <FAQAccordionExample />,
  },
  "feature-grid": {
    slug: "feature-grid",
    preview: <FeatureGridSection />,
  },
  "cta-banner": {
    slug: "cta-banner",
    preview: <CTABannerSection />,
  },
  "goal-progress-card": {
    slug: "goal-progress-card",
    preview: <GoalProgressCard />,
  },
  "order-summary-card": {
    slug: "order-summary-card",
    installDeps: [],
    props: [
      { name: "items", type: "OrderSummaryLineItem[]", required: true, description: "Line items (label + amount) shown above the totals." },
      { name: "subtotal", type: "number", required: true, description: "Order subtotal." },
      { name: "shipping", type: "number", description: "Shipping cost; pass 0 to show \"Free\"." },
      { name: "tax", type: "number", description: "Tax amount." },
      { name: "discount", type: "number", description: "Discount amount, shown in green when > 0." },
      { name: "total", type: "number", required: true, description: "Grand total." },
      { name: "currency", type: "string", default: '"USD"', description: "ISO currency code used for formatting." },
    ],
    states: ["Normal", "With discount", "Without shipping/tax"],
    accessibility: ["Line items and totals are in reading order; the total is visually and semantically distinct via the footer."],
    customization: ["Pass any number of `items` — useful for showing per-product or per-category subtotals."],
    responsive: ["Capped at `max-w-sm`; labels and amounts stay on one line down to narrow mobile widths."],
    source: orderSummaryCardSource,
    componentSource: orderSummaryCardComponentSource,
    componentSourcePath: "src/components/free/order-summary-card.tsx",
    preview: <OrderSummaryCardExample />,
  },
  "product-card-grid": {
    slug: "product-card-grid",
    installDeps: ["lucide-react"],
    props: [
      { name: "products", type: "ProductItem[]", required: true, description: "Products to render." },
      { name: "onAddToCart", type: "(product: ProductItem) => void", description: "Add-to-cart button handler." },
      { name: "onSelect", type: "(product: ProductItem) => void", description: "Called when the product image/card is clicked." },
    ],
    states: ["Normal", "Out of stock", "No rating"],
    accessibility: ["The product image is a real button, reachable and activatable via keyboard."],
    customization: ["Omit `rating` per-product to hide the rating row for items without reviews yet."],
    responsive: ["Grid reflows from 1 to 3 columns based on viewport width."],
    source: productCardGridSource,
    componentSource: productCardGridComponentSource,
    componentSourcePath: "src/components/free/product-card-grid.tsx",
    preview: <ProductCardGridExample />,
  },
  "coupon-code-input": {
    slug: "coupon-code-input",
    installDeps: ["lucide-react"],
    props: [
      { name: "appliedCode", type: "string", description: "Switches to the applied state showing this code." },
      { name: "discountLabel", type: "string", description: "Badge text shown next to the applied code, e.g. \"-15%\"." },
      { name: "error", type: "string", description: "Shown below the input when the code is invalid." },
      { name: "isApplying", type: "boolean", default: "false", description: "Disables Apply and shows a spinner." },
      { name: "onApply", type: "(code: string) => void", required: true, description: "Called when Apply is clicked." },
      { name: "onRemove", type: "() => void", description: "Shown as a remove (×) button once a code is applied." },
    ],
    states: ["Empty", "Applying", "Applied", "Error"],
    accessibility: ["The applied state uses both an icon and text to communicate success, not color alone."],
    customization: ["Drive `appliedCode`/`error` from your own async validation call in `onApply`."],
    responsive: ["Capped at `max-w-sm` by its container; input and button stay on one row."],
    source: couponCodeInputSource,
    componentSource: couponCodeInputComponentSource,
    componentSourcePath: "src/components/free/coupon-code-input.tsx",
    preview: <CouponCodeInputExample />,
  },
  "order-confirmation-card": {
    slug: "order-confirmation-card",
    installDeps: ["lucide-react"],
    props: [
      { name: "orderNumber", type: "string", required: true, description: "Order number/ID to display." },
      { name: "estimatedDelivery", type: "string", description: "Pre-formatted delivery estimate, e.g. \"Aug 5 - Aug 7\"." },
      { name: "email", type: "string", description: "Shown in the confirmation copy when provided." },
      { name: "onTrackOrder", type: "() => void", description: "Shown as a primary button when provided." },
      { name: "onContinueShopping", type: "() => void", description: "Shown as a secondary button when provided." },
    ],
    states: ["Normal", "With estimated delivery", "Without actions"],
    accessibility: ["The success icon is decorative (`aria-hidden`); the heading and copy carry the meaning."],
    customization: ["Omit `estimatedDelivery` for digital/instant orders that don't ship."],
    responsive: ["Capped at `max-w-sm`; action buttons stack on narrow screens."],
    source: orderConfirmationCardSource,
    componentSource: orderConfirmationCardComponentSource,
    componentSourcePath: "src/components/free/order-confirmation-card.tsx",
    preview: <OrderConfirmationCardExample />,
  },
  "shopping-cart-drawer": {
    slug: "shopping-cart-drawer",
    preview: <ShoppingCartDrawer />,
  },
  "payment-method-selector": {
    slug: "payment-method-selector",
    preview: <PaymentMethodSelector />,
  },
  "shipping-address-form": {
    slug: "shipping-address-form",
    preview: <ShippingAddressForm />,
  },
  "order-tracking-timeline": {
    slug: "order-tracking-timeline",
    preview: <OrderTrackingTimeline />,
  },
  "checkout-stepper": {
    slug: "checkout-stepper",
    preview: <CheckoutStepper />,
  },
  "wishlist-item-list": {
    slug: "wishlist-item-list",
    preview: <WishlistItemList />,
  },
  "product-quick-view-modal": {
    slug: "product-quick-view-modal",
    preview: <ProductQuickViewModal />,
  },
  "comment-thread": {
    slug: "comment-thread",
    installDeps: [],
    props: [
      { name: "comments", type: "CommentItem[]", required: true, description: "Top-level comments; each may include nested `replies`." },
      { name: "onReply", type: "(parentId: string, content: string) => void", description: "Shown as a Reply link/composer per comment when provided." },
      { name: "onSubmit", type: "(content: string) => void", description: "Shows a top-level composer at the bottom when provided." },
    ],
    states: ["Normal", "Replying", "With nested replies"],
    accessibility: ["Each comment's Reply control is a real button; the reply composer appears inline, not in a separate modal."],
    customization: ["Replies nest one level visually via a left border indent — extend `CommentItem.replies` recursively for deeper threads."],
    responsive: ["Capped at `max-w-lg`; reply indent is fixed so deep threads still stay readable on mobile."],
    source: commentThreadSource,
    componentSource: commentThreadComponentSource,
    componentSourcePath: "src/components/free/comment-thread.tsx",
    preview: <CommentThreadExample />,
  },
  "typing-indicator": {
    slug: "typing-indicator",
    installDeps: [],
    props: [
      { name: "users", type: "string[]", required: true, description: "Names of users currently typing; renders nothing when empty." },
    ],
    states: ["One user typing", "Two users typing", "Three or more (\"and N others\")", "Hidden (empty array)"],
    accessibility: ["Uses `role=\"status\"` so assistive tech announces when someone starts typing."],
    customization: ["Swap the animated dots for your own spinner by restyling the dot span — the label logic is independent."],
    responsive: ["Inline element; sizes naturally with its container."],
    source: typingIndicatorSource,
    componentSource: typingIndicatorComponentSource,
    componentSourcePath: "src/components/free/typing-indicator.tsx",
    preview: <TypingIndicatorExample />,
  },
  "announcement-banner": {
    slug: "announcement-banner",
    installDeps: ["lucide-react"],
    props: [
      { name: "message", type: "string", required: true, description: "Announcement text." },
      { name: "variant", type: '"info" | "success" | "warning"', default: '"info"', description: "Visual style and icon." },
      { name: "ctaLabel", type: "string", description: "Shown as an underlined link when paired with `onCtaClick`." },
      { name: "onCtaClick", type: "() => void", description: "CTA click handler." },
      { name: "onDismiss", type: "() => void", description: "Shows a close (×) button when provided." },
    ],
    states: ["Info", "Success", "Warning", "With CTA", "Dismissible"],
    accessibility: ["The dismiss button has an explicit `aria-label` (\"Dismiss announcement\")."],
    customization: ["Render conditionally from your own dismissed-state (e.g. localStorage) — the component itself is stateless."],
    responsive: ["Full-width by default; message truncation is left to the parent container."],
    source: announcementBannerSource,
    componentSource: announcementBannerComponentSource,
    componentSourcePath: "src/components/free/announcement-banner.tsx",
    preview: <AnnouncementBannerExample />,
  },
  "chat-widget": {
    slug: "chat-widget",
    preview: <ChatWidget />,
  },
  "message-bubble-list": {
    slug: "message-bubble-list",
    preview: <MessageBubbleList />,
  },
  "support-inbox-list": {
    slug: "support-inbox-list",
    preview: <SupportInboxList />,
  },
  "mention-autocomplete-input": {
    slug: "mention-autocomplete-input",
    preview: <MentionAutocompleteInput />,
  },
  "chat-channel-sidebar": {
    slug: "chat-channel-sidebar",
    preview: <ChatChannelSidebar />,
  },
  "video-call-card": {
    slug: "video-call-card",
    preview: <VideoCallCard />,
  },
  "feedback-widget": {
    slug: "feedback-widget",
    preview: <FeedbackWidget />,
  },
  "notification-preferences-panel": {
    slug: "notification-preferences-panel",
    preview: <NotificationPreferencesPanel />,
  },
};
