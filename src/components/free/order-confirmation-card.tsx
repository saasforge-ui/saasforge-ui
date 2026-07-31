import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OrderConfirmationCardProps {
  orderNumber: string;
  estimatedDelivery?: string;
  email?: string;
  onTrackOrder?: () => void;
  onContinueShopping?: () => void;
  className?: string;
}

export function OrderConfirmationCard({
  orderNumber,
  estimatedDelivery,
  email,
  onTrackOrder,
  onContinueShopping,
  className,
}: OrderConfirmationCardProps) {
  return (
    <Card className={cn("max-w-sm text-center", className)}>
      <CardContent className="flex flex-col items-center gap-4 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold">Order confirmed</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Order <span className="font-medium text-foreground">#{orderNumber}</span> has been placed.
            {email && ` A confirmation was sent to ${email}.`}
          </p>
        </div>
        {estimatedDelivery && (
          <div className="w-full rounded-md border border-border p-3 text-sm">
            <p className="text-muted-foreground">Estimated delivery</p>
            <p className="mt-0.5 font-medium">{estimatedDelivery}</p>
          </div>
        )}
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row">
          {onContinueShopping && (
            <Button variant="outline" className="flex-1" onClick={onContinueShopping}>
              Continue shopping
            </Button>
          )}
          {onTrackOrder && (
            <Button className="flex-1" onClick={onTrackOrder}>
              Track order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
