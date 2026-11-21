import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastNotificationStack } from "./toast-notification-stack";

describe("ToastNotificationStack", () => {
  it("renders the four trigger buttons", () => {
    render(<ToastNotificationStack />);
    expect(screen.getByRole("button", { name: "Trigger success" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trigger error" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trigger warning" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trigger info" })).toBeInTheDocument();
  });

  it("pushes a toast onto the stack when a trigger is clicked", async () => {
    render(<ToastNotificationStack />);
    await userEvent.click(screen.getByRole("button", { name: "Trigger success" }));
    expect(screen.getByText("Changes saved successfully.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("stacks multiple toasts", async () => {
    render(<ToastNotificationStack />);
    await userEvent.click(screen.getByRole("button", { name: "Trigger success" }));
    await userEvent.click(screen.getByRole("button", { name: "Trigger error" }));
    expect(screen.getAllByRole("status")).toHaveLength(2);
  });

  it("dismisses a toast when its close button is clicked", async () => {
    render(<ToastNotificationStack />);
    await userEvent.click(screen.getByRole("button", { name: "Trigger info" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
  });
});
