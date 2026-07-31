import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderConfirmationCard } from "./order-confirmation-card";

describe("OrderConfirmationCard", () => {
  it("renders the order number and delivery estimate", () => {
    render(<OrderConfirmationCard orderNumber="10482" estimatedDelivery="Aug 5 - Aug 7" />);
    expect(screen.getByText(/#10482/)).toBeInTheDocument();
    expect(screen.getByText("Aug 5 - Aug 7")).toBeInTheDocument();
  });

  it("calls onTrackOrder when clicked", async () => {
    const onTrackOrder = vi.fn();
    render(<OrderConfirmationCard orderNumber="10482" onTrackOrder={onTrackOrder} />);
    await userEvent.click(screen.getByRole("button", { name: "Track order" }));
    expect(onTrackOrder).toHaveBeenCalledOnce();
  });

  it("omits the delivery estimate block when not provided", () => {
    render(<OrderConfirmationCard orderNumber="10482" />);
    expect(screen.queryByText("Estimated delivery")).not.toBeInTheDocument();
  });
});
