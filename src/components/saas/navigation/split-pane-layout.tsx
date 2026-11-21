import * as React from "react";
import { cn } from "@/lib/utils";

export interface SplitPaneLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
  height?: number;
  className?: string;
}

export function SplitPaneLayout({
  left,
  right,
  defaultLeftWidth = 240,
  minLeftWidth = 160,
  maxLeftWidth = 400,
  height = 320,
  className,
}: SplitPaneLayoutProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = React.useState(defaultLeftWidth);
  const draggingRef = React.useRef(false);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = Math.min(maxLeftWidth, Math.max(minLeftWidth, e.clientX - rect.left));
      setLeftWidth(next);
    }
    function handleMouseUp() {
      draggingRef.current = false;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minLeftWidth, maxLeftWidth]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("flex w-full max-w-2xl overflow-hidden rounded-lg border border-border", className)}
    >
      <div style={{ width: leftWidth }} className="shrink-0 overflow-auto p-3">
        {left}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        onMouseDown={() => {
          draggingRef.current = true;
        }}
        className="w-1 shrink-0 cursor-col-resize bg-border hover:bg-primary/50"
      />
      <div className="flex-1 overflow-auto p-3">{right}</div>
    </div>
  );
}
