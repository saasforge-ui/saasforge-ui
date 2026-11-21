import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataGridInlineEdit } from "./data-grid-inline-edit";

const columns = [{ key: "name", label: "Name" }];
const rows = [{ name: "Sarah Chen" }];

describe("DataGridInlineEdit", () => {
  it("renders cell values as buttons", () => {
    render(<DataGridInlineEdit columns={columns} rows={rows} onCellChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Sarah Chen" })).toBeInTheDocument();
  });

  it("switches to an input on click and commits on blur", async () => {
    const onCellChange = vi.fn();
    render(<DataGridInlineEdit columns={columns} rows={rows} onCellChange={onCellChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Sarah Chen" }));
    const input = screen.getByDisplayValue("Sarah Chen");
    await userEvent.clear(input);
    await userEvent.type(input, "Marcus Webb");
    await userEvent.tab();
    expect(onCellChange).toHaveBeenCalledWith(0, "name", "Marcus Webb");
  });
});
