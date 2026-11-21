import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KanbanBoard } from "./kanban-board";

const columns = [
  { id: "todo", title: "To do", cards: [{ id: "c1", title: "Write tests" }] },
  { id: "done", title: "Done", cards: [] },
];

describe("KanbanBoard", () => {
  it("renders column titles and card counts", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  it("calls onCardClick with the column id and card", async () => {
    const onCardClick = vi.fn();
    render(<KanbanBoard columns={columns} onCardClick={onCardClick} />);
    await userEvent.click(screen.getByText("Write tests"));
    expect(onCardClick).toHaveBeenCalledWith("todo", columns[0].cards[0]);
  });

  it("renders an empty column without cards", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
