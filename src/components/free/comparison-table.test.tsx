import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTable } from "./comparison-table";

describe("ComparisonTable", () => {
  it("renders row labels and column headers", () => {
    render(
      <ComparisonTable
        columns={[{ id: "us", label: "Us" }, { id: "them", label: "Them" }]}
        rows={[{ label: "SSO", values: { us: true, them: false } }]}
      />,
    );
    expect(screen.getByText("SSO")).toBeInTheDocument();
    expect(screen.getByText("Us")).toBeInTheDocument();
    expect(screen.getByText("Them")).toBeInTheDocument();
  });

  it("renders a check icon for true values and a minus for false", () => {
    render(
      <ComparisonTable
        columns={[{ id: "us", label: "Us" }, { id: "them", label: "Them" }]}
        rows={[{ label: "SSO", values: { us: true, them: false } }]}
      />,
    );
    expect(screen.getByLabelText("Included")).toBeInTheDocument();
    expect(screen.getByLabelText("Not included")).toBeInTheDocument();
  });

  it("renders string values as plain text", () => {
    render(
      <ComparisonTable
        columns={[{ id: "us", label: "Us" }]}
        rows={[{ label: "Seats", values: { us: "Unlimited" } }]}
      />,
    );
    expect(screen.getByText("Unlimited")).toBeInTheDocument();
  });
});
