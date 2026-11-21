import { ShippingAddressForm } from "@/components/saas/ecommerce/shipping-address-form";

export default function Example() {
  return <ShippingAddressForm onSubmit={(values) => console.log("shipping address", values)} />;
}
