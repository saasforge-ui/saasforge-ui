import { ImageOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProductItem } from "@/types";

export interface ProductCardGridProps {
  products: ProductItem[];
  onAddToCart?: (product: ProductItem) => void;
  onSelect?: (product: ProductItem) => void;
  className?: string;
}

export function ProductCardGrid({ products, onAddToCart, onSelect, className }: ProductCardGridProps) {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden text-left">
          <button
            type="button"
            onClick={() => onSelect?.(product)}
            className="flex aspect-square w-full items-center justify-center bg-muted"
          >
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
          <CardContent className="space-y-2 p-4">
            <div>
              <p className="truncate text-sm font-medium">{product.name}</p>
              {product.rating !== undefined && (
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-current text-warning-foreground" aria-hidden="true" />
                  {product.rating.toFixed(1)}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">${product.price.toFixed(2)}</span>
              <Button
                size="sm"
                variant="outline"
                disabled={!product.inStock}
                onClick={() => onAddToCart?.(product)}
              >
                {product.inStock ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
