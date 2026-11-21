import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscriptionStatusCard } from "./subscription-status-card";

describe("SubscriptionStatusCard", () => {
  it("renders plan name, price and status", () => {
    render(
      <SubscriptionStatusCard
        planName="Growth Plan"
        price={79}
        billingCycle="monthly"
        status="active"
        renewalDate="August 12, 2026"
      />,
    );
    expect(screen.getByText("Growth Plan")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Renews on August 12, 2026")).toBeInTheDocument();
  });

  it("shows a past-due warning", () => {
    render(
      <SubscriptionStatusCard
        planName="Growth Plan"
        price={79}
        billingCycle="monthly"
        status="past_due"
        renewalDate="August 12, 2026"
      />,
    );
    expect(screen.getByText("Payment failed — update your payment method.")).toBeInTheDocument();
  });

  it("hides the cancel button once cancelled", () => {
    render(
      <SubscriptionStatusCard
        planName="Growth Plan"
        price={79}
        billingCycle="monthly"
        status="cancelled"
        renewalDate="August 12, 2026"
        onCancel={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

  it("calls onUpgrade when clicked", async () => {
    const onUpgrade = vi.fn();
    render(
      <SubscriptionStatusCard
        planName="Growth Plan"
        price={79}
        billingCycle="monthly"
        status="active"
        renewalDate="August 12, 2026"
        onUpgrade={onUpgrade}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Upgrade" }));
    expect(onUpgrade).toHaveBeenCalledOnce();
  });

  it("renders a loading skeleton", () => {
    const { container } = render(
      <SubscriptionStatusCard
        planName="Growth Plan"
        price={79}
        billingCycle="monthly"
        status="active"
        renewalDate="August 12, 2026"
        isLoading
      />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
