import { GoalProgressCard } from "@/components/saas/dashboard/goal-progress-card";

export default function Example() {
  return (
    <GoalProgressCard
      title="Q3 revenue goal"
      current={38650}
      target={50000}
      formatAsCurrency
      deadlineLabel="12 days left"
    />
  );
}
