import { BarChart3, Lock, Palette, Rocket, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnnouncementBanner } from "@/components/saas/communication/announcement-banner";
import { MegaMenu, type MegaMenuSection } from "@/components/saas/navigation/mega-menu";
import { FeatureGridSection, type FeatureItem } from "@/components/saas/marketing/feature-grid-section";
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from "@/components/saas/data/comparison-table";
import { PricingPlanComparison } from "@/components/saas/billing/pricing-plan-comparison";
import { FAQAccordionSection, type FAQItem } from "@/components/saas/marketing/faq-accordion-section";
import { CTABannerSection } from "@/components/saas/marketing/cta-banner-section";
import { SignupForm, type SignupFormValues } from "@/components/saas/auth/signup-form";
import { mockPricingPlans } from "@/data/mock-data";

const megaMenuSections: MegaMenuSection[] = [
  {
    title: "Product",
    links: [
      { label: "Analytics", description: "Track revenue and usage in real time", href: "/product/analytics" },
      { label: "Automations", description: "Automate billing and onboarding", href: "/product/automations" },
      { label: "Integrations", description: "Connect your existing stack", href: "/product/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For startups", description: "Ship faster with less overhead", href: "/solutions/startups" },
      { label: "For enterprise", description: "Security and scale built in", href: "/solutions/enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", description: "Guides and API reference", href: "/docs" },
      { label: "Changelog", description: "See what shipped recently", href: "/changelog" },
      { label: "Support", description: "Talk to our team", href: "/support" },
    ],
  },
];

const features: FeatureItem[] = [
  { icon: BarChart3, title: "Real-time analytics", description: "Track revenue, usage and goals as they happen, no refresh required." },
  { icon: Zap, title: "Automated workflows", description: "Trigger billing, onboarding and notification workflows without code." },
  { icon: ShieldCheck, title: "Enterprise-grade security", description: "SOC 2 Type II, SSO and granular role-based access control." },
  { icon: Lock, title: "Data privacy by default", description: "Your customer data stays encrypted at rest and in transit." },
  { icon: Rocket, title: "Fast to launch", description: "Get a production-ready billing and admin surface up in a day." },
  { icon: Palette, title: "Delightful by default", description: "Polished UI out of the box, so your team can focus on the product." },
];

const comparisonColumns: ComparisonColumn[] = [
  { id: "starter", label: "Starter" },
  { id: "growth", label: "Growth", highlighted: true },
  { id: "scale", label: "Scale" },
];

const comparisonRows: ComparisonRow[] = [
  { label: "Team members", values: { starter: "5", growth: "25", scale: "Unlimited" } },
  { label: "API requests / mo", values: { starter: "10,000", growth: "100,000", scale: "Unlimited" } },
  { label: "Advanced analytics", values: { starter: false, growth: true, scale: true } },
  { label: "Priority support", values: { starter: false, growth: true, scale: true } },
  { label: "SSO", values: { starter: false, growth: false, scale: true } },
];

const faqItems: FAQItem[] = [
  { question: "Can I change plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time from Billing settings. Changes are prorated." },
  { question: "Is there a free trial?", answer: "Every plan includes a 14-day free trial. No credit card required to get started." },
  { question: "Do you offer annual billing?", answer: "Yes, switching to yearly billing saves about 18% compared to monthly pricing." },
  { question: "What kind of support is included?", answer: "Growth and Scale plans include priority support with a guaranteed response time under 4 hours." },
];

/**
 * Marketing Landing Page — a full-page template composed entirely from
 * existing SaaSForge UI Pro components. Mega Menu provides top navigation,
 * with an Announcement Banner, hero, Feature Grid, Comparison Table, Pricing
 * Plan Comparison, FAQ Accordion and a Signup Form CTA stacked below.
 */
export default function MarketingLandingPageTemplate() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <AnnouncementBanner
        message="SaaSForge UI 2.0 is here — new templates, new components."
        variant="info"
        ctaLabel="See what's new"
        onCtaClick={() => console.log("view changelog")}
        className="rounded-none"
      />

      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="text-base font-semibold tracking-tight">Acme</span>
          <nav className="hidden items-center gap-6 md:flex">
            <MegaMenu label="Product" sections={megaMenuSections} onNavigate={(href) => console.log("navigate", href)} />
            <button type="button" className="text-sm font-medium hover:text-primary">
              Pricing
            </button>
            <button type="button" className="text-sm font-medium hover:text-primary">
              Docs
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => console.log("log in")}>
            Log in
          </Button>
          <Button size="sm" onClick={() => console.log("start free trial")}>
            Start free trial
          </Button>
        </div>
      </header>

      <main className="space-y-20 px-6 py-16">
        <section className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Billing, admin and analytics — built in a day, not a quarter.
          </h1>
          <p className="text-lg text-muted-foreground">
            SaaSForge UI gives your team production-ready dashboards, billing flows and admin panels so you can ship
            your product instead of rebuilding boilerplate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => console.log("start free trial")}>
              Start free trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => console.log("book a demo")}>
              Book a demo
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-4xl">
          <FeatureGridSection
            title="Everything your SaaS needs"
            description="A complete toolkit of dashboards, billing and admin surfaces, ready to compose."
            features={features}
          />
        </section>

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Compare plans</h2>
          <ComparisonTable columns={comparisonColumns} rows={comparisonRows} />
        </section>

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Simple, transparent pricing</h2>
          <PricingPlanComparison plans={mockPricingPlans} onSelectPlan={(plan) => console.log("select plan", plan.id)} />
        </section>

        <section className="mx-auto max-w-2xl">
          <FAQAccordionSection items={faqItems} />
        </section>

        <section className="mx-auto flex max-w-4xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <CTABannerSection
            title="Ready to get started?"
            description="Create your account in under a minute — no credit card required."
            primaryAction={{ label: "Start free trial", onClick: () => console.log("start free trial") }}
            secondaryAction={{ label: "Talk to sales", onClick: () => console.log("talk to sales") }}
          />
          <SignupForm onSubmit={(values: SignupFormValues) => console.log("signup", values)} />
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © 2026 Acme Technologies. All rights reserved.
      </footer>
    </div>
  );
}
