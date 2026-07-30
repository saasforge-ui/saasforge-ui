import { AnalyticsChartCard } from "@/components/free/analytics-chart-card";

export default function Example() {
  return (
    <AnalyticsChartCard
      title="Weekly Active Users"
      description="Unique users per day"
      variant="area"
      ranges={["7d", "30d", "90d"]}
      data={[
        { date: "Mon", value: 1240 },
        { date: "Tue", value: 1890 },
        { date: "Wed", value: 1620 },
        { date: "Thu", value: 2210 },
        { date: "Fri", value: 2480 },
        { date: "Sat", value: 1340 },
        { date: "Sun", value: 980 },
      ]}
    />
  );
}
