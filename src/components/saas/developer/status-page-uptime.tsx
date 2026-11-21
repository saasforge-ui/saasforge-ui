import * as React from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type ServiceStatus = "operational" | "degraded" | "outage";

export interface UptimeDay {
  /** ISO date, e.g. "2026-10-31". */
  date: string;
  /** Uptime percentage for the day (0–100), or null when there's no data. */
  uptime: number | null;
}

export interface StatusService {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  /** Oldest first. The last 90 entries are shown. */
  days: UptimeDay[];
}

export type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";

export interface StatusIncident {
  id: string;
  title: string;
  status: IncidentStatus;
  impact: "minor" | "major" | "critical";
  startedAt: string;
  resolvedAt?: string;
  latestUpdate?: string;
}

export interface StatusPageUptimeProps {
  services: StatusService[];
  incidents?: StatusIncident[];
  lastUpdated?: string;
  className?: string;
}

const DAYS = 90;

const overallConfig: Record<ServiceStatus, { label: string; icon: LucideIcon; className: string }> = {
  operational: { label: "All systems operational", icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success" },
  degraded: { label: "Degraded performance", icon: AlertTriangle, className: "border-warning/40 bg-warning/15 text-amber-700 dark:text-warning" },
  outage: { label: "Service outage", icon: XCircle, className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

const serviceStatusLabel: Record<ServiceStatus, { label: string; className: string }> = {
  operational: { label: "Operational", className: "text-success" },
  degraded: { label: "Degraded", className: "text-amber-600 dark:text-warning" },
  outage: { label: "Outage", className: "text-destructive" },
};

const incidentStatusStyle: Record<IncidentStatus, string> = {
  investigating: "border-destructive/30 bg-destructive/10 text-destructive",
  identified: "border-warning/40 bg-warning/15 text-amber-700 dark:text-warning",
  monitoring: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  resolved: "border-success/30 bg-success/10 text-success",
};

const impactDot: Record<StatusIncident["impact"], string> = {
  minor: "bg-warning",
  major: "bg-orange-500",
  critical: "bg-destructive",
};

const dayFormatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

function formatDay(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dayFormatter.format(date);
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateTimeFormatter.format(date);
}

function barColor(uptime: number | null) {
  if (uptime === null) return "bg-muted";
  if (uptime >= 99.5) return "bg-success";
  if (uptime >= 97) return "bg-warning";
  return "bg-destructive";
}

function averageUptime(days: UptimeDay[]) {
  const known = days.filter((day) => day.uptime !== null) as { date: string; uptime: number }[];
  if (known.length === 0) return null;
  return known.reduce((sum, day) => sum + day.uptime, 0) / known.length;
}

function formatPercent(value: number | null) {
  return value === null ? "No data" : `${value.toFixed(value >= 99.995 ? 0 : 2)}%`;
}

function overallStatus(services: StatusService[]): ServiceStatus {
  if (services.some((service) => service.status === "outage")) return "outage";
  if (services.some((service) => service.status === "degraded")) return "degraded";
  return "operational";
}

function UptimeBar({ service }: { service: StatusService }) {
  const days = service.days.slice(-DAYS);
  const [focused, setFocused] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(days.length - 1);
  const average = averageUptime(days);
  const activeDay = days[activeIndex];

  // One tab stop for the whole bar; arrow keys walk the days and drive the tooltip, so keyboard users get the same detail as hover.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const delta = keys[event.key];
    setActiveIndex((index) => Math.max(0, Math.min(days.length - 1, Number.isFinite(delta) ? index + delta : delta > 0 ? days.length - 1 : 0)));
  };

  return (
    <div>
      <div
        role="group"
        tabIndex={0}
        aria-label={`${service.name}: ${formatPercent(average)} uptime over the last ${days.length} days. Use arrow keys to inspect each day.`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        className="flex h-8 items-stretch gap-[2px] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {days.map((day, index) => (
          <Tooltip key={day.date} open={focused ? index === activeIndex : undefined}>
            <TooltipTrigger asChild>
              <span
                // On small screens only the last 30 days fit comfortably.
                className={cn(
                  "min-w-[2px] flex-1 rounded-[2px] transition-opacity duration-150 hover:opacity-70",
                  barColor(day.uptime),
                  index < days.length - 30 && "max-sm:hidden",
                  focused && index === activeIndex && "opacity-70",
                )}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="text-center">
              <p className="font-medium">{formatDay(day.date)}</p>
              <p className="text-muted-foreground">{formatPercent(day.uptime)} uptime</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <span role="status" className="sr-only">
        {focused && activeDay ? `${formatDay(activeDay.date)}: ${formatPercent(activeDay.uptime)} uptime` : ""}
      </span>
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="sm:hidden">{Math.min(30, days.length)} days ago</span>
        <span className="hidden sm:inline">{days.length} days ago</span>
        <span className="font-medium tabular-nums text-foreground">{formatPercent(average)} uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export function StatusPageUptime({ services, incidents = [], lastUpdated, className }: StatusPageUptimeProps) {
  const overall = overallConfig[overallStatus(services)];
  const OverallIcon = overall.icon;
  const headingId = React.useId();

  return (
    <TooltipProvider delayDuration={150} skipDelayDuration={400}>
      <div className={cn("w-full space-y-6", className)}>
        <div role="status" className={cn("flex items-center gap-3 rounded-xl border p-4", overall.className)}>
          <OverallIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="flex-1 text-sm font-semibold">{overall.label}</p>
          {lastUpdated && <p className="hidden text-xs text-muted-foreground sm:block">Updated {formatDateTime(lastUpdated)}</p>}
        </div>

        <section aria-labelledby={`${headingId}-services`} className="rounded-xl border border-border bg-card text-card-foreground">
          <h3 id={`${headingId}-services`} className="border-b border-border px-4 py-3 text-sm font-semibold">
            Services
          </h3>
          {services.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">No services configured.</p>
          ) : (
            <ul className="divide-y divide-border">
              {services.map((service) => {
                const statusLabel = serviceStatusLabel[service.status];
                return (
                  <li key={service.id} className="space-y-3 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{service.name}</p>
                        {service.description && <p className="truncate text-xs text-muted-foreground">{service.description}</p>}
                      </div>
                      <span className={cn("shrink-0 text-xs font-medium", statusLabel.className)}>{statusLabel.label}</span>
                    </div>
                    <UptimeBar service={service} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby={`${headingId}-incidents`}>
          <h3 id={`${headingId}-incidents`} className="mb-3 text-sm font-semibold">
            Recent incidents
          </h3>
          {incidents.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
              No incidents reported in the last 90 days.
            </p>
          ) : (
            <ul className="space-y-2">
              {incidents.map((incident) => (
                <li key={incident.id} className="rounded-xl border border-border bg-card p-4 text-card-foreground">
                  <div className="flex flex-wrap items-center gap-2">
                    <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", impactDot[incident.impact])} />
                    <p className="min-w-0 flex-1 text-sm font-medium">
                      {incident.title}
                      <span className="sr-only"> ({incident.impact} impact)</span>
                    </p>
                    <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize", incidentStatusStyle[incident.status])}>
                      {incident.status}
                    </span>
                  </div>
                  {incident.latestUpdate && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{incident.latestUpdate}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">
                    <time dateTime={incident.startedAt}>{formatDateTime(incident.startedAt)}</time>
                    {incident.resolvedAt ? (
                      <>
                        {" – "}
                        <time dateTime={incident.resolvedAt}>{formatDateTime(incident.resolvedAt)}</time>
                      </>
                    ) : (
                      " – ongoing"
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </TooltipProvider>
  );
}
