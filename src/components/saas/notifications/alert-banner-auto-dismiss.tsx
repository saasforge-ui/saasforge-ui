import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertBannerVariant = "info" | "success" | "warning" | "error";

export interface AlertBannerProps {
  variant: AlertBannerVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
  autoDismissMs?: number;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<AlertBannerVariant, { icon: typeof Info; className: string; iconClassName: string }> = {
  info: { icon: Info, className: "border-primary/30 bg-primary/10", iconClassName: "text-primary" },
  success: { icon: CheckCircle2, className: "border-success/30 bg-success/10", iconClassName: "text-success" },
  warning: { icon: AlertTriangle, className: "border-warning/30 bg-warning/10", iconClassName: "text-warning" },
  error: { icon: XCircle, className: "border-destructive/30 bg-destructive/10", iconClassName: "text-destructive" },
};

export function AlertBanner({
  variant,
  title,
  description,
  dismissible = true,
  autoDismissMs,
  onDismiss,
  className,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [remainingPercent, setRemainingPercent] = React.useState(100);
  const config = variantConfig[variant];
  const Icon = config.icon;

  const dismiss = React.useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  React.useEffect(() => {
    if (!autoDismissMs) return;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / autoDismissMs) * 100);
      setRemainingPercent(percent);
      if (elapsed >= autoDismissMs) {
        clearInterval(interval);
        dismiss();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [autoDismissMs, dismiss]);

  if (!isVisible) return null;

  return (
    <div role="alert" className={cn("relative w-full overflow-hidden rounded-lg border p-3.5", config.className, className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", config.iconClassName)} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {autoDismissMs && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/10">
          <div
            className={cn("h-full transition-[width] duration-75 ease-linear", config.iconClassName.replace("text-", "bg-"))}
            style={{ width: `${remainingPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
