import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No projects yet" description="Create your first project to get started." />);
    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(screen.getByText("Create your first project to get started.")).toBeInTheDocument();
  });

  it("announces itself to assistive tech", () => {
    render(<EmptyState title="No projects yet" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("calls the primary action handler when clicked", async () => {
    const onClick = vi.fn();
    render(<EmptyState title="No projects yet" primaryAction={{ label: "Create project", onClick }} />);
    await userEvent.click(screen.getByRole("button", { name: "Create project" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders both actions when provided", () => {
    render(
      <EmptyState
        title="No projects yet"
        primaryAction={{ label: "Create project", onClick: vi.fn() }}
        secondaryAction={{ label: "Learn more", onClick: vi.fn() }}
      />,
    );
    expect(screen.getByRole("button", { name: "Create project" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Learn more" })).toBeInTheDocument();
  });
});
