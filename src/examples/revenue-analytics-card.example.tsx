import { RevenueAnalyticsCard } from "@/components/free/revenue-analytics-card";

export default function Example() {
  return (
    <RevenueAnalyticsCard
      title="Monthly Revenue"
      value={38650}
      change={12.5}
      trend="up"
      data={[
        { date: "Feb", value: 24500 },
        { date: "Mar", value: 27800 },
        { date: "Apr", value: 26200 },
        { date: "May", value: 31900 },
        { date: "Jun", value: 34100 },
        { date: "Jul", value: 38650 },
      ]}
    />
  );
}
