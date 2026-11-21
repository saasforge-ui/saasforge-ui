import * as React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItem {
  id: string;
  label: string;
}

interface PendingDeletion {
  item: ListItem;
  index: number;
}

const initialItems: ListItem[] = [
  { id: "i1", label: "Q3 Marketing Plan.pdf" },
  { id: "i2", label: "Customer Interview Notes.docx" },
  { id: "i3", label: "Onboarding Checklist.xlsx" },
  { id: "i4", label: "Brand Guidelines.fig" },
];

const UNDO_DURATION_MS = 5000;

export interface UndoSnackbarProps {
  className?: string;
}

export function UndoSnackbar({ className }: UndoSnackbarProps) {
  const [items, setItems] = React.useState(initialItems);
  const [pending, setPending] = React.useState<PendingDeletion | null>(null);
  const [remainingPercent, setRemainingPercent] = React.useState(100);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const deleteItem = (item: ListItem) => {
    const index = items.findIndex((entry) => entry.id === item.id);
    setItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setPending({ item, index });
    setRemainingPercent(100);

    clearTimers();
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setRemainingPercent(Math.max(0, 100 - (elapsed / UNDO_DURATION_MS) * 100));
    }, 50);
    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setPending(null);
    }, UNDO_DURATION_MS);
  };

  const undo = () => {
    if (!pending) return;
    clearTimers();
    setItems((prev) => {
      const next = [...prev];
      next.splice(pending.index, 0, pending.item);
      return next;
    });
    setPending(null);
  };

  React.useEffect(() => clearTimers, []);

  return (
    <div className={cn("relative w-full max-w-md space-y-2 pb-16", className)}>
      {items.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No items left.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm"
            >
              <span className="truncate">{item.label}</span>
              <button
                type="button"
                onClick={() => deleteItem(item)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
                aria-label={`Delete ${item.label}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {pending && (
        <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-lg border border-border bg-foreground text-background shadow-lg animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            <p className="truncate text-sm">
              <span className="font-medium">{pending.item.label}</span> deleted
            </p>
            <button type="button" onClick={undo} className="shrink-0 text-sm font-semibold text-primary hover:underline">
              Undo
            </button>
          </div>
          <div className="h-0.5 w-full bg-background/20">
            <div className="h-full bg-primary transition-[width] duration-75 ease-linear" style={{ width: `${remainingPercent}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
