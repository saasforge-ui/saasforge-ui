import { TimelineChart } from "@/components/saas/data/timeline-chart";

export default function Example() {
  return (
    <TimelineChart
      rangeStart="2026-01-01"
      rangeEnd="2026-12-31"
      events={[
        { id: "1", label: "v1.0 launch", date: "2026-02-14" },
        { id: "2", label: "v1.1 - Dark mode", date: "2026-05-20" },
        { id: "3", label: "v2.0 - Ecommerce components", date: "2026-08-10" },
      ]}
    />
  );
}
