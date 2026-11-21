import { ActivityTimeline } from "@/components/saas/analytics/activity-timeline";
import { mockActivity } from "@/data/mock-data";

export default function Example() {
  return <ActivityTimeline items={mockActivity} />;
}
