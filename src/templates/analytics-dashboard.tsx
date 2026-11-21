import * as React from "react";
import { BarChart3, LayoutDashboard, Settings, Target, Users } from "lucide-react";
import { VerticalNavSidebar } from "@/components/saas/navigation/vertical-nav-sidebar";
import { DashboardOverview } from "@/components/saas/dashboard/dashboard-overview";
import { UsageMetricsCard } from "@/components/saas/dashboard/usage-metrics-card";
import { GoalProgressCard } from "@/components/saas/dashboard/goal-progress-card";
import { AnalyticsChartCard } from "@/components/saas/analytics/analytics-chart-card";
import { mockActivity, mockRevenueSeries, mockUsageSeries } from "@/data/mock-data";

/**
 * Analytics Dashboard — a full-page template composed entirely from existing
 * SaaSForge UI Pro components. Vertical Nav Sidebar provides the page chrome;
 * Dashboard Overview, Revenue Analytics Card, Usage Metrics Card, Analytics
 * Chart Card, Goal Progress Card and Recent Activity Timeline make up the
 * content grid.
 */
export default function AnalyticsDashboardTemplate() {
  const [activeNavId, setActiveNavId] = React.useState("overview");

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border p-4 lg:block">
        <VerticalNavSidebar
          activeId={activeNavId}
          onNavigate={setActiveNavId}
          sections={[
            {
              items: [
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "analytics", label: "Analytics", icon: BarChart3 },
                { id: "goals", label: "Goals", icon: Target },
              ],
            },
            {
              title: "Workspace",
              items: [
                { id: "team", label: "Team", icon: Users },
                { id: "settings", label: "Settings", icon: Settings },
              ],
            },
          ]}
        />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Acme Technologies — updated just now</p>
          </div>
        </header>

        <main className="space-y-8 p-6">
          <DashboardOverview
            workspaceName="Acme Technologies"
            metrics={[
              { id: "mrr", label: "MRR", value: 38650, change: 12.5, data: mockRevenueSeries },
              { id: "arr", label: "ARR", value: 463800, change: 9.1, data: mockRevenueSeries },
              {
                id: "active-users",
                label: "Active users",
                value: 2140,
                change: 4.6,
                formatAsCurrency: false,
                data: mockUsageSeries,
              },
            ]}
            revenueSeries={mockRevenueSeries}
            activity={mockActivity}
          />

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Usage &amp; goals</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <UsageMetricsCard label="API requests" used={84200} limit={100000} unit="req" />
              <UsageMetricsCard label="Storage" used={182} limit={250} unit="GB" level="warning" />
              <GoalProgressCard title="Quarterly revenue goal" current={116450} target={150000} formatAsCurrency deadlineLabel="Ends in 42 days" />
              <GoalProgressCard title="New signups goal" current={640} target={1000} unit="signups" deadlineLabel="Ends in 42 days" />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Weekly active users</h2>
            <AnalyticsChartCard
              title="Weekly active users"
              description="Unique active users per day, last 7 days"
              variant="bar"
              data={mockUsageSeries}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
