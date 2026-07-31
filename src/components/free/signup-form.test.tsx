import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./signup-form";

describe("SignupForm", () => {
  it("shows a mismatch error when passwords don't match", async () => {
    render(<SignupForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Name"), "Sarah Chen");
    await userEvent.type(screen.getByLabelText("Email"), "sarah@acme.io");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText("Confirm password"), "different123");
    await userEvent.click(screen.getByLabelText(/agree to the Terms/));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByText("Passwords don't match.")).toBeInTheDocument();
  });

  it("requires accepting the terms", async () => {
    render(<SignupForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Name"), "Sarah Chen");
    await userEvent.type(screen.getByLabelText("Email"), "sarah@acme.io");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText("Confirm password"), "password123");
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByText("You must accept the terms to continue.")).toBeInTheDocument();
  });

  it("calls onSubmit with valid values", async () => {
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Name"), "Sarah Chen");
    await userEvent.type(screen.getByLabelText("Email"), "sarah@acme.io");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText("Confirm password"), "password123");
    await userEvent.click(screen.getByLabelText(/agree to the Terms/));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(onSubmit.mock.calls[0][0]).toEqual(
      expect.objectContaining({ name: "Sarah Chen", email: "sarah@acme.io" }),
    );
  });
});
