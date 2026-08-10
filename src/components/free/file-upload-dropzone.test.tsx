import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploadDropzone } from "./file-upload-dropzone";

beforeAll(() => {
  if (!URL.createObjectURL) {
    URL.createObjectURL = vi.fn(() => "blob:mock-url");
  }
  if (!URL.revokeObjectURL) {
    URL.revokeObjectURL = vi.fn();
  }
});

function makeFile(name: string, sizeBytes: number, type = "text/plain") {
  return new File(["x".repeat(sizeBytes)], name, { type });
}

describe("FileUploadDropzone", () => {
  it("renders the dropzone prompt", () => {
    render(<FileUploadDropzone />);
    expect(screen.getByText(/Drag and drop files here/i)).toBeInTheDocument();
  });

  it("adds a file via the hidden input and lists it", async () => {
    const onFilesChange = vi.fn();
    render(<FileUploadDropzone onFilesChange={onFilesChange} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("resume.pdf", 100, "application/pdf");

    await userEvent.upload(input, file);

    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    expect(onFilesChange).toHaveBeenCalled();
  });

  it("shows an error state for files exceeding maxSizeMB", async () => {
    render(<FileUploadDropzone maxSizeMB={0.000001} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("large.pdf", 5000, "application/pdf");

    await userEvent.upload(input, file);

    expect(screen.getByText(/exceeds/i)).toBeInTheDocument();
  });

  it("removes a file when its remove button is clicked", async () => {
    render(<FileUploadDropzone />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("notes.txt", 50);

    await userEvent.upload(input, file);
    expect(screen.getByText("notes.txt")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /remove notes.txt/i }));
    expect(screen.queryByText("notes.txt")).not.toBeInTheDocument();
  });
});
