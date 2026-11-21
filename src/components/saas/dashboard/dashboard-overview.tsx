import { LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RevenueAnalyticsCard } from "@/components/saas/dashboard/revenue-analytics-card";
import { AnalyticsChartCard } from "@/components/saas/analytics/analytics-chart-card";
import { ActivityTimeline } from "@/components/saas/analytics/activity-timeline";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn } from "@/lib/utils";
import type { ActivityItem, ChartPoint } from "@/types";

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  formatAsCurrency?: boolean;
  data: ChartPoint[];
}

export interface DashboardOverviewProps {
  workspaceName?: string;
  metrics: DashboardMetric[];
  revenueSeries: ChartPoint[];
  activity: ActivityItem[];
  ranges?: string[];
  defaultRange?: string;
  onRangeChange?: (range: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function DashboardOverview({
  workspaceName,
  metrics,
  revenueSeries,
  activity,
  ranges = ["7d", "30d", "90d"],
  defaultRange = "30d",
  onRangeChange,
  isLoading = false,
  className,
}: DashboardOverviewProps) {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-6", className)}>
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const isEmpty = metrics.length === 0 && revenueSeries.length === 0 && activity.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        icon={LayoutDashboard}
        title="No data yet"
        description="Metrics and activity will appear here once your workspace starts generating data."
        className={className}
      />
    );
  }

  return (
    <div className={cn("w-full space-y-6 text-left", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Overview</h3>
          {workspaceName && <p className="text-sm text-muted-foreground">{workspaceName}</p>}
        </div>
        <Select defaultValue={defaultRange} onValueChange={onRangeChange}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ranges.map((range) => (
              <SelectItem key={range} value={range}>
                {range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : range === "90d" ? "Last 90 days" : range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {metrics.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <RevenueAnalyticsCard
              key={metric.id}
              title={metric.label}
              value={metric.value}
              change={metric.change}
              formatAsCurrency={metric.formatAsCurrency ?? true}
              data={metric.data}
            />
          ))}
        </div>
      )}

      {revenueSeries.length > 0 && (
        <AnalyticsChartCard title="Revenue" description="vs. previous period" variant="area" data={revenueSeries} />
      )}

      {activity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline items={activity.slice(0, 5)} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
