import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardPaste, Eye, EyeOff, Loader2, Lock, LockOpen, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface EnvVariable {
  key: string;
  value: string;
  /** Secret values are masked until revealed. */
  secret?: boolean;
}

export interface EnvVariablesEditorProps {
  environments?: string[];
  defaultEnvironment?: string;
  /** Saved variables per environment name. */
  initialValues?: Record<string, EnvVariable[]>;
  onSave?: (environment: string, variables: EnvVariable[]) => Promise<void> | void;
  className?: string;
}

interface Row extends EnvVariable {
  id: string;
}

const KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const DEFAULT_ENVIRONMENTS = ["Development", "Preview", "Production"];

let rowCounter = 0;
const toRow = (variable: EnvVariable): Row => ({ id: `env-${++rowCounter}`, key: variable.key, value: variable.value, secret: variable.secret ?? false });
const emptyRow = () => toRow({ key: "", value: "", secret: false });

/** Parses `.env` text: skips blanks/comments, strips `export`, quotes and trailing inline comments. */
function parseDotEnv(text: string): EnvVariable[] {
  const result: EnvVariable[] = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = /^(?:export\s+)?([^=\s]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.endsWith(quote) && value.length >= 2) {
      value = value.slice(1, -1);
      if (quote === '"') value = value.replace(/\\n/g, "\n");
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    result.push({ key: match[1], value });
  }
  return result;
}

function looksLikeDotEnv(text: string) {
  return /^\s*(?:export\s+)?[A-Za-z_][A-Za-z0-9_]*\s*=/m.test(text) && (text.includes("\n") || text.includes("="));
}

function isBlank(row: EnvVariable) {
  return !row.key.trim() && !row.value;
}

function serialize(rows: EnvVariable[]) {
  return JSON.stringify(rows.filter((row) => !isBlank(row)).map((row) => [row.key.trim(), row.value, Boolean(row.secret)]));
}

function validate(rows: Row[]) {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    const key = row.key.trim();
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  const errors: Record<string, string> = {};
  rows.forEach((row) => {
    if (isBlank(row)) return;
    const key = row.key.trim();
    if (!key) errors[row.id] = "Key is required.";
    else if (!KEY_PATTERN.test(key)) errors[row.id] = "Use letters, digits and underscores; don't start with a digit.";
    else if ((counts.get(key) ?? 0) > 1) errors[row.id] = `Duplicate key "${key}".`;
  });
  return errors;
}

const iconButton =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]";

