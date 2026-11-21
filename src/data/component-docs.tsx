import type * as React from "react";

import RevenueAnalyticsExample from "@/examples/revenue-analytics-card.example";
import UsageMetricsExample from "@/examples/usage-metrics-card.example";
import AnalyticsChartExample from "@/examples/analytics-chart-card.example";
import EmptyStateExample from "@/examples/empty-state.example";
import ConfirmationDialogExample from "@/examples/confirmation-dialog.example";
import DashboardOverviewExample from "@/examples/dashboard-overview.example";
import UserManagementTableExample from "@/examples/user-management-table.example";
import SubscriptionStatusCardExample from "@/examples/subscription-status-card.example";
import PricingPlanComparisonExample from "@/examples/pricing-plan-comparison.example";
import ActivityTimelineExample from "@/examples/activity-timeline.example";
import NotificationsCenterExample from "@/examples/notifications-center.example";
import InvoiceListExample from "@/examples/invoice-list.example";
import PaymentMethodCardExample from "@/examples/payment-method-card.example";
import TeamMembersManagerExample from "@/examples/team-members-manager.example";
import RolePermissionMatrixExample from "@/examples/role-permission-matrix.example";
import ApiKeyManagerExample from "@/examples/api-key-manager.example";
import OrganizationSwitcherExample from "@/examples/organization-switcher.example";
import FilterToolbarExample from "@/examples/filter-toolbar.example";
import DataExportMenuExample from "@/examples/data-export-menu.example";
import SettingsFormExample from "@/examples/settings-form.example";
import LoginFormExample from "@/examples/login-form.example";
import SignupFormExample from "@/examples/signup-form.example";
import OnboardingWizardExample from "@/examples/onboarding-wizard.example";
import ResetPasswordFlowExample from "@/examples/reset-password-flow.example";
import FAQAccordionExample from "@/examples/faq-accordion.example";
import FeatureGridExample from "@/examples/feature-grid.example";
import CTABannerExample from "@/examples/cta-banner.example";
import GoalProgressCardExample from "@/examples/goal-progress-card.example";
import OrderSummaryCardExample from "@/examples/order-summary-card.example";
import ProductCardGridExample from "@/examples/product-card-grid.example";
import CouponCodeInputExample from "@/examples/coupon-code-input.example";
import OrderConfirmationCardExample from "@/examples/order-confirmation-card.example";
import ShoppingCartDrawerExample from "@/examples/shopping-cart-drawer.example";
import PaymentMethodSelectorExample from "@/examples/payment-method-selector.example";
import ShippingAddressFormExample from "@/examples/shipping-address-form.example";
import OrderTrackingTimelineExample from "@/examples/order-tracking-timeline.example";
import CheckoutStepperExample from "@/examples/checkout-stepper.example";
import WishlistItemListExample from "@/examples/wishlist-item-list.example";
import ProductQuickViewModalExample from "@/examples/product-quick-view-modal.example";
import CommentThreadExample from "@/examples/comment-thread.example";
import TypingIndicatorExample from "@/examples/typing-indicator.example";
import AnnouncementBannerExample from "@/examples/announcement-banner.example";
import ChatWidgetExample from "@/examples/chat-widget.example";
import MessageBubbleListExample from "@/examples/message-bubble-list.example";
import SupportInboxListExample from "@/examples/support-inbox-list.example";
import MentionAutocompleteInputExample from "@/examples/mention-autocomplete-input.example";
import ChatChannelSidebarExample from "@/examples/chat-channel-sidebar.example";
import VideoCallCardExample from "@/examples/video-call-card.example";
import FeedbackWidgetExample from "@/examples/feedback-widget.example";
import NotificationPreferencesPanelExample from "@/examples/notification-preferences-panel.example";
import ComparisonTableExample from "@/examples/comparison-table.example";
import KanbanBoardExample from "@/examples/kanban-board.example";
import CalendarEventViewExample from "@/examples/calendar-event-view.example";
import DataGridInlineEditExample from "@/examples/data-grid-inline-edit.example";
import TreeViewFileExplorerExample from "@/examples/tree-view-file-explorer.example";
import GanttChartRowExample from "@/examples/gantt-chart-row.example";
import HeatmapCalendarExample from "@/examples/heatmap-calendar.example";
import PivotSummaryTableExample from "@/examples/pivot-summary-table.example";
import VirtualizedLongListExample from "@/examples/virtualized-long-list.example";
import TimelineChartExample from "@/examples/timeline-chart.example";
import BreadcrumbsExample from "@/examples/breadcrumbs.example";
import StepperWizardNavExample from "@/examples/stepper-wizard-nav.example";
import TabBarOverflowExample from "@/examples/tab-bar-overflow.example";
import PaginationBarExample from "@/examples/pagination-bar.example";
import CommandPaletteExample from "@/examples/command-palette.example";
import VerticalNavSidebarExample from "@/examples/vertical-nav-sidebar.example";
import MegaMenuExample from "@/examples/mega-menu.example";
import MobileBottomNavExample from "@/examples/mobile-bottom-nav.example";
import SplitPaneLayoutExample from "@/examples/split-pane-layout.example";
import StickyTableOfContentsExample from "@/examples/sticky-table-of-contents.example";
import FileUploadDropzoneExample from "@/examples/file-upload-dropzone.example";
import ValidatedFormWizardExample from "@/examples/validated-form-wizard.example";
import DynamicFieldArrayFormExample from "@/examples/dynamic-field-array-form.example";
import InlineEditableTableRowExample from "@/examples/inline-editable-table-row.example";
import ToastNotificationStackExample from "@/examples/toast-notification-stack.example";
import NotificationBellDropdownExample from "@/examples/notification-bell-dropdown.example";
import AlertBannerExample from "@/examples/alert-banner-auto-dismiss.example";
import UndoSnackbarExample from "@/examples/undo-snackbar.example";
import AiPromptInputExample from "@/examples/ai-prompt-input.example";
import AiSuggestionChipsExample from "@/examples/ai-suggestion-chips.example";
import AiMessageThreadExample from "@/examples/ai-message-thread.example";
import AiReasoningPanelExample from "@/examples/ai-reasoning-panel.example";
import AiToolCallCardExample from "@/examples/ai-tool-call-card.example";
import AiSourcesCitationsExample from "@/examples/ai-sources-citations.example";
import CodeBlockTabsExample from "@/examples/code-block-tabs.example";
import ApiRequestPlaygroundExample from "@/examples/api-request-playground.example";
import WebhookEventLogExample from "@/examples/webhook-event-log.example";
import ChangelogFeedExample from "@/examples/changelog-feed.example";
import StatusPageUptimeExample from "@/examples/status-page-uptime.example";
import EnvVariablesEditorExample from "@/examples/env-variables-editor.example";
import AiCommandAssistantExample from "@/examples/ai-command-assistant.example";
import DashboardWidgetCustomizerExample from "@/examples/dashboard-widget-customizer.example";
import WhiteLabelThemeEditorExample from "@/examples/white-label-theme-editor.example";
import RealTimePresenceAvatarsExample from "@/examples/real-time-presence-avatars.example";
import ConversionFunnelChartExample from "@/examples/conversion-funnel-chart.example";

import revenueAnalyticsSource from "@/examples/revenue-analytics-card.example.tsx?raw";
import usageMetricsSource from "@/examples/usage-metrics-card.example.tsx?raw";
import analyticsChartSource from "@/examples/analytics-chart-card.example.tsx?raw";
import emptyStateSource from "@/examples/empty-state.example.tsx?raw";
import confirmationDialogSource from "@/examples/confirmation-dialog.example.tsx?raw";
import dashboardOverviewSource from "@/examples/dashboard-overview.example.tsx?raw";
import userManagementTableSource from "@/examples/user-management-table.example.tsx?raw";
import subscriptionStatusCardSource from "@/examples/subscription-status-card.example.tsx?raw";
import pricingPlanComparisonSource from "@/examples/pricing-plan-comparison.example.tsx?raw";
import activityTimelineSource from "@/examples/activity-timeline.example.tsx?raw";
import notificationsCenterSource from "@/examples/notifications-center.example.tsx?raw";
import invoiceListSource from "@/examples/invoice-list.example.tsx?raw";
import paymentMethodCardSource from "@/examples/payment-method-card.example.tsx?raw";
import teamMembersManagerSource from "@/examples/team-members-manager.example.tsx?raw";
import rolePermissionMatrixSource from "@/examples/role-permission-matrix.example.tsx?raw";
import apiKeyManagerSource from "@/examples/api-key-manager.example.tsx?raw";
import organizationSwitcherSource from "@/examples/organization-switcher.example.tsx?raw";
import filterToolbarSource from "@/examples/filter-toolbar.example.tsx?raw";
import dataExportMenuSource from "@/examples/data-export-menu.example.tsx?raw";
import settingsFormSource from "@/examples/settings-form.example.tsx?raw";
import loginFormSource from "@/examples/login-form.example.tsx?raw";
import signupFormSource from "@/examples/signup-form.example.tsx?raw";
import onboardingWizardSource from "@/examples/onboarding-wizard.example.tsx?raw";
import resetPasswordFlowSource from "@/examples/reset-password-flow.example.tsx?raw";
import faqAccordionSource from "@/examples/faq-accordion.example.tsx?raw";
import featureGridSource from "@/examples/feature-grid.example.tsx?raw";
import ctaBannerSource from "@/examples/cta-banner.example.tsx?raw";
import goalProgressCardSource from "@/examples/goal-progress-card.example.tsx?raw";
import orderSummaryCardSource from "@/examples/order-summary-card.example.tsx?raw";
import productCardGridSource from "@/examples/product-card-grid.example.tsx?raw";
import couponCodeInputSource from "@/examples/coupon-code-input.example.tsx?raw";
import orderConfirmationCardSource from "@/examples/order-confirmation-card.example.tsx?raw";
import shoppingCartDrawerSource from "@/examples/shopping-cart-drawer.example.tsx?raw";
import paymentMethodSelectorSource from "@/examples/payment-method-selector.example.tsx?raw";
import shippingAddressFormSource from "@/examples/shipping-address-form.example.tsx?raw";
import orderTrackingTimelineSource from "@/examples/order-tracking-timeline.example.tsx?raw";
import checkoutStepperSource from "@/examples/checkout-stepper.example.tsx?raw";
import wishlistItemListSource from "@/examples/wishlist-item-list.example.tsx?raw";
import productQuickViewModalSource from "@/examples/product-quick-view-modal.example.tsx?raw";
import commentThreadSource from "@/examples/comment-thread.example.tsx?raw";
import typingIndicatorSource from "@/examples/typing-indicator.example.tsx?raw";
import announcementBannerSource from "@/examples/announcement-banner.example.tsx?raw";
import chatWidgetSource from "@/examples/chat-widget.example.tsx?raw";
import messageBubbleListSource from "@/examples/message-bubble-list.example.tsx?raw";
import supportInboxListSource from "@/examples/support-inbox-list.example.tsx?raw";
import mentionAutocompleteInputSource from "@/examples/mention-autocomplete-input.example.tsx?raw";
import chatChannelSidebarSource from "@/examples/chat-channel-sidebar.example.tsx?raw";
import videoCallCardSource from "@/examples/video-call-card.example.tsx?raw";
import feedbackWidgetSource from "@/examples/feedback-widget.example.tsx?raw";
import notificationPreferencesPanelSource from "@/examples/notification-preferences-panel.example.tsx?raw";
import comparisonTableSource from "@/examples/comparison-table.example.tsx?raw";
import kanbanBoardSource from "@/examples/kanban-board.example.tsx?raw";
import calendarEventViewSource from "@/examples/calendar-event-view.example.tsx?raw";
import dataGridInlineEditSource from "@/examples/data-grid-inline-edit.example.tsx?raw";
import treeViewFileExplorerSource from "@/examples/tree-view-file-explorer.example.tsx?raw";
import ganttChartRowSource from "@/examples/gantt-chart-row.example.tsx?raw";
import heatmapCalendarSource from "@/examples/heatmap-calendar.example.tsx?raw";
import pivotSummaryTableSource from "@/examples/pivot-summary-table.example.tsx?raw";
import virtualizedLongListSource from "@/examples/virtualized-long-list.example.tsx?raw";
import timelineChartSource from "@/examples/timeline-chart.example.tsx?raw";
import breadcrumbsSource from "@/examples/breadcrumbs.example.tsx?raw";
import stepperWizardNavSource from "@/examples/stepper-wizard-nav.example.tsx?raw";
import tabBarOverflowSource from "@/examples/tab-bar-overflow.example.tsx?raw";
import paginationBarSource from "@/examples/pagination-bar.example.tsx?raw";
import commandPaletteSource from "@/examples/command-palette.example.tsx?raw";
import verticalNavSidebarSource from "@/examples/vertical-nav-sidebar.example.tsx?raw";
import megaMenuSource from "@/examples/mega-menu.example.tsx?raw";
import mobileBottomNavSource from "@/examples/mobile-bottom-nav.example.tsx?raw";
import splitPaneLayoutSource from "@/examples/split-pane-layout.example.tsx?raw";
import stickyTableOfContentsSource from "@/examples/sticky-table-of-contents.example.tsx?raw";
import fileUploadDropzoneSource from "@/examples/file-upload-dropzone.example.tsx?raw";
import validatedFormWizardSource from "@/examples/validated-form-wizard.example.tsx?raw";
import dynamicFieldArrayFormSource from "@/examples/dynamic-field-array-form.example.tsx?raw";
import inlineEditableTableRowSource from "@/examples/inline-editable-table-row.example.tsx?raw";
import toastNotificationStackSource from "@/examples/toast-notification-stack.example.tsx?raw";
import notificationBellDropdownSource from "@/examples/notification-bell-dropdown.example.tsx?raw";
import alertBannerSource from "@/examples/alert-banner-auto-dismiss.example.tsx?raw";
import undoSnackbarSource from "@/examples/undo-snackbar.example.tsx?raw";
import aiPromptInputSource from "@/examples/ai-prompt-input.example.tsx?raw";
import aiSuggestionChipsSource from "@/examples/ai-suggestion-chips.example.tsx?raw";
import aiMessageThreadSource from "@/examples/ai-message-thread.example.tsx?raw";
import aiReasoningPanelSource from "@/examples/ai-reasoning-panel.example.tsx?raw";
import aiToolCallCardSource from "@/examples/ai-tool-call-card.example.tsx?raw";
import aiSourcesCitationsSource from "@/examples/ai-sources-citations.example.tsx?raw";
import codeBlockTabsSource from "@/examples/code-block-tabs.example.tsx?raw";
import apiRequestPlaygroundSource from "@/examples/api-request-playground.example.tsx?raw";
import webhookEventLogSource from "@/examples/webhook-event-log.example.tsx?raw";
import changelogFeedSource from "@/examples/changelog-feed.example.tsx?raw";
import statusPageUptimeSource from "@/examples/status-page-uptime.example.tsx?raw";
import envVariablesEditorSource from "@/examples/env-variables-editor.example.tsx?raw";
import aiCommandAssistantSource from "@/examples/ai-command-assistant.example.tsx?raw";
import dashboardWidgetCustomizerSource from "@/examples/dashboard-widget-customizer.example.tsx?raw";
import whiteLabelThemeEditorSource from "@/examples/white-label-theme-editor.example.tsx?raw";
import realTimePresenceAvatarsSource from "@/examples/real-time-presence-avatars.example.tsx?raw";
import conversionFunnelChartSource from "@/examples/conversion-funnel-chart.example.tsx?raw";

