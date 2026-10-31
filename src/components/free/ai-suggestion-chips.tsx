import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SuggestionChip {
  /** The prompt passed to `onSelect`. */
  text: string;
  /** Optional shorter label to display instead of `text`. */
  label?: string;
  icon?: LucideIcon;
}

export interface AiSuggestionChipsProps {
  suggestions: (string | SuggestionChip)[];
  onSelect?: (text: string) => void;
  /** "wrap" flows onto multiple lines; "scroll" keeps one horizontally-scrollable row. */
  layout?: "wrap" | "scroll";
  /** Accessible label for the list, also rendered as a small heading when `showTitle` is set. */
  title?: string;
  showTitle?: boolean;
  disabled?: boolean;
  className?: string;
}

const STAGGER_MS = 40;
const MAX_STAGGERED = 8;

export function AiSuggestionChips({
  suggestions,
  onSelect,
  layout = "wrap",
  title = "Suggested prompts",
  showTitle = false,
  disabled = false,
  className,
}: AiSuggestionChipsProps) {
  const titleId = React.useId();
  const items = suggestions.map((suggestion) => (typeof suggestion === "string" ? { text: suggestion } : suggestion));

  if (items.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      {showTitle && (
        <p id={titleId} className="mb-2 text-xs font-medium text-muted-foreground">
          {title}
        </p>
      )}
      <ul
        aria-label={showTitle ? undefined : title}
        aria-labelledby={showTitle ? titleId : undefined}
        className={cn(
          "flex gap-2",
          layout === "wrap"
            ? "flex-wrap"
            : "scrollbar-thin -mx-1 snap-x overflow-x-auto px-1 pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)]",
        )}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const label = item.label ?? item.text;
          return (
            <li
              key={`${item.text}-${index}`}
              // One-off mount stagger: keyframes are fine here because the list doesn't re-trigger.
              className="shrink-0 snap-start animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out-strong"
              style={{ animationDelay: `${Math.min(index, MAX_STAGGERED) * STAGGER_MS}ms`, animationFillMode: "backwards" }}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect?.(item.text)}
                title={label.length > 48 ? label : undefined}
                className="inline-flex max-w-[20rem] items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 shadow-xs outline-none transition-[background-color,border-color,color,scale] duration-150 ease-out-strong hover:border-ring/40 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
              >
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
                <span className="truncate">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
