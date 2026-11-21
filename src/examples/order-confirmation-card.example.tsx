import { OrderConfirmationCard } from "@/components/saas/ecommerce/order-confirmation-card";

export default function Example() {
  return (
    <OrderConfirmationCard
      orderNumber="10482"
      estimatedDelivery="August 5 - August 7"
      email="sarah@acme.io"
      onTrackOrder={() => console.log("track order")}
      onContinueShopping={() => console.log("continue shopping")}
    />
  );
}
