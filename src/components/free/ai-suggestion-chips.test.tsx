import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mail } from "lucide-react";
import { AiSuggestionChips } from "./ai-suggestion-chips";

describe("AiSuggestionChips", () => {
  it("renders one chip per suggestion inside a labelled list", () => {
    render(<AiSuggestionChips suggestions={["First idea", "Second idea", "Third idea"]} />);
    expect(screen.getByRole("list", { name: "Suggested prompts" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("calls onSelect with the full prompt text, even when a shorter label is shown", async () => {
    const onSelect = vi.fn();
    render(
      <AiSuggestionChips
        onSelect={onSelect}
        suggestions={[{ text: "Draft a follow-up email to churned customers", label: "Win-back email", icon: Mail }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Win-back email" }));
    expect(onSelect).toHaveBeenCalledWith("Draft a follow-up email to churned customers");
  });

  it("uses a visible title as the list label when showTitle is set", () => {
    render(<AiSuggestionChips showTitle title="Try asking" suggestions={["Hello"]} />);
    expect(screen.getByText("Try asking")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Try asking" })).toBeInTheDocument();
  });

  it("disables every chip when disabled", () => {
    render(<AiSuggestionChips disabled suggestions={["One", "Two"]} />);
    screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());
  });

  it("renders nothing for an empty list", () => {
    const { container } = render(<AiSuggestionChips suggestions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
