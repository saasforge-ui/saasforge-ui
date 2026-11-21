import * as React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCartDrawer } from "@/components/saas/ecommerce/shopping-cart-drawer";

export default function Example() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { id: "1", name: "Wireless Keyboard", price: 79, quantity: 1 },
    { id: "2", name: "USB-C Hub", price: 29, quantity: 2 },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open cart</Button>
      <ShoppingCartDrawer
        open={open}
        onOpenChange={setOpen}
        items={items}
        subtotal={subtotal}
        onQuantityChange={(id, quantity) =>
          setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
        }
        onRemove={(id) => setItems((prev) => prev.filter((item) => item.id !== id))}
        onCheckout={() => console.log("checkout")}
      />
    </>
  );
}
