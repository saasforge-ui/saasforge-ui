import { cn } from "@/lib/utils";
import type { GanttTask } from "@/types";

export interface GanttChartRowProps {
  tasks: GanttTask[];
  rangeStart: string;
  rangeEnd: string;
  className?: string;
}

function daysBetween(a: string, b: string) {
  return Math.max(0, (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24));
}

export function GanttChartRow({ tasks, rangeStart, rangeEnd, className }: GanttChartRowProps) {
  const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd));

  return (
    <div className={cn("w-full max-w-2xl space-y-2 text-left", className)}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{new Date(rangeStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        <span>{new Date(rangeEnd).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </div>
      <div className="space-y-2 rounded-lg border border-border p-3">
        {tasks.map((task) => {
          const offsetDays = daysBetween(rangeStart, task.start);
          const durationDays = Math.max(1, daysBetween(task.start, task.end));
          const leftPct = (offsetDays / totalDays) * 100;
          const widthPct = (durationDays / totalDays) * 100;
          return (
            <div key={task.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm">{task.name}</span>
              <div className="relative h-5 flex-1 rounded bg-muted">
                <div
                  className="absolute top-0 h-5 rounded bg-primary"
                  style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 2)}%` }}
                  title={`${task.name}: ${task.start} → ${task.end}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
