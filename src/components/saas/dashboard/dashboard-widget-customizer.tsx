import * as React from "react";
import { GripVertical, LayoutGrid, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface DashboardWidgetConfig {
  id: string;
  title: string;
  description: string;
  metricValue: string;
  /** Whether the widget is on the dashboard at all (removing it moves it to "Available widgets"). */
  enabled: boolean;
  /** Temporarily hide an on-dashboard widget without losing its position. Defaults to `true`. */
  visible?: boolean;
}

export interface DashboardWidgetCustomizerProps {
  widgets: DashboardWidgetConfig[];
  onChange?: (widgets: DashboardWidgetConfig[]) => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * Pure helper that moves the item at `fromIndex` to `toIndex`, returning a new array.
 * Out-of-range or no-op moves return the original array reference unchanged.
 */
export function reorderWidgets<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
    return list;
  }
  const next = list.slice();
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export function DashboardWidgetCustomizer({
  widgets,
  onChange,
  isLoading = false,
  className,
}: DashboardWidgetCustomizerProps) {
  const [items, setItems] = React.useState(widgets);
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setItems(widgets);
  }, [widgets]);

  function commit(next: DashboardWidgetConfig[]) {
    setItems(next);
    onChange?.(next);
  }

  function setOnDashboard(id: string, enabled: boolean) {
    commit(items.map((widget) => (widget.id === id ? { ...widget, enabled, visible: true } : widget)));
  }

  function toggleVisibility(id: string) {
    commit(items.map((widget) => (widget.id === id ? { ...widget, visible: widget.visible === false } : widget)));
  }

  function handleDrop(targetId: string) {
    if (dragId === null || dragId === targetId) {
      setDragId(null);
      setOverId(null);
      return;
    }
    const fromIndex = items.findIndex((widget) => widget.id === dragId);
    const toIndex = items.findIndex((widget) => widget.id === targetId);
    if (fromIndex !== -1 && toIndex !== -1) {
      commit(reorderWidgets(items, fromIndex, toIndex));
    }
    setDragId(null);
    setOverId(null);
  }

  if (isLoading) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const activeWidgets = items.filter((widget) => widget.enabled);
  const availableWidgets = items.filter((widget) => !widget.enabled);
  const shownCount = activeWidgets.filter((widget) => widget.visible !== false).length;

  return (
    <div className={cn("w-full max-w-lg text-left", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Dashboard widgets</h3>
        <span className="text-xs text-muted-foreground">
          {shownCount} of {items.length} shown
        </span>
      </div>

      {activeWidgets.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          No widgets on your dashboard yet. Add one below.
        </p>
      ) : (
        <ul className="space-y-2" aria-label="Active dashboard widgets">
          {activeWidgets.map((widget) => {
            const isVisible = widget.visible !== false;
            return (
            <li
              key={widget.id}
              draggable
              onDragStart={() => setDragId(widget.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverId(widget.id);
              }}
              onDragEnd={() => {
                setDragId(null);
                setOverId(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(widget.id);
              }}
            >
              <Card
                className={cn(
                  "flex items-center gap-3 p-3 transition-colors",
                  dragId === widget.id && "opacity-40",
                  overId === widget.id && dragId !== null && dragId !== widget.id && "border-primary",
                )}
              >
                <span
                  aria-label={`Drag to reorder ${widget.title}`}
                  className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4" aria-hidden="true" />
                </span>
                <div
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3 transition-opacity duration-200 ease-out-strong",
                    !isVisible && "opacity-50",
                  )}
                >
                  <LayoutGrid className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="truncate">{widget.title}</span>
                      {!isVisible && (
                        <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{widget.description}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums">{widget.metricValue}</span>
                </div>
                <Switch
                  checked={isVisible}
                  onCheckedChange={() => toggleVisibility(widget.id)}
                  aria-label={`Show ${widget.title} on dashboard`}
                />
                <button
                  type="button"
                  onClick={() => setOnDashboard(widget.id, false)}
                  aria-label={`Remove ${widget.title} from dashboard`}
                  className="shrink-0 rounded-sm text-muted-foreground transition-[color,scale] duration-150 ease-out-strong hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </Card>
            </li>
            );
          })}
        </ul>
      )}

      {availableWidgets.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Available widgets</p>
          <div className="flex flex-wrap gap-1.5">
            {availableWidgets.map((widget) => (
              <button
                key={widget.id}
                type="button"
                onClick={() => setOnDashboard(widget.id, true)}
                aria-label={`Add ${widget.title} to dashboard`}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-foreground transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]"
              >
                <Plus className="h-3 w-3" aria-hidden="true" />
                {widget.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
