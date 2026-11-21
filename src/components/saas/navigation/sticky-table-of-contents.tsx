import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2;
}

export interface StickyTableOfContentsProps {
  items: TocItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

export function StickyTableOfContents({ items, activeId, onNavigate, className }: StickyTableOfContentsProps) {
  return (
    <nav aria-label="Table of contents" className={cn("w-full max-w-48 space-y-0.5 text-left", className)}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors",
                  item.level === 2 && "pl-6 text-xs",
                  isActive ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
