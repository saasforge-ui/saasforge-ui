import * as React from "react";
import { CalendarEventView } from "@/components/saas/data/calendar-event-view";

export default function Example() {
  const [month, setMonth] = React.useState(new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = React.useState("2026-07-15");

  return (
    <CalendarEventView
      month={month}
      onMonthChange={setMonth}
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      events={[
        { date: "2026-07-15", title: "Product launch" },
        { date: "2026-07-15", title: "Team retro" },
        { date: "2026-07-22", title: "Board meeting" },
      ]}
    />
  );
}
