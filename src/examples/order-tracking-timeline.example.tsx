import { OrderTrackingTimeline } from "@/components/saas/ecommerce/order-tracking-timeline";

export default function Example() {
  return (
    <OrderTrackingTimeline
      currentStatus="shipped"
      steps={[
        { status: "placed", label: "Order placed", timestamp: "Jul 28, 9:12 AM" },
        { status: "processing", label: "Processing", timestamp: "Jul 28, 2:40 PM" },
        { status: "shipped", label: "Shipped", timestamp: "Jul 29, 10:05 AM" },
        { status: "out_for_delivery", label: "Out for delivery" },
        { status: "delivered", label: "Delivered" },
      ]}
    />
  );
}
