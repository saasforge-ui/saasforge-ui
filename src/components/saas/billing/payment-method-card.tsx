import { CreditCard, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn } from "@/lib/utils";
import type { PaymentMethodInfo } from "@/types";

export interface PaymentMethodCardProps {
  methods: PaymentMethodInfo[];
  isLoading?: boolean;
  onEdit?: (method: PaymentMethodInfo) => void;
  onRemove?: (method: PaymentMethodInfo) => void;
  onSetDefault?: (method: PaymentMethodInfo) => void;
  onAddMethod?: () => void;
  className?: string;
}

const brandLabel: Record<PaymentMethodInfo["brand"], string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  generic: "Card",
};

export function PaymentMethodCard({
  methods,
  isLoading = false,
  onEdit,
  onRemove,
  onSetDefault,
  onAddMethod,
  className,
}: PaymentMethodCardProps) {
  if (isLoading) {
    return (
      <div className={cn("w-full max-w-md space-y-3", className)}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No payment methods"
        description="Add a card to enable subscription billing."
        primaryAction={onAddMethod ? { label: "Add payment method", onClick: onAddMethod } : undefined}
        className={className}
      />
    );
  }

  return (
    <div className={cn("w-full max-w-md space-y-3 text-left", className)}>
      {methods.map((method) => (
        <Card key={method.id}>
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-medium">
                  {brandLabel[method.brand]} •••• {method.last4}
                  {method.isDefault && <Badge variant="secondary">Default</Badge>}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {String(method.expiryMonth).padStart(2, "0")}/{method.expiryYear}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={() => onEdit(method)}>
                  Edit
                </Button>
              )}
              {!method.isDefault && onSetDefault && (
                <Button variant="ghost" size="sm" onClick={() => onSetDefault(method)}>
                  Set as default
                </Button>
              )}
              {!method.isDefault && onRemove && (
                <Button variant="ghost" size="sm" onClick={() => onRemove(method)}>
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
