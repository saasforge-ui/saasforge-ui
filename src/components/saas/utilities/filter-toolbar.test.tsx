import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterToolbar, type FilterValue } from "./filter-toolbar";

describe("FilterToolbar", () => {
  it("renders the search input and calls onSearchChange", async () => {
    const onSearchChange = vi.fn();
    render(
      <FilterToolbar
        searchValue=""
        onSearchChange={onSearchChange}
        filters={[]}
        values={{}}
        onChange={vi.fn()}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText("Search..."), "a");
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("does not render a search input when onSearchChange is omitted", () => {
    render(<FilterToolbar filters={[]} values={{}} onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("shows the clear button only when a filter is active", () => {
    const values: Record<string, FilterValue> = { status: "active" };
    const { rerender } = render(
      <FilterToolbar
        filters={[{ key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }] }]}
        values={values}
        onChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /clear filters/i })).toBeInTheDocument();

    rerender(
      <FilterToolbar
        filters={[{ key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }] }]}
        values={{ status: "all" }}
        onChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button", { name: /clear filters/i })).not.toBeInTheDocument();
  });

  it("renders sort options when provided", () => {
    render(
      <FilterToolbar
        filters={[]}
        values={{}}
        onChange={vi.fn()}
        sortOptions={[{ label: "Newest", value: "newest" }]}
        sortValue="newest"
      />,
    );
    expect(screen.getByText("Newest")).toBeInTheDocument();
  });
});
