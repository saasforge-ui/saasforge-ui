import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PricingPlanComparison } from "./pricing-plan-comparison";
import type { PricingPlan } from "@/types";

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For small teams.",
    features: [{ label: "5 seats", included: true }],
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 79,
    yearlyPrice: 65,
    description: "For growing teams.",
    recommended: true,
    features: [{ label: "25 seats", included: true }],
  },
];

describe("PricingPlanComparison", () => {
  it("renders all plans with monthly pricing by default", () => {
    render(<PricingPlanComparison plans={plans} />);
    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.getByText("$79")).toBeInTheDocument();
  });

  it("switches to yearly pricing when the toggle is used", async () => {
    render(<PricingPlanComparison plans={plans} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$24")).toBeInTheDocument();
    expect(screen.getByText("$65")).toBeInTheDocument();
  });

  it("calls onSelectPlan with the chosen plan", async () => {
    const onSelectPlan = vi.fn();
    render(<PricingPlanComparison plans={plans} onSelectPlan={onSelectPlan} />);
    await userEvent.click(screen.getByRole("button", { name: "Choose Starter" }));
    expect(onSelectPlan).toHaveBeenCalledWith(plans[0]);
  });

  it("disables the CTA for the current plan", () => {
    render(<PricingPlanComparison plans={plans} currentPlanId="growth" />);
    expect(screen.getByRole("button", { name: "Current plan" })).toBeDisabled();
  });
});
