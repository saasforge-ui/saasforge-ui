import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Bot, CornerDownLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AiCommandAssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface AiCommandAssistantProps {
  /** Controls the overlay visibility. Omit to let the component manage its own open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prompt chips shown when the conversation is empty. */
  suggestedPrompts?: string[];
  /** Label for the built-in trigger button. Pass `null` to hide the trigger and drive `open` yourself. */
  triggerLabel?: string | null;
  /** Disable the global Cmd+K / Ctrl+K shortcut listener. */
  disableShortcut?: boolean;
  className?: string;
}

const DEFAULT_PROMPTS = [
  "What's our MRR this month?",
  "How many active users do we have?",
  "Show me churn for this quarter",
  "Any overdue invoices?",
];

/** Fully mocked, keyword-matched assistant reply. No network request is ever made. */
export function getAssistantReply(query: string): string {
  const q = query.toLowerCase();

  if (/(mrr|revenue|earn)/.test(q)) {
    return "Monthly recurring revenue is $48,210, up 12% from last month. Growth is your top plan at 61% of MRR.";
  }
  if (/(user|customer|signup)/.test(q)) {
    return "You have 2,834 active users, with 186 new signups in the last 7 days.";
  }
  if (/(churn|cancel)/.test(q)) {
    return "Churn is at 2.1% this quarter, down from 2.6% last quarter. 14 accounts cancelled in the last 30 days.";
  }
  if (/(invoice|overdue|payment)/.test(q)) {
    return "There are 3 overdue invoices totaling $1,240. The oldest is 9 days past due.";
  }
  if (/(help|what can you do)/.test(q)) {
    return "Ask me about revenue, users, churn, or invoices — I read from your workspace's live data.";
  }
  return "I don't have data on that yet, but I can help with revenue, users, churn, and invoices.";
}

function createMessage(role: AiCommandAssistantMessage["role"], content: string): AiCommandAssistantMessage {
  return { id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, role, content };
}

export function AiCommandAssistant({
  open,
  defaultOpen = false,
  onOpenChange,
  suggestedPrompts = DEFAULT_PROMPTS,
  triggerLabel = "Ask AI",
  disableShortcut = false,
  className,
}: AiCommandAssistantProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState<AiCommandAssistantMessage[]>([]);
  const [isThinking, setIsThinking] = React.useState(false);

  React.useEffect(() => {
    if (disableShortcut) return;
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disableShortcut, isOpen, setOpen]);

  function handleSubmit(value: string) {
    const trimmed = value.trim();
    if (!trimmed || isThinking) return;
    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
    setQuery("");
    setIsThinking(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, createMessage("assistant", getAssistantReply(trimmed))]);
      setIsThinking(false);
    }, 500);
  }

  return (
    <>
      {triggerLabel !== null && (
        <Button variant="outline" onClick={() => setOpen(true)} className={cn("gap-2", className)}>
          <Bot className="h-4 w-4" aria-hidden="true" />
          {triggerLabel}
          <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </Button>
      )}
      <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-24 z-50 flex w-full max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <DialogPrimitive.Title className="sr-only">AI command assistant</DialogPrimitive.Title>
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(query);
                }}
                placeholder="Ask about your app's data..."
                aria-label="Ask the AI assistant"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                Enter
              </kbd>
            </div>

            <div className="max-h-80 min-h-40 overflow-y-auto p-4" role="log" aria-live="polite">
              {messages.length === 0 ? (
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Bot className="h-3.5 w-3.5" aria-hidden="true" /> Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSubmit(prompt)}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground hover:bg-accent"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {messages.map((message) => (
                    <li
                      key={message.id}
                      className={cn("flex gap-2 text-sm", message.role === "user" && "flex-row-reverse text-right")}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium",
                          message.role === "assistant"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {message.role === "assistant" ? <Bot className="h-3.5 w-3.5" aria-hidden="true" /> : "You"}
                      </span>
                      <span
                        className={cn(
                          "rounded-lg px-3 py-2",
                          message.role === "assistant"
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground",
                        )}
                      >
                        {message.content}
                      </span>
                    </li>
                  ))}
                  {isThinking && (
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Bot className="h-3.5 w-3.5" aria-hidden="true" /> Thinking...
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
              <span>Simulated responses for demo purposes</span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" aria-hidden="true" /> to send
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
