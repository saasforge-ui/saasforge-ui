import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsForm } from "./settings-form";

const defaultValues = {
  name: "Sarah Chen",
  email: "sarah@acme.io",
  companyName: "Acme Technologies",
  website: "https://acme.io",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
};

describe("SettingsForm", () => {
  it("renders profile fields with default values", () => {
    render(<SettingsForm defaultValues={defaultValues} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toHaveValue("Sarah Chen");
    expect(screen.getByLabelText("Email")).toHaveValue("sarah@acme.io");
  });

  it("disables submit until the form is dirty", () => {
    render(<SettingsForm defaultValues={defaultValues} onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("shows a validation error for an invalid email", async () => {
    const onSubmit = vi.fn();
    render(<SettingsForm defaultValues={defaultValues} onSubmit={onSubmit} />);
    const emailInput = screen.getByLabelText("Email");
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with updated values once valid and dirty", async () => {
    const onSubmit = vi.fn();
    render(<SettingsForm defaultValues={defaultValues} onSubmit={onSubmit} />);
    const nameInput = screen.getByLabelText("Name");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Sarah Lin");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0].name).toBe("Sarah Lin");
  });
});
