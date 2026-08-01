import { Info, Megaphone, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnnouncementVariant = "info" | "success" | "warning";

export interface AnnouncementBannerProps {
  message: string;
  variant?: AnnouncementVariant;
  ctaLabel?: string;
  onCtaClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<AnnouncementVariant, { icon: LucideIcon; className: string }> = {
  info: { icon: Info, className: "bg-primary/10 text-primary" },
  success: { icon: Megaphone, className: "bg-success/10 text-success" },
  warning: { icon: Megaphone, className: "bg-warning/20 text-warning-foreground" },
};

export function AnnouncementBanner({
  message,
  variant = "info",
  ctaLabel,
  onCtaClick,
  onDismiss,
  className,
}: AnnouncementBannerProps) {
  const { icon: Icon, className: variantClassName } = variantConfig[variant];

  return (
    <div className={cn("flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm", variantClassName, className)}>
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="flex-1">{message}</p>
      {ctaLabel && onCtaClick && (
        <button type="button" onClick={onCtaClick} className="shrink-0 font-medium underline underline-offset-2">
          {ctaLabel}
        </button>
      )}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss announcement" className="shrink-0 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
