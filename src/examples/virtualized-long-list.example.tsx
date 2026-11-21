import { VirtualizedLongList } from "@/components/saas/data/virtualized-long-list";

function generateItems() {
  return Array.from({ length: 5000 }, (_, i) => ({
    id: String(i),
    label: `Event #${i + 1}`,
    description: `Log entry ${i + 1} of 5000`,
  }));
}

export default function Example() {
  return <VirtualizedLongList items={generateItems()} />;
}
