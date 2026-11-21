import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ImageOff, Minus, Plus, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ProductItem } from "@/types";

export interface ProductQuickViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductItem;
  variantOptions?: { value: string; label: string }[];
  onAddToCart?: (quantity: number, variant?: string) => void;
  className?: string;
}

export function ProductQuickViewModal({
  open,
  onOpenChange,
  product,
  variantOptions,
  onAddToCart,
  className,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState(variantOptions?.[0]?.value);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg animate-in fade-in-0 zoom-in-95",
            className,
          )}
        >
          <DialogPrimitive.Close aria-label="Close" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex aspect-square items-center justify-center rounded-md bg-muted">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full rounded-md object-cover" />
              ) : (
                <ImageOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
              )}
            </div>

            <div className="text-left">
              <DialogPrimitive.Title className="text-lg font-semibold">{product.name}</DialogPrimitive.Title>
              {product.rating !== undefined && (
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-current text-warning-foreground" aria-hidden="true" />
                  {product.rating.toFixed(1)}
                </div>
              )}
              <p className="mt-2 text-xl font-semibold tracking-tight">${product.price.toFixed(2)}</p>
              {product.description && (
                <DialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
                  {product.description}
                </DialogPrimitive.Description>
              )}

              {variantOptions && variantOptions.length > 0 && (
                <div className="mt-4">
                  <Select value={variant} onValueChange={setVariant}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {variantOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-md border border-border">
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-40"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-6 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Button
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart?.(quantity, variant)}
                >
                  {product.inStock ? "Add to cart" : "Out of stock"}
                </Button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
