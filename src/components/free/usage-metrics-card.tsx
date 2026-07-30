import { AlertTriangle, Infinity as InfinityIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatNumber } from "@/lib/utils";

export type UsageLevel = "normal" | "warning" | "critical" | "unlimited";

export interface UsageMetricsCardProps {
  /** Metric label, e.g. "API requests" */
  label: string;
  /** Current usage amount */
  used: number;
  /** Plan limit. Ignored when `level` is "unlimited" */
  limit: number;
  /** Unit suffix shown after numbers, e.g. "requests", "GB" */
  unit?: string;
  /** Explicit usage level. Falls back to computed thresholds when omitted */
  level?: UsageLevel;
  /** Threshold (0-1) at which the card switches to the warning state */
  warningThreshold?: number;
  /** Threshold (0-1) at which the card switches to the critical state */
  criticalThreshold?: number;
  isLoading?: boolean;
  className?: string;
}

function resolveLevel(ratio: number, warningThreshold: number, criticalThreshold: number): UsageLevel {
  if (ratio >= criticalThreshold) return "critical";
  if (ratio >= warningThreshold) return "warning";
  return "normal";
}

const levelStyles: Record<UsageLevel, string> = {
  normal: "bg-primary",
  warning: "bg-warning",
  critical: "bg-destructive",
  unlimited: "bg-success",
};

export function UsageMetricsCard({
  label,
  used,
  limit,
  unit = "",
  level,
  warningThreshold = 0.75,
  criticalThreshold = 0.9,
  isLoading = false,
  className,
}: UsageMetricsCardProps) {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>
    );
  }

  const isUnlimited = level === "unlimited";
  const ratio = isUnlimited ? 0 : Math.min(used / Math.max(limit, 1), 1);
  const resolvedLevel = level ?? resolveLevel(ratio, warningThreshold, criticalThreshold);
  const percent = Math.round(ratio * 100);

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {resolvedLevel === "critical" && (
          <span className="flex items-center gap-1 text-xs font-medium text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Limit almost reached
          </span>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold tracking-tight">
            {isUnlimited ? (
              <span className="inline-flex items-center gap-1.5">
                {formatNumber(used)} {unit}
                <InfinityIcon className="h-4 w-4 text-success" aria-label="Unlimited" />
              </span>
            ) : (
              <>
                {formatNumber(used)} / {formatNumber(limit)} {unit}
              </>
            )}
          </p>
          {!isUnlimited && (
            <span
              className={cn(
                "text-xs font-medium",
                resolvedLevel === "critical" && "text-destructive",
                resolvedLevel === "warning" && "text-warning-foreground",
                resolvedLevel === "normal" && "text-muted-foreground",
              )}
            >
              {percent}% used
            </span>
          )}
        </div>
        {!isUnlimited && (
          <Progress
            value={percent}
            aria-label={`${label} usage: ${percent}%`}
            indicatorClassName={levelStyles[resolvedLevel]}
          />
        )}
      </CardContent>
    </Card>
  );
}
