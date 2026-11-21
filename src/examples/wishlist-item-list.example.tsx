import { WishlistItemList } from "@/components/saas/ecommerce/wishlist-item-list";

export default function Example() {
  return (
    <WishlistItemList
      items={[
        { id: "p1", name: "Wireless Keyboard", price: 79, inStock: true },
        { id: "p2", name: "Standing Desk", price: 349, inStock: false },
      ]}
      onMoveToCart={(item) => console.log("move to cart", item)}
      onRemove={(item) => console.log("remove", item)}
    />
  );
}
