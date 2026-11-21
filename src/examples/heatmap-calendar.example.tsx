import { HeatmapCalendar } from "@/components/saas/data/heatmap-calendar";

function generateData() {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 84; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({ date: date.toISOString().slice(0, 10), value: Math.floor(Math.random() * 10) });
  }
  return data;
}

export default function Example() {
  return <HeatmapCalendar data={generateData()} weeks={12} />;
}
