import { UsageMetricsCard } from "@/components/saas/dashboard/usage-metrics-card";

export default function Example() {
  return <UsageMetricsCard label="API requests" used={8420} limit={10000} unit="requests" />;
}
