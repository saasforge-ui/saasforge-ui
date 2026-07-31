import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCardGrid } from "./product-card-grid";

const products = [
  { id: "p1", name: "Widget", price: 20, inStock: true },
  { id: "p2", name: "Gadget", price: 15, inStock: false },
];

describe("ProductCardGrid", () => {
  it("renders each product's name and price", () => {
    render(<ProductCardGrid products={products} />);
    expect(screen.getByText("Widget")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("disables add to cart for out-of-stock products", () => {
    render(<ProductCardGrid products={products} />);
    expect(screen.getByRole("button", { name: "Out of stock" })).toBeDisabled();
  });

  it("calls onAddToCart with the product", async () => {
    const onAddToCart = vi.fn();
    render(<ProductCardGrid products={products} onAddToCart={onAddToCart} />);
    await userEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(onAddToCart).toHaveBeenCalledWith(products[0]);
  });
});
