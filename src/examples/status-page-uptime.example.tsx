import { StatusPageUptime } from "@/components/saas/developer/status-page-uptime";
import type { StatusService, UptimeDay } from "@/components/saas/developer/status-page-uptime";

// Deterministic pseudo-random history so the demo renders the same on every load.
function generateDays(seed: number, incidents: Record<number, number> = {}): UptimeDay[] {
  const today = new Date(Date.UTC(2026, 9, 31));
  let state = seed;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
  return Array.from({ length: 90 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (89 - index));
    const noise = random();
    const uptime = incidents[index] ?? (noise > 0.94 ? 99.2 + noise * 0.6 : 100);
    return { date: date.toISOString().slice(0, 10), uptime: Math.min(100, uptime) };
  });
}

const demoServices: StatusService[] = [
  { id: "api", name: "API", description: "REST and GraphQL endpoints", status: "operational", days: generateDays(7, { 61: 96.4 }) },
  { id: "dashboard", name: "Dashboard", description: "app.acme.dev", status: "operational", days: generateDays(13) },
  { id: "webhooks", name: "Webhooks", description: "Event delivery", status: "degraded", days: generateDays(29, { 88: 98.1, 89: 97.6 }) },
  { id: "billing", name: "Billing", description: "Checkout and invoicing", status: "operational", days: generateDays(41, { 34: 91.8 }) },
];

export default function Example() {
  return (
    <StatusPageUptime
      className="mx-auto max-w-3xl"
      services={demoServices}
      lastUpdated="2026-10-31T14:05:00Z"
      incidents={[
        {
          id: "inc_3",
          title: "Elevated webhook delivery latency",
          status: "monitoring",
          impact: "minor",
          startedAt: "2026-10-30T22:10:00Z",
          latestUpdate: "A fix has been deployed and queues are draining. Some events may arrive up to 10 minutes late.",
        },
        {
          id: "inc_2",
          title: "API errors in eu-west-1",
          status: "resolved",
          impact: "major",
          startedAt: "2026-10-02T08:41:00Z",
          resolvedAt: "2026-10-02T09:27:00Z",
          latestUpdate: "A misconfigured load balancer rule was rolled back. All requests are succeeding normally.",
        },
        {
          id: "inc_1",
          title: "Checkout unavailable",
          status: "resolved",
          impact: "critical",
          startedAt: "2026-09-06T17:02:00Z",
          resolvedAt: "2026-09-06T18:55:00Z",
        },
      ]}
    />
  );
}
