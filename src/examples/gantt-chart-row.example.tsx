import { GanttChartRow } from "@/components/saas/data/gantt-chart-row";

export default function Example() {
  return (
    <GanttChartRow
      rangeStart="2026-07-01"
      rangeEnd="2026-07-31"
      tasks={[
        { id: "1", name: "Design", start: "2026-07-01", end: "2026-07-10" },
        { id: "2", name: "Development", start: "2026-07-08", end: "2026-07-24" },
        { id: "3", name: "QA & launch", start: "2026-07-22", end: "2026-07-31" },
      ]}
    />
  );
}
