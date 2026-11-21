import * as React from "react";
import { PaymentMethodSelector } from "@/components/saas/ecommerce/payment-method-selector";

export default function Example() {
  const [selectedId, setSelectedId] = React.useState("pm_01");

  return (
    <PaymentMethodSelector
      methods={[
        { id: "pm_01", brand: "visa", last4: "4242", expiryMonth: 8, expiryYear: 2027, isDefault: true },
        { id: "pm_02", brand: "mastercard", last4: "8831", expiryMonth: 3, expiryYear: 2026, isDefault: false },
      ]}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onAddNew={() => console.log("add new payment method")}
    />
  );
}
