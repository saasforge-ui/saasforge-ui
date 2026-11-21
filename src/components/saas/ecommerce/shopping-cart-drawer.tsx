import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ImageOff, Loader2, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types";

export interface ShoppingCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  subtotal: number;
  currency?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  isCheckingOut?: boolean;
  className?: string;
}

export function ShoppingCartDrawer({
  open,
  onOpenChange,
  items,
  subtotal,
  currency = "USD",
  onQuantityChange,
  onRemove,
  onCheckout,
  isCheckingOut = false,
  className,
}: ShoppingCartDrawerProps) {
  const formattedSubtotal = new Intl.NumberFormat("en-US", { style: "currency", currency }).format(subtotal);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-card p-6 shadow-lg animate-in slide-in-from-right",
            className,
          )}
        >
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="flex items-center gap-2 text-base font-semibold">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Your cart
            </DialogPrimitive.Title>
            <DialogPrimitive.Close aria-label="Close cart" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-muted">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="h-full w-full rounded-md object-cover" />
                    ) : (
                      <ImageOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      </div>
                      {onRemove && (
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 rounded-md border border-border">
                        <button
                          type="button"
                          className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-40"
                          disabled={!onQuantityChange || item.quantity <= 1}
                          onClick={() => onQuantityChange?.(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-4 text-center text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-1.5 text-muted-foreground hover:text-foreground"
                          disabled={!onQuantityChange}
                          onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formattedSubtotal}</span>
            </div>
            <Button className="w-full" disabled={items.length === 0 || isCheckingOut} onClick={onCheckout}>
              {isCheckingOut && <Loader2 className="h-4 w-4 animate-spin" />}
              Checkout
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
