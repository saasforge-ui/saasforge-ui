import * as React from "react";
import { Button } from "@/components/ui/button";
import { ProductQuickViewModal } from "@/components/saas/ecommerce/product-quick-view-modal";

export default function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Quick view</Button>
      <ProductQuickViewModal
        open={open}
        onOpenChange={setOpen}
        product={{
          id: "p1",
          name: "Wireless Keyboard",
          price: 79,
          rating: 4.5,
          inStock: true,
          description: "A compact wireless keyboard with a rechargeable battery and quiet keys.",
        }}
        variantOptions={[
          { value: "black", label: "Black" },
          { value: "white", label: "White" },
        ]}
        onAddToCart={(quantity, variant) => console.log("add to cart", quantity, variant)}
      />
    </>
  );
}
