import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnalyticsChartCard } from "./analytics-chart-card";

const data = [
  { date: "Mon", value: 100 },
  { date: "Tue", value: 200 },
];

describe("AnalyticsChartCard", () => {
  it("renders title and description", () => {
    render(<AnalyticsChartCard title="Weekly Active Users" description="Unique users per day" data={data} />);
    expect(screen.getByText("Weekly Active Users")).toBeInTheDocument();
    expect(screen.getByText("Unique users per day")).toBeInTheDocument();
  });

  it("renders an empty state when there is no data", () => {
    render(<AnalyticsChartCard title="Weekly Active Users" data={[]} />);
    expect(screen.getByText("No data yet")).toBeInTheDocument();
  });

  it("renders a loading skeleton", () => {
    const { container } = render(<AnalyticsChartCard title="Weekly Active Users" data={data} isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders a range selector when ranges are provided", () => {
    render(<AnalyticsChartCard title="Weekly Active Users" data={data} ranges={["7d", "30d"]} defaultRange="7d" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
