import * as React from "react";
import { Loader2, RotateCw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type WebhookStatus = "delivered" | "failed" | "retrying";

export interface WebhookEvent {
  id: string;
  type: string;
  endpoint: string;
  status: WebhookStatus;
  /** HTTP status returned by the endpoint; null if the request never got a response (e.g. timeout). */
  httpCode: number | null;
  /** ISO timestamp of the latest attempt. */
  timestamp: string;
  attempts?: number;
  request: unknown;
  response?: unknown;
}

export type WebhookRetryResult = Partial<Pick<WebhookEvent, "status" | "httpCode" | "response" | "timestamp">>;

export interface WebhookEventLogProps {
  events: WebhookEvent[];
  /** Resolve with the new delivery outcome. Rejecting marks the event as failed again. */
  onRetry?: (event: WebhookEvent) => Promise<WebhookRetryResult | void>;
  className?: string;
}

type Filter = "all" | WebhookStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "delivered", label: "Delivered" },
  { value: "failed", label: "Failed" },
  { value: "retrying", label: "Retrying" },
];

const statusStyles: Record<WebhookStatus, { dot: string; badge: string; label: string }> = {
  delivered: { dot: "bg-success", badge: "border-success/30 bg-success/10 text-success", label: "Delivered" },
  failed: { dot: "bg-destructive", badge: "border-destructive/30 bg-destructive/10 text-destructive", label: "Failed" },
  retrying: { dot: "bg-warning", badge: "border-warning/40 bg-warning/15 text-amber-700 dark:text-warning", label: "Retrying" },
};

const timeFormatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });

function formatTime(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : timeFormatter.format(date);
}

function json(value: unknown) {
  if (value === undefined) return "—";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

export function WebhookEventLog({ events, onRetry, className }: WebhookEventLogProps) {
  // Local overrides let retries update a row without the parent having to own the list.
  const [overrides, setOverrides] = React.useState<Record<string, Partial<WebhookEvent>>>({});
  const [filter, setFilter] = React.useState<Filter>("all");
  // Rows retried from the "Failed" view stay visible there until the retry settles, instead of vanishing mid-click.
  const [inFlight, setInFlight] = React.useState<Set<string>>(() => new Set());

  const rows = events.map((event) => ({ ...event, ...overrides[event.id] }));
  const counts = rows.reduce<Record<Filter, number>>(
    (acc, row) => ({ ...acc, all: acc.all + 1, [row.status]: acc[row.status] + 1 }),
    { all: 0, delivered: 0, failed: 0, retrying: 0 },
  );
  const visible =
    filter === "all" ? rows : rows.filter((row) => row.status === filter || (filter === "failed" && inFlight.has(row.id)));

  const retry = async (event: WebhookEvent) => {
    if (!onRetry) return;
    setInFlight((prev) => new Set(prev).add(event.id));
    setOverrides((prev) => ({ ...prev, [event.id]: { ...prev[event.id], status: "retrying" } }));
    try {
      const result = await onRetry(event);
      setOverrides((prev) => ({
        ...prev,
        [event.id]: {
          ...prev[event.id],
          status: "delivered",
          httpCode: 200,
          timestamp: new Date().toISOString(),
          attempts: (event.attempts ?? 1) + 1,
          ...(result ?? {}),
        },
      }));
    } catch {
      setOverrides((prev) => ({
        ...prev,
        [event.id]: { ...prev[event.id], status: "failed", attempts: (event.attempts ?? 1) + 1, timestamp: new Date().toISOString() },
      }));
    } finally {
      setInFlight((prev) => {
        const next = new Set(prev);
        next.delete(event.id);
        return next;
      });
    }
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-3">
        <h3 className="text-sm font-semibold">Webhook deliveries</h3>
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
          {FILTERS.map((option) => {
            const active = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium outline-none transition-[background-color,color,box-shadow,scale] duration-150 ease-out-strong focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]",
                  active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
                <span className="tabular-nums text-muted-foreground">{counts[option.value]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="px-3 py-10 text-center text-sm text-muted-foreground">
          {rows.length === 0 ? "No webhook deliveries yet." : `No ${filter} deliveries.`}
        </p>
      ) : (
        <Accordion type="multiple" className="divide-y divide-border">
          {visible.map((row) => {
            const style = statusStyles[row.status];
            const isRetrying = row.status === "retrying";
            return (
              <AccordionItem key={row.id} value={row.id} className="border-b-0">
                <div className="flex items-center gap-2 pr-3 [&>h3]:min-w-0 [&>h3]:flex-1">
                  <AccordionTrigger className="gap-3 px-3 py-2.5 text-left hover:bg-accent/50 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <span className="flex min-w-0 flex-1 items-center gap-3">
                      <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", style.dot)} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-mono text-xs font-medium">{row.type}</span>
                        <span className="block truncate font-mono text-[11px] font-normal text-muted-foreground sm:hidden">{row.endpoint}</span>
                      </span>
                      <span className="hidden min-w-0 max-w-[14rem] flex-1 truncate font-mono text-xs font-normal text-muted-foreground sm:block" title={row.endpoint}>
                        {row.endpoint}
                      </span>
                      <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", style.badge)}>
                        {isRetrying && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
                        {style.label}
                      </span>
                      <span className="hidden w-9 shrink-0 text-right font-mono text-xs font-normal tabular-nums text-muted-foreground md:block">
                        {row.httpCode ?? "—"}
                      </span>
                      <time dateTime={row.timestamp} className="hidden w-32 shrink-0 text-right text-xs font-normal tabular-nums text-muted-foreground lg:block">
                        {formatTime(row.timestamp)}
                      </time>
                    </span>
                  </AccordionTrigger>
                  {row.status === "failed" && onRetry && (
                    <Button type="button" size="sm" variant="outline" onClick={() => void retry(row)} className="h-7 shrink-0 gap-1.5 px-2.5 text-xs" aria-label={`Retry ${row.type}`}>
                      <RotateCw className="h-3.5 w-3.5" />
                      Retry
                    </Button>
                  )}
                </div>
                <AccordionContent className="px-3 pb-3">
                  <dl className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                    <div>
                      <dt className="text-muted-foreground">Event ID</dt>
                      <dd className="truncate font-mono text-foreground">{row.id}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">HTTP status</dt>
                      <dd className="font-mono text-foreground">{row.httpCode ?? "No response"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Attempts</dt>
                      <dd className="font-mono text-foreground">{row.attempts ?? 1}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Last attempt</dt>
                      <dd className="text-foreground">{formatTime(row.timestamp)}</dd>
                    </div>
                  </dl>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { label: "Request payload", value: row.request },
                      { label: "Response", value: row.response },
                    ].map((block) => (
                      <div key={block.label} className="min-w-0">
                        <p className="mb-1 text-xs font-medium text-foreground">{block.label}</p>
                        <pre
                          tabIndex={0}
                          aria-label={`${row.type} ${block.label.toLowerCase()}`}
                          className="scrollbar-thin max-h-56 overflow-auto rounded-md border border-border bg-muted/50 p-2.5 font-mono text-[11px] leading-5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {json(block.value)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
