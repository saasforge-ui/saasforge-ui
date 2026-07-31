import { ProductCardGrid } from "@/components/free/product-card-grid";

export default function Example() {
  return (
    <ProductCardGrid
      products={[
        { id: "p1", name: "Wireless Keyboard", price: 79, rating: 4.5, inStock: true },
        { id: "p2", name: "USB-C Hub", price: 29, rating: 4.2, inStock: true },
        { id: "p3", name: "Desk Mat", price: 19, rating: 4.8, inStock: false },
      ]}
      onAddToCart={(product) => console.log("add to cart", product)}
    />
  );
}
