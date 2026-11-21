import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserManagementTable } from "./user-management-table";
import type { SaaSUser } from "@/types";

const users: SaaSUser[] = [
  {
    id: "usr_01",
    name: "Sarah Chen",
    email: "sarah@acme.io",
    role: "Owner",
    status: "active",
    lastActiveAt: "2026-07-29T09:12:00Z",
    createdAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "usr_02",
    name: "Marcus Webb",
    email: "marcus@northlane.dev",
    role: "Admin",
    status: "suspended",
    lastActiveAt: "2026-07-28T18:40:00Z",
    createdAt: "2024-03-02T00:00:00Z",
  },
];

describe("UserManagementTable", () => {
  it("renders all users by default", () => {
    render(<UserManagementTable users={users} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Webb")).toBeInTheDocument();
  });

  it("filters users by search query", async () => {
    render(<UserManagementTable users={users} />);
    await userEvent.type(screen.getByLabelText("Search users"), "sarah");
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.queryByText("Marcus Webb")).not.toBeInTheDocument();
  });

  it("shows an empty state when no users match", async () => {
    render(<UserManagementTable users={users} />);
    await userEvent.type(screen.getByLabelText("Search users"), "nobody");
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("shows a loading skeleton", () => {
    const { container } = render(<UserManagementTable users={users} isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("shows an error state with a retry button", async () => {
    const onRetry = vi.fn();
    render(<UserManagementTable users={users} error="Network error" onRetry={onRetry} />);
    expect(screen.getByText("Network error")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
