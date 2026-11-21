import * as React from "react";
import { LayoutGroup } from "framer-motion";
import { AlertCircle, Loader2, Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HeaderRow {
  id: string;
  key: string;
  value: string;
}

export interface ApiRequest {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface ApiResponse {
  status: number;
  statusText?: string;
  body: unknown;
  /** If omitted, latency is measured around `onSend`. */
  durationMs?: number;
}

export interface ApiRequestPlaygroundProps {
  onSend: (request: ApiRequest) => Promise<ApiResponse>;
  defaultMethod?: HttpMethod;
  defaultUrl?: string;
  defaultHeaders?: { key: string; value: string }[];
  defaultBody?: string;
  className?: string;
}

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const BODYLESS: HttpMethod[] = ["GET", "DELETE"];

const methodColor: Record<HttpMethod, string> = {
  GET: "text-success",
  POST: "text-sky-600 dark:text-sky-400",
  PUT: "text-amber-600 dark:text-amber-400",
  PATCH: "text-violet-600 dark:text-violet-400",
  DELETE: "text-destructive",
};

const STATUS_TEXT: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  301: "Moved Permanently",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
};

function statusTone(status: number) {
  if (status >= 500) return "border-destructive/30 bg-destructive/10 text-destructive";
  if (status >= 400) return "border-warning/40 bg-warning/15 text-amber-700 dark:text-warning";
  if (status >= 300) return "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400";
  return "border-success/30 bg-success/10 text-success";
}

function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function formatBody(body: unknown) {
  if (body === undefined || body === null || body === "") return "";
  if (typeof body === "string") {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      return body;
    }
  }
  return JSON.stringify(body, null, 2);
}

let rowCounter = 0;
const newRow = (key = "", value = ""): HeaderRow => ({ id: `hdr-${++rowCounter}`, key, value });

type ResponseState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; response: ApiResponse; durationMs: number; size: number };

