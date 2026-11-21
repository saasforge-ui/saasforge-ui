import { Heart, ImageOff, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn } from "@/lib/utils";
import type { ProductItem } from "@/types";

export interface WishlistItemListProps {
  items: ProductItem[];
  onMoveToCart?: (item: ProductItem) => void;
  onRemove?: (item: ProductItem) => void;
  className?: string;
}

export function WishlistItemList({ items, onMoveToCart, onRemove, className }: WishlistItemListProps) {
  if (items.length === 0) {
    return (
      <EmptyState icon={Heart} title="Your wishlist is empty" description="Items you save will show up here." className={className} />
    );
  }

  return (
    <div className={cn("w-full max-w-lg divide-y divide-border rounded-lg border border-border text-left", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-3 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt="" className="h-full w-full rounded-md object-cover" />
              ) : (
                <ImageOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
                {!item.inStock && <span className="ml-2 text-destructive">Out of stock</span>}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {onMoveToCart && (
              <Button size="sm" variant="outline" disabled={!item.inStock} onClick={() => onMoveToCart(item)}>
                <ShoppingCart className="h-3.5 w-3.5" />
                Move to cart
              </Button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(item)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
