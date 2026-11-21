import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentThread } from "./comment-thread";

const comments = [
  { id: "c1", author: { name: "Sarah Chen" }, content: "Hello there", timestamp: "2026-07-29T09:12:00Z" },
];

describe("CommentThread", () => {
  it("renders comment author and content", () => {
    render(<CommentThread comments={comments} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("renders nested replies", () => {
    render(
      <CommentThread
        comments={[
          {
            ...comments[0],
            replies: [{ id: "r1", author: { name: "Marcus Webb" }, content: "Nice!", timestamp: "2026-07-29T10:00:00Z" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Marcus Webb")).toBeInTheDocument();
    expect(screen.getByText("Nice!")).toBeInTheDocument();
  });

  it("calls onReply with the parent id and content", async () => {
    const onReply = vi.fn();
    render(<CommentThread comments={comments} onReply={onReply} />);
    await userEvent.click(screen.getByText("Reply"));
    await userEvent.type(screen.getByPlaceholderText("Write a reply..."), "Sounds good");
    const replyButtons = screen.getAllByRole("button", { name: "Reply" });
    await userEvent.click(replyButtons[replyButtons.length - 1]);
    expect(onReply).toHaveBeenCalledWith("c1", "Sounds good");
  });

  it("calls onSubmit for a new top-level comment", async () => {
    const onSubmit = vi.fn();
    render(<CommentThread comments={comments} onSubmit={onSubmit} />);
    await userEvent.type(screen.getByPlaceholderText("Add a comment..."), "New comment");
    await userEvent.click(screen.getByRole("button", { name: "Post" }));
    expect(onSubmit).toHaveBeenCalledWith("New comment");
  });
});
