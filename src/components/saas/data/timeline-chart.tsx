import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types";

export interface TimelineChartProps {
  events: TimelineEvent[];
  rangeStart: string;
  rangeEnd: string;
  className?: string;
}

export function TimelineChart({ events, rangeStart, rangeEnd, className }: TimelineChartProps) {
  const startTime = new Date(rangeStart).getTime();
  const endTime = new Date(rangeEnd).getTime();
  const totalMs = Math.max(1, endTime - startTime);

  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={cn("w-full max-w-2xl text-left", className)}>
      <div className="relative h-1 rounded-full bg-border">
        {sorted.map((event) => {
          const position = ((new Date(event.date).getTime() - startTime) / totalMs) * 100;
          return (
            <span
              key={event.id}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background"
              style={{ left: `${Math.min(100, Math.max(0, position))}%` }}
            />
          );
        })}
      </div>
      <div className="mt-4 space-y-2">
        {sorted.map((event) => (
          <div key={event.id} className="flex items-center justify-between text-sm">
            <span className="font-medium">{event.label}</span>
            <span className="text-muted-foreground">
              {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
