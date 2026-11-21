import { HeroSection } from "@/components/marketing/hero-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";
import { ComponentsSection } from "@/components/marketing/components-section";
import { FaqSection } from "@/components/marketing/faq-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <ComponentsSection />
      <FaqSection />
    </>
  );
}