import revenueAnalyticsComponentSource from "@/components/saas/dashboard/revenue-analytics-card.tsx?raw";
import usageMetricsComponentSource from "@/components/saas/dashboard/usage-metrics-card.tsx?raw";
import analyticsChartComponentSource from "@/components/saas/analytics/analytics-chart-card.tsx?raw";
import emptyStateComponentSource from "@/components/saas/utilities/empty-state.tsx?raw";
import confirmationDialogComponentSource from "@/components/saas/utilities/confirmation-dialog.tsx?raw";
import dashboardOverviewComponentSource from "@/components/saas/dashboard/dashboard-overview.tsx?raw";
import userManagementTableComponentSource from "@/components/saas/users/user-management-table.tsx?raw";
import subscriptionStatusCardComponentSource from "@/components/saas/billing/subscription-status-card.tsx?raw";
import pricingPlanComparisonComponentSource from "@/components/saas/billing/pricing-plan-comparison.tsx?raw";
import activityTimelineComponentSource from "@/components/saas/analytics/activity-timeline.tsx?raw";
import notificationsCenterComponentSource from "@/components/saas/utilities/notifications-center.tsx?raw";
import invoiceListComponentSource from "@/components/saas/billing/invoice-list.tsx?raw";
import paymentMethodCardComponentSource from "@/components/saas/billing/payment-method-card.tsx?raw";
import teamMembersManagerComponentSource from "@/components/saas/users/team-members-manager.tsx?raw";
import rolePermissionMatrixComponentSource from "@/components/saas/users/role-permission-matrix.tsx?raw";
import apiKeyManagerComponentSource from "@/components/saas/settings/api-key-manager.tsx?raw";
import organizationSwitcherComponentSource from "@/components/saas/settings/organization-switcher.tsx?raw";
import filterToolbarComponentSource from "@/components/saas/utilities/filter-toolbar.tsx?raw";
import dataExportMenuComponentSource from "@/components/saas/utilities/data-export-menu.tsx?raw";
import settingsFormComponentSource from "@/components/saas/settings/settings-form.tsx?raw";
import loginFormComponentSource from "@/components/saas/auth/login-form.tsx?raw";
import signupFormComponentSource from "@/components/saas/auth/signup-form.tsx?raw";
import onboardingWizardComponentSource from "@/components/saas/auth/onboarding-wizard.tsx?raw";
import resetPasswordFlowComponentSource from "@/components/saas/auth/reset-password-flow.tsx?raw";
import faqAccordionComponentSource from "@/components/saas/marketing/faq-accordion-section.tsx?raw";
import featureGridComponentSource from "@/components/saas/marketing/feature-grid-section.tsx?raw";
import ctaBannerComponentSource from "@/components/saas/marketing/cta-banner-section.tsx?raw";
import goalProgressCardComponentSource from "@/components/saas/dashboard/goal-progress-card.tsx?raw";
import orderSummaryCardComponentSource from "@/components/saas/ecommerce/order-summary-card.tsx?raw";
import productCardGridComponentSource from "@/components/saas/ecommerce/product-card-grid.tsx?raw";
import couponCodeInputComponentSource from "@/components/saas/ecommerce/coupon-code-input.tsx?raw";
import orderConfirmationCardComponentSource from "@/components/saas/ecommerce/order-confirmation-card.tsx?raw";
import shoppingCartDrawerComponentSource from "@/components/saas/ecommerce/shopping-cart-drawer.tsx?raw";
import paymentMethodSelectorComponentSource from "@/components/saas/ecommerce/payment-method-selector.tsx?raw";
import shippingAddressFormComponentSource from "@/components/saas/ecommerce/shipping-address-form.tsx?raw";
import orderTrackingTimelineComponentSource from "@/components/saas/ecommerce/order-tracking-timeline.tsx?raw";
import checkoutStepperComponentSource from "@/components/saas/ecommerce/checkout-stepper.tsx?raw";
import wishlistItemListComponentSource from "@/components/saas/ecommerce/wishlist-item-list.tsx?raw";
import productQuickViewModalComponentSource from "@/components/saas/ecommerce/product-quick-view-modal.tsx?raw";
import commentThreadComponentSource from "@/components/saas/communication/comment-thread.tsx?raw";
import typingIndicatorComponentSource from "@/components/saas/communication/typing-indicator.tsx?raw";
import announcementBannerComponentSource from "@/components/saas/communication/announcement-banner.tsx?raw";
import chatWidgetComponentSource from "@/components/saas/communication/chat-widget.tsx?raw";
import messageBubbleListComponentSource from "@/components/saas/communication/message-bubble-list.tsx?raw";
import supportInboxListComponentSource from "@/components/saas/communication/support-inbox-list.tsx?raw";
import mentionAutocompleteInputComponentSource from "@/components/saas/communication/mention-autocomplete-input.tsx?raw";
import chatChannelSidebarComponentSource from "@/components/saas/communication/chat-channel-sidebar.tsx?raw";
import videoCallCardComponentSource from "@/components/saas/communication/video-call-card.tsx?raw";
import feedbackWidgetComponentSource from "@/components/saas/communication/feedback-widget.tsx?raw";
import notificationPreferencesPanelComponentSource from "@/components/saas/communication/notification-preferences-panel.tsx?raw";
import comparisonTableComponentSource from "@/components/saas/data/comparison-table.tsx?raw";
import kanbanBoardComponentSource from "@/components/saas/data/kanban-board.tsx?raw";
import calendarEventViewComponentSource from "@/components/saas/data/calendar-event-view.tsx?raw";
import dataGridInlineEditComponentSource from "@/components/saas/data/data-grid-inline-edit.tsx?raw";
import treeViewFileExplorerComponentSource from "@/components/saas/data/tree-view-file-explorer.tsx?raw";
import ganttChartRowComponentSource from "@/components/saas/data/gantt-chart-row.tsx?raw";
import heatmapCalendarComponentSource from "@/components/saas/data/heatmap-calendar.tsx?raw";
import pivotSummaryTableComponentSource from "@/components/saas/data/pivot-summary-table.tsx?raw";
import virtualizedLongListComponentSource from "@/components/saas/data/virtualized-long-list.tsx?raw";
import timelineChartComponentSource from "@/components/saas/data/timeline-chart.tsx?raw";
import breadcrumbsComponentSource from "@/components/saas/navigation/breadcrumbs.tsx?raw";
import stepperWizardNavComponentSource from "@/components/saas/navigation/stepper-wizard-nav.tsx?raw";
import tabBarOverflowComponentSource from "@/components/saas/navigation/tab-bar-overflow.tsx?raw";
import paginationBarComponentSource from "@/components/saas/navigation/pagination-bar.tsx?raw";
import commandPaletteComponentSource from "@/components/saas/navigation/command-palette.tsx?raw";
import verticalNavSidebarComponentSource from "@/components/saas/navigation/vertical-nav-sidebar.tsx?raw";
import megaMenuComponentSource from "@/components/saas/navigation/mega-menu.tsx?raw";
import mobileBottomNavComponentSource from "@/components/saas/navigation/mobile-bottom-nav.tsx?raw";
import splitPaneLayoutComponentSource from "@/components/saas/navigation/split-pane-layout.tsx?raw";
import stickyTableOfContentsComponentSource from "@/components/saas/navigation/sticky-table-of-contents.tsx?raw";
import fileUploadDropzoneComponentSource from "@/components/saas/forms/file-upload-dropzone.tsx?raw";
import validatedFormWizardComponentSource from "@/components/saas/forms/validated-form-wizard.tsx?raw";
import dynamicFieldArrayFormComponentSource from "@/components/saas/forms/dynamic-field-array-form.tsx?raw";
import inlineEditableTableRowComponentSource from "@/components/saas/forms/inline-editable-table-row.tsx?raw";
import toastNotificationStackComponentSource from "@/components/saas/notifications/toast-notification-stack.tsx?raw";
import notificationBellDropdownComponentSource from "@/components/saas/notifications/notification-bell-dropdown.tsx?raw";
import alertBannerComponentSource from "@/components/saas/notifications/alert-banner-auto-dismiss.tsx?raw";
import undoSnackbarComponentSource from "@/components/saas/notifications/undo-snackbar.tsx?raw";
import aiPromptInputComponentSource from "@/components/saas/ai/ai-prompt-input.tsx?raw";
import aiSuggestionChipsComponentSource from "@/components/saas/ai/ai-suggestion-chips.tsx?raw";
import aiMessageThreadComponentSource from "@/components/saas/ai/ai-message-thread.tsx?raw";
import aiReasoningPanelComponentSource from "@/components/saas/ai/ai-reasoning-panel.tsx?raw";
import aiToolCallCardComponentSource from "@/components/saas/ai/ai-tool-call-card.tsx?raw";
import aiSourcesCitationsComponentSource from "@/components/saas/ai/ai-sources-citations.tsx?raw";
import codeBlockTabsComponentSource from "@/components/saas/developer/code-block-tabs.tsx?raw";
import apiRequestPlaygroundComponentSource from "@/components/saas/developer/api-request-playground.tsx?raw";
import webhookEventLogComponentSource from "@/components/saas/developer/webhook-event-log.tsx?raw";
import changelogFeedComponentSource from "@/components/saas/developer/changelog-feed.tsx?raw";
import statusPageUptimeComponentSource from "@/components/saas/developer/status-page-uptime.tsx?raw";
import envVariablesEditorComponentSource from "@/components/saas/developer/env-variables-editor.tsx?raw";
import aiCommandAssistantComponentSource from "@/components/saas/utilities/ai-command-assistant.tsx?raw";
import dashboardWidgetCustomizerComponentSource from "@/components/saas/dashboard/dashboard-widget-customizer.tsx?raw";
import whiteLabelThemeEditorComponentSource from "@/components/saas/settings/white-label-theme-editor.tsx?raw";
import realTimePresenceAvatarsComponentSource from "@/components/saas/communication/real-time-presence-avatars.tsx?raw";
import conversionFunnelChartComponentSource from "@/components/saas/analytics/conversion-funnel-chart.tsx?raw";

export interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface ComponentDocEntry {
  slug: string;
  installDeps: string[];
  props: PropRow[];
  states: string[];
  accessibility: string[];
  customization: string[];
  responsive: string[];
  /** Usage example source (how to call the component). */
  source: string;
  /** The component's own implementation file — what you actually copy into your project. */
  componentSource: string;
  /** Path shown above the component source block, e.g. "src/components/saas/utilities/empty-state.tsx". */
  componentSourcePath: string;
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
    componentSourcePath: "src/components/saas/dashboard/revenue-analytics-card.tsx",
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
    componentSourcePath: "src/components/saas/dashboard/usage-metrics-card.tsx",
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
    componentSourcePath: "src/components/saas/analytics/analytics-chart-card.tsx",
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
    componentSourcePath: "src/components/saas/utilities/empty-state.tsx",
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
    componentSourcePath: "src/components/saas/utilities/confirmation-dialog.tsx",
    preview: <ConfirmationDialogExample />,
  },
  "dashboard-overview": {
    slug: "dashboard-overview",
    installDeps: ["recharts", "lucide-react"],
    props: [
      { name: "workspaceName", type: "string", description: "Optional subtitle under the Overview heading." },
      { name: "metrics", type: "DashboardMetric[]", required: true, description: "KPI cards to render at the top." },
      { name: "revenueSeries", type: "ChartPoint[]", required: true, description: "Series plotted in the main revenue chart." },
      { name: "activity", type: "ActivityItem[]", required: true, description: "Feed shown in the Recent Activity card (first 5 shown)." },
      { name: "ranges", type: "string[]", default: '["7d", "30d", "90d"]', description: "Options for the date range select." },
      { name: "defaultRange", type: "string", default: '"30d"', description: "Initially selected range." },
      { name: "onRangeChange", type: "(range: string) => void", description: "Called when the date range changes." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a full-page skeleton." },
    ],
    states: ["Normal", "Loading (skeleton)", "Empty (no metrics, revenue or activity)"],
    accessibility: ["Composes `RevenueAnalyticsCard`, `AnalyticsChartCard` and `ActivityTimeline`, inheriting their accessibility behavior."],
    customization: ["Pass any number of `metrics` — the grid reflows from 1 to 3 columns automatically."],
    responsive: ["Metrics grid: 1 column on mobile, 2 on tablet, 3 on desktop."],
    source: dashboardOverviewSource,
    componentSource: dashboardOverviewComponentSource,
    componentSourcePath: "src/components/saas/dashboard/dashboard-overview.tsx",
    preview: <DashboardOverviewExample />,
  },
  "user-management-table": {
    slug: "user-management-table",
    installDeps: ["lucide-react"],
    props: [
      { name: "users", type: "SaaSUser[]", required: true, description: "Full dataset — search/filter/pagination run client-side over this array." },
      { name: "pageSize", type: "number", default: "5", description: "Rows per page." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
      { name: "error", type: "string", description: "Replaces the table with an error state when set." },
      { name: "onRetry", type: "() => void", description: "Shown as a button in the error state." },
      { name: "onView", type: "(user: SaaSUser) => void", description: "Row action: View." },
      { name: "onEdit", type: "(user: SaaSUser) => void", description: "Row action: Edit." },
      { name: "onSuspend", type: "(user: SaaSUser) => void", description: "Row action: Suspend (hidden for already-suspended users)." },
      { name: "onDelete", type: "(user: SaaSUser) => void", description: "Row action: Delete." },
    ],
    states: ["Normal", "Loading (skeleton)", "Empty (no matches)", "Error (with retry)"],
    accessibility: ["Row actions are in a keyboard-operable Radix dropdown menu with an `aria-label` per user."],
    customization: ["Pair `onDelete` with the `ConfirmationDialog` component for a destructive-action confirmation."],
    responsive: ["Role and Last Active columns hide below `sm` / `md` breakpoints; the table scrolls horizontally as a fallback."],
    source: userManagementTableSource,
    componentSource: userManagementTableComponentSource,
    componentSourcePath: "src/components/saas/users/user-management-table.tsx",
    preview: <UserManagementTableExample />,
  },
  "subscription-status-card": {
    slug: "subscription-status-card",
    installDeps: [],
    props: [
      { name: "planName", type: "string", required: true, description: "Current plan name." },
      { name: "price", type: "number", required: true, description: "Plan price." },
      { name: "currency", type: "string", default: "\"USD\"", description: "ISO currency code." },
      { name: "billingCycle", type: '"monthly" | "yearly"', required: true, description: "Billing period." },
      { name: "status", type: '"active" | "trial" | "past_due" | "cancelled"', required: true, description: "Subscription lifecycle state." },
      { name: "renewalDate", type: "string", required: true, description: "Pre-formatted renewal/expiry date." },
      { name: "usageLabel", type: "string", description: "Label for the optional usage bar (e.g. \"Seats used\")." },
      { name: "usageValue", type: "number", description: "Current usage value." },
      { name: "usageLimit", type: "number", description: "Usage limit." },
      { name: "onUpgrade", type: "() => void", description: "Upgrade button handler." },
      { name: "onManage", type: "() => void", description: "Manage subscription button handler." },
      { name: "onCancel", type: "() => void", description: "Cancel button handler (shown only when `status` is \"active\")." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Active", "Trial", "Past due", "Cancelled", "Loading"],
    accessibility: ["Status is shown with both a label and color via `Badge`, never color alone."],
    customization: ["Omit `usageLabel`/`usageValue`/`usageLimit` together to hide the usage bar entirely."],
    responsive: ["Card is capped at `max-w-sm`; footer buttons wrap on narrow containers."],
    source: subscriptionStatusCardSource,
    componentSource: subscriptionStatusCardComponentSource,
    componentSourcePath: "src/components/saas/billing/subscription-status-card.tsx",
    preview: <SubscriptionStatusCardExample />,
  },
  "pricing-plan-comparison": {
    slug: "pricing-plan-comparison",
    installDeps: ["lucide-react"],
    props: [
      { name: "plans", type: "PricingPlan[]", required: true, description: "Plans to compare." },
      { name: "yearly", type: "boolean", description: "Controlled billing period; omit for internal state." },
      { name: "onYearlyChange", type: "(yearly: boolean) => void", description: "Called when the toggle changes." },
      { name: "onSelectPlan", type: "(plan: PricingPlan) => void", description: "Called when a plan's CTA is clicked." },
      { name: "currentPlanId", type: "string", description: "Disables the CTA and labels the matching card as current." },
    ],
    states: ["Normal", "3 plans", "4 plans", "Current plan selected"],
    accessibility: ["The monthly/yearly switch has an associated `Label` on both sides for screen readers."],
    customization: ["`feature.included` accepts `true | false | string` — pass a string (e.g. \"5 seats\") to show a value instead of a checkmark."],
    responsive: ["Grid adapts from 1 column to 3 (or 4) columns based on `plans.length`."],
    source: pricingPlanComparisonSource,
    componentSource: pricingPlanComparisonComponentSource,
    componentSourcePath: "src/components/saas/billing/pricing-plan-comparison.tsx",
    preview: <PricingPlanComparisonExample />,
  },
  "activity-timeline": {
    slug: "activity-timeline",
    installDeps: ["lucide-react"],
    props: [
      { name: "items", type: "ActivityItem[]", required: true, description: "Events to render, in order." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton timeline." },
      { name: "emptyTitle", type: "string", default: '"No activity yet"', description: "Empty state heading." },
      { name: "emptyDescription", type: "string", description: "Empty state description." },
    ],
    states: ["Normal", "Loading (skeleton)", "Empty"],
    accessibility: ["Rendered as an ordered list (`<ol>`) so assistive tech announces event order and count."],
    customization: ["Add new `ActivityType` values by extending the type and the `iconByType` map."],
    responsive: ["Single-column layout works at any width; cap the container width for readability on wide screens."],
    source: activityTimelineSource,
    componentSource: activityTimelineComponentSource,
    componentSourcePath: "src/components/saas/analytics/activity-timeline.tsx",
    preview: (
      <div className="max-w-md">
        <ActivityTimelineExample />
      </div>
    ),
  },
  "notifications-center": {
    slug: "notifications-center",
    installDeps: ["lucide-react"],
    props: [
      { name: "notifications", type: "NotificationItem[]", required: true, description: "Notifications to display." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton list." },
      { name: "onMarkAsRead", type: "(id: string) => void", description: "Called when an unread notification is clicked." },
      { name: "onMarkAllAsRead", type: "() => void", description: "Shown as a header button when there are unread notifications." },
      { name: "onDelete", type: "(id: string) => void", description: "Delete button handler per notification." },
    ],
    states: ["Normal", "Unread", "Empty", "Loading"],
    accessibility: ["Each notification is a full-width button so it's reachable and activatable via keyboard."],
    customization: ["Notification `category` is data-only today — group by it in your own list if needed."],
    responsive: ["Capped at `max-w-md`; safe to drop into a header dropdown or a dedicated page."],
    source: notificationsCenterSource,
    componentSource: notificationsCenterComponentSource,
    componentSourcePath: "src/components/saas/utilities/notifications-center.tsx",
    preview: <NotificationsCenterExample />,
  },
  "invoice-list": {
    slug: "invoice-list",
    installDeps: ["lucide-react"],
    props: [
      { name: "invoices", type: "InvoiceRecord[]", required: true, description: "Invoices to render." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton table." },
      { name: "onView", type: "(invoice: InvoiceRecord) => void", description: "View action handler." },
      { name: "onDownload", type: "(invoice: InvoiceRecord) => void", description: "Download action handler." },
    ],
    states: ["Normal", "Loading (skeleton)", "Empty"],
    accessibility: ["Action buttons have descriptive `aria-label`s including the invoice ID."],
    customization: ["Wire `onDownload` to a signed URL fetch or a client-side PDF generator — this component only handles the click."],
    responsive: ["Payment method column hides below `sm`; table scrolls horizontally as a fallback."],
    source: invoiceListSource,
    componentSource: invoiceListComponentSource,
    componentSourcePath: "src/components/saas/billing/invoice-list.tsx",
    preview: <InvoiceListExample />,
  },
  "payment-method-card": {
    slug: "payment-method-card",
    installDeps: ["lucide-react"],
    props: [
      { name: "methods", type: "PaymentMethodInfo[]", required: true, description: "Payment methods to display." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton list." },
      { name: "onEdit", type: "(method: PaymentMethodInfo) => void", description: "Edit action handler." },
      { name: "onRemove", type: "(method: PaymentMethodInfo) => void", description: "Remove action handler (hidden for the default method)." },
      { name: "onSetDefault", type: "(method: PaymentMethodInfo) => void", description: "Set-as-default action handler." },
      { name: "onAddMethod", type: "() => void", description: "Shown as the empty state's primary action." },
    ],
    states: ["Normal (one or more methods)", "Empty", "Loading"],
    accessibility: ["Never stores or displays a full card number — only brand, last 4 digits and expiry, per PCI-conscious defaults."],
    customization: ["Extend `brand` in the shared type and `brandLabel` map to support additional card networks."],
    responsive: ["Capped at `max-w-md`; each method's action row wraps on narrow screens."],
    source: paymentMethodCardSource,
    componentSource: paymentMethodCardComponentSource,
    componentSourcePath: "src/components/saas/billing/payment-method-card.tsx",
    preview: <PaymentMethodCardExample />,
  },
  "team-members-manager": {
    slug: "team-members-manager",
    installDeps: ["lucide-react"],
    props: [
      { name: "members", type: "SaaSUser[]", required: true, description: "Team members to display." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton list." },
      { name: "invitableRoles", type: "UserRole[]", default: '["Admin", "Member", "Viewer"]', description: "Roles offered in the invite dialog." },
      { name: "onInvite", type: "(email: string, role: UserRole) => void", description: "Called when the invite form is submitted." },
      { name: "onRoleChange", type: "(member: SaaSUser, role: UserRole) => void", description: "Enables an inline role-change select per row when provided." },
      { name: "onRemove", type: "(member: SaaSUser) => void", description: "Remove action handler (hidden for the Owner)." },
    ],
    states: ["Normal", "Empty", "Loading", "Invite dialog open"],
    accessibility: ["The invite dialog uses Radix Dialog, trapping focus and returning it to the trigger on close."],
    customization: ["Omit `onRoleChange` to render roles as read-only text instead of an editable select."],
    responsive: ["Member rows wrap their action cluster onto a new line on narrow containers instead of overflowing."],
    source: teamMembersManagerSource,
    componentSource: teamMembersManagerComponentSource,
    componentSourcePath: "src/components/saas/users/team-members-manager.tsx",
    preview: <TeamMembersManagerExample />,
  },
  "role-permission-matrix": {
    slug: "role-permission-matrix",
    installDeps: [],
    props: [
      { name: "rows", type: "PermissionMatrixRow[]", required: true, description: "One row per feature/permission." },
      { name: "roles", type: "UserRole[]", default: '["Owner", "Admin", "Member", "Viewer"]', description: "Columns to render." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton matrix." },
      { name: "onToggle", type: "(feature: string, role: UserRole, value: boolean) => void", description: "Omit to render a read-only matrix; provide to make checkboxes interactive." },
    ],
    states: ["Read-only", "Editable", "Loading"],
    accessibility: ["Each checkbox has an `aria-label` combining the role and feature (e.g. \"Admin: Manage users\")."],
    customization: ["Pass a subset of `roles` to compare only specific roles."],
    responsive: ["Table scrolls horizontally on narrow screens rather than compressing columns unreadably."],
    source: rolePermissionMatrixSource,
    componentSource: rolePermissionMatrixComponentSource,
    componentSourcePath: "src/components/saas/users/role-permission-matrix.tsx",
    preview: <RolePermissionMatrixExample />,
  },
  "api-key-manager": {
    slug: "api-key-manager",
    installDeps: ["@radix-ui/react-alert-dialog", "lucide-react"],
    props: [
      { name: "apiKeys", type: "ApiKeyRecord[]", required: true, description: "Keys to display (always masked)." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows a skeleton list." },
      { name: "isRevoking", type: "boolean", default: "false", description: "Shows a spinner on the revoke confirmation button." },
      { name: "onCreate", type: "() => void", description: "Create-key button handler." },
      { name: "onRevoke", type: "(key: ApiKeyRecord) => void", description: "Called after the revoke confirmation dialog is confirmed." },
      { name: "onCopy", type: "(key: ApiKeyRecord) => void", description: "Copy-icon click handler." },
    ],
    states: ["Normal", "Empty", "Loading", "Revoke confirmation open", "Revoking"],
    accessibility: ["Revocation always goes through the shared `ConfirmationDialog` — never a direct destructive click."],
    customization: ["`maskedKey` is provided by you — never compute or display a real secret client-side."],
    responsive: ["Key rows wrap the action button below the key details on very narrow screens."],
    source: apiKeyManagerSource,
    componentSource: apiKeyManagerComponentSource,
    componentSourcePath: "src/components/saas/settings/api-key-manager.tsx",
    preview: <ApiKeyManagerExample />,
  },
  "organization-switcher": {
    slug: "organization-switcher",
    installDeps: ["lucide-react"],
    props: [
      { name: "organizations", type: "OrganizationNode[]", required: true, description: "Organizations (with nested workspaces) to list." },
      { name: "activeOrgId", type: "string", required: true, description: "Currently active organization id." },
      { name: "onSwitchOrg", type: "(orgId: string) => void", description: "Called when a different organization is selected." },
      { name: "onCreateOrg", type: "() => void", description: "Shown as a footer action when provided." },
    ],
    states: ["Normal", "Search filtered", "No matches"],
    accessibility: ["Built on Radix Popover; the search input autofocuses when the popover opens."],
    customization: ["Workspaces are display-only today — wire your own workspace switcher on top if needed."],
    responsive: ["Trigger button truncates long organization names; popover width is fixed for consistent readability."],
    source: organizationSwitcherSource,
    componentSource: organizationSwitcherComponentSource,
    componentSourcePath: "src/components/saas/settings/organization-switcher.tsx",
    preview: <OrganizationSwitcherExample />,
  },
  "filter-toolbar": {
    slug: "filter-toolbar",
    installDeps: ["lucide-react"],
    props: [
      { name: "searchValue", type: "string", description: "Search input value (controlled)." },
      { name: "onSearchChange", type: "(value: string) => void", description: "Omit to hide the search input entirely." },
      { name: "filters", type: "FilterConfig[]", required: true, description: "Declarative filter definitions (select / multi-select / date-range)." },
      { name: "values", type: "Record<string, FilterValue>", required: true, description: "Current value per filter key." },
      { name: "onChange", type: "(key: string, value: FilterValue) => void", required: true, description: "Called whenever any filter value changes." },
      { name: "sortOptions", type: "FilterOption[]", description: "Adds a sort select when provided." },
      { name: "sortValue", type: "string", description: "Current sort value." },
      { name: "onSortChange", type: "(value: string) => void", description: "Sort change handler." },
      { name: "onClear", type: "() => void", description: "Shown once any filter or the search is active." },
    ],
    states: ["No filters active", "Filters active (Clear button visible)", "Multi-select with count badge"],
    accessibility: ["Multi-select and date-range filters use Radix Popover + native `Checkbox`/`Label` pairing for keyboard support."],
    customization: ["Add a new filter by appending a `FilterConfig` entry — no component changes required."],
    responsive: ["Toolbar wraps onto multiple lines on narrow containers via `flex-wrap`."],
    source: filterToolbarSource,
    componentSource: filterToolbarComponentSource,
    componentSourcePath: "src/components/saas/utilities/filter-toolbar.tsx",
    preview: <FilterToolbarExample />,
  },
  "data-export-menu": {
    slug: "data-export-menu",
    installDeps: ["lucide-react"],
    props: [
      { name: "onExportCSV", type: "() => void", description: "Enables and wires the CSV menu item." },
      { name: "onExportJSON", type: "() => void", description: "Enables and wires the JSON menu item." },
      { name: "onExportExcel", type: "() => void", description: "Enables the Excel item; omit to show it as \"coming soon\"." },
      { name: "isExporting", type: "boolean", default: "false", description: "Disables the trigger and shows a spinner." },
    ],
    states: ["Idle", "Exporting", "Excel unavailable"],
    accessibility: ["Built on the accessible Radix dropdown menu used throughout the library."],
    customization: ["Any omitted handler renders its menu item disabled rather than silently doing nothing."],
    responsive: ["Single trigger button; menu is positioned automatically by Radix to stay on-screen."],
    source: dataExportMenuSource,
    componentSource: dataExportMenuComponentSource,
    componentSourcePath: "src/components/saas/utilities/data-export-menu.tsx",
    preview: <DataExportMenuExample />,
  },
  "settings-form": {
    slug: "settings-form",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers"],
    props: [
      { name: "defaultValues", type: "SettingsFormValues", required: true, description: "Initial form values for all four sections." },
      { name: "onSubmit", type: "(values: SettingsFormValues) => void", required: true, description: "Called with validated values on submit." },
      { name: "onChangePassword", type: "() => void", description: "Shown in the Security tab when provided." },
      { name: "onEnableTwoFactor", type: "() => void", description: "Shown in the Security tab when `twoFactorEnabled` is false." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables submit and shows a spinner." },
      { name: "twoFactorEnabled", type: "boolean", default: "false", description: "Reflects current 2FA status." },
      { name: "languageOptions", type: "{ value: string; label: string }[]", description: "Options for the Preferences language select." },
    ],
    states: ["Normal", "Validation errors", "Submitting", "Pristine (submit disabled until dirty)"],
    accessibility: ["Every field has an associated `Label`; validation errors are rendered directly below their field."],
    customization: ["`settingsFormSchema` (Zod) is exported — extend it and the corresponding tab if you add fields."],
    responsive: ["Tabs stack their content full-width; capped at `max-w-lg` by default via `className`."],
    source: settingsFormSource,
    componentSource: settingsFormComponentSource,
    componentSourcePath: "src/components/saas/settings/settings-form.tsx",
    preview: <SettingsFormExample />,
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
    componentSourcePath: "src/components/saas/auth/login-form.tsx",
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
    componentSourcePath: "src/components/saas/auth/signup-form.tsx",
    preview: <SignupFormExample />,
  },
  "onboarding-wizard": {
    slug: "onboarding-wizard",
    installDeps: ["lucide-react"],
    props: [
      { name: "steps", type: "OnboardingStep[]", required: true, description: "Ordered steps; each carries its own `content` node." },
      { name: "currentStep", type: "number", description: "Controlled active step index; omit for internal state." },
      { name: "onStepChange", type: "(index: number) => void", description: "Called when the user navigates between steps." },
      { name: "onComplete", type: "() => void", required: true, description: "Called when Finish is clicked on the last step." },
      { name: "isCompleting", type: "boolean", default: "false", description: "Disables Finish and shows a spinner." },
    ],
    states: ["First step (Back disabled)", "Middle step", "Last step (Finish button)", "Completing"],
    accessibility: ["The step progress indicator has an `aria-label` announcing the current step and total count."],
    customization: ["Each step's `content` is a plain `ReactNode` — compose any form or media inside a step."],
    responsive: ["Capped at `max-w-lg`; footer buttons remain on one row down to narrow mobile widths."],
    source: onboardingWizardSource,
    componentSource: onboardingWizardComponentSource,
    componentSourcePath: "src/components/saas/auth/onboarding-wizard.tsx",
    preview: <OnboardingWizardExample />,
  },
  "reset-password-flow": {
    slug: "reset-password-flow",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers", "lucide-react"],
    props: [
      { name: "stage", type: '"request" | "sent" | "reset" | "success"', required: true, description: "Which step of the flow to render." },
      { name: "email", type: "string", description: "Pre-fills the request form and is shown on the \"sent\" stage." },
      { name: "onRequestReset", type: "(values: { email: string }) => void", required: true, description: "Called when the request-stage form is submitted." },
      { name: "onResetPassword", type: "(values: { password: string; confirmPassword: string }) => void", required: true, description: "Called when the reset-stage form is submitted." },
      { name: "onBackToLogin", type: "() => void", description: "Shown as a link/button on the request, sent and success stages." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables the active form's submit button." },
      { name: "error", type: "string", description: "Shown as a banner on the request/reset stages." },
    ],
    states: ["Request", "Sent (check your email)", "Reset (new password)", "Success"],
    accessibility: ["Each stage's confirmation icon is decorative (`aria-hidden`); the message text carries the meaning."],
    customization: ["`stage` is fully controlled — drive it from your router/token-verification logic."],
    responsive: ["Capped at `max-w-sm`; confirmation stages center their content for a focused, single-task screen."],
    source: resetPasswordFlowSource,
    componentSource: resetPasswordFlowComponentSource,
    componentSourcePath: "src/components/saas/auth/reset-password-flow.tsx",
    preview: <ResetPasswordFlowExample />,
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
    componentSourcePath: "src/components/saas/marketing/faq-accordion-section.tsx",
    preview: <FAQAccordionExample />,
  },
  "feature-grid": {
    slug: "feature-grid",
    installDeps: ["lucide-react"],
    props: [
      { name: "title", type: "string", description: "Section heading." },
      { name: "description", type: "string", description: "Optional supporting text under the heading." },
      { name: "features", type: "FeatureItem[]", required: true, description: "Icon + title + description entries." },
    ],
    states: ["Normal", "Without a title/description"],
    accessibility: ["Icons are decorative (`aria-hidden`); the title and description text carry the meaning."],
    customization: ["Pass any `lucide-react` icon per feature via `icon` — no icon-mapping file needed."],
    responsive: ["Grid reflows from 1 to 3 columns based on viewport width."],
    source: featureGridSource,
    componentSource: featureGridComponentSource,
    componentSourcePath: "src/components/saas/marketing/feature-grid-section.tsx",
    preview: <FeatureGridExample />,
  },
  "cta-banner": {
    slug: "cta-banner",
    installDeps: [],
    props: [
      { name: "title", type: "string", required: true, description: "Banner heading." },
      { name: "description", type: "string", description: "Optional supporting text under the heading." },
      { name: "primaryAction", type: "{ label: string; onClick: () => void }", required: true, description: "Primary call to action." },
      { name: "secondaryAction", type: "{ label: string; onClick: () => void }", description: "Optional secondary call to action." },
    ],
    states: ["Primary action only", "Primary + secondary action"],
    accessibility: ["Actions render as real `Button` elements, fully keyboard-operable."],
    customization: ["Drop it into a tinted or neutral section — the banner already carries its own background and border."],
    responsive: ["Capped at `max-w-2xl`; actions wrap onto their own row on narrow screens."],
    source: ctaBannerSource,
    componentSource: ctaBannerComponentSource,
    componentSourcePath: "src/components/saas/marketing/cta-banner-section.tsx",
    preview: <CTABannerExample />,
  },
  "goal-progress-card": {
    slug: "goal-progress-card",
    installDeps: [],
    props: [
      { name: "title", type: "string", required: true, description: "Goal label, e.g. \"Q3 revenue goal\"." },
      { name: "current", type: "number", required: true, description: "Current progress value." },
      { name: "target", type: "number", required: true, description: "Target value for the goal." },
      { name: "unit", type: "string", description: "Unit suffix shown after non-currency numbers." },
      { name: "formatAsCurrency", type: "boolean", default: "false", description: "Format `current`/`target` as USD currency." },
      { name: "deadlineLabel", type: "string", description: "Pre-formatted deadline text, e.g. \"12 days left\"." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Normal", "Goal reached", "Loading (skeleton)"],
    accessibility: ["The progress bar has an `aria-label` describing the goal and current percentage."],
    customization: ["Set `formatAsCurrency={false}` and pass `unit` for non-monetary goals like signups or seats filled."],
    responsive: ["Card is capped at `max-w-sm`; value and target line wraps gracefully on narrow containers."],
    source: goalProgressCardSource,
    componentSource: goalProgressCardComponentSource,
    componentSourcePath: "src/components/saas/dashboard/goal-progress-card.tsx",
    preview: <GoalProgressCardExample />,
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
    componentSourcePath: "src/components/saas/ecommerce/order-summary-card.tsx",
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
    componentSourcePath: "src/components/saas/ecommerce/product-card-grid.tsx",
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
    componentSourcePath: "src/components/saas/ecommerce/coupon-code-input.tsx",
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
    componentSourcePath: "src/components/saas/ecommerce/order-confirmation-card.tsx",
    preview: <OrderConfirmationCardExample />,
  },
  "shopping-cart-drawer": {
    slug: "shopping-cart-drawer",
    installDeps: ["@radix-ui/react-dialog", "lucide-react"],
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls drawer visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the drawer is dismissed." },
      { name: "items", type: "CartItem[]", required: true, description: "Cart line items." },
      { name: "subtotal", type: "number", required: true, description: "Running subtotal shown in the footer." },
      { name: "currency", type: "string", default: '"USD"', description: "ISO currency code used for formatting." },
      { name: "onQuantityChange", type: "(id: string, quantity: number) => void", description: "Called when +/- is clicked on a line item." },
      { name: "onRemove", type: "(id: string) => void", description: "Remove-item handler." },
      { name: "onCheckout", type: "() => void", description: "Checkout button handler." },
      { name: "isCheckingOut", type: "boolean", default: "false", description: "Disables checkout and shows a spinner." },
    ],
    states: ["Empty", "With items", "Checking out"],
    accessibility: ["Built on Radix Dialog: focus is trapped inside the drawer and returned to the trigger on close."],
    customization: ["Quantity controls are disabled automatically at a minimum of 1 — no separate min/max props needed."],
    responsive: ["Slides in from the right at `max-w-sm`; full-width on very narrow screens."],
    source: shoppingCartDrawerSource,
    componentSource: shoppingCartDrawerComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/shopping-cart-drawer.tsx",
    preview: <ShoppingCartDrawerExample />,
  },
  "payment-method-selector": {
    slug: "payment-method-selector",
    installDeps: ["lucide-react"],
    props: [
      { name: "methods", type: "PaymentMethodInfo[]", required: true, description: "Saved payment methods to list." },
      { name: "selectedId", type: "string", description: "Currently selected method id." },
      { name: "onSelect", type: "(id: string) => void", required: true, description: "Called when a method is selected." },
      { name: "onAddNew", type: "() => void", description: "Shown as a dashed \"Add new\" row when provided." },
    ],
    states: ["Normal", "Selected", "With add-new option"],
    accessibility: ["Uses `role=\"radiogroup\"`/`role=\"radio\"` with `aria-checked` so it's announced as a single-choice list."],
    customization: ["Extend the shared `PaymentMethodInfo` type and `brandLabel` map to support more card networks."],
    responsive: ["Capped at `max-w-sm`; each row wraps its label rather than truncating the card details."],
    source: paymentMethodSelectorSource,
    componentSource: paymentMethodSelectorComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/payment-method-selector.tsx",
    preview: <PaymentMethodSelectorExample />,
  },
  "shipping-address-form": {
    slug: "shipping-address-form",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers"],
    props: [
      { name: "defaultValues", type: "Partial<ShippingAddressValues>", description: "Initial field values." },
      { name: "countryOptions", type: "{ value: string; label: string }[]", description: "Options for the Country select." },
      { name: "onSubmit", type: "(values: ShippingAddressValues) => void", required: true, description: "Called with validated values on submit." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables submit and shows a spinner." },
    ],
    states: ["Normal", "Validation errors", "Submitting"],
    accessibility: ["Every field has an associated `Label`; validation errors render directly below their field."],
    customization: ["`shippingAddressSchema` (Zod) is exported — extend it if you need additional fields (e.g. phone number)."],
    responsive: ["Capped at `max-w-md`; city/state and postal/country stay a 2-column pair down to small mobile widths."],
    source: shippingAddressFormSource,
    componentSource: shippingAddressFormComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/shipping-address-form.tsx",
    preview: <ShippingAddressFormExample />,
  },
  "order-tracking-timeline": {
    slug: "order-tracking-timeline",
    installDeps: ["lucide-react"],
    props: [
      { name: "steps", type: "OrderTrackingStep[]", required: true, description: "Ordered shipment steps to render." },
      { name: "currentStatus", type: "OrderStatus", required: true, description: "Determines which steps are marked complete vs upcoming." },
    ],
    states: ["Placed", "Processing", "Shipped", "Out for delivery", "Delivered"],
    accessibility: ["Rendered as an ordered list (`<ol>`) so assistive tech announces step order and count."],
    customization: ["Pass a subset of `OrderStatus` steps if your fulfillment flow skips a stage (e.g. digital goods skip shipping)."],
    responsive: ["Capped at `max-w-md`; the connecting line scales to the content height automatically."],
    source: orderTrackingTimelineSource,
    componentSource: orderTrackingTimelineComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/order-tracking-timeline.tsx",
    preview: <OrderTrackingTimelineExample />,
  },
  "checkout-stepper": {
    slug: "checkout-stepper",
    installDeps: ["lucide-react"],
    props: [
      { name: "steps", type: "CheckoutStep[]", required: true, description: "Ordered steps; each carries its own `content` node." },
      { name: "currentStep", type: "number", description: "Controlled active step index; omit for internal state." },
      { name: "onStepChange", type: "(index: number) => void", description: "Called when the user navigates between steps." },
      { name: "onComplete", type: "() => void", required: true, description: "Called when the final step's action is clicked." },
      { name: "isCompleting", type: "boolean", default: "false", description: "Disables the final action and shows a spinner." },
      { name: "completeLabel", type: "string", default: '"Place order"', description: "Label for the final step's action button." },
    ],
    states: ["First step", "Middle step", "Last step", "Completing"],
    accessibility: ["Step labels are visible text (not icon-only) from `sm` breakpoints up; numbers double as a fallback on mobile."],
    customization: ["Each step's `content` is a plain `ReactNode` — compose shipping/payment/review forms per step."],
    responsive: ["Capped at `max-w-lg`; step labels hide below `sm`, leaving just the numbered indicators."],
    source: checkoutStepperSource,
    componentSource: checkoutStepperComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/checkout-stepper.tsx",
    preview: <CheckoutStepperExample />,
  },
  "wishlist-item-list": {
    slug: "wishlist-item-list",
    installDeps: ["lucide-react"],
    props: [
      { name: "items", type: "ProductItem[]", required: true, description: "Saved items to display." },
      { name: "onMoveToCart", type: "(item: ProductItem) => void", description: "Move-to-cart button handler (disabled when out of stock)." },
      { name: "onRemove", type: "(item: ProductItem) => void", description: "Remove-from-wishlist handler." },
    ],
    states: ["Normal", "Out of stock item", "Empty"],
    accessibility: ["Uses the shared `EmptyState` component when there are no items, consistent with the rest of the library."],
    customization: ["Pair `onMoveToCart` with your cart state/`ShoppingCartDrawer` to complete the flow."],
    responsive: ["Capped at `max-w-lg`; each row's actions wrap onto a new line on very narrow screens."],
    source: wishlistItemListSource,
    componentSource: wishlistItemListComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/wishlist-item-list.tsx",
    preview: <WishlistItemListExample />,
  },
  "product-quick-view-modal": {
    slug: "product-quick-view-modal",
    installDeps: ["@radix-ui/react-dialog", "lucide-react"],
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls modal visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the modal is dismissed." },
      { name: "product", type: "ProductItem", required: true, description: "Product to display." },
      { name: "variantOptions", type: "{ value: string; label: string }[]", description: "Shows a variant select when provided." },
      { name: "onAddToCart", type: "(quantity: number, variant?: string) => void", description: "Called with the selected quantity/variant." },
    ],
    states: ["Normal", "Out of stock", "With variants"],
    accessibility: ["Built on Radix Dialog: focus is trapped inside the modal and returned to the trigger on close."],
    customization: ["Omit `variantOptions` entirely for products without variants — the select is not rendered."],
    responsive: ["Capped at `max-w-lg`; image and details stack to a single column below `sm`."],
    source: productQuickViewModalSource,
    componentSource: productQuickViewModalComponentSource,
    componentSourcePath: "src/components/saas/ecommerce/product-quick-view-modal.tsx",
    preview: <ProductQuickViewModalExample />,
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
    componentSourcePath: "src/components/saas/communication/comment-thread.tsx",
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
    componentSourcePath: "src/components/saas/communication/typing-indicator.tsx",
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
    componentSourcePath: "src/components/saas/communication/announcement-banner.tsx",
    preview: <AnnouncementBannerExample />,
  },
  "chat-widget": {
    slug: "chat-widget",
    installDeps: ["lucide-react"],
    props: [
      { name: "open", type: "boolean", required: true, description: "Shows the launcher bubble when false, the full panel when true." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the launcher or close button is clicked." },
      { name: "messages", type: "ChatMessage[]", required: true, description: "Messages to render, oldest first." },
      { name: "currentUserId", type: "string", required: true, description: "Determines which messages are right-aligned." },
      { name: "onSend", type: "(content: string) => void", required: true, description: "Called when the composer is submitted (Enter or the send button)." },
      { name: "isSending", type: "boolean", default: "false", description: "Disables the send button while true." },
      { name: "title", type: "string", default: '"Chat with us"', description: "Panel header text." },
    ],
    states: ["Closed (launcher)", "Open", "Sending"],
    accessibility: ["The launcher and close button both have explicit `aria-label`s since they're icon-only."],
    customization: ["Position the widget yourself (e.g. `fixed bottom-4 right-4`) — the component has no built-in positioning."],
    responsive: ["Capped at `max-w-sm` with a fixed height; the message list scrolls independently of the composer."],
    source: chatWidgetSource,
    componentSource: chatWidgetComponentSource,
    componentSourcePath: "src/components/saas/communication/chat-widget.tsx",
    preview: <ChatWidgetExample />,
  },
  "message-bubble-list": {
    slug: "message-bubble-list",
    installDeps: [],
    props: [
      { name: "messages", type: "ChatMessage[]", required: true, description: "Messages to render, oldest first." },
      { name: "currentUserId", type: "string", required: true, description: "Determines which messages are right-aligned." },
    ],
    states: ["Normal", "Single message", "Long message text"],
    accessibility: ["Timestamps use relative, human-readable text rather than raw ISO strings."],
    customization: ["Pair with `ChatWidget` or your own composer — this component is display-only."],
    responsive: ["Capped at `max-w-md`; bubbles wrap at 75% of the container width."],
    source: messageBubbleListSource,
    componentSource: messageBubbleListComponentSource,
    componentSourcePath: "src/components/saas/communication/message-bubble-list.tsx",
    preview: <MessageBubbleListExample />,
  },
  "support-inbox-list": {
    slug: "support-inbox-list",
    installDeps: [],
    props: [
      { name: "conversations", type: "SupportConversation[]", required: true, description: "Conversations to list." },
      { name: "selectedId", type: "string", description: "Highlights the matching conversation row." },
      { name: "onSelect", type: "(id: string) => void", description: "Called when a conversation row is clicked." },
    ],
    states: ["Normal", "Selected row", "Unread count", "Open/pending/closed status"],
    accessibility: ["Each row is a real button, keyboard-focusable and activatable."],
    customization: ["Combine with `MessageBubbleList` for a full two-pane support inbox layout."],
    responsive: ["Capped at `max-w-md`; row content truncates rather than wrapping to keep row heights consistent."],
    source: supportInboxListSource,
    componentSource: supportInboxListComponentSource,
    componentSourcePath: "src/components/saas/communication/support-inbox-list.tsx",
    preview: <SupportInboxListExample />,
  },
  "mention-autocomplete-input": {
    slug: "mention-autocomplete-input",
    installDeps: [],
    props: [
      { name: "users", type: "MentionableUser[]", required: true, description: "Users available to @-mention." },
      { name: "placeholder", type: "string", description: "Input placeholder text." },
      { name: "onSubmit", type: "(content: string, mentionedIds: string[]) => void", required: true, description: "Called with the text and ids of users mentioned." },
    ],
    states: ["Empty", "Typing (no @)", "@-suggestions open", "With mentions"],
    accessibility: ["Suggestions are a simple button list — fully reachable via Tab, unlike a native `<datalist>`."],
    customization: ["Matching is a simple case-insensitive substring filter — swap in fuzzy matching if needed for large user lists."],
    responsive: ["Capped at `max-w-md`; the suggestion popover is a fixed width positioned under the input."],
    source: mentionAutocompleteInputSource,
    componentSource: mentionAutocompleteInputComponentSource,
    componentSourcePath: "src/components/saas/communication/mention-autocomplete-input.tsx",
    preview: <MentionAutocompleteInputExample />,
  },
  "chat-channel-sidebar": {
    slug: "chat-channel-sidebar",
    installDeps: ["lucide-react"],
    props: [
      { name: "channels", type: "ChatChannel[]", required: true, description: "Channels to list." },
      { name: "activeChannelId", type: "string", required: true, description: "Highlights the matching channel." },
      { name: "onSelectChannel", type: "(id: string) => void", required: true, description: "Called when a channel is clicked." },
      { name: "onCreateChannel", type: "() => void", description: "Shown as a \"+\" button in the header when provided." },
    ],
    states: ["Normal", "Active channel", "Unread count", "Private channel"],
    accessibility: ["Private channels use a lock icon in addition to being visually distinct — never color alone."],
    customization: ["Capped at `max-w-56` by default — override via `className` to fit a wider or narrower app shell."],
    responsive: ["Designed as a fixed-width sidebar; wrap in a scrollable container for long channel lists."],
    source: chatChannelSidebarSource,
    componentSource: chatChannelSidebarComponentSource,
    componentSourcePath: "src/components/saas/communication/chat-channel-sidebar.tsx",
    preview: <ChatChannelSidebarExample />,
  },
  "video-call-card": {
    slug: "video-call-card",
    installDeps: ["lucide-react"],
    props: [
      { name: "participants", type: "VideoCallParticipant[]", required: true, description: "Call participants to render as tiles." },
      { name: "isMuted", type: "boolean", default: "false", description: "Controls the local mute button state." },
      { name: "isCameraOff", type: "boolean", default: "false", description: "Controls the local camera button state." },
      { name: "onToggleMute", type: "() => void", description: "Mute button handler." },
      { name: "onToggleCamera", type: "() => void", description: "Camera button handler." },
      { name: "onLeave", type: "() => void", description: "Shown as a red leave-call button when provided." },
    ],
    states: ["1 participant", "2-4 participants (2-col grid)", "5+ participants (3-col grid)", "Muted", "Camera off"],
    accessibility: ["Every control button has an explicit `aria-label`; mute state is also shown as text on the tile, not color alone."],
    customization: ["This component doesn't render real video — swap the placeholder `Video` icon tile for a `<video>` element per participant."],
    responsive: ["Capped at `max-w-lg`; the participant grid adapts column count to participant count."],
    source: videoCallCardSource,
    componentSource: videoCallCardComponentSource,
    componentSourcePath: "src/components/saas/communication/video-call-card.tsx",
    preview: <VideoCallCardExample />,
  },
  "feedback-widget": {
    slug: "feedback-widget",
    installDeps: ["lucide-react"],
    props: [
      { name: "onSubmit", type: "(rating: \"positive\" | \"negative\", comment: string) => void", required: true, description: "Called when Submit feedback is clicked." },
      { name: "isSubmitting", type: "boolean", default: "false", description: "Disables submit and shows a spinner." },
      { name: "isSubmitted", type: "boolean", default: "false", description: "Replaces the widget with a thank-you state." },
    ],
    states: ["Unrated", "Rated (comment box shown)", "Submitting", "Submitted"],
    accessibility: ["Rating buttons use `aria-pressed` to communicate the selected state to assistive tech."],
    customization: ["Comment is always optional — submit is enabled as soon as a rating is picked."],
    responsive: ["Capped at `max-w-sm`; fits well in a corner-anchored widget or an inline card."],
    source: feedbackWidgetSource,
    componentSource: feedbackWidgetComponentSource,
    componentSourcePath: "src/components/saas/communication/feedback-widget.tsx",
    preview: <FeedbackWidgetExample />,
  },
  "notification-preferences-panel": {
    slug: "notification-preferences-panel",
    installDeps: [],
    props: [
      { name: "preferences", type: "NotificationPreferenceRow[]", required: true, description: "One row per notification type." },
      { name: "channels", type: '("email" | "push" | "sms")[]', default: '["email", "push"]', description: "Which channel columns to render." },
      { name: "onChange", type: "(id: string, channel: NotificationChannel, value: boolean) => void", required: true, description: "Called when a switch is toggled." },
    ],
    states: ["Normal", "With SMS channel enabled"],
    accessibility: ["Each switch has a descriptive `aria-label` combining the channel and notification type."],
    customization: ["Add `\"sms\"` to `channels` for products that support SMS notifications."],
    responsive: ["Capped at `max-w-lg`; the column grid uses fixed-width channel columns so switches stay aligned."],
    source: notificationPreferencesPanelSource,
    componentSource: notificationPreferencesPanelComponentSource,
    componentSourcePath: "src/components/saas/communication/notification-preferences-panel.tsx",
    preview: <NotificationPreferencesPanelExample />,
  },
  "comparison-table": {
    slug: "comparison-table",
    installDeps: ["lucide-react"],
    props: [
      { name: "columns", type: "ComparisonColumn[]", required: true, description: "Columns to compare, e.g. your product vs. a competitor." },
      { name: "rows", type: "ComparisonRow[]", required: true, description: "One row per feature; `values` is keyed by column id." },
    ],
    states: ["Boolean cells (check/cross)", "Text cells", "Highlighted column"],
    accessibility: ["Check/cross icons carry `aria-label`s (\"Included\"/\"Not included\") — never rely on the icon shape alone."],
    customization: ["A cell value can be `true`/`false` (icon) or a string (shown as text) — mix both per row as needed."],
    responsive: ["Table scrolls horizontally on narrow screens rather than compressing columns unreadably."],
    source: comparisonTableSource,
    componentSource: comparisonTableComponentSource,
    componentSourcePath: "src/components/saas/data/comparison-table.tsx",
    preview: <ComparisonTableExample />,
  },
  "kanban-board": {
    slug: "kanban-board",
    installDeps: [],
    props: [
      { name: "columns", type: "KanbanColumn[]", required: true, description: "Columns, each with its own `cards` array." },
      { name: "onCardClick", type: "(columnId: string, card: KanbanCard) => void", description: "Called when a card is clicked." },
    ],
    states: ["Normal", "Empty column", "Card with labels"],
    accessibility: ["Cards are keyboard-focusable via `onClick` on a real element; consider adding `tabIndex`/`role` if using as a full drag-and-drop board."],
    customization: ["This component doesn't include drag-and-drop — pair it with a library like `@dnd-kit` if you need reordering."],
    responsive: ["Columns scroll horizontally as a fixed-width row rather than wrapping."],
    source: kanbanBoardSource,
    componentSource: kanbanBoardComponentSource,
    componentSourcePath: "src/components/saas/data/kanban-board.tsx",
    preview: <KanbanBoardExample />,
  },
  "calendar-event-view": {
    slug: "calendar-event-view",
    installDeps: ["lucide-react"],
    props: [
      { name: "month", type: "Date", required: true, description: "Month currently displayed." },
      { name: "events", type: "CalendarEvent[]", required: true, description: "Events to plot; matched to days by date." },
      { name: "selectedDate", type: "string", description: "Highlights the matching day and shows its events below." },
      { name: "onSelectDate", type: "(date: string) => void", description: "Called when a day is clicked." },
      { name: "onMonthChange", type: "(month: Date) => void", description: "Called when the prev/next month buttons are clicked." },
    ],
    states: ["Normal", "Day selected", "Day with no events"],
    accessibility: ["Prev/next month buttons have explicit `aria-label`s since they're icon-only."],
    customization: ["Fully controlled — drive `month`/`selectedDate` from your own state or router query params."],
    responsive: ["Capped at `max-w-md`; the 7-column grid scales down gracefully on narrow screens."],
    source: calendarEventViewSource,
    componentSource: calendarEventViewComponentSource,
    componentSourcePath: "src/components/saas/data/calendar-event-view.tsx",
    preview: <CalendarEventViewExample />,
  },
  "data-grid-inline-edit": {
    slug: "data-grid-inline-edit",
    installDeps: [],
    props: [
      { name: "columns", type: "DataGridColumn[]", required: true, description: "Column definitions." },
      { name: "rows", type: "Record<string, string>[]", required: true, description: "Row data, keyed by column `key`." },
      { name: "onCellChange", type: "(rowIndex: number, key: string, value: string) => void", required: true, description: "Called when a cell is committed (blur or Enter)." },
    ],
    states: ["Normal", "Cell editing", "Empty cell"],
    accessibility: ["Editing is triggered by a real button per cell; Enter commits, Escape cancels without saving."],
    customization: ["Swap the plain `Input` per cell for a `Select` if a column should be constrained to fixed values."],
    responsive: ["Table scrolls horizontally on narrow screens."],
    source: dataGridInlineEditSource,
    componentSource: dataGridInlineEditComponentSource,
    componentSourcePath: "src/components/saas/data/data-grid-inline-edit.tsx",
    preview: <DataGridInlineEditExample />,
  },
  "tree-view-file-explorer": {
    slug: "tree-view-file-explorer",
    installDeps: ["lucide-react"],
    props: [
      { name: "nodes", type: "TreeNode[]", required: true, description: "Root-level nodes; folders may have nested `children`." },
      { name: "onSelect", type: "(node: TreeNode) => void", description: "Called when any node (folder or file) is clicked." },
      { name: "selectedId", type: "string", description: "Highlights the matching node." },
    ],
    states: ["Collapsed folder", "Expanded folder", "File (leaf)", "Selected node"],
    accessibility: ["Every node is a real button; the chevron rotation gives a visual cue for expand/collapse state."],
    customization: ["Recursion depth is unlimited — nest `children` as deep as your file structure requires."],
    responsive: ["Capped at `max-w-sm`; long file/folder names truncate rather than wrapping."],
    source: treeViewFileExplorerSource,
    componentSource: treeViewFileExplorerComponentSource,
    componentSourcePath: "src/components/saas/data/tree-view-file-explorer.tsx",
    preview: <TreeViewFileExplorerExample />,
  },
  "gantt-chart-row": {
    slug: "gantt-chart-row",
    installDeps: [],
    props: [
      { name: "tasks", type: "GanttTask[]", required: true, description: "Tasks to plot, each with a `start`/`end` date." },
      { name: "rangeStart", type: "string", required: true, description: "Start of the visible date range." },
      { name: "rangeEnd", type: "string", required: true, description: "End of the visible date range." },
    ],
    states: ["Normal", "Task extending past range edges"],
    accessibility: ["Each bar has a `title` tooltip with the task name and exact date range for hover/focus users."],
    customization: ["Tasks outside `rangeStart`/`rangeEnd` still render — clamp your data upstream if you need strict bounds."],
    responsive: ["Capped at `max-w-2xl`; task name column has a fixed width so bars stay aligned."],
    source: ganttChartRowSource,
    componentSource: ganttChartRowComponentSource,
    componentSourcePath: "src/components/saas/data/gantt-chart-row.tsx",
    preview: <GanttChartRowExample />,
  },
  "heatmap-calendar": {
    slug: "heatmap-calendar",
    installDeps: [],
    props: [
      { name: "data", type: "HeatmapDataPoint[]", required: true, description: "One entry per date with a numeric value." },
      { name: "weeks", type: "number", default: "12", description: "How many weeks (columns) to render, ending today." },
    ],
    states: ["No activity", "Low/medium/high activity (4 intensity levels)"],
    accessibility: ["Each cell has a `title` tooltip with the exact date and value for hover/focus users."],
    customization: ["Intensity thresholds are relative to the max value in `data` — swap in fixed thresholds if you need consistent color meaning across views."],
    responsive: ["Renders inline at a fixed cell size; wrap in a scrollable container for many weeks on mobile."],
    source: heatmapCalendarSource,
    componentSource: heatmapCalendarComponentSource,
    componentSourcePath: "src/components/saas/data/heatmap-calendar.tsx",
    preview: <HeatmapCalendarExample />,
  },
  "pivot-summary-table": {
    slug: "pivot-summary-table",
    installDeps: [],
    props: [
      { name: "rows", type: "string[]", required: true, description: "Row dimension labels (e.g. regions)." },
      { name: "columns", type: "string[]", required: true, description: "Column dimension labels (e.g. months)." },
      { name: "data", type: "Record<string, Record<string, number>>", required: true, description: "Values keyed by `[row][column]`." },
      { name: "formatValue", type: "(value: number) => string", description: "Custom formatter; defaults to a plain thousands-separated number." },
    ],
    states: ["Normal", "Missing cell value (defaults to 0)"],
    accessibility: ["Row and column totals are computed automatically and clearly labeled, not left for the reader to sum."],
    customization: ["Pass `formatValue` to render currency, percentages, or any other unit."],
    responsive: ["Table scrolls horizontally on narrow screens."],
    source: pivotSummaryTableSource,
    componentSource: pivotSummaryTableComponentSource,
    componentSourcePath: "src/components/saas/data/pivot-summary-table.tsx",
    preview: <PivotSummaryTableExample />,
  },
  "virtualized-long-list": {
    slug: "virtualized-long-list",
    installDeps: [],
    props: [
      { name: "items", type: "VirtualizedListItem[]", required: true, description: "Full dataset — only visible rows are rendered to the DOM." },
      { name: "height", type: "number", default: "320", description: "Container height in pixels." },
      { name: "itemHeight", type: "number", default: "44", description: "Fixed row height in pixels." },
      { name: "overscan", type: "number", default: "4", description: "Extra rows rendered above/below the visible window to reduce flicker on fast scroll." },
    ],
    states: ["Normal (thousands of items)", "Scrolled to middle/end"],
    accessibility: ["Rows keep stable DOM structure while scrolling — screen reader users scrolling slowly still get correctly ordered content."],
    customization: ["Row height is fixed for simplicity — variable-height virtualization needs a more involved measurement strategy."],
    responsive: ["Capped at `max-w-md`; height is a fixed pixel value passed as a prop."],
    source: virtualizedLongListSource,
    componentSource: virtualizedLongListComponentSource,
    componentSourcePath: "src/components/saas/data/virtualized-long-list.tsx",
    preview: <VirtualizedLongListExample />,
  },
  "timeline-chart": {
    slug: "timeline-chart",
    installDeps: [],
    props: [
      { name: "events", type: "TimelineEvent[]", required: true, description: "Events to plot along the axis." },
      { name: "rangeStart", type: "string", required: true, description: "Start of the date axis." },
      { name: "rangeEnd", type: "string", required: true, description: "End of the date axis." },
    ],
    states: ["Normal", "Events clustered close together"],
    accessibility: ["Events are also listed as plain text below the visual axis, so the information isn't visual-only."],
    customization: ["Events are sorted by date automatically regardless of input order."],
    responsive: ["Capped at `max-w-2xl`; dot positions recalculate against the container's actual width."],
    source: timelineChartSource,
    componentSource: timelineChartComponentSource,
    componentSourcePath: "src/components/saas/data/timeline-chart.tsx",
    preview: <TimelineChartExample />,
  },
  "breadcrumbs": {
    slug: "breadcrumbs",
    installDeps: ["lucide-react"],
    props: [
      { name: "items", type: "BreadcrumbItem[]", required: true, description: "Trail items; the last one renders as the current, non-linked page." },
      { name: "onNavigate", type: "(href: string) => void", description: "Called when a linked (non-last) item is clicked." },
    ],
    states: ["Normal", "Single item", "Long labels"],
    accessibility: ["Uses `aria-current=\"page\"` on the last item and a `nav[aria-label=\"Breadcrumb\"]` landmark."],
    customization: ["Items without an `href` render as plain (non-clickable) text, even mid-trail."],
    responsive: ["Inline-flex; wrap the trail in a scrollable container for very deep hierarchies on mobile."],
    source: breadcrumbsSource,
    componentSource: breadcrumbsComponentSource,
    componentSourcePath: "src/components/saas/navigation/breadcrumbs.tsx",
    preview: <BreadcrumbsExample />,
  },
  "stepper-wizard-nav": {
    slug: "stepper-wizard-nav",
    installDeps: ["lucide-react"],
    props: [
      { name: "steps", type: "StepperStep[]", required: true, description: "Steps to render." },
      { name: "currentStep", type: "number", required: true, description: "Index of the active step." },
      { name: "onStepClick", type: "(index: number) => void", description: "Enables clicking back to already-completed steps." },
    ],
    states: ["First step", "Middle step", "Last step", "Clickable completed steps"],
    accessibility: ["Rendered as an ordered list with `aria-label=\"Progress\"` on the root."],
    customization: ["This is a display-only nav — pair it with your own step-content container (see Checkout Stepper / Onboarding Wizard for a bundled version)."],
    responsive: ["Step labels are always visible — hide them below a breakpoint via `className` overrides if space is tight."],
    source: stepperWizardNavSource,
    componentSource: stepperWizardNavComponentSource,
    componentSourcePath: "src/components/saas/navigation/stepper-wizard-nav.tsx",
    preview: <StepperWizardNavExample />,
  },
  "tab-bar-overflow": {
    slug: "tab-bar-overflow",
    installDeps: ["lucide-react"],
    props: [
      { name: "tabs", type: "TabBarItem[]", required: true, description: "All tabs, visible and overflow." },
      { name: "activeTabId", type: "string", required: true, description: "Currently selected tab." },
      { name: "onTabChange", type: "(id: string) => void", required: true, description: "Called when a visible or overflow tab is selected." },
      { name: "maxVisible", type: "number", default: "4", description: "How many tabs show inline before overflowing." },
    ],
    states: ["Normal", "Active tab in overflow", "No overflow (fits maxVisible)"],
    accessibility: ["Uses `role=\"tablist\"`/`role=\"tab\"` with `aria-selected` on visible tabs."],
    customization: ["Overflow menu is built on the shared Radix dropdown menu used throughout the library."],
    responsive: ["`maxVisible` is a fixed number, not width-based — tune it per breakpoint via your own responsive prop if needed."],
    source: tabBarOverflowSource,
    componentSource: tabBarOverflowComponentSource,
    componentSourcePath: "src/components/saas/navigation/tab-bar-overflow.tsx",
    preview: <TabBarOverflowExample />,
  },
  "pagination-bar": {
    slug: "pagination-bar",
    installDeps: ["lucide-react"],
    props: [
      { name: "currentPage", type: "number", required: true, description: "Current page (1-indexed)." },
      { name: "totalPages", type: "number", required: true, description: "Total number of pages." },
      { name: "onPageChange", type: "(page: number) => void", required: true, description: "Called with the new page number." },
    ],
    states: ["Few pages (no ellipsis)", "Many pages (with ellipsis)", "First page", "Last page"],
    accessibility: ["The current page button has `aria-current=\"page\"`; prev/next have descriptive `aria-label`s."],
    customization: ["Ellipsis placement is computed automatically — always shows first, last, and pages around the current one."],
    responsive: ["Buttons are fixed-size (`h-8 w-8`) so the bar stays compact even with many page numbers."],
    source: paginationBarSource,
    componentSource: paginationBarComponentSource,
    componentSourcePath: "src/components/saas/navigation/pagination-bar.tsx",
    preview: <PaginationBarExample />,
  },
  "command-palette": {
    slug: "command-palette",
    installDeps: ["@radix-ui/react-dialog", "lucide-react"],
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls palette visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the palette is dismissed." },
      { name: "commands", type: "CommandItem[]", required: true, description: "Full command list; filtered live against the search query." },
      { name: "placeholder", type: "string", default: '"Type a command or search..."', description: "Search input placeholder." },
    ],
    states: ["Empty query", "Filtered results", "No results", "Keyboard-navigated selection"],
    accessibility: ["Arrow keys move selection and Enter runs the highlighted command, matching common command-palette conventions."],
    customization: ["Wire your own global `⌘K`/`Ctrl+K` keyboard shortcut to toggle `open` — this component only renders the palette itself."],
    responsive: ["Capped at `max-w-md`, positioned near the top of the viewport; the result list scrolls independently."],
    source: commandPaletteSource,
    componentSource: commandPaletteComponentSource,
    componentSourcePath: "src/components/saas/navigation/command-palette.tsx",
    preview: <CommandPaletteExample />,
  },
  "vertical-nav-sidebar": {
    slug: "vertical-nav-sidebar",
    installDeps: ["lucide-react"],
    props: [
      { name: "sections", type: "NavSection[]", required: true, description: "Groups of nav items; a section's `title` is optional." },
      { name: "activeId", type: "string", required: true, description: "Currently active item id." },
      { name: "onNavigate", type: "(id: string) => void", required: true, description: "Called when a nav item is clicked." },
    ],
    states: ["Normal", "Active item", "Grouped sections", "Ungrouped (no title)"],
    accessibility: ["Each nav item is a real button; icons are decorative and paired with visible text labels."],
    customization: ["Pass any `lucide-react` icon per item via `icon` — no icon-mapping file needed."],
    responsive: ["Capped at `max-w-52`; designed as a fixed-width app shell sidebar."],
    source: verticalNavSidebarSource,
    componentSource: verticalNavSidebarComponentSource,
    componentSourcePath: "src/components/saas/navigation/vertical-nav-sidebar.tsx",
    preview: <VerticalNavSidebarExample />,
  },
  "mega-menu": {
    slug: "mega-menu",
    installDeps: ["lucide-react"],
    props: [
      { name: "label", type: "string", required: true, description: "Trigger button label." },
      { name: "sections", type: "MegaMenuSection[]", required: true, description: "Grouped columns of links." },
      { name: "onNavigate", type: "(href: string) => void", description: "Called when a link is clicked." },
    ],
    states: ["Closed", "Open"],
    accessibility: ["Built on Radix Popover: dismisses on outside click/Escape and returns focus to the trigger."],
    customization: ["Add or remove `sections`/`links` freely — the column grid is fixed at 3, but sections can have any number of links."],
    responsive: ["Panel is a fixed `w-[36rem]` — best suited to desktop nav bars; swap to a mobile drawer below `md`."],
    source: megaMenuSource,
    componentSource: megaMenuComponentSource,
    componentSourcePath: "src/components/saas/navigation/mega-menu.tsx",
    preview: <MegaMenuExample />,
  },
  "mobile-bottom-nav": {
    slug: "mobile-bottom-nav",
    installDeps: ["lucide-react"],
    props: [
      { name: "items", type: "BottomNavItem[]", required: true, description: "Nav items to render." },
      { name: "activeId", type: "string", required: true, description: "Currently active item id." },
      { name: "onNavigate", type: "(id: string) => void", required: true, description: "Called when an item is tapped." },
    ],
    states: ["Normal", "Active item"],
    accessibility: ["The active item uses `aria-current=\"page\"` in addition to a color change."],
    customization: ["Pass any `lucide-react` icon per item via `icon`."],
    responsive: ["Capped at `max-w-sm`; intended to be pinned with `fixed bottom-0` in your own app shell."],
    source: mobileBottomNavSource,
    componentSource: mobileBottomNavComponentSource,
    componentSourcePath: "src/components/saas/navigation/mobile-bottom-nav.tsx",
    preview: <MobileBottomNavExample />,
  },
  "split-pane-layout": {
    slug: "split-pane-layout",
    installDeps: [],
    props: [
      { name: "left", type: "ReactNode", required: true, description: "Content for the left pane." },
      { name: "right", type: "ReactNode", required: true, description: "Content for the right pane." },
      { name: "defaultLeftWidth", type: "number", default: "240", description: "Initial left pane width in pixels." },
      { name: "minLeftWidth", type: "number", default: "160", description: "Minimum left pane width while dragging." },
      { name: "maxLeftWidth", type: "number", default: "400", description: "Maximum left pane width while dragging." },
      { name: "height", type: "number", default: "320", description: "Fixed height of the split view in pixels." },
    ],
    states: ["Default width", "Dragging", "At min/max width"],
    accessibility: ["The divider has `role=\"separator\"` and `aria-orientation=\"vertical\"`."],
    customization: ["Both panes scroll independently — pass any content, including tables or long lists, without layout breakage."],
    responsive: ["Fixed pixel widths by design (for precise resizing); wrap in a scroll container on narrow viewports."],
    source: splitPaneLayoutSource,
    componentSource: splitPaneLayoutComponentSource,
    componentSourcePath: "src/components/saas/navigation/split-pane-layout.tsx",
    preview: <SplitPaneLayoutExample />,
  },
  "sticky-table-of-contents": {
    slug: "sticky-table-of-contents",
    installDeps: [],
    props: [
      { name: "items", type: "TocItem[]", required: true, description: "Section headings to list; `level: 2` renders as a sub-item." },
      { name: "activeId", type: "string", required: true, description: "Currently active section id." },
      { name: "onNavigate", type: "(id: string) => void", required: true, description: "Called when a TOC item is clicked." },
    ],
    states: ["Normal", "Active top-level item", "Active sub-item"],
    accessibility: ["Wrapped in a `nav[aria-label=\"Table of contents\"]` landmark."],
    customization: ["Drive `activeId` from your own scroll-spy/IntersectionObserver logic — this component is purely presentational."],
    responsive: ["Capped at `max-w-48`; pair with `sticky top-20` in your own layout to keep it pinned while scrolling."],
    source: stickyTableOfContentsSource,
    componentSource: stickyTableOfContentsComponentSource,
    componentSourcePath: "src/components/saas/navigation/sticky-table-of-contents.tsx",
    preview: <StickyTableOfContentsExample />,
  },
  "file-upload-dropzone": {
    slug: "file-upload-dropzone",
    installDeps: ["lucide-react"],
    props: [
      { name: "accept", type: "string", description: "MIME/extension filter passed to the hidden file input." },
      { name: "maxSizeMB", type: "number", default: "5", description: "Maximum file size in megabytes before a file is rejected." },
      { name: "multiple", type: "boolean", default: "true", description: "Whether more than one file can be selected/dropped." },
      { name: "onFilesChange", type: "(files: UploadedFile[]) => void", description: "Called whenever the file list changes." },
    ],
    states: ["Empty", "Drag over", "Uploading (simulated progress)", "Done", "Error (over size limit)"],
    accessibility: ["The dropzone is a keyboard-focusable `role=\"button\"` that also opens the file picker on Enter/Space."],
    customization: ["Image files get a real thumbnail via `URL.createObjectURL`; other types fall back to a generic file icon."],
    responsive: ["File rows wrap naturally in a vertical list; the dropzone itself is full-width by default."],
    source: fileUploadDropzoneSource,
    componentSource: fileUploadDropzoneComponentSource,
    componentSourcePath: "src/components/saas/forms/file-upload-dropzone.tsx",
    preview: <FileUploadDropzoneExample />,
  },
  "validated-form-wizard": {
    slug: "validated-form-wizard",
    installDeps: ["react-hook-form", "zod", "@hookform/resolvers", "lucide-react"],
    props: [
      { name: "onSubmit", type: "(values: ValidatedFormWizardValues) => void", description: "Called with all step values once the final review step is submitted." },
    ],
    states: ["Step 1 (Account)", "Step 2 (Profile)", "Step 3 (Review)", "Field error", "Submitting", "Submitted"],
    accessibility: ["Validation errors are rendered as text adjacent to their field and re-checked on blur via `react-hook-form`."],
    customization: ["Swap the two data-collection steps or add more — just extend `steps` and register matching fields in the schema."],
    responsive: ["Capped at `max-w-md`; step labels stay visible at all sizes."],
    source: validatedFormWizardSource,
    componentSource: validatedFormWizardComponentSource,
    componentSourcePath: "src/components/saas/forms/validated-form-wizard.tsx",
    preview: <ValidatedFormWizardExample />,
  },
  "dynamic-field-array-form": {
    slug: "dynamic-field-array-form",
    installDeps: ["lucide-react"],
    props: [
      { name: "onSubmit", type: "(invites: { email: string; role: UserRole }[]) => void", description: "Called with all valid rows after a successful submit." },
    ],
    states: ["Single row", "Multiple rows", "Row validation error", "Max rows reached (10)", "Submitting", "Success"],
    accessibility: ["Each email input has a visually-hidden label, and remove buttons carry a descriptive `aria-label`."],
    customization: ["Reuses the shared `UserRole` type for the role select — swap in your own role list if needed."],
    responsive: ["Capped at `max-w-lg`; each row stays on one line down to small desktop widths."],
    source: dynamicFieldArrayFormSource,
    componentSource: dynamicFieldArrayFormComponentSource,
    componentSourcePath: "src/components/saas/forms/dynamic-field-array-form.tsx",
    preview: <DynamicFieldArrayFormExample />,
  },
  "inline-editable-table-row": {
    slug: "inline-editable-table-row",
    installDeps: ["lucide-react"],
    props: [],
    states: ["Display mode", "Edit mode", "Validation error", "Saving (spinner)"],
    accessibility: ["Edit/save/cancel controls are icon buttons with descriptive `aria-label`s."],
    customization: ["This demo owns its own product data — swap `initialProducts` for real rows and lift `onSave` out as a prop for a real app."],
    responsive: ["Table wrapped in `overflow-x-auto` so it stays usable on narrow viewports."],
    source: inlineEditableTableRowSource,
    componentSource: inlineEditableTableRowComponentSource,
    componentSourcePath: "src/components/saas/forms/inline-editable-table-row.tsx",
    preview: <InlineEditableTableRowExample />,
  },
  "toast-notification-stack": {
    slug: "toast-notification-stack",
    installDeps: ["lucide-react"],
    props: [],
    states: ["Empty", "Single toast", "Stacked toasts", "Success / error / warning / info variants"],
    accessibility: ["Each toast uses `role=\"status\"` and includes a manual close button in addition to auto-dismiss."],
    customization: ["Toasts auto-dismiss after 4s; adjust `TOAST_DURATION_MS` to change the timing."],
    responsive: ["Fixed to the top-right corner (`fixed top-4 right-4`); switch to `bottom-4` or full-width on mobile as needed."],
    source: toastNotificationStackSource,
    componentSource: toastNotificationStackComponentSource,
    componentSourcePath: "src/components/saas/notifications/toast-notification-stack.tsx",
    preview: <ToastNotificationStackExample />,
  },
  "notification-bell-dropdown": {
    slug: "notification-bell-dropdown",
    installDeps: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    props: [
      { name: "notifications", type: "NotificationItem[]", description: "Notifications to show; defaults to a sample list." },
    ],
    states: ["No unread", "Unread badge", "Open dropdown", "Empty state"],
    accessibility: ["The trigger button's `aria-label` includes the live unread count; built on the shared Radix dropdown menu."],
    customization: ["Reuses the shared `NotificationItem` type — wire `notifications` up to your real-time feed or polling hook."],
    responsive: ["Dropdown panel is a fixed `w-80` with an internally scrolling list capped at `max-h-80`."],
    source: notificationBellDropdownSource,
    componentSource: notificationBellDropdownComponentSource,
    componentSourcePath: "src/components/saas/notifications/notification-bell-dropdown.tsx",
    preview: <NotificationBellDropdownExample />,
  },
  "alert-banner-auto-dismiss": {
    slug: "alert-banner-auto-dismiss",
    installDeps: ["lucide-react"],
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "error"', required: true, description: "Visual style and icon of the banner." },
      { name: "title", type: "string", required: true, description: "Primary banner message." },
      { name: "description", type: "string", description: "Optional secondary detail line." },
      { name: "dismissible", type: "boolean", default: "true", description: "Shows a manual close button when true." },
      { name: "autoDismissMs", type: "number", description: "If set, the banner auto-dismisses after this many milliseconds, with a countdown bar." },
      { name: "onDismiss", type: "() => void", description: "Called when the banner is dismissed (manually or automatically)." },
    ],
    states: ["Info", "Success", "Warning", "Error", "Auto-dismiss countdown", "Dismissed (unmounted)"],
    accessibility: ["Rendered with `role=\"alert\"` so screen readers announce it as it appears."],
    customization: ["Pass `autoDismissMs` to show a live shrinking progress bar in the banner's accent color."],
    responsive: ["Full-width by default (`w-full`) — constrain it with a `max-w-*` wrapper as shown in the demo."],
    source: alertBannerSource,
    componentSource: alertBannerComponentSource,
    componentSourcePath: "src/components/saas/notifications/alert-banner-auto-dismiss.tsx",
    preview: <AlertBannerExample />,
  },
  "undo-snackbar": {
    slug: "undo-snackbar",
    installDeps: ["lucide-react"],
    props: [],
    states: ["List with items", "Snackbar visible (counting down)", "Undone", "Countdown finished (final)", "Empty list"],
    accessibility: ["Delete buttons carry a descriptive `aria-label`; the Undo action is a real, focusable button."],
    customization: ["This demo manages its own list state — in a real app, pair the countdown with a debounced real delete call."],
    responsive: ["Snackbar is pinned to the bottom of its container (`absolute inset-x-0 bottom-0`) at `max-w-md`."],
    source: undoSnackbarSource,
    componentSource: undoSnackbarComponentSource,
    componentSourcePath: "src/components/saas/notifications/undo-snackbar.tsx",
    preview: <UndoSnackbarExample />,
  },
  "ai-prompt-input": {
    slug: "ai-prompt-input",
    installDeps: ["@radix-ui/react-select", "framer-motion", "lucide-react"],
    props: [
      { name: "onSubmit", type: "(value: string, attachments: PromptAttachment[]) => void", description: "Called with the trimmed prompt and attachments on Enter or send. The input clears afterwards." },
      { name: "isGenerating", type: "boolean", default: "false", description: "Swaps the send button for a stop button and stops Enter from submitting." },
      { name: "onStop", type: "() => void", description: "Called when the stop button is pressed while generating." },
      { name: "models", type: "PromptModel[]", description: "Options for the model selector (`{ value, label }`). Hidden when omitted." },
      { name: "model / defaultModel", type: "string", description: "Controlled or initial model value." },
      { name: "onModelChange", type: "(value: string) => void", description: "Called when the user picks a model." },
      { name: "placeholder", type: "string", default: "\"Ask anything…\"", description: "Textarea placeholder." },
      { name: "maxHeight", type: "number", default: "200", description: "Max textarea height in px before it scrolls." },
      { name: "accept", type: "string", description: "Accepted file types for attachments, e.g. `\"image/*,.pdf\"`." },
      { name: "maxAttachments", type: "number", default: "5", description: "Attachment limit; the attach button disables when reached." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole composer." },
    ],
    states: ["Empty (send disabled)", "Typing (auto-grows up to maxHeight, then scrolls)", "With attachments", "Drag-over", "Generating (stop button)", "Disabled"],
    accessibility: ["Enter sends and Shift+Enter inserts a newline; IME composition is respected so Enter never submits mid-composition.", "The textarea has a label and a screen-reader hint describing the keyboard shortcuts.", "Icon buttons carry descriptive `aria-label`s (\"Attach files\", \"Remove notes.pdf\", \"Send message\" / \"Stop generating\")."],
    customization: ["Reuses the shared `Select` for the model picker, so it inherits the origin-aware popover animation.", "Submitting with Enter deliberately has no animation on the input itself — keyboard actions should feel instant."],
    responsive: ["Fills its container; attachment chips wrap and long file names truncate."],
    source: aiPromptInputSource,
    componentSource: aiPromptInputComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-prompt-input.tsx",
    preview: <AiPromptInputExample />,
  },
  "ai-suggestion-chips": {
    slug: "ai-suggestion-chips",
    installDeps: ["lucide-react"],
    props: [
      { name: "suggestions", type: "(string | SuggestionChip)[]", required: true, description: "Prompts to show. Objects accept `{ text, label?, icon? }`." },
      { name: "onSelect", type: "(text: string) => void", description: "Called with the full prompt text when a chip is clicked." },
      { name: "layout", type: "\"wrap\" | \"scroll\"", default: "\"wrap\"", description: "Wrap onto multiple lines or keep one horizontally-scrollable row." },
      { name: "title", type: "string", default: "\"Suggested prompts\"", description: "Accessible label for the list." },
      { name: "showTitle", type: "boolean", default: "false", description: "Render the title as a visible heading." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables every chip." },
    ],
    states: ["Wrap layout", "Scroll layout (edge fade)", "With icons", "Disabled", "Empty (renders nothing)"],
    accessibility: ["Rendered as a labelled list of native buttons, so they're reachable with Tab and activate with Enter/Space.", "Long labels truncate visually and expose the full text via `title`."],
    customization: ["The entrance stagger is 40ms per chip and capped at 8 chips so long lists never wait; it's a one-off mount animation and never blocks clicks."],
    responsive: ["Use `layout=\"scroll\"` on narrow screens to keep suggestions on a single swipeable row."],
    source: aiSuggestionChipsSource,
    componentSource: aiSuggestionChipsComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-suggestion-chips.tsx",
    preview: <AiSuggestionChipsExample />,
  },
  "ai-message-thread": {
    slug: "ai-message-thread",
    installDeps: ["framer-motion", "lucide-react"],
    props: [
      { name: "messages", type: "ThreadMessage[]", required: true, description: "`{ id, role: \"user\" | \"assistant\", content, isStreaming?, feedback? }`. Set `isStreaming` on the last reply while tokens arrive." },
      { name: "onRegenerate", type: "(messageId: string) => void", description: "Shows a regenerate action on assistant messages." },
      { name: "onFeedback", type: "(messageId: string, feedback: \"up\" | \"down\" | null) => void", description: "Called when thumbs feedback is toggled." },
      { name: "onCopy", type: "(messageId: string) => void", description: "Called after a message is copied." },
      { name: "assistantName", type: "string", default: "\"Assistant\"", description: "Screen-reader label for assistant messages." },
      { name: "emptyState", type: "ReactNode", description: "Shown when there are no messages." },
    ],
    states: ["Empty", "Conversation", "Streaming reply (caret, actions hidden)", "Copied", "Feedback given", "Scrolled up (\"Latest\" button)"],
    accessibility: ["The list is a `role=\"log\"` live region with `aria-busy` while streaming, so screen readers announce the finished reply instead of every token.", "Actions are revealed on hover and on keyboard focus, and are always visible on touch devices and for the latest reply.", "Thumbs buttons expose their state via `aria-pressed`."],
    customization: ["Auto-scroll only follows new content when the reader is already within 80px of the bottom; otherwise a \"Latest\" button appears.", "New messages enter with a short spring (opacity + translate) and existing messages never re-animate."],
    responsive: ["Height defaults to `h-[28rem]`; override with `className`. User bubbles cap at 80% width."],
    source: aiMessageThreadSource,
    componentSource: aiMessageThreadComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-message-thread.tsx",
    preview: <AiMessageThreadExample />,
  },
  "ai-reasoning-panel": {
    slug: "ai-reasoning-panel",
    installDeps: ["@radix-ui/react-accordion", "framer-motion", "lucide-react"],
    props: [
      { name: "steps", type: "ReasoningStep[]", required: true, description: "`{ id, label, detail?, status? }`. The last step is shown as active while thinking." },
      { name: "isThinking", type: "boolean", required: true, description: "Drives the live timer, auto-open and auto-collapse." },
      { name: "durationSeconds", type: "number", description: "Final duration; measured automatically when omitted." },
      { name: "autoCollapse", type: "boolean", default: "true", description: "Collapse when thinking finishes, unless the user toggled the panel." },
      { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open: boolean) => void", description: "Optional controlled open state." },
    ],
    states: ["Thinking (live timer)", "Finished (\"Thought for Ns\")", "Expanded", "Collapsed", "No steps yet"],
    accessibility: ["Built on the shared Accordion, so the toggle is a real button with `aria-expanded`.", "The ticking timer is hidden from screen readers; a separate status region announces only \"Thinking\" and the final duration."],
    customization: ["Height animates with the established Radix accordion CSS-variable pattern; steps fade/slide in with a short spring as they arrive."],
    responsive: ["Full width of its container; long step details wrap."],
    source: aiReasoningPanelSource,
    componentSource: aiReasoningPanelComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-reasoning-panel.tsx",
    preview: <AiReasoningPanelExample />,
  },
  "ai-tool-call-card": {
    slug: "ai-tool-call-card",
    installDeps: ["@radix-ui/react-accordion", "framer-motion", "lucide-react"],
    props: [
      { name: "name", type: "string", required: true, description: "Tool/function name, shown in monospace." },
      { name: "status", type: "\"pending\" | \"running\" | \"success\" | \"error\"", required: true, description: "Controls the badge, running indicator and which sections show." },
      { name: "icon", type: "LucideIcon", default: "Wrench", description: "Tool icon." },
      { name: "description", type: "string", description: "One-line summary under the name." },
      { name: "args / result", type: "unknown", description: "Rendered as pretty-printed JSON in collapsible sections (result only on success)." },
      { name: "error", type: "string", description: "Message shown in the error state." },
      { name: "onRetry", type: "() => void", description: "Shows a Retry button in the error state." },
      { name: "durationMs", type: "number", description: "Shown next to the badge on success." },
      { name: "defaultExpanded", type: "(\"args\" | \"result\")[]", default: "[]", description: "Sections that start open." },
    ],
    states: ["Pending", "Running (indeterminate bar)", "Success", "Error with retry"],
    accessibility: ["The card is a labelled `role=\"group\"`; status changes are announced through a polite live region.", "Errors render in a `role=\"alert\"` block; JSON blocks are focusable so keyboard users can scroll them."],
    customization: ["The running indicator is constant motion, so it uses linear timing; it's disabled automatically under reduced motion via `MotionConfig`."],
    responsive: ["Duration hides below `sm`; JSON blocks scroll in both directions (`max-h-64`)."],
    source: aiToolCallCardSource,
    componentSource: aiToolCallCardComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-tool-call-card.tsx",
    preview: <AiToolCallCardExample />,
  },
  "ai-sources-citations": {
    slug: "ai-sources-citations",
    installDeps: ["@radix-ui/react-popover", "@radix-ui/react-accordion", "lucide-react"],
    props: [
      { name: "content", type: "string", required: true, description: "Answer text. `[n]` markers become citation chips; blank lines split paragraphs." },
      { name: "sources", type: "CitationSource[]", required: true, description: "`{ id, title, url, snippet? }` — `id` matches the `[n]` marker." },
      { name: "defaultSourcesOpen", type: "boolean", default: "false", description: "Start with the sources list expanded." },
    ],
    states: ["Inline chips", "Preview open (hover or click)", "Sources list collapsed", "Sources list expanded", "Unknown citation (plain text)"],
    accessibility: ["Chips are buttons labelled \"Source n: title\" with `aria-expanded`; previews open on click/tap or keyboard, with hover as a mouse-only enhancement.", "Hover-opened previews don't steal focus; click-opened ones move focus inside so the link is reachable.", "External links use `rel=\"noopener noreferrer\"`."],
    customization: ["Reuses the shared Popover, so previews scale from the chip via Radix's transform-origin variable.", "The favicon is a letter placeholder — swap in real favicons if you proxy them."],
    responsive: ["Domains hide in the sources list below `sm`; titles truncate."],
    source: aiSourcesCitationsSource,
    componentSource: aiSourcesCitationsComponentSource,
    componentSourcePath: "src/components/saas/ai/ai-sources-citations.tsx",
    preview: <AiSourcesCitationsExample />,
  },
  "code-block-tabs": {
    slug: "code-block-tabs",
    installDeps: ["@radix-ui/react-tabs", "framer-motion", "lucide-react"],
    props: [
      { name: "tabs", type: "CodeTab[]", required: true, description: "`{ label, code, filename?, value? }` per language/variant." },
      { name: "defaultValue", type: "string", default: "first tab", description: "Initially selected tab (`value` or `label`)." },
      { name: "showLineNumbers", type: "boolean", default: "true", description: "Show the sticky line-number gutter." },
      { name: "maxHeight", type: "string", description: "Max height before vertical scrolling, e.g. `\"24rem\"`." },
      { name: "onCopy", type: "(tab: CodeTab) => void", description: "Called after the active tab's code is copied." },
    ],
    states: ["Multiple tabs", "Single snippet (no tab list)", "With filename", "Copied", "Empty"],
    accessibility: ["Uses the shared Tabs, so arrow keys move between languages.", "The code area is a focusable, labelled scroll region; line numbers are `aria-hidden` and unselectable so copying never includes them.", "A polite status region announces \"Code copied to clipboard\"."],
    customization: ["No syntax-highlighting dependency — wrap lines in your highlighter of choice if you need colors.", "The copy icon crossfades to a check with a 2px blur to mask the swap."],
    responsive: ["Long lines scroll horizontally with a sticky gutter; long filenames truncate."],
    source: codeBlockTabsSource,
    componentSource: codeBlockTabsComponentSource,
    componentSourcePath: "src/components/saas/developer/code-block-tabs.tsx",
    preview: <CodeBlockTabsExample />,
  },
  "api-request-playground": {
    slug: "api-request-playground",
    installDeps: ["@radix-ui/react-select", "@radix-ui/react-tabs", "framer-motion", "lucide-react"],
    props: [
      { name: "onSend", type: "(request: ApiRequest) => Promise<ApiResponse>", required: true, description: "Performs the request. Resolve with `{ status, body, statusText?, durationMs? }`; reject to show an error." },
      { name: "defaultMethod", type: "\"GET\" | \"POST\" | \"PUT\" | \"PATCH\" | \"DELETE\"", default: "\"GET\"", description: "Initial HTTP method." },
      { name: "defaultUrl", type: "string", default: "\"\"", description: "Initial URL." },
      { name: "defaultHeaders", type: "{ key: string; value: string }[]", default: "Content-Type: application/json", description: "Initial header rows." },
      { name: "defaultBody", type: "string", default: "\"\"", description: "Initial JSON body." },
    ],
    states: ["Idle", "Sending (skeleton)", "2xx / 3xx / 4xx / 5xx response", "Request error", "Invalid URL", "Invalid JSON body", "Body-less method"],
    accessibility: ["Every header input has an indexed label; remove buttons name the header they remove.", "Cmd/Ctrl+Enter in the URL field sends; invalid fields use `aria-invalid`.", "The response region sets `aria-busy` while loading and errors render as `role=\"alert\"`."],
    customization: ["Methods are color-coded in both the trigger and the menu; adjust `methodColor`.", "Latency is measured around `onSend` unless your response provides `durationMs`. Stale responses from earlier sends are ignored."],
    responsive: ["The request bar stacks vertically below `sm`; response size hides on small screens."],
    source: apiRequestPlaygroundSource,
    componentSource: apiRequestPlaygroundComponentSource,
    componentSourcePath: "src/components/saas/developer/api-request-playground.tsx",
    preview: <ApiRequestPlaygroundExample />,
  },
  "webhook-event-log": {
    slug: "webhook-event-log",
    installDeps: ["@radix-ui/react-accordion", "lucide-react"],
    props: [
      { name: "events", type: "WebhookEvent[]", required: true, description: "`{ id, type, endpoint, status, httpCode, timestamp, attempts?, request, response? }`." },
      { name: "onRetry", type: "(event: WebhookEvent) => Promise<WebhookRetryResult | void>", description: "Shows Retry on failed rows. Resolve with the new outcome; rejecting marks the row failed again." },
    ],
    states: ["All deliveries", "Filtered (delivered / failed / retrying)", "Row expanded", "Retrying (pending)", "Empty filter", "No deliveries"],
    accessibility: ["Filters are toggle buttons with `aria-pressed` and live counts.", "Rows are accordion triggers with `aria-expanded`; Retry sits outside the trigger so buttons are never nested.", "Payload blocks are focusable, labelled scroll regions."],
    customization: ["Retries are tracked locally, so the parent doesn't need to own the list. Rows retried from the Failed filter stay visible until the retry settles."],
    responsive: ["Endpoint, HTTP code and timestamp columns progressively hide at `sm` / `md` / `lg`; the endpoint moves under the event type on mobile."],
    source: webhookEventLogSource,
    componentSource: webhookEventLogComponentSource,
    componentSourcePath: "src/components/saas/developer/webhook-event-log.tsx",
    preview: <WebhookEventLogExample />,
  },
  "changelog-feed": {
    slug: "changelog-feed",
    installDeps: ["lucide-react"],
    props: [
      { name: "entries", type: "ChangelogEntry[]", required: true, description: "`{ version, date, title, description, tags, changes?, image? }`, newest first." },
      { name: "pageSize", type: "number", default: "3", description: "Entries shown initially and per \"Load more\"." },
      { name: "onLoadMore", type: "() => Promise<void>", description: "Called once local entries are exhausted and `hasMore` is true — append to `entries`." },
      { name: "hasMore", type: "boolean", default: "false", description: "Whether more entries exist on the server." },
    ],
    states: ["First page", "Load more (local)", "Loading more (async)", "With image", "Deep-linked entry", "Empty"],
    accessibility: ["Each entry is an `article` labelled by its title with a `time` element for the date.", "Anchor links are real links (the hash updates) and also copy the deep link; they show on hover/focus and always on touch."],
    customization: ["Deep links (`#changelog-v2-9-0`) reveal entries beyond the first page on load.", "Newly revealed entries fade up with a 60ms stagger; tag colors live in `tagStyles`."],
    responsive: ["Dates sit in a left column from `sm` up and above each entry on mobile."],
    source: changelogFeedSource,
    componentSource: changelogFeedComponentSource,
    componentSourcePath: "src/components/saas/developer/changelog-feed.tsx",
    preview: <ChangelogFeedExample />,
  },
  "status-page-uptime": {
    slug: "status-page-uptime",
    installDeps: ["@radix-ui/react-tooltip", "lucide-react"],
    props: [
      { name: "services", type: "StatusService[]", required: true, description: "`{ id, name, description?, status, days: { date, uptime | null }[] }` — the last 90 days are shown." },
      { name: "incidents", type: "StatusIncident[]", default: "[]", description: "Recent incidents with status, impact and an optional latest update." },
      { name: "lastUpdated", type: "string", description: "ISO timestamp shown in the banner." },
    ],
    states: ["All operational", "Degraded", "Outage", "Day tooltip", "No incidents", "No data days"],
    accessibility: ["Each uptime bar is a single tab stop with a summary label; arrow keys (and Home/End) step through days and open that day's tooltip, announced via a status region.", "Bar colors are paired with text (percentages and status labels), never color alone."],
    customization: ["Thresholds live in `barColor` (≥99.5% green, ≥97% amber, else red). Tooltips reuse the shared Tooltip with skip-delay between adjacent bars."],
    responsive: ["Below `sm` only the last 30 days render so bars stay tappable-sized."],
    source: statusPageUptimeSource,
    componentSource: statusPageUptimeComponentSource,
    componentSourcePath: "src/components/saas/developer/status-page-uptime.tsx",
    preview: <StatusPageUptimeExample />,
  },
  "env-variables-editor": {
    slug: "env-variables-editor",
    installDeps: ["@radix-ui/react-select", "framer-motion", "lucide-react"],
    props: [
      { name: "environments", type: "string[]", default: "[\"Development\", \"Preview\", \"Production\"]", description: "Environment names for the selector." },
      { name: "defaultEnvironment", type: "string", default: "first environment", description: "Initially selected environment." },
      { name: "initialValues", type: "Record<string, EnvVariable[]>", default: "{}", description: "Saved variables per environment (`{ key, value, secret? }`)." },
      { name: "onSave", type: "(environment: string, variables: EnvVariable[]) => Promise<void> | void", description: "Called with the cleaned variables for the current environment. Rejecting shows an error." },
    ],
    states: ["Clean", "Dirty (unsaved changes)", "Duplicate / invalid key", "Secret masked / revealed", "Importing .env", "Saving", "Saved", "Save error"],
    accessibility: ["Every input is labelled per row; errors are linked with `aria-describedby` and `aria-invalid`.", "Reveal and secret toggles expose their state via `aria-pressed`; import and save results are announced in status regions."],
    customization: ["Paste a multi-line `.env` straight into any KEY field, or use the \"Paste .env\" panel — existing keys are updated, new ones appended, and names containing SECRET/TOKEN/KEY/PASSWORD default to secret.", "Drafts are kept per environment, so switching environments never loses edits; unsaved environments are marked in the selector."],
    responsive: ["Rows collapse to key-over-value on mobile; column headers show from `sm` up."],
    source: envVariablesEditorSource,
    componentSource: envVariablesEditorComponentSource,
    componentSourcePath: "src/components/saas/developer/env-variables-editor.tsx",
    preview: <EnvVariablesEditorExample />,
  },
  "ai-command-assistant": {
    slug: "ai-command-assistant",
    installDeps: ["@radix-ui/react-dialog", "lucide-react"],
    props: [
      { name: "open", type: "boolean", description: "Controls the overlay visibility. Omit to let the component manage its own open state." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called whenever the overlay opens or closes." },
      { name: "suggestedPrompts", type: "string[]", description: "Prompt chips shown when the conversation is empty." },
      { name: "triggerLabel", type: "string | null", default: '"Ask AI"', description: "Label for the built-in trigger button. Pass `null` to hide it and drive `open` yourself." },
      { name: "disableShortcut", type: "boolean", default: "false", description: "Disables the global ⌘K / Ctrl+K shortcut listener." },
    ],
    states: ["Empty (suggested prompts)", "Conversation with messages", "Thinking (simulated delay)"],
    accessibility: ["The message list has `role=\"log\"` with `aria-live=\"polite\"` so new replies are announced; the input carries an `aria-label`."],
    customization: ["Replies are fully mocked and keyword-matched via the exported `getAssistantReply` helper — swap it for a real API call in production."],
    responsive: ["Capped at `max-w-lg`, positioned near the top of the viewport; the message list scrolls independently."],
    source: aiCommandAssistantSource,
    componentSource: aiCommandAssistantComponentSource,
    componentSourcePath: "src/components/saas/utilities/ai-command-assistant.tsx",
    preview: <AiCommandAssistantExample />,
  },
  "dashboard-widget-customizer": {
    slug: "dashboard-widget-customizer",
    installDeps: ["lucide-react"],
    props: [
      { name: "widgets", type: "DashboardWidgetConfig[]", required: true, description: "Full widget catalog. `enabled` = on the dashboard (X removes it to Available widgets); optional `visible` (default true) = shown or temporarily hidden via the switch, keeping its position." },
      { name: "onChange", type: "(widgets: DashboardWidgetConfig[]) => void", description: "Called after every reorder, show/hide or add/remove." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Widgets active", "Widget hidden (dimmed, keeps position)", "No active widgets", "Dragging", "Loading (skeleton)"],
    accessibility: ["The drag handle carries a descriptive `aria-label`; add/remove/hide controls are real, focusable buttons."],
    customization: ["Reordering is powered by the exported pure `reorderWidgets(list, fromIndex, toIndex)` helper — reuse it if you swap in a different drag library."],
    responsive: ["Capped at `max-w-lg`; widget rows stack full-width on narrow viewports."],
    source: dashboardWidgetCustomizerSource,
    componentSource: dashboardWidgetCustomizerComponentSource,
    componentSourcePath: "src/components/saas/dashboard/dashboard-widget-customizer.tsx",
    preview: <DashboardWidgetCustomizerExample />,
  },
  "white-label-theme-editor": {
    slug: "white-label-theme-editor",
    installDeps: ["lucide-react"],
    props: [
      { name: "initialTheme", type: "WhiteLabelTheme", description: "Seed values for brand name, colors, font and logo." },
      { name: "onChange", type: "(theme: WhiteLabelTheme) => void", description: "Called whenever any theme field changes." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Default theme", "Custom colors/font", "With uploaded logo", "Loading (skeleton)"],
    accessibility: ["Every field has an associated `<Label>`; color inputs and the logo upload carry descriptive `aria-label`s."],
    customization: ["State is driven by the exported pure `themeReducer(state, action)` — reuse it to unit-test theme changes or wire up undo/redo."],
    responsive: ["Editor and live preview stack to a single column below the `md` breakpoint."],
    source: whiteLabelThemeEditorSource,
    componentSource: whiteLabelThemeEditorComponentSource,
    componentSourcePath: "src/components/saas/settings/white-label-theme-editor.tsx",
    preview: <WhiteLabelThemeEditorExample />,
  },
  "real-time-presence-avatars": {
    slug: "real-time-presence-avatars",
    installDeps: [],
    props: [
      { name: "users", type: "PresenceUser[]", required: true, description: "People currently viewing the page." },
      { name: "maxVisible", type: "number", default: "4", description: "Max avatars shown before collapsing into a \"+N\" indicator." },
      { name: "simulateActivity", type: "boolean", default: "true", description: "Randomly adds/removes a mock user every few seconds via `setInterval`. Set `false` for deterministic tests/snapshots." },
    ],
    states: ["Few users (no overflow)", "Overflow (+N)", "Simulated join/leave"],
    accessibility: ["The group has an `aria-label` announcing the live viewer count; each avatar exposes a title with name and status."],
    customization: ["The simulation interval only adds/removes its own mock pool — your real `users` prop is never mutated by the simulation."],
    responsive: ["Avatars overlap via negative margin and stay a fixed size; the row wraps naturally in flex containers."],
    source: realTimePresenceAvatarsSource,
    componentSource: realTimePresenceAvatarsComponentSource,
    componentSourcePath: "src/components/saas/communication/real-time-presence-avatars.tsx",
    preview: <RealTimePresenceAvatarsExample />,
  },
  "conversion-funnel-chart": {
    slug: "conversion-funnel-chart",
    installDeps: [],
    props: [
      { name: "title", type: "string", default: '"Conversion funnel"', description: "Card title." },
      { name: "description", type: "string", description: "Optional subtitle, e.g. a date range." },
      { name: "stages", type: "FunnelStage[]", required: true, description: "Ordered stages from widest to narrowest; each is `{ label, value }`." },
      { name: "isLoading", type: "boolean", default: "false", description: "Shows the skeleton loading state." },
    ],
    states: ["Normal", "Loading (skeleton)"],
    accessibility: ["Each stage bar carries `role=\"img\"` with an `aria-label` summarizing the value and conversion percentage."],
    customization: ["Built with plain Tailwind bars rather than Recharts, so it's easy to restyle without touching a charting library."],
    responsive: ["Bars are full-width by default; wrap the card in a `max-w-*` container to constrain it."],
    source: conversionFunnelChartSource,
    componentSource: conversionFunnelChartComponentSource,
    componentSourcePath: "src/components/saas/analytics/conversion-funnel-chart.tsx",
    preview: <ConversionFunnelChartExample />,
  },
};
