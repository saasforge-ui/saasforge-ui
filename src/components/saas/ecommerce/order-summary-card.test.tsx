import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderSummaryCard } from "./order-summary-card";

describe("OrderSummaryCard", () => {
  it("renders line items and total", () => {
    render(
      <OrderSummaryCard
        items={[{ label: "Widget x1", amount: 20 }]}
        subtotal={20}
        total={20}
      />,
    );
    expect(screen.getByText("Widget x1")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByText("$20.00").length).toBeGreaterThan(0);
  });

  it("shows Free for zero shipping", () => {
    render(<OrderSummaryCard items={[]} subtotal={20} shipping={0} total={20} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("shows discount in the totals when positive", () => {
    render(<OrderSummaryCard items={[]} subtotal={20} discount={5} total={15} />);
    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText("-$5.00")).toBeInTheDocument();
  });
});
