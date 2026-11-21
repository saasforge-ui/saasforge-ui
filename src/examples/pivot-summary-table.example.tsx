import { PivotSummaryTable } from "@/components/saas/data/pivot-summary-table";

export default function Example() {
  return (
    <PivotSummaryTable
      rows={["North America", "Europe", "APAC"]}
      columns={["May", "Jun", "Jul"]}
      data={{
        "North America": { May: 42000, Jun: 45500, Jul: 48200 },
        Europe: { May: 21000, Jun: 22800, Jul: 24100 },
        APAC: { May: 9500, Jun: 11200, Jul: 12800 },
      }}
      formatValue={(value) => `$${value.toLocaleString("en-US")}`}
    />
  );
}
