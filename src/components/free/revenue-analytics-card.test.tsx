import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RevenueAnalyticsCard } from "./revenue-analytics-card";

const data = [
  { date: "Jan", value: 12000 },
  { date: "Feb", value: 15000 },
  { date: "Mar", value: 18000 },
];

describe("RevenueAnalyticsCard", () => {
  it("renders the formatted currency value and title", () => {
    render(<RevenueAnalyticsCard title="Monthly Revenue" value={18000} change={12.5} trend="up" data={data} />);
    expect(screen.getByText("Monthly Revenue")).toBeInTheDocument();
    expect(screen.getByText("$18,000")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("formats as a plain number when formatAsCurrency is false", () => {
    render(<RevenueAnalyticsCard title="Signups" value={420} change={4} data={data} formatAsCurrency={false} />);
    expect(screen.getByText("420")).toBeInTheDocument();
  });

  it("renders a loading skeleton", () => {
    const { container } = render(
      <RevenueAnalyticsCard title="Monthly Revenue" value={18000} change={12.5} data={data} isLoading />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(screen.queryByText("Monthly Revenue")).not.toBeInTheDocument();
  });

  it("shows a negative trend without an explicit trend prop", () => {
    render(<RevenueAnalyticsCard title="Churned Revenue" value={500} change={-8} data={data} />);
    expect(screen.getByText("-8%")).toBeInTheDocument();
  });
});
