import { SubscriptionStatusCard } from "@/components/saas/billing/subscription-status-card";

export default function Example() {
  return (
    <SubscriptionStatusCard
      planName="Growth Plan"
      price={79}
      billingCycle="monthly"
      status="active"
      renewalDate="August 12, 2026"
      usageLabel="Seats used"
      usageValue={18}
      usageLimit={25}
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
      onCancel={() => console.log("cancel")}
    />
  );
}
