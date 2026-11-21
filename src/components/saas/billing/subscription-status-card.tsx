import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency } from "@/lib/utils";
import type { SubscriptionStatus } from "@/types";

export interface SubscriptionStatusCardProps {
  planName: string;
  price: number;
  currency?: string;
  billingCycle: "monthly" | "yearly";
  status: SubscriptionStatus;
  renewalDate: string;
  usageLabel?: string;
  usageValue?: number;
  usageLimit?: number;
  onUpgrade?: () => void;
  onManage?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

const statusConfig: Record<SubscriptionStatus, { label: string; variant: "success" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Active", variant: "success" },
  trial: { label: "Trial", variant: "secondary" },
  past_due: { label: "Past due", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "outline" },
};

export function SubscriptionStatusCard({
  planName,
  price,
  currency = "USD",
  billingCycle,
  status,
  renewalDate,
  usageLabel,
  usageValue,
  usageLimit,
  onUpgrade,
  onManage,
  onCancel,
  isLoading = false,
  className,
}: SubscriptionStatusCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("max-w-sm", className)}>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>
    );
  }

  const { label, variant } = statusConfig[status];
  const showUsage = usageLabel !== undefined && usageValue !== undefined && usageLimit !== undefined;
  const usageRatio = showUsage ? Math.min(usageValue! / Math.max(usageLimit!, 1), 1) : 0;

  return (
    <Card className={cn("max-w-sm text-left", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{planName}</CardTitle>
        <Badge variant={variant}>{label}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            {formatCurrency(price, currency)}
            <span className="text-sm font-normal text-muted-foreground">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </p>
          {status === "past_due" ? (
            <p className="text-sm text-destructive">Payment failed — update your payment method.</p>
          ) : status === "cancelled" ? (
            <p className="text-sm text-muted-foreground">Access ends on {renewalDate}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Renews on {renewalDate}</p>
          )}
        </div>
        {showUsage && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{usageLabel}</span>
              <span>
                {usageValue} / {usageLimit}
              </span>
            </div>
            <Progress value={usageRatio * 100} />
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        {status !== "cancelled" && (
          <Button size="sm" className="flex-1" onClick={onUpgrade}>
            Upgrade
          </Button>
        )}
        <Button size="sm" variant="outline" className="flex-1" onClick={onManage}>
          Manage subscription
        </Button>
        {status === "active" && onCancel && (
          <Button size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
