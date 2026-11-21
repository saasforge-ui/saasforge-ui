import { Check, Package, ShoppingBag, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
}

export interface OrderTrackingTimelineProps {
  steps: OrderTrackingStep[];
  currentStatus: OrderStatus;
  className?: string;
}

const iconByStatus: Record<OrderStatus, LucideIcon> = {
  placed: ShoppingBag,
  processing: Package,
  shipped: Truck,
  out_for_delivery: Truck,
  delivered: Check,
};

export function OrderTrackingTimeline({ steps, currentStatus, className }: OrderTrackingTimelineProps) {
  const currentIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <ol className={cn("w-full max-w-md space-y-0 text-left", className)}>
      {steps.map((step, index) => {
        const Icon = iconByStatus[step.status];
        const isComplete = index < currentIndex || (index === currentIndex && step.status === "delivered");
        const isCurrent = index === currentIndex && !isComplete;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  isComplete && "border-success bg-success/10 text-success",
                  isCurrent && "border-primary bg-primary/10 text-primary",
                  !isComplete && !isCurrent && "border-border text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {!isLast && (
                <span className={cn("mt-1 w-px flex-1", isComplete ? "bg-success" : "bg-border")} style={{ minHeight: "1.5rem" }} />
              )}
            </div>
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p className={cn("text-sm font-medium", !isComplete && !isCurrent && "text-muted-foreground")}>
                {step.label}
              </p>
              {step.timestamp && <p className="text-xs text-muted-foreground">{step.timestamp}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
