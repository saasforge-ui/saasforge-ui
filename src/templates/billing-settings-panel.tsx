import * as React from "react";
import { CreditCard, FileText, LayoutDashboard, Receipt, Settings } from "lucide-react";
import { VerticalNavSidebar } from "@/components/saas/navigation/vertical-nav-sidebar";
import { SubscriptionStatusCard } from "@/components/saas/billing/subscription-status-card";
import { PricingPlanComparison } from "@/components/saas/billing/pricing-plan-comparison";
import { InvoiceList } from "@/components/saas/billing/invoice-list";
import { PaymentMethodCard } from "@/components/saas/billing/payment-method-card";
import { SettingsForm, type SettingsFormValues } from "@/components/saas/settings/settings-form";
import { mockInvoices, mockPaymentMethods, mockPricingPlans } from "@/data/mock-data";

const settingsDefaultValues: SettingsFormValues = {
  name: "Sarah Chen",
  email: "sarah@acme.io",
  companyName: "Acme Technologies",
  website: "https://acme.io",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
};

/**
 * Billing & Settings Panel — a full-page template composed entirely from
 * existing SaaSForge UI Pro components. Vertical Nav Sidebar provides the
 * page chrome; Subscription Status Card, Pricing Plan Comparison, Invoice
 * List, Payment Method Card and SaaS Settings Form make up the content.
 */
export default function BillingSettingsPanelTemplate() {
  const [activeNavId, setActiveNavId] = React.useState("billing");

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border p-4 lg:block">
        <VerticalNavSidebar
          activeId={activeNavId}
          onNavigate={setActiveNavId}
          sections={[
            {
              items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }],
            },
            {
              title: "Account",
              items: [
                { id: "billing", label: "Billing", icon: CreditCard },
                { id: "invoices", label: "Invoices", icon: Receipt },
                { id: "plans", label: "Plans", icon: FileText },
                { id: "settings", label: "Settings", icon: Settings },
              ],
            },
          ]}
        />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Billing &amp; Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your subscription, invoices and account preferences</p>
          </div>
        </header>

        <main className="space-y-8 p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Invoices</h2>
              <InvoiceList invoices={mockInvoices} />
            </section>
            <div className="space-y-6">
              <SubscriptionStatusCard
                planName="Growth"
                price={79}
                billingCycle="monthly"
                status="active"
                renewalDate="Sep 1, 2026"
                usageLabel="Team members"
                usageValue={18}
                usageLimit={25}
                className="max-w-none"
              />
              <PaymentMethodCard methods={mockPaymentMethods} className="max-w-none" />
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Plans</h2>
            <PricingPlanComparison plans={mockPricingPlans} currentPlanId="growth" />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Account settings</h2>
            <SettingsForm
              defaultValues={settingsDefaultValues}
              onSubmit={(values) => console.log("settings saved", values)}
              onChangePassword={() => console.log("change password")}
              onEnableTwoFactor={() => console.log("enable 2fa")}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
