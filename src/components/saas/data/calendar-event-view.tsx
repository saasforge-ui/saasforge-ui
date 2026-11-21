import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types";

export interface CalendarEventViewProps {
  month: Date;
  events: CalendarEvent[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  onMonthChange?: (month: Date) => void;
  className?: string;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function CalendarEventView({
  month,
  events,
  selectedDate,
  onSelectDate,
  onMonthChange,
  className,
}: CalendarEventViewProps) {
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const key = event.date.slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), event]);
    });
    return map;
  }, [events]);

  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) ?? []) : [];

  return (
    <div className={cn("w-full max-w-md text-left", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            aria-label="Previous month"
            onClick={() => onMonthChange?.(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            aria-label="Next month"
            onClick={() => onMonthChange?.(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {weekDays.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
        {cells.map((date, index) => {
          if (!date) return <span key={index} />;
          const key = toDateKey(date);
          const dayEvents = eventsByDate.get(key) ?? [];
          const isSelected = key === selectedDate;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate?.(key)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md py-1.5 text-foreground hover:bg-accent",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              <span>{date.getDate()}</span>
              {dayEvents.length > 0 && (
                <span className={cn("h-1 w-1 rounded-full bg-primary", isSelected && "bg-primary-foreground")} />
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 space-y-1.5 border-t border-border pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events.</p>
          ) : (
            selectedEvents.map((event) => (
              <p key={event.title} className="text-sm">
                {event.title}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}
