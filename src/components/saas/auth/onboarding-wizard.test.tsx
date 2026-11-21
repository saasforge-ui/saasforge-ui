import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OnboardingWizard } from "./onboarding-wizard";

const steps = [
  { id: "one", title: "Step one", content: <p>First step content</p> },
  { id: "two", title: "Step two", content: <p>Second step content</p> },
];

describe("OnboardingWizard", () => {
  it("renders the first step with Back disabled", () => {
    render(<OnboardingWizard steps={steps} onComplete={vi.fn()} />);
    expect(screen.getByText("Step one")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("advances to the next step and shows Finish on the last step", async () => {
    render(<OnboardingWizard steps={steps} onComplete={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Step two")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Finish" })).toBeInTheDocument();
  });

  it("calls onComplete when Finish is clicked", async () => {
    const onComplete = vi.fn();
    render(<OnboardingWizard steps={steps} onComplete={onComplete} />);
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await userEvent.click(screen.getByRole("button", { name: "Finish" }));
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it("calls onStepChange when navigating", async () => {
    const onStepChange = vi.fn();
    render(<OnboardingWizard steps={steps} onComplete={vi.fn()} onStepChange={onStepChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });
});
