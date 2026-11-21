import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AiMessageThread } from "./ai-message-thread";
import type { ThreadMessage } from "./ai-message-thread";

const messages: ThreadMessage[] = [
  { id: "u1", role: "user", content: "How many signups this week?" },
  { id: "a1", role: "assistant", content: "412 signups, up 18%." },
];

describe("AiMessageThread", () => {
  it("renders user and assistant messages in a conversation log", () => {
    render(<AiMessageThread messages={messages} />);
    expect(screen.getByRole("log", { name: "Conversation" })).toBeInTheDocument();
    expect(screen.getByText("How many signups this week?")).toBeInTheDocument();
    expect(screen.getByText("412 signups, up 18%.")).toBeInTheDocument();
  });

  it("shows the empty state when there are no messages", () => {
    render(<AiMessageThread messages={[]} emptyState="Start a conversation" />);
    expect(screen.getByText("Start a conversation")).toBeInTheDocument();
  });

  it("marks the log busy and hides actions while the last reply is streaming", () => {
    render(<AiMessageThread messages={[...messages.slice(0, 1), { id: "a1", role: "assistant", content: "412 sign", isStreaming: true }]} />);
    expect(screen.getByRole("log")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("button", { name: "Copy message" })).not.toBeInTheDocument();
  });

  it("copies an assistant message and shows a copied state", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<AiMessageThread messages={messages} onCopy={onCopy} />);
    await user.click(screen.getByRole("button", { name: "Copy message" }));
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe("412 signups, up 18%.");
    expect(onCopy).toHaveBeenCalledWith("a1");
  });

  it("toggles thumbs feedback and reports changes", async () => {
    const onFeedback = vi.fn();
    render(<AiMessageThread messages={messages} onFeedback={onFeedback} />);
    const up = screen.getByRole("button", { name: "Good response" });
    const down = screen.getByRole("button", { name: "Bad response" });

    await userEvent.click(up);
    expect(up).toHaveAttribute("aria-pressed", "true");
    expect(onFeedback).toHaveBeenLastCalledWith("a1", "up");

    await userEvent.click(down);
    expect(up).toHaveAttribute("aria-pressed", "false");
    expect(down).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(down);
    expect(down).toHaveAttribute("aria-pressed", "false");
    expect(onFeedback).toHaveBeenLastCalledWith("a1", null);
  });

  it("calls onRegenerate with the message id", async () => {
    const onRegenerate = vi.fn();
    render(<AiMessageThread messages={messages} onRegenerate={onRegenerate} />);
    await userEvent.click(screen.getByRole("button", { name: "Regenerate response" }));
    expect(onRegenerate).toHaveBeenCalledWith("a1");
  });
});
