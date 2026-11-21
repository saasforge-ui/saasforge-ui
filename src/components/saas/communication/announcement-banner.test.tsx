import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnnouncementBanner } from "./announcement-banner";

describe("AnnouncementBanner", () => {
  it("renders the message", () => {
    render(<AnnouncementBanner message="Scheduled maintenance tonight." />);
    expect(screen.getByText("Scheduled maintenance tonight.")).toBeInTheDocument();
  });

  it("calls onCtaClick when the CTA is clicked", async () => {
    const onCtaClick = vi.fn();
    render(<AnnouncementBanner message="New feature!" ctaLabel="Learn more" onCtaClick={onCtaClick} />);
    await userEvent.click(screen.getByText("Learn more"));
    expect(onCtaClick).toHaveBeenCalledOnce();
  });

  it("calls onDismiss when the close button is clicked", async () => {
    const onDismiss = vi.fn();
    render(<AnnouncementBanner message="Heads up" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByLabelText("Dismiss announcement"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("does not render a CTA without both label and handler", () => {
    render(<AnnouncementBanner message="Just info" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
