import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./login-form";

describe("LoginForm", () => {
  it("shows a validation error for an invalid email", async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Email"), "not-an-email");
    await userEvent.type(screen.getByLabelText("Password"), "secret");
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
  });

  it("calls onSubmit with valid values", async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Email"), "sarah@acme.io");
    await userEvent.type(screen.getByLabelText("Password"), "secret123");
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(onSubmit.mock.calls[0][0]).toEqual(
      expect.objectContaining({ email: "sarah@acme.io", password: "secret123" }),
    );
  });

  it("shows OAuth providers when provided", () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        oauthProviders={[{ id: "google", label: "Google" }]}
      />,
    );
    expect(screen.getByRole("button", { name: "Google" })).toBeInTheDocument();
  });

  it("renders an error banner when set", () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials.");
  });
});
