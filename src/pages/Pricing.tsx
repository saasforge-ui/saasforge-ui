import * as React from "react";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { trackEvent } from "@/lib/analytics";

export default function Pricing() {
  React.useEffect(() => {
    trackEvent("pricing_view", { path: "/pricing" });
  }, []);

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pricing</h1>
        <p className="mt-3 text-muted-foreground">Free to start. $19 to unlock everything. No subscriptions.</p>
      </div>
      <PricingSection />
      <FaqSection />
    </div>
  );
}
