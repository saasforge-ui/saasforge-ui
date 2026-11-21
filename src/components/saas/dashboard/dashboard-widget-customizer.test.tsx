import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DashboardWidgetCustomizer, reorderWidgets, type DashboardWidgetConfig } from "./dashboard-widget-customizer";

describe("reorderWidgets", () => {
  it("moves an item from an earlier index to a later index", () => {
    expect(reorderWidgets(["a", "b", "c", "d"], 0, 2)).toEqual(["b", "c", "a", "d"]);
  });

  it("moves an item from a later index to an earlier index", () => {
    expect(reorderWidgets(["a", "b", "c", "d"], 3, 1)).toEqual(["a", "d", "b", "c"]);
  });

  it("returns the same array reference when fromIndex equals toIndex", () => {
    const list = ["a", "b", "c"];
    expect(reorderWidgets(list, 1, 1)).toBe(list);
  });

  it("returns the same array reference for an out-of-range fromIndex", () => {
    const list = ["a", "b", "c"];
    expect(reorderWidgets(list, -1, 1)).toBe(list);
    expect(reorderWidgets(list, 5, 1)).toBe(list);
  });

  it("returns the same array reference for an out-of-range toIndex", () => {
    const list = ["a", "b", "c"];
    expect(reorderWidgets(list, 0, -1)).toBe(list);
    expect(reorderWidgets(list, 0, 5)).toBe(list);
  });

  it("does not mutate the original array", () => {
    const list = ["a", "b", "c"];
    const result = reorderWidgets(list, 0, 2);
    expect(list).toEqual(["a", "b", "c"]);
    expect(result).not.toBe(list);
  });

  it("moves an item to the last position", () => {
    expect(reorderWidgets(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
  });
});

const widgets: DashboardWidgetConfig[] = [
  { id: "revenue", title: "Revenue", description: "MRR", metricValue: "$48.2k", enabled: true },
  { id: "churn", title: "Churn rate", description: "Churn", metricValue: "2.1%", enabled: true },
  { id: "nps", title: "NPS score", description: "NPS", metricValue: "62", enabled: false },
];

describe("DashboardWidgetCustomizer", () => {
  it("hides a widget with the switch but keeps it on the dashboard", async () => {
    render(<DashboardWidgetCustomizer widgets={widgets} />);
    await userEvent.click(screen.getByRole("switch", { name: "Show Revenue on dashboard" }));
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Hidden")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add Revenue to dashboard" })).not.toBeInTheDocument();
    expect(screen.getByText("1 of 3 shown")).toBeInTheDocument();
  });

  it("removes a widget from the dashboard with the X button", async () => {
    render(<DashboardWidgetCustomizer widgets={widgets} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove Revenue from dashboard" }));
    expect(screen.getByRole("button", { name: "Add Revenue to dashboard" })).toBeInTheDocument();
    expect(screen.queryByRole("switch", { name: "Show Revenue on dashboard" })).not.toBeInTheDocument();
  });
});
