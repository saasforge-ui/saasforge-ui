import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBarOverflow } from "./tab-bar-overflow";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "members", label: "Members" },
  { id: "billing", label: "Billing" },
  { id: "integrations", label: "Integrations" },
];

describe("TabBarOverflow", () => {
  it("renders visible tabs and moves the rest into overflow", () => {
    render(<TabBarOverflow tabs={tabs} activeTabId="overview" onTabChange={vi.fn()} maxVisible={2} />);
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Members" })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: "Billing" })).not.toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("calls onTabChange when a visible tab is clicked", async () => {
    const onTabChange = vi.fn();
    render(<TabBarOverflow tabs={tabs} activeTabId="overview" onTabChange={onTabChange} maxVisible={2} />);
    await userEvent.click(screen.getByRole("tab", { name: "Members" }));
    expect(onTabChange).toHaveBeenCalledWith("members");
  });

  it("shows the active overflow tab's label as the trigger text", () => {
    render(<TabBarOverflow tabs={tabs} activeTabId="billing" onTabChange={vi.fn()} maxVisible={2} />);
    expect(screen.getByText("Billing")).toBeInTheDocument();
  });
});
