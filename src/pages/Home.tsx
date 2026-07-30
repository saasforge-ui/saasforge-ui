import { HeroSection } from "@/components/marketing/hero-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";
import { FreeComponentsSection } from "@/components/marketing/free-components-section";
import { PremiumComponentsSection } from "@/components/marketing/premium-components-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <FreeComponentsSection />
      <PremiumComponentsSection />
      <PricingSection />
      <FaqSection />
    </>
  );
}
