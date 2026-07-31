import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface OrderSummaryLineItem {
  label: string;
  amount: number;
}

export interface OrderSummaryCardProps {
  items: OrderSummaryLineItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  className?: string;
}

function formatAmount(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

export function OrderSummaryCard({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  currency = "USD",
  className,
}: OrderSummaryCardProps) {
  return (
    <Card className={cn("max-w-sm text-left", className)}>
      <CardHeader>
        <CardTitle className="text-base">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-muted-foreground">
              <span>{item.label}</span>
              <span className="text-foreground">{formatAmount(item.amount, currency)}</span>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="text-foreground">{formatAmount(subtotal, currency)}</span>
          </div>
          {shipping !== undefined && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground">{shipping === 0 ? "Free" : formatAmount(shipping, currency)}</span>
            </div>
          )}
          {tax !== undefined && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="text-foreground">{formatAmount(tax, currency)}</span>
            </div>
          )}
          {discount !== undefined && discount > 0 && (
            <div className="flex items-center justify-between text-success">
              <span>Discount</span>
              <span>-{formatAmount(discount, currency)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <span className="font-semibold">Total</span>
        <span className="text-lg font-semibold tracking-tight">{formatAmount(total, currency)}</span>
      </CardFooter>
    </Card>
  );
}
