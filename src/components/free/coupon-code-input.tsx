import * as React from "react";
import { CheckCircle2, Loader2, Tag, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CouponCodeInputProps {
  appliedCode?: string;
  discountLabel?: string;
  error?: string;
  isApplying?: boolean;
  onApply: (code: string) => void;
  onRemove?: () => void;
  className?: string;
}

export function CouponCodeInput({
  appliedCode,
  discountLabel,
  error,
  isApplying = false,
  onApply,
  onRemove,
  className,
}: CouponCodeInputProps) {
  const [code, setCode] = React.useState("");

  if (appliedCode) {
    return (
      <div className={cn("flex items-center justify-between rounded-md border border-success/30 bg-success/10 px-3 py-2", className)}>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
          <span className="font-medium">{appliedCode}</span>
          {discountLabel && <Badge variant="success">{discountLabel}</Badge>}
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove coupon"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Coupon code"
            className="pl-9"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button type="button" variant="outline" disabled={!code || isApplying} onClick={() => onApply(code)}>
          {isApplying && <Loader2 className="h-4 w-4 animate-spin" />}
          Apply
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
