import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumbs } from "./breadcrumbs";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Settings", href: "/settings" },
  { label: "Billing" },
];

describe("Breadcrumbs", () => {
  it("renders all items", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
  });

  it("marks the last item as the current page", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Billing")).toHaveAttribute("aria-current", "page");
  });

  it("calls onNavigate with the href of a linked item", async () => {
    const onNavigate = vi.fn();
    render(<Breadcrumbs items={items} onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText("Settings"));
    expect(onNavigate).toHaveBeenCalledWith("/settings");
  });

  it("does not render the last item as a button", () => {
    render(<Breadcrumbs items={items} onNavigate={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Billing" })).not.toBeInTheDocument();
  });
});