export function ApiRequestPlayground({
  onSend,
  defaultMethod = "GET",
  defaultUrl = "",
  defaultHeaders = [{ key: "Content-Type", value: "application/json" }],
  defaultBody = "",
  className,
}: ApiRequestPlaygroundProps) {
  const [method, setMethod] = React.useState<HttpMethod>(defaultMethod);
  const [url, setUrl] = React.useState(defaultUrl);
  const [headers, setHeaders] = React.useState<HeaderRow[]>(() => defaultHeaders.map((h) => newRow(h.key, h.value)));
  const [body, setBody] = React.useState(defaultBody);
  const [tab, setTab] = React.useState("headers");
  const [state, setState] = React.useState<ResponseState>({ kind: "idle" });
  const requestIdRef = React.useRef(0);
  const groupId = React.useId();
  const urlId = React.useId();

  const hasBody = !BODYLESS.includes(method);
  const bodyError = React.useMemo(() => {
    if (!hasBody || !body.trim()) return null;
    try {
      JSON.parse(body);
      return null;
    } catch {
      return "Body is not valid JSON.";
    }
  }, [body, hasBody]);

  const urlValid = isValidUrl(url.trim());
  const isLoading = state.kind === "loading";
  const canSend = urlValid && !isLoading && !bodyError;
  const activeHeaderCount = headers.filter((h) => h.key.trim()).length;

  const send = async () => {
    if (!canSend) return;
    const requestId = ++requestIdRef.current;
    const request: ApiRequest = {
      method,
      url: url.trim(),
      headers: Object.fromEntries(headers.filter((h) => h.key.trim()).map((h) => [h.key.trim(), h.value])),
      body: hasBody && body.trim() ? body : undefined,
    };
    setState({ kind: "loading" });
    const started = performance.now();
    try {
      const response = await onSend(request);
      if (requestId !== requestIdRef.current) return;
      const formatted = formatBody(response.body);
      setState({
        kind: "success",
        response,
        durationMs: response.durationMs ?? Math.round(performance.now() - started),
        size: new Blob([formatted]).size,
      });
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setState({ kind: "error", message: err instanceof Error ? err.message : "Request failed." });
    }
  };

  const updateHeader = (id: string, patch: Partial<HeaderRow>) =>
    setHeaders((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const formatRequestBody = () => {
    try {
      setBody(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      // leave as-is; the inline error explains why
    }
  };

  return (
    <LayoutGroup id={groupId}>
      <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
          className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row"
        >
          <Select value={method} onValueChange={(value) => setMethod(value as HttpMethod)}>
            <SelectTrigger aria-label="HTTP method" className={cn("w-full font-mono text-xs font-semibold sm:w-28", methodColor[method])}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {METHODS.map((m) => (
                <SelectItem key={m} value={m} className={cn("font-mono text-xs font-semibold", methodColor[m])}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label htmlFor={urlId} className="sr-only">
            Request URL
          </label>
          <Input
            id={urlId}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                void send();
              }
            }}
            placeholder="https://api.example.com/v1/resource"
            spellCheck={false}
            autoComplete="off"
            aria-invalid={url.trim().length > 0 && !urlValid}
            className="flex-1 font-mono text-xs aria-invalid:border-destructive"
          />
          <Button type="submit" disabled={!canSend} className="sm:w-28">
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            {isLoading ? "Sending" : "Send"}
          </Button>
        </form>

        <Tabs value={tab} onValueChange={setTab} className="border-b border-border px-3 pb-3 pt-2">
          <TabsList aria-label="Request options" className="h-8">
            <TabsTrigger value="headers" className="text-xs">
              Headers
              {activeHeaderCount > 0 && <span className="ml-1.5 tabular-nums text-muted-foreground">{activeHeaderCount}</span>}
            </TabsTrigger>
            <TabsTrigger value="body" className="text-xs">
              Body
            </TabsTrigger>
          </TabsList>

          <TabsContent value="headers" className="mt-3 space-y-2">
            {headers.length === 0 && <p className="text-xs text-muted-foreground">No headers. Add one below.</p>}
            {headers.map((row, index) => (
              <div key={row.id} className="flex items-center gap-2 animate-in fade-in-0 duration-150 ease-out-strong">
                <Input
                  value={row.key}
                  onChange={(event) => updateHeader(row.id, { key: event.target.value })}
                  placeholder="Header"
                  aria-label={`Header ${index + 1} name`}
                  spellCheck={false}
                  className="h-8 flex-1 font-mono text-xs"
                />
                <Input
                  value={row.value}
                  onChange={(event) => updateHeader(row.id, { value: event.target.value })}
                  placeholder="Value"
                  aria-label={`Header ${index + 1} value`}
                  spellCheck={false}
                  className="h-8 flex-[1.4] font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setHeaders((prev) => prev.filter((h) => h.id !== row.id))}
                  aria-label={`Remove header ${row.key || index + 1}`}
                  className="h-8 w-8 shrink-0 text-muted-foreground"
                >
                  <X />
                </Button>
              </div>
            ))}
            <Button type="button" variant="ghost" size="sm" onClick={() => setHeaders((prev) => [...prev, newRow()])} className="text-muted-foreground">
              <Plus />
              Add header
            </Button>
          </TabsContent>

          <TabsContent value="body" className="mt-3">
            {hasBody ? (
              <div className="space-y-2">
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  aria-label="Request body"
                  aria-invalid={Boolean(bodyError)}
                  spellCheck={false}
                  rows={6}
                  placeholder='{ "name": "Acme" }'
                  className="scrollbar-thin block w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-mono text-xs leading-5 outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                />
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-xs", bodyError ? "text-destructive" : "text-muted-foreground")} role={bodyError ? "alert" : undefined}>
                    {bodyError ?? "JSON body"}
                  </p>
                  <Button type="button" variant="ghost" size="sm" onClick={formatRequestBody} disabled={!body.trim() || Boolean(bodyError)}>
                    Format
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">{method} requests don't send a body.</p>
            )}
          </TabsContent>
        </Tabs>

        <section aria-label="Response" aria-busy={isLoading} className="p-3">
          <div className="mb-2 flex min-h-6 items-center gap-2">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Response</h3>
            {state.kind === "success" && (
              <div className="ml-auto flex items-center gap-2 text-xs animate-in fade-in-0 duration-150 ease-out-strong">
                <span className={cn("rounded-full border px-2 py-0.5 font-mono font-semibold", statusTone(state.response.status))}>
                  {state.response.status} {state.response.statusText ?? STATUS_TEXT[state.response.status] ?? ""}
                </span>
                <span className="tabular-nums text-muted-foreground">{state.durationMs} ms</span>
                <span className="hidden tabular-nums text-muted-foreground sm:inline">
                  {state.size < 1024 ? `${state.size} B` : `${(state.size / 1024).toFixed(1)} KB`}
                </span>
              </div>
            )}
          </div>

          {state.kind === "idle" && (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
              Send a request to see the response.
            </div>
          )}
          {state.kind === "loading" && (
            <div className="space-y-2 rounded-md border border-border p-3" aria-label="Loading response">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          )}
          {state.kind === "error" && (
            <div role="alert" className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs">
              <AlertCircle className="mt-px h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-medium text-destructive">Request failed</p>
                <p className="mt-0.5 break-words text-foreground">{state.message}</p>
              </div>
            </div>
          )}
          {state.kind === "success" && (
            <pre
              tabIndex={0}
              aria-label="Response body"
              className="scrollbar-thin max-h-80 overflow-auto rounded-md border border-border bg-muted/50 p-3 font-mono text-xs leading-5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {formatBody(state.response.body) || <span className="text-muted-foreground">(empty body)</span>}
            </pre>
          )}
        </section>
      </div>
    </LayoutGroup>
  );
}
