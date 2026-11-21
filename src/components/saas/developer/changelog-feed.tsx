import * as React from "react";
import { Check, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChangelogTag = "new" | "improved" | "fixed";

export interface ChangelogEntry {
  version: string;
  /** ISO date, e.g. "2026-10-28". */
  date: string;
  title: string;
  /** Rich description — plain string or any React node. */
  description: React.ReactNode;
  tags: ChangelogTag[];
  /** Optional bullet list grouped by tag. */
  changes?: { tag: ChangelogTag; text: string }[];
  image?: { src: string; alt: string };
}

export interface ChangelogFeedProps {
  entries: ChangelogEntry[];
  /** How many entries to show initially and per "Load more". */
  pageSize?: number;
  /** Called when local entries are exhausted and `hasMore` is true — append to `entries` from the parent. */
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  className?: string;
}

const tagStyles: Record<ChangelogTag, { label: string; className: string }> = {
  new: { label: "New", className: "border-success/30 bg-success/10 text-success" },
  improved: { label: "Improved", className: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  fixed: { label: "Fixed", className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400" },
};

const dateFormatter = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

function entryAnchor(version: string) {
  return `changelog-${version.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date);
}

function TagBadge({ tag }: { tag: ChangelogTag }) {
  const style = tagStyles[tag];
  return <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", style.className)}>{style.label}</span>;
}

function AnchorLink({ id, version }: { id: string; version: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <a
      href={`#${id}`}
      onClick={() => {
        // Let the browser update the hash, and also copy the deep link for sharing.
        const link = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard?.writeText(link).then(
          () => {
            setCopied(true);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setCopied(false), 1600);
          },
          () => undefined,
        );
      }}
      aria-label={copied ? `Link to ${version} copied` : `Copy link to ${version}`}
      className="relative inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-[background-color,color,opacity,scale] duration-150 ease-out-strong hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] sm:opacity-0 sm:group-hover:opacity-100 [@media(hover:none)]:opacity-100"
    >
      <Link2 aria-hidden="true" className={cn("absolute h-3.5 w-3.5 transition-[opacity,filter,scale] duration-200 ease-out-strong", copied && "scale-90 opacity-0 blur-[2px]")} />
      <Check
        aria-hidden="true"
        className={cn("absolute h-3.5 w-3.5 text-success transition-[opacity,filter,scale] duration-200 ease-out-strong", !copied && "scale-90 opacity-0 blur-[2px]")}
      />
    </a>
  );
}

export function ChangelogFeed({ entries, pageSize = 3, onLoadMore, hasMore = false, className }: ChangelogFeedProps) {
  const [visibleCount, setVisibleCount] = React.useState(pageSize);
  const [isLoading, setIsLoading] = React.useState(false);
  const firstNewIndexRef = React.useRef(0);

  const handledHashRef = React.useRef(false);

  // Deep links: if the URL hash points at an entry beyond the first page, reveal it and scroll there (once).
  React.useEffect(() => {
    if (handledHashRef.current) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const index = entries.findIndex((entry) => entryAnchor(entry.version) === hash);
    if (index === -1) return;
    handledHashRef.current = true;
    setVisibleCount((count) => Math.max(count, index + 1));
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView?.({ block: "start" }));
  }, [entries]);

  const visible = entries.slice(0, visibleCount);
  const canRevealLocal = visibleCount < entries.length;
  const showLoadMore = canRevealLocal || (hasMore && Boolean(onLoadMore));

  const loadMore = async () => {
    firstNewIndexRef.current = visibleCount;
    if (!canRevealLocal && onLoadMore) {
      setIsLoading(true);
      try {
        await onLoadMore();
      } finally {
        setIsLoading(false);
      }
    }
    setVisibleCount((count) => count + pageSize);
  };

  if (entries.length === 0) {
    return <p className={cn("rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground", className)}>No releases yet.</p>;
  }

  return (
    <div className={cn("w-full", className)}>
      <ol className="relative">
        {visible.map((entry, index) => {
          const id = entryAnchor(entry.version);
          const isNew = index >= firstNewIndexRef.current && firstNewIndexRef.current > 0;
          return (
            <li
              key={entry.version}
              className={cn("group relative grid gap-x-8 pb-10 last:pb-0 sm:grid-cols-[9rem_1fr]", isNew && "animate-in fade-in-0 slide-in-from-bottom-2 duration-250 ease-out-strong")}
              style={isNew ? { animationDelay: `${(index - firstNewIndexRef.current) * 60}ms`, animationFillMode: "backwards" } : undefined}
            >
              <div className="mb-2 sm:mb-0 sm:pt-1 sm:text-right">
                <time dateTime={entry.date} className="text-sm text-muted-foreground">
                  {formatDate(entry.date)}
                </time>
              </div>

              <article id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-24 border-l border-border pl-6 sm:pl-8">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">{entry.version}</span>
                  {entry.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                  <AnchorLink id={id} version={entry.version} />
                </div>
                <h3 id={`${id}-title`} className="mt-2 text-lg font-semibold tracking-tight">
                  {entry.title}
                </h3>
                <div className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs [&_p+p]:mt-2">
                  {entry.description}
                </div>
                {entry.image && (
                  <img
                    src={entry.image.src}
                    alt={entry.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="mt-4 aspect-video w-full max-w-2xl rounded-lg border border-border bg-muted object-cover"
                  />
                )}
                {entry.changes && entry.changes.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2 text-sm">
                        <span className="mt-px w-[4.75rem] shrink-0">
                          <TagBadge tag={change.tag} />
                        </span>
                        <span className="min-w-0 break-words text-foreground">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      {showLoadMore && (
        <div className="mt-8 flex justify-center sm:pl-[11rem]">
          <Button type="button" variant="outline" onClick={() => void loadMore()} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Loading" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
