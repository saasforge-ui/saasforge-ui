import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DynamicFieldArrayForm } from "./dynamic-field-array-form";

describe("DynamicFieldArrayForm", () => {
  it("starts with a single row and disables its remove button", () => {
    render(<DynamicFieldArrayForm />);
    expect(screen.getAllByLabelText(/^Email \d+$/)).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Remove row 1" })).toBeDisabled();
  });

  it("adds a new row when 'Add another' is clicked", async () => {
    render(<DynamicFieldArrayForm />);
    await userEvent.click(screen.getByRole("button", { name: "Add another" }));
    expect(screen.getAllByLabelText(/^Email \d+$/)).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Remove row 1" })).not.toBeDisabled();
  });

  it("removes a row when its remove button is clicked", async () => {
    render(<DynamicFieldArrayForm />);
    await userEvent.click(screen.getByRole("button", { name: "Add another" }));
    await userEvent.click(screen.getByRole("button", { name: "Remove row 2" }));
    expect(screen.getAllByLabelText(/^Email \d+$/)).toHaveLength(1);
  });

  it("shows an inline error for an invalid email on submit", async () => {
    render(<DynamicFieldArrayForm />);
    await userEvent.type(screen.getByLabelText("Email 1"), "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: "Send invites" }));
    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  });

  it("submits valid rows and shows a success message", async () => {
    const onSubmit = vi.fn();
    render(<DynamicFieldArrayForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Email 1"), "teammate@acme.io");
    await userEvent.click(screen.getByRole("button", { name: "Send invites" }));
    expect(await screen.findByText("Invites sent successfully.")).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith([{ email: "teammate@acme.io", role: "Member" }]);
  });
});
