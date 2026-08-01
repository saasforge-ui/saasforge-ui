import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TypingIndicator } from "./typing-indicator";

describe("TypingIndicator", () => {
  it("renders a single user", () => {
    render(<TypingIndicator users={["Sarah Chen"]} />);
    expect(screen.getByText("Sarah Chen is typing...")).toBeInTheDocument();
  });

  it("renders two users", () => {
    render(<TypingIndicator users={["Sarah Chen", "Marcus Webb"]} />);
    expect(screen.getByText("Sarah Chen and Marcus Webb are typing...")).toBeInTheDocument();
  });

  it("renders three or more users with a count", () => {
    render(<TypingIndicator users={["Sarah Chen", "Marcus Webb", "Priya Nair"]} />);
    expect(screen.getByText("Sarah Chen and 2 others are typing...")).toBeInTheDocument();
  });

  it("renders nothing when there are no users", () => {
    const { container } = render(<TypingIndicator users={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
