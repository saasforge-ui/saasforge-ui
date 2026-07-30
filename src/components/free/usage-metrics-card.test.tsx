import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsageMetricsCard } from "./usage-metrics-card";

describe("UsageMetricsCard", () => {
  it("renders used/limit and percentage", () => {
    render(<UsageMetricsCard label="API requests" used={8420} limit={10000} unit="requests" />);
    expect(screen.getByText("8,420 / 10,000 requests")).toBeInTheDocument();
    expect(screen.getByText("84% used")).toBeInTheDocument();
  });

  it("shows a critical warning near the limit", () => {
    render(<UsageMetricsCard label="Storage" used={95} limit={100} unit="GB" />);
    expect(screen.getByText("Limit almost reached")).toBeInTheDocument();
  });

  it("renders an unlimited state without a progress bar", () => {
    render(<UsageMetricsCard label="Projects" used={42} limit={0} unit="projects" level="unlimited" />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Unlimited")).toBeInTheDocument();
  });

  it("renders a loading skeleton", () => {
    const { container } = render(<UsageMetricsCard label="API requests" used={0} limit={100} isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
