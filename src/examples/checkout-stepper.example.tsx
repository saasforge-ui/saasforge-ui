import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutStepper } from "@/components/saas/ecommerce/checkout-stepper";

export default function Example() {
  return (
    <CheckoutStepper
      onComplete={() => console.log("order placed")}
      steps={[
        {
          id: "shipping",
          label: "Shipping",
          content: (
            <div className="space-y-1.5">
              <Label htmlFor="checkout-address">Address</Label>
              <Input id="checkout-address" placeholder="123 Main St" />
            </div>
          ),
        },
        {
          id: "payment",
          label: "Payment",
          content: (
            <div className="space-y-1.5">
              <Label htmlFor="checkout-card">Card number</Label>
              <Input id="checkout-card" placeholder="4242 4242 4242 4242" />
            </div>
          ),
        },
        {
          id: "review",
          label: "Review",
          content: <p className="text-sm text-muted-foreground">Review your order details before placing it.</p>,
        },
      ]}
    />
  );
}
