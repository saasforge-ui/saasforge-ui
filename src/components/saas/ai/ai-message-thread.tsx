import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, Copy, RotateCw, ThumbsDown, Bot, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageFeedback = "up" | "down" | null;

export interface ThreadMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Only meaningful on the last assistant message: shows a caret and hides actions. */
  isStreaming?: boolean;
  feedback?: MessageFeedback;
}

export interface AiMessageThreadProps {
  messages: ThreadMessage[];
  onRegenerate?: (messageId: string) => void;
  onFeedback?: (messageId: string, feedback: MessageFeedback) => void;
  onCopy?: (messageId: string) => void;
  assistantName?: string;
  emptyState?: React.ReactNode;
  className?: string;
}

/** Distance from the bottom (px) within which new content keeps the view pinned. */
const NEAR_BOTTOM_PX = 80;
const COPIED_MS = 1600;

const iconButton =
  "relative inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

function CopyAction({ text, onCopied }: { text: string; onCopied?: () => void }) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    onCopied?.();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <button type="button" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy message"} className={iconButton}>
      <Copy
        aria-hidden="true"
        className={cn("absolute h-3.5 w-3.5 transition-[opacity,filter,scale] duration-200 ease-out-strong", copied && "scale-90 opacity-0 blur-[2px]")}
      />
      <Check
        aria-hidden="true"
        className={cn(
          "absolute h-3.5 w-3.5 text-success transition-[opacity,filter,scale] duration-200 ease-out-strong",
          !copied && "scale-90 opacity-0 blur-[2px]",
        )}
      />
    </button>
  );
}

export function AiMessageThread({
  messages,
  onRegenerate,
  onFeedback,
  onCopy,
  assistantName = "Assistant",
  emptyState,
  className,
}: AiMessageThreadProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isNearBottomRef = React.useRef(true);
  const [showJump, setShowJump] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Record<string, MessageFeedback>>(() =>
    Object.fromEntries(messages.filter((m) => m.feedback).map((m) => [m.id, m.feedback ?? null])),
  );

  const isStreaming = messages.some((message) => message.isStreaming);
  const lastAssistantId = [...messages].reverse().find((message) => message.role === "assistant")?.id;
  // Concatenated content so streaming token updates (same ids, longer text) also trigger the pin effect.
  const contentKey = messages.map((message) => `${message.id}:${message.content.length}`).join("|");

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "auto") => {
    const el = scrollRef.current;
    if (!el) return;
    if (typeof el.scrollTo === "function") el.scrollTo({ top: el.scrollHeight, behavior });
    else el.scrollTop = el.scrollHeight;
  }, []);

  // Only follow new content if the reader is already near the bottom — never yank them away from what they're reading.
  React.useLayoutEffect(() => {
    if (isNearBottomRef.current) scrollToBottom();
    else setShowJump(true);
  }, [contentKey, scrollToBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX;
    isNearBottomRef.current = nearBottom;
    if (nearBottom) setShowJump(false);
  };

  const toggleFeedback = (id: string, value: "up" | "down") => {
    const next = feedback[id] === value ? null : value;
    setFeedback((prev) => ({ ...prev, [id]: next }));
    onFeedback?.(id, next);
  };

  return (
    <div className={cn("relative flex h-[28rem] w-full flex-col overflow-hidden rounded-xl border border-border bg-background", className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        // aria-busy holds screen-reader announcements until a streamed reply is complete, instead of reading every token.
        aria-busy={isStreaming}
        className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            {emptyState ?? "No messages yet. Ask something to get started."}
          </div>
        ) : (
          <ol className="space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isUser = message.role === "user";
                const isLastAssistant = message.id === lastAssistantId;
                const value = feedback[message.id] ?? null;
                return (
                  <motion.li
                    key={message.id}
                    initial={{ opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                    className={cn("group flex gap-3", isUser && "justify-end")}
                  >
                    {!isUser && (
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-foreground"
                      >
                        <Bot className="h-3.5 w-3.5" />
                      </span>
                    )}

                    <div className={cn("min-w-0", isUser ? "max-w-[80%]" : "flex-1")}>
                      <span className="sr-only">{isUser ? "You" : assistantName}:</span>
                      <div
                        className={cn(
                          "whitespace-pre-wrap break-words text-sm leading-relaxed",
                          isUser ? "rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-primary-foreground" : "pt-1 text-foreground",
                        )}
                      >
                        {message.content}
                        {message.isStreaming && (
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] rounded-full bg-foreground animate-caret-blink"
                          />
                        )}
                      </div>

                      {!isUser && !message.isStreaming && (
                        <div
                          className={cn(
                            "mt-1.5 flex items-center gap-0.5 transition-opacity duration-150 ease-out-strong",
                            // Revealed on hover/focus for older messages; always visible on the latest reply and on touch screens.
                            !isLastAssistant &&
                              "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100",
                          )}
                        >
                          <CopyAction text={message.content} onCopied={() => onCopy?.(message.id)} />
                          {onRegenerate && (
                            <button
                              type="button"
                              onClick={() => onRegenerate(message.id)}
                              disabled={isStreaming}
                              aria-label="Regenerate response"
                              className={iconButton}
                            >
                              <RotateCw className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleFeedback(message.id, "up")}
                            aria-label="Good response"
                            aria-pressed={value === "up"}
                            className={cn(iconButton, value === "up" && "text-foreground")}
                          >
                            <ThumbsUp className={cn("h-3.5 w-3.5", value === "up" && "fill-current")} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFeedback(message.id, "down")}
                            aria-label="Bad response"
                            aria-pressed={value === "down"}
                            className={cn(iconButton, value === "down" && "text-foreground")}
                          >
                            <ThumbsDown className={cn("h-3.5 w-3.5", value === "down" && "fill-current")} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          isNearBottomRef.current = true;
          setShowJump(false);
          scrollToBottom("smooth");
        }}
        tabIndex={showJump ? 0 : -1}
        aria-hidden={!showJump}
        aria-label="Scroll to latest message"
        className={cn(
          "absolute bottom-3 left-1/2 inline-flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-medium shadow-md outline-none transition-[opacity,translate,background-color,scale] duration-200 ease-out-strong hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]",
          showJump ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        Latest
      </button>
    </div>
  );
}
