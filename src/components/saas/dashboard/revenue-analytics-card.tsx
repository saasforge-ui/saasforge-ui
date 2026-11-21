import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import type { ChartPoint, TrendDirection } from "@/types";

export interface RevenueAnalyticsCardProps {
  /** Card title, e.g. "Monthly Revenue" */
  title: string;
  /** Current value, already formatted or a raw number */
  value: number;
  /** ISO currency code, only used when `value` is numeric and `formatAsCurrency` is true */
  currency?: string;
  /** Whether to format `value` as currency (defaults to true) */
  formatAsCurrency?: boolean;
  /** Percentage change vs the previous period, e.g. 12.5 or -4.2 */
  change: number;
  /** Explicit trend direction. Falls back to the sign of `change` when omitted */
  trend?: TrendDirection;
  /** Label describing the comparison period, e.g. "vs last month" */
  comparisonLabel?: string;
  /** Sparkline data */
  data: ChartPoint[];
  /** Loading skeleton state */
  isLoading?: boolean;
  className?: string;
}

const trendStyles: Record<TrendDirection, { icon: typeof ArrowUpRight; className: string }> = {
  up: { icon: ArrowUpRight, className: "text-success" },
  down: { icon: ArrowDownRight, className: "text-destructive" },
  neutral: { icon: Minus, className: "text-muted-foreground" },
};

export function RevenueAnalyticsCard({
  title,
  value,
  currency = "USD",
  formatAsCurrency = true,
  change,
  trend,
  comparisonLabel = "vs previous period",
  data,
  isLoading = false,
  className,
}: RevenueAnalyticsCardProps) {
  const resolvedTrend: TrendDirection = trend ?? (change > 0 ? "up" : change < 0 ? "down" : "neutral");
  const { icon: TrendIcon, className: trendClassName } = trendStyles[resolvedTrend];

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {formatAsCurrency ? formatCurrency(value, currency) : formatNumber(value)}
            </p>
            <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", trendClassName)}>
              <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="font-normal text-muted-foreground">{comparisonLabel}</span>
            </p>
          </div>
          <div className="h-16 w-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={`revenue-sparkline-${title.replace(/\s+/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--muted-foreground)" }}
                  formatter={(v) => [
                    formatAsCurrency ? formatCurrency(Number(v), currency) : formatNumber(Number(v)),
                    title,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill={`url(#revenue-sparkline-${title.replace(/\s+/g, "-")})`}
                  className={trendClassName}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
