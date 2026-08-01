import { ComparisonTable } from "@/components/free/comparison-table";

export default function Example() {
  return (
    <ComparisonTable
      columns={[
        { id: "us", label: "Our product" },
        { id: "competitor", label: "Competitor" },
      ]}
      rows={[
        { label: "Unlimited projects", values: { us: true, competitor: false } },
        { label: "Team seats", values: { us: "Unlimited", competitor: "Up to 5" } },
        { label: "API access", values: { us: true, competitor: true } },
        { label: "SSO", values: { us: true, competitor: false } },
      ]}
    />
  );
}
