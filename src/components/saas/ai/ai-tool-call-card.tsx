import { motion } from "framer-motion";
import { AlertCircle, Check, Clock, Loader2, RotateCw, Wrench, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToolCallStatus = "pending" | "running" | "success" | "error";

export interface AiToolCallCardProps {
  /** Tool/function name, e.g. "search_docs". */
  name: string;
  description?: string;
  icon?: LucideIcon;
  status: ToolCallStatus;
  args?: unknown;
  result?: unknown;
  /** Error message shown when `status` is "error". */
  error?: string;
  onRetry?: () => void;
  durationMs?: number;
  /** Which sections start expanded. */
  defaultExpanded?: ("args" | "result")[];
  className?: string;
}

const statusConfig: Record<ToolCallStatus, { label: string; icon: LucideIcon; className: string }> = {
  pending: { label: "Pending", icon: Clock, className: "border-border bg-muted text-muted-foreground" },
  running: { label: "Running", icon: Loader2, className: "border-ring/30 bg-accent text-foreground" },
  success: { label: "Success", icon: Check, className: "border-success/30 bg-success/10 text-success" },
  error: { label: "Error", icon: X, className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

function formatJson(value: unknown) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function formatDuration(ms: number) {
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function JsonBlock({ value, label }: { value: unknown; label: string }) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className="scrollbar-thin max-h-64 overflow-auto rounded-md border border-border bg-muted/50 p-3 font-mono text-xs leading-5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {formatJson(value)}
    </pre>
  );
}

export function AiToolCallCard({
  name,
  description,
  icon: Icon = Wrench,
  status,
  args,
  result,
  error,
  onRetry,
  durationMs,
  defaultExpanded = [],
  className,
}: AiToolCallCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const hasArgs = args !== undefined;
  const hasResult = status === "success" && result !== undefined;

  return (
    <div
      role="group"
      aria-label={`Tool call: ${name}`}
      className={cn("relative w-full overflow-hidden rounded-lg border border-border bg-card text-card-foreground", className)}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground"
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-medium" title={name}>
            {name}
          </p>
          {description && <p className="truncate text-xs text-muted-foreground">{description}</p>}
        </div>
        {status === "success" && durationMs !== undefined && (
          <span className="hidden shrink-0 text-xs tabular-nums text-muted-foreground sm:inline">{formatDuration(durationMs)}</span>
        )}
        <span aria-live="polite" className="shrink-0">
          <span
            key={status}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium animate-in fade-in-0 zoom-in-95 duration-150 ease-out-strong",
              config.className,
            )}
          >
            <StatusIcon className={cn("h-3 w-3", status === "running" && "animate-spin")} aria-hidden="true" />
            {config.label}
          </span>
        </span>
      </div>

      {/* Subtle indeterminate bar while the tool runs — constant motion, so linear. */}
      {status === "running" && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px overflow-hidden bg-border">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
            initial={{ transform: "translateX(-100%)" }}
            animate={{ transform: "translateX(300%)" }}
            transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
          />
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="mx-3 mb-3 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
          <p className="min-w-0 flex-1 break-words text-xs leading-5 text-foreground">{error ?? "The tool call failed."}</p>
          {onRetry && (
            <Button type="button" size="sm" variant="outline" onClick={onRetry} className="h-7 shrink-0 gap-1.5 px-2.5">
              <RotateCw className="h-3.5 w-3.5" />
              Retry
            </Button>
          )}
        </div>
      )}

      {(hasArgs || hasResult) && (
        <Accordion type="multiple" defaultValue={defaultExpanded} className="border-t border-border px-3">
          {hasArgs && (
            <AccordionItem value="args" className={cn(!hasResult && "border-b-0")}>
              <AccordionTrigger className="py-2 text-xs text-muted-foreground hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Arguments
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <JsonBlock value={args} label={`${name} arguments`} />
              </AccordionContent>
            </AccordionItem>
          )}
          {hasResult && (
            <AccordionItem value="result" className="border-b-0">
              <AccordionTrigger className="py-2 text-xs text-muted-foreground hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Result
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <JsonBlock value={result} label={`${name} result`} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}
    </div>
  );
}
