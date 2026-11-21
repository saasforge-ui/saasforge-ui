import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnvVariablesEditor } from "./env-variables-editor";

const initialValues = {
  Development: [
    { key: "DATABASE_URL", value: "postgres://localhost/dev" },
    { key: "API_SECRET", value: "s3cret", secret: true },
  ],
};

describe("EnvVariablesEditor", () => {
  it("masks secret values until revealed", async () => {
    render(<EnvVariablesEditor initialValues={initialValues} />);
    const secret = screen.getByLabelText("Value for API_SECRET");
    expect(secret).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Value for DATABASE_URL")).toHaveAttribute("type", "text");

    await userEvent.click(screen.getByRole("button", { name: "Show value for API_SECRET" }));
    expect(secret).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide value for API_SECRET" })).toHaveAttribute("aria-pressed", "true");
  });

  it("flags duplicate keys and blocks saving", async () => {
    render(<EnvVariablesEditor initialValues={initialValues} />);
    const keyInput = screen.getByLabelText("Key 2");
    await userEvent.clear(keyInput);
    await userEvent.type(keyInput, "DATABASE_URL");
    expect(screen.getAllByText('Duplicate key "DATABASE_URL".')).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("tracks dirty state and saves the current environment", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(<EnvVariablesEditor initialValues={initialValues} onSave={onSave} />);
    const save = screen.getByRole("button", { name: "Save changes" });
    expect(save).toBeDisabled();

    const value = screen.getByLabelText("Value for DATABASE_URL");
    await userEvent.clear(value);
    await userEvent.type(value, "postgres://db/new");
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();

    await userEvent.click(save);
    expect(onSave).toHaveBeenCalledWith("Development", [
      { key: "DATABASE_URL", value: "postgres://db/new", secret: false },
      { key: "API_SECRET", value: "s3cret", secret: true },
    ]);
    expect(await screen.findByText("Saved to Development")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("imports pasted .env text, updating existing keys and adding new ones", async () => {
    const user = userEvent.setup();
    render(<EnvVariablesEditor initialValues={initialValues} />);
    await user.click(screen.getByRole("button", { name: "Paste .env" }));
    await user.click(screen.getByLabelText("Paste the contents of a .env file"));
    await user.paste('# comment\nexport DATABASE_URL="postgres://prod/db"\nREDIS_URL=redis://cache:6379 # inline\n\nFEATURE_FLAG=on');
    await user.click(screen.getByRole("button", { name: "Import" }));

    expect(screen.getByDisplayValue("postgres://prod/db")).toBeInTheDocument();
    expect(screen.getByDisplayValue("REDIS_URL")).toBeInTheDocument();
    expect(screen.getByDisplayValue("redis://cache:6379")).toBeInTheDocument();
    expect(screen.getByDisplayValue("FEATURE_FLAG")).toBeInTheDocument();
    expect(screen.getByText("Imported 3 variables (2 added, 1 updated).")).toBeInTheDocument();
  });

  it("adds and removes rows", async () => {
    render(<EnvVariablesEditor initialValues={initialValues} />);
    await userEvent.click(screen.getByRole("button", { name: "Add variable" }));
    expect(screen.getByLabelText("Key 3")).toHaveFocus();

    await userEvent.click(screen.getByRole("button", { name: "Remove DATABASE_URL" }));
    await waitFor(() => expect(screen.queryByDisplayValue("DATABASE_URL")).not.toBeInTheDocument());
  });
});
