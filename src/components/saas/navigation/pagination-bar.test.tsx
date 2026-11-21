import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaginationBar } from "./pagination-bar";

describe("PaginationBar", () => {
  it("disables Previous on the first page", () => {
    render(<PaginationBar currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("disables Next on the last page", () => {
    render(<PaginationBar currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("calls onPageChange with the clicked page", async () => {
    const onPageChange = vi.fn();
    render(<PaginationBar currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("marks the current page with aria-current", () => {
    render(<PaginationBar currentPage={2} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
  });
});
