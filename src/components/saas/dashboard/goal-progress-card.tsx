import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface GoalProgressCardProps {
  title: string;
  current: number;
  target: number;
  unit?: string;
  formatAsCurrency?: boolean;
  deadlineLabel?: string;
  isLoading?: boolean;
  className?: string;
}

function formatValue(value: number, formatAsCurrency: boolean, unit?: string) {
  if (formatAsCurrency) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      value,
    );
  }
  return `${new Intl.NumberFormat("en-US").format(value)}${unit ? ` ${unit}` : ""}`;
}

export function GoalProgressCard({
  title,
  current,
  target,
  unit,
  formatAsCurrency = false,
  deadlineLabel,
  isLoading = false,
  className,
}: GoalProgressCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("max-w-sm", className)}>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>
    );
  }

  const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const remaining = Math.max(0, target - current);

  return (
    <Card className={cn("max-w-sm text-left", className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold tracking-tight">{formatValue(current, formatAsCurrency, unit)}</p>
          <p className="text-sm text-muted-foreground">of {formatValue(target, formatAsCurrency, unit)}</p>
        </div>
        <Progress value={percent} aria-label={`${title}: ${percent}% of goal reached`} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{remaining > 0 ? `${formatValue(remaining, formatAsCurrency, unit)} to go` : "Goal reached"}</span>
          {deadlineLabel && <span>{deadlineLabel}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
