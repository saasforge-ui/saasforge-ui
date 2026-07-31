import { OrderSummaryCard } from "@/components/free/order-summary-card";

export default function Example() {
  return (
    <OrderSummaryCard
      items={[
        { label: "Wireless Keyboard x1", amount: 79 },
        { label: "USB-C Hub x2", amount: 58 },
      ]}
      subtotal={137}
      shipping={0}
      tax={11.5}
      discount={10}
      total={138.5}
    />
  );
}
