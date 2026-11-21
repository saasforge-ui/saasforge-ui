import { PaymentMethodCard } from "@/components/saas/billing/payment-method-card";
import { mockPaymentMethods } from "@/data/mock-data";

export default function Example() {
  return (
    <PaymentMethodCard
      methods={mockPaymentMethods}
      onEdit={(m) => console.log("edit", m.id)}
      onRemove={(m) => console.log("remove", m.id)}
      onSetDefault={(m) => console.log("set default", m.id)}
      onAddMethod={() => console.log("add method")}
    />
  );
}
