import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordionSection } from "./faq-accordion-section";

const items = [
  { question: "Is this open source?", answer: "The free tier is; Pro is a paid, licensed download." },
  { question: "Do you offer refunds?", answer: "Yes, within 14 days of purchase." },
];

describe("FAQAccordionSection", () => {
  it("renders the default title and all questions", () => {
    render(<FAQAccordionSection items={items} />);
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
    expect(screen.getByText("Is this open source?")).toBeInTheDocument();
    expect(screen.getByText("Do you offer refunds?")).toBeInTheDocument();
  });

  it("reveals an answer when its question is clicked", async () => {
    render(<FAQAccordionSection items={items} />);
    expect(screen.queryByText("Yes, within 14 days of purchase.")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("Do you offer refunds?"));
    expect(await screen.findByText("Yes, within 14 days of purchase.")).toBeInTheDocument();
  });

  it("renders a custom title and description", () => {
    render(<FAQAccordionSection title="Support" description="Common questions" items={items} />);
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Common questions")).toBeInTheDocument();
  });
});
