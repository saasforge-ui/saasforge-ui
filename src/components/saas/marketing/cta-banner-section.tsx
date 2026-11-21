import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTAAction {
  label: string;
  onClick: () => void;
}

export interface CTABannerSectionProps {
  title: string;
  description?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  className?: string;
}

export function CTABannerSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CTABannerSectionProps) {
  return (
    <div
      className={cn(
        "w-full max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mx-auto mt-2 max-w-md text-muted-foreground">{description}</p>}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
