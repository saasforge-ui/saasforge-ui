import * as React from "react";
import { cn } from "@/lib/utils";
import type { HeatmapDataPoint } from "@/types";

export interface HeatmapCalendarProps {
  data: HeatmapDataPoint[];
  weeks?: number;
  className?: string;
}

function getLevel(value: number, max: number) {
  if (value <= 0) return 0;
  const ratio = value / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

const levelClassName = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

export function HeatmapCalendar({ data, weeks = 12, className }: HeatmapCalendarProps) {
  const byDate = React.useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((point) => map.set(point.date, point.value));
    return map;
  }, [data]);

  const max = Math.max(1, ...data.map((point) => point.value));

  const days = React.useMemo(() => {
    const today = new Date();
    const totalDays = weeks * 7;
    const start = new Date(today);
    start.setDate(start.getDate() - totalDays + 1);
    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }, [weeks]);

  const columns: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7));
  }

  return (
    <div className={cn("inline-flex gap-1", className)}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-1">
          {column.map((date) => {
            const key = date.toISOString().slice(0, 10);
            const value = byDate.get(key) ?? 0;
            const level = getLevel(value, max);
            return (
              <div
                key={key}
                title={`${key}: ${value}`}
                className={cn("h-3 w-3 rounded-sm", levelClassName[level])}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
