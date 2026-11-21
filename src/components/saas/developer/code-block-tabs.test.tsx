import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeBlockTabs } from "./code-block-tabs";

const tabs = [
  { label: "npm", code: "npm install @acme/sdk" },
  { label: "TypeScript", filename: "src/acme.ts", code: 'import { Acme } from "@acme/sdk";\n\nexport const acme = new Acme();' },
];

describe("CodeBlockTabs", () => {
  it("renders a tab per language and shows the first tab by default", () => {
    render(<CodeBlockTabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "npm" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "TypeScript" })).toBeInTheDocument();
    expect(screen.getByText("npm install @acme/sdk")).toBeInTheDocument();
  });

  it("switches code and filename when another tab is selected", async () => {
    render(<CodeBlockTabs tabs={tabs} />);
    await userEvent.click(screen.getByRole("tab", { name: "TypeScript" }));
    expect(screen.getByText("src/acme.ts")).toBeInTheDocument();
    expect(screen.getByText("export const acme = new Acme();")).toBeInTheDocument();
  });

  it("renders line numbers by default and hides them when disabled", () => {
    const { rerender } = render(<CodeBlockTabs tabs={tabs} defaultValue="TypeScript" />);
    expect(screen.getByText("3")).toBeInTheDocument();
    rerender(<CodeBlockTabs tabs={tabs} defaultValue="TypeScript" showLineNumbers={false} />);
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("copies the active tab's code and shows copied feedback", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<CodeBlockTabs tabs={tabs} onCopy={onCopy} />);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe("npm install @acme/sdk");
    expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ label: "npm" }));
  });

  it("shows an empty state when there are no tabs", () => {
    render(<CodeBlockTabs tabs={[]} />);
    expect(screen.getByText("No code to display.")).toBeInTheDocument();
  });
});
