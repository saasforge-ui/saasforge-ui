import { DashboardOverview } from "@/components/saas/dashboard/dashboard-overview";
import { mockActivity, mockRevenueSeries } from "@/data/mock-data";

export default function Example() {
  return (
    <DashboardOverview
      workspaceName="Acme Technologies"
      metrics={[
        { id: "mrr", label: "MRR", value: 38650, change: 12.5, data: mockRevenueSeries },
        { id: "arr", label: "ARR", value: 463800, change: 9.1, data: mockRevenueSeries },
      ]}
      revenueSeries={mockRevenueSeries}
      activity={mockActivity}
      onRangeChange={(range) => console.log("range changed", range)}
    />
  );
}
