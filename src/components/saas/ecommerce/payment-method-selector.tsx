import { CreditCard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentMethodInfo } from "@/types";

export interface PaymentMethodSelectorProps {
  methods: PaymentMethodInfo[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onAddNew?: () => void;
  className?: string;
}

const brandLabel: Record<PaymentMethodInfo["brand"], string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  generic: "Card",
};

export function PaymentMethodSelector({ methods, selectedId, onSelect, onAddNew, className }: PaymentMethodSelectorProps) {
  return (
    <div className={cn("w-full max-w-sm space-y-2 text-left", className)} role="radiogroup" aria-label="Payment method">
      {methods.map((method) => {
        const isSelected = method.id === selectedId;
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(method.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
              isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-accent",
            )}
          >
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                isSelected ? "border-primary" : "border-input",
              )}
            >
              {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            <CreditCard className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="min-w-0 flex-1 text-sm">
              {brandLabel[method.brand]} •••• {method.last4}
              <span className="ml-2 text-xs text-muted-foreground">
                Exp {method.expiryMonth}/{method.expiryYear}
              </span>
            </span>
            {method.isDefault && <span className="text-xs text-muted-foreground">Default</span>}
          </button>
        );
      })}

      {onAddNew && (
        <button
          type="button"
          onClick={onAddNew}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add new payment method
        </button>
      )}
    </div>
  );
}
