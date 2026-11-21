import * as React from "react";
import { cn } from "@/lib/utils";

export interface VirtualizedListItem {
  id: string;
  label: string;
  description?: string;
}

export interface VirtualizedLongListProps {
  items: VirtualizedListItem[];
  height?: number;
  itemHeight?: number;
  overscan?: number;
  className?: string;
}

export function VirtualizedLongList({
  items,
  height = 320,
  itemHeight = 44,
  overscan = 4,
  className,
}: VirtualizedLongListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height }}
      className={cn("w-full max-w-md overflow-y-auto rounded-lg border border-border text-left", className)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, i) => {
          const index = startIndex + i;
          return (
            <div
              key={item.id}
              style={{ position: "absolute", top: index * itemHeight, height: itemHeight, width: "100%" }}
              className="flex flex-col justify-center border-b border-border px-4"
            >
              <p className="truncate text-sm font-medium">{item.label}</p>
              {item.description && <p className="truncate text-xs text-muted-foreground">{item.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
