import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepperWizardNav } from "./stepper-wizard-nav";

const steps = [
  { id: "account", label: "Account" },
  { id: "profile", label: "Profile" },
  { id: "confirm", label: "Confirm" },
];

describe("StepperWizardNav", () => {
  it("renders all step labels", () => {
    render(<StepperWizardNav steps={steps} currentStep={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("makes completed steps clickable when onStepClick is provided", async () => {
    const onStepClick = vi.fn();
    render(<StepperWizardNav steps={steps} currentStep={1} onStepClick={onStepClick} />);
    const completedButtons = screen.getAllByRole("button");
    expect(completedButtons).toHaveLength(1);
    await userEvent.click(completedButtons[0]);
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it("renders no buttons without onStepClick", () => {
    render(<StepperWizardNav steps={steps} currentStep={1} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
