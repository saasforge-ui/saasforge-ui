import { CTABannerSection } from "@/components/saas/marketing/cta-banner-section";

export default function Example() {
  return (
    <CTABannerSection
      title="Ready to ship your dashboard faster?"
      description="Get all the components you need, with full source and lifetime updates."
      primaryAction={{ label: "Get SaaSForge UI Pro", onClick: () => console.log("primary cta") }}
      secondaryAction={{ label: "Browse components", onClick: () => console.log("secondary cta") }}
    />
  );
}
