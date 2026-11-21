import { KanbanBoard } from "@/components/saas/data/kanban-board";

export default function Example() {
  return (
    <KanbanBoard
      onCardClick={(columnId, card) => console.log("card clicked", columnId, card)}
      columns={[
        {
          id: "todo",
          title: "To do",
          cards: [
            { id: "1", title: "Design onboarding flow", labels: ["Design"] },
            { id: "2", title: "Fix invoice PDF export", labels: ["Bug"] },
          ],
        },
        {
          id: "in-progress",
          title: "In progress",
          cards: [{ id: "3", title: "Migrate billing to new API", description: "Blocked on Stripe webhook testing" }],
        },
        {
          id: "done",
          title: "Done",
          cards: [{ id: "4", title: "Ship dark mode" }],
        },
      ]}
    />
  );
}
