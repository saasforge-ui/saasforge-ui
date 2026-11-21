import { PricingPlanComparison } from "@/components/saas/billing/pricing-plan-comparison";
import { mockPricingPlans } from "@/data/mock-data";

export default function Example() {
  return (
    <PricingPlanComparison
      plans={mockPricingPlans}
      currentPlanId="growth"
      onSelectPlan={(plan) => console.log("selected", plan.id)}
    />
  );
}
