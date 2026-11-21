import { ConversionFunnelChart } from "@/components/saas/analytics/conversion-funnel-chart";

export default function Example() {
  return (
    <ConversionFunnelChart
      title="Signup to paid conversion"
      description="Last 30 days"
      stages={[
        { label: "Visited pricing", value: 18400 },
        { label: "Started trial", value: 6200 },
        { label: "Activated account", value: 3900 },
        { label: "Converted to paid", value: 1180 },
      ]}
    />
  );
}