export function EnvVariablesEditor({
  environments = DEFAULT_ENVIRONMENTS,
  defaultEnvironment,
  initialValues = {},
  onSave,
  className,
}: EnvVariablesEditorProps) {
  const [environment, setEnvironment] = React.useState(defaultEnvironment ?? environments[0]);
  const [saved, setSaved] = React.useState<Record<string, Row[]>>(() =>
    Object.fromEntries(environments.map((env) => [env, (initialValues[env] ?? []).map(toRow)])),
  );
  // Drafts are kept per environment so switching tabs never loses unsaved edits.
  const [drafts, setDrafts] = React.useState<Record<string, Row[]>>(() =>
    Object.fromEntries(environments.map((env) => [env, saved[env].length ? saved[env].map((row) => ({ ...row })) : [emptyRow()]])),
  );
  const [revealed, setRevealed] = React.useState<Set<string>>(() => new Set());
  const [showImport, setShowImport] = React.useState(false);
  const [importText, setImportText] = React.useState("");
  const [notice, setNotice] = React.useState("");
  const [saveState, setSaveState] = React.useState<"idle" | "saving" | "saved" | "error">("idle");
  const focusRowRef = React.useRef<string | null>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const importId = React.useId();
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(savedTimer.current), []);

  const rows = drafts[environment] ?? [];
  const errors = validate(rows);
  const hasErrors = Object.keys(errors).length > 0;
  const isDirtyEnv = (env: string) => serialize(drafts[env] ?? []) !== serialize(saved[env] ?? []);
  const isDirty = isDirtyEnv(environment);
  const canSave = isDirty && !hasErrors && saveState !== "saving";

  React.useEffect(() => {
    if (!focusRowRef.current) return;
    listRef.current?.querySelector<HTMLInputElement>(`[data-row-key="${focusRowRef.current}"]`)?.focus();
    focusRowRef.current = null;
  });

  const setRows = (updater: (rows: Row[]) => Row[]) => {
    setDrafts((prev) => ({ ...prev, [environment]: updater(prev[environment] ?? []) }));
    if (saveState === "saved" || saveState === "error") setSaveState("idle");
  };

  const updateRow = (id: string, patch: Partial<Row>) => setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const addRow = () => {
    const row = emptyRow();
    focusRowRef.current = row.id;
    setRows((prev) => [...prev, row]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => {
      const next = prev.filter((row) => row.id !== id);
      return next.length ? next : [emptyRow()];
    });
  };

  const importVariables = (variables: EnvVariable[]) => {
    if (variables.length === 0) {
      setNotice("No KEY=value lines found.");
      return false;
    }
    // Merge synchronously from the current rows so the summary below reflects what actually changed.
    let updated = 0;
    const next = rows.filter((row) => !isBlank(row)).map((row) => ({ ...row }));
    for (const variable of variables) {
      const existing = next.find((row) => row.key.trim() === variable.key);
      if (existing) {
        existing.value = variable.value;
        updated += 1;
      } else {
        next.push(toRow({ ...variable, secret: /SECRET|TOKEN|KEY|PASSWORD/i.test(variable.key) }));
      }
    }
    setRows(() => next);
    const added = variables.length - updated;
    setNotice(`Imported ${variables.length} variable${variables.length === 1 ? "" : "s"}${updated ? ` (${added} added, ${updated} updated)` : ""}.`);
    return true;
  };

  const handleKeyPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData("text");
    if (!looksLikeDotEnv(text)) return;
    event.preventDefault();
    importVariables(parseDotEnv(text));
  };

  const save = async () => {
    if (!canSave) return;
    const variables = rows.filter((row) => !isBlank(row)).map((row) => ({ key: row.key.trim(), value: row.value, secret: Boolean(row.secret) }));
    setSaveState("saving");
    try {
      await onSave?.(environment, variables);
      setSaved((prev) => ({ ...prev, [environment]: rows.filter((row) => !isBlank(row)).map((row) => ({ ...row, key: row.key.trim() })) }));
      setSaveState("saved");
      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaveState((state) => (state === "saved" ? "idle" : state)), 2000);
    } catch {
      setSaveState("error");
    }
  };

  const discard = () => {
    setDrafts((prev) => ({ ...prev, [environment]: saved[environment].length ? saved[environment].map((row) => ({ ...row })) : [emptyRow()] }));
    setSaveState("idle");
    setNotice("");
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <Select
          value={environment}
          onValueChange={(env) => {
            setEnvironment(env);
            setNotice("");
            setSaveState("idle");
          }}
        >
          <SelectTrigger aria-label="Environment" className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {environments.map((env) => (
              <SelectItem key={env} value={env}>
                {env}
                {env !== environment && isDirtyEnv(env) && (
                  <>
                    <span aria-hidden="true" className="ml-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-warning" />
                    <span className="sr-only"> (unsaved changes)</span>
                  </>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">
          {rows.filter((row) => !isBlank(row)).length} variable{rows.filter((row) => !isBlank(row)).length === 1 ? "" : "s"}
        </span>
        <Button type="button" variant="ghost" size="sm" className="ml-auto text-muted-foreground" aria-expanded={showImport} onClick={() => setShowImport((open) => !open)}>
          <ClipboardPaste />
          Paste .env
        </Button>
      </div>

      {showImport && (
        <div className="space-y-2 border-b border-border bg-muted/30 p-3 animate-in fade-in-0 duration-150 ease-out-strong">
          <label htmlFor={importId} className="text-xs font-medium">
            Paste the contents of a .env file
          </label>
          <textarea
            id={importId}
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            rows={4}
            spellCheck={false}
            placeholder={"DATABASE_URL=postgres://…\nSTRIPE_SECRET_KEY=sk_live_…"}
            className="scrollbar-thin block w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-mono text-xs leading-5 outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowImport(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!importText.trim()}
              onClick={() => {
                if (importVariables(parseDotEnv(importText))) {
                  setImportText("");
                  setShowImport(false);
                }
              }}
            >
              Import
            </Button>
          </div>
        </div>
      )}

      <div className="p-3">
        <div className="mb-1.5 hidden grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_7.25rem] gap-2 px-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:grid">
          <span>Key</span>
          <span>Value</span>
          <span className="sr-only">Actions</span>
        </div>
        <ul ref={listRef} className="space-y-2">
          <AnimatePresence initial={false}>
            {rows.map((row, index) => {
              const error = errors[row.id];
              const isRevealed = revealed.has(row.id);
              const masked = row.secret && !isRevealed;
              const label = row.key.trim() || `variable ${index + 1}`;
              return (
                <motion.li
                  key={row.id}
                  layout="position"
                  initial={{ opacity: 0, transform: "translateY(-4px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_7.25rem]">
                    <Input
                      data-row-key={row.id}
                      value={row.key}
                      onChange={(event) => updateRow(row.id, { key: event.target.value.replace(/\s/g, "_") })}
                      onPaste={handleKeyPaste}
                      placeholder="KEY_NAME"
                      aria-label={`Key ${index + 1}`}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${row.id}-error` : undefined}
                      spellCheck={false}
                      autoComplete="off"
                      className="col-span-2 font-mono text-xs aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive sm:col-span-1"
                    />
                    <Input
                      type={masked ? "password" : "text"}
                      value={row.value}
                      onChange={(event) => updateRow(row.id, { value: event.target.value })}
                      placeholder="value"
                      aria-label={`Value for ${label}`}
                      spellCheck={false}
                      autoComplete="off"
                      data-1p-ignore
                      data-lpignore="true"
                      className="font-mono text-xs"
                    />
                    <div className="flex items-center justify-end">
                      {row.secret ? (
                        <button
                          type="button"
                          onClick={() =>
                            setRevealed((prev) => {
                              const next = new Set(prev);
                              if (next.has(row.id)) next.delete(row.id);
                              else next.add(row.id);
                              return next;
                            })
                          }
                          aria-label={isRevealed ? `Hide value for ${label}` : `Show value for ${label}`}
                          aria-pressed={isRevealed}
                          className={iconButton}
                        >
                          {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      ) : (
                        <span className="w-9" aria-hidden="true" />
                      )}
                      <button
                        type="button"
                        onClick={() => updateRow(row.id, { secret: !row.secret })}
                        aria-label={row.secret ? `Mark ${label} as plain text` : `Mark ${label} as secret`}
                        aria-pressed={Boolean(row.secret)}
                        className={cn(iconButton, row.secret && "text-foreground")}
                      >
                        {row.secret ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                      </button>
                      <button type="button" onClick={() => removeRow(row.id)} aria-label={`Remove ${label}`} className={cn(iconButton, "hover:text-destructive")}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {error && (
                    <p id={`${row.id}-error`} className="mt-1 px-0.5 text-xs text-destructive">
                      {error}
                    </p>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={addRow} className="text-muted-foreground">
            <Plus />
            Add variable
          </Button>
          <p role="status" className="text-xs text-muted-foreground">
            {notice}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/30 px-3 py-2.5">
        <p className="mr-auto text-xs" role={saveState === "error" ? "alert" : "status"}>
          {saveState === "error" ? (
            <span className="text-destructive">Couldn't save changes. Try again.</span>
          ) : saveState === "saved" ? (
            <span className="inline-flex items-center gap-1 text-success">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Saved to {environment}
            </span>
          ) : isDirty ? (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warning" />
              Unsaved changes
            </span>
          ) : null}
        </p>
        {isDirty && saveState !== "saving" && (
          <Button type="button" variant="ghost" size="sm" onClick={discard}>
            Discard
          </Button>
        )}
        <Button type="button" size="sm" onClick={() => void save()} disabled={!canSave}>
          {saveState === "saving" && <Loader2 className="animate-spin" />}
          {saveState === "saving" ? "Saving" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
