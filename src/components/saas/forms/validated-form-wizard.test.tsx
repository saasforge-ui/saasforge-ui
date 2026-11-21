import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ValidatedFormWizard } from "./validated-form-wizard";

async function fillStepOne() {
  await userEvent.type(screen.getByLabelText("Email"), "jordan@acme.io");
  await userEvent.type(screen.getByLabelText("Company name"), "Acme Inc");
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
}

async function fillStepTwo() {
  await userEvent.type(screen.getByLabelText("Full name"), "Jordan Lee");
  await userEvent.type(screen.getByLabelText("Job title"), "Engineer");
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
}

describe("ValidatedFormWizard", () => {
  it("blocks advancing past step 1 with invalid fields", async () => {
    render(<ValidatedFormWizard />);
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("advances to step 2 once step 1 is valid", async () => {
    render(<ValidatedFormWizard />);
    await fillStepOne();
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });

  it("shows a read-only review of all entered values on the final step", async () => {
    render(<ValidatedFormWizard />);
    await fillStepOne();
    await fillStepTwo();
    expect(screen.getByText("jordan@acme.io")).toBeInTheDocument();
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
    expect(screen.getByText("Jordan Lee")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });

  it("calls onSubmit and shows a success message after submitting", async () => {
    const onSubmit = vi.fn();
    render(<ValidatedFormWizard onSubmit={onSubmit} />);
    await fillStepOne();
    await fillStepTwo();
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Account details submitted successfully.")).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jordan@acme.io", fullName: "Jordan Lee" }),
    );
  });
});
