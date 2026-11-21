import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";

export interface FunnelStage {
  label: string;
  value: number;
}

export interface ConversionFunnelChartProps {
  title?: string;
  description?: string;
  stages: FunnelStage[];
  isLoading?: boolean;
  className?: string;
}

export function ConversionFunnelChart({
  title = "Conversion funnel",
  description,
  stages,
  isLoading = false,
  className,
}: ConversionFunnelChartProps) {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const maxValue = stages[0]?.value ?? 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, index) => {
          const widthPercent = maxValue > 0 ? Math.max(6, Math.round((stage.value / maxValue) * 100)) : 0;
          const previousValue = index > 0 ? stages[index - 1].value : stage.value;
          const stepConversion = index === 0 ? 100 : previousValue > 0 ? Math.round((stage.value / previousValue) * 100) : 0;
          const dropOff = index === 0 ? 0 : Math.max(0, 100 - stepConversion);

          return (
            <div key={stage.label}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="font-medium">{stage.label}</span>
                <span className="text-muted-foreground">
                  {formatNumber(stage.value)}
                  <span className="ml-1.5 font-medium text-foreground">{stepConversion}%</span>
                </span>
              </div>
              <div className="h-8 w-full rounded-md bg-muted" role="img" aria-label={`${stage.label}: ${formatNumber(stage.value)} (${stepConversion}% of previous stage)`}>
                <div
                  className="mx-auto flex h-8 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground transition-all"
                  style={{ width: `${widthPercent}%` }}
                >
                  {widthPercent >= 16 && `${widthPercent}%`}
                </div>
              </div>
              {index > 0 && dropOff > 0 && (
                <p className="mt-1 text-xs text-destructive">-{dropOff}% drop-off from {stages[index - 1].label}</p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
