import { Lock, Palette, Rocket } from "lucide-react";
import { FeatureGridSection } from "@/components/saas/marketing/feature-grid-section";

export default function Example() {
  return (
    <FeatureGridSection
      title="Everything you need to ship"
      description="Production-ready building blocks for your next SaaS dashboard."
      features={[
        { icon: Rocket, title: "Fast to integrate", description: "Copy the source, wire your data, ship it." },
        { icon: Palette, title: "Fully themeable", description: "Built on Tailwind CSS variables — restyle freely." },
        { icon: Lock, title: "Accessible by default", description: "Built on Radix UI primitives with keyboard support." },
      ]}
    />
  );
}
