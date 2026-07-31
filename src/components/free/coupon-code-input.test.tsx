import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CouponCodeInput } from "./coupon-code-input";

describe("CouponCodeInput", () => {
  it("disables Apply until a code is typed", () => {
    render(<CouponCodeInput onApply={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  });

  it("calls onApply with the typed code", async () => {
    const onApply = vi.fn();
    render(<CouponCodeInput onApply={onApply} />);
    await userEvent.type(screen.getByPlaceholderText("Coupon code"), "SAVE10");
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(onApply).toHaveBeenCalledWith("SAVE10");
  });

  it("shows the applied state with a remove button", async () => {
    const onRemove = vi.fn();
    render(<CouponCodeInput appliedCode="SAVE10" discountLabel="-10%" onApply={vi.fn()} onRemove={onRemove} />);
    expect(screen.getByText("SAVE10")).toBeInTheDocument();
    expect(screen.getByText("-10%")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Remove coupon"));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("shows an error message", () => {
    render(<CouponCodeInput onApply={vi.fn()} error="Invalid code." />);
    expect(screen.getByText("Invalid code.")).toBeInTheDocument();
  });
});
