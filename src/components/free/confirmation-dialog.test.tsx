import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationDialog } from "./confirmation-dialog";

describe("ConfirmationDialog", () => {
  it("does not render content when closed", () => {
    render(
      <ConfirmationDialog open={false} onOpenChange={vi.fn()} title="Delete project?" onConfirm={vi.fn()} />,
    );
    expect(screen.queryByText("Delete project?")).not.toBeInTheDocument();
  });

  it("renders title and description when open", () => {
    render(
      <ConfirmationDialog
        open
        onOpenChange={vi.fn()}
        title="Delete project?"
        description="This action cannot be undone."
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.getByText("Delete project?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("calls onConfirm when the confirm button is clicked", async () => {
    const onConfirm = vi.fn();
    render(<ConfirmationDialog open onOpenChange={vi.fn()} title="Delete project?" onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("disables actions while loading", () => {
    render(<ConfirmationDialog open onOpenChange={vi.fn()} title="Delete project?" onConfirm={vi.fn()} isLoading />);
    expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });

  it("uses a custom confirm label", () => {
    render(
      <ConfirmationDialog
        open
        onOpenChange={vi.fn()}
        title="Delete project?"
        confirmLabel="Delete"
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
