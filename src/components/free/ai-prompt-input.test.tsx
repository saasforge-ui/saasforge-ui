import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AiPromptInput } from "./ai-prompt-input";

describe("AiPromptInput", () => {
  it("disables send until there is text", async () => {
    render(<AiPromptInput />);
    const send = screen.getByRole("button", { name: "Send message" });
    expect(send).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Message"), "   ");
    expect(send).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Message"), "Hello");
    expect(send).toBeEnabled();
  });

  it("submits the trimmed value on Enter and clears the input", async () => {
    const onSubmit = vi.fn();
    render(<AiPromptInput onSubmit={onSubmit} />);
    const textarea = screen.getByLabelText("Message");
    await userEvent.type(textarea, "  Summarize my week  {Enter}");
    expect(onSubmit).toHaveBeenCalledWith("Summarize my week", []);
    expect(textarea).toHaveValue("");
  });

  it("inserts a newline on Shift+Enter instead of submitting", async () => {
    const onSubmit = vi.fn();
    render(<AiPromptInput onSubmit={onSubmit} />);
    const textarea = screen.getByLabelText("Message");
    await userEvent.type(textarea, "Line one{Shift>}{Enter}{/Shift}Line two");
    expect(onSubmit).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("Line one\nLine two");
  });

  it("shows a stop button while generating and blocks Enter submits", async () => {
    const onSubmit = vi.fn();
    const onStop = vi.fn();
    render(<AiPromptInput onSubmit={onSubmit} onStop={onStop} isGenerating />);
    await userEvent.type(screen.getByLabelText("Message"), "Next question{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Stop generating" }));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("adds and removes attachment chips, passing them to onSubmit", async () => {
    const onSubmit = vi.fn();
    const { container } = render(<AiPromptInput onSubmit={onSubmit} />);
    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]')!;
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    await userEvent.upload(fileInput, file);
    expect(screen.getByText("notes.txt")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Message"), "Read this{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("Read this", [expect.objectContaining({ name: "notes.txt", file })]);
    await waitFor(() => expect(screen.queryByText("notes.txt")).not.toBeInTheDocument());

    await userEvent.upload(fileInput, file);
    await userEvent.click(screen.getByRole("button", { name: "Remove notes.txt" }));
    await waitFor(() => expect(screen.queryByText("notes.txt")).not.toBeInTheDocument());
  });

  it("renders the model selector with the default model", () => {
    render(
      <AiPromptInput
        models={[
          { value: "fast", label: "Fast" },
          { value: "smart", label: "Smart" },
        ]}
        defaultModel="smart"
      />,
    );
    expect(screen.getByRole("combobox", { name: "Model" })).toHaveTextContent("Smart");
  });
});
