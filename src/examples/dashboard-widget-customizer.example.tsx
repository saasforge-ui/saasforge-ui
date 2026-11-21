import { DashboardWidgetCustomizer } from "@/components/saas/dashboard/dashboard-widget-customizer";

export default function Example() {
  return (
    <DashboardWidgetCustomizer
      widgets={[
        { id: "revenue", title: "Revenue", description: "MRR trend for the current month", metricValue: "$48.2k", enabled: true },
        { id: "active-users", title: "Active users", description: "Users active in the last 24 hours", metricValue: "2,834", enabled: true },
        { id: "churn", title: "Churn rate", description: "Cancelled accounts this quarter", metricValue: "2.1%", enabled: true, visible: false },
        { id: "open-tickets", title: "Open tickets", description: "Unresolved support tickets", metricValue: "12", enabled: false },
        { id: "nps", title: "NPS score", description: "Net promoter score, last survey", metricValue: "62", enabled: false },
      ]}
    />
  );
}
