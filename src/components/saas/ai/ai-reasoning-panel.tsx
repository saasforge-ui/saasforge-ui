import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check, Circle, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type ReasoningStepStatus = "pending" | "active" | "done";

export interface ReasoningStep {
  id: string;
  label: string;
  detail?: string;
  /** Defaults to "done", or "active" for the last step while thinking. */
  status?: ReasoningStepStatus;
}

export interface AiReasoningPanelProps {
  steps: ReasoningStep[];
  isThinking: boolean;
  /** Final duration in seconds. If omitted it is measured from when `isThinking` turned on. */
  durationSeconds?: number;
  /** Collapse automatically when thinking finishes (unless the user toggled it). */
  autoCollapse?: boolean;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const ITEM_VALUE = "reasoning";

function useElapsedSeconds(isRunning: boolean) {
  const startRef = React.useRef<number | null>(isRunning ? Date.now() : null);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!isRunning) return;
    startRef.current = Date.now();
    setElapsed(0);
    const interval = setInterval(() => {
      if (startRef.current !== null) setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 250);
    return () => {
      clearInterval(interval);
      if (startRef.current !== null) setElapsed(Math.max(1, Math.round((Date.now() - startRef.current) / 1000)));
    };
  }, [isRunning]);

  return elapsed;
}

const statusIcon: Record<ReasoningStepStatus, React.ReactNode> = {
  done: <Check className="h-3 w-3" />,
  active: <Loader2 className="h-3 w-3 animate-spin" />,
  pending: <Circle className="h-2 w-2" />,
};

export function AiReasoningPanel({
  steps,
  isThinking,
  durationSeconds,
  autoCollapse = true,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: AiReasoningPanelProps) {
  const elapsed = useElapsedSeconds(isThinking);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? isThinking);
  const userToggledRef = React.useRef(false);
  const wasThinkingRef = React.useRef(isThinking);
  const isOpen = open ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  // Open while thinking starts; collapse when it finishes — unless the reader took control.
  React.useEffect(() => {
    if (isThinking && !wasThinkingRef.current) {
      userToggledRef.current = false;
      setOpen(true);
    }
    if (!isThinking && wasThinkingRef.current && autoCollapse && !userToggledRef.current) {
      setOpen(false);
    }
    wasThinkingRef.current = isThinking;
  }, [isThinking, autoCollapse, setOpen]);

  const seconds = durationSeconds ?? elapsed;
  const label = isThinking ? "Thinking…" : `Thought for ${Math.max(1, seconds)}s`;

  const resolvedSteps = steps.map((step, index) => ({
    ...step,
    status: step.status ?? (isThinking && index === steps.length - 1 ? "active" : "done"),
  }));

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? ITEM_VALUE : ""}
      onValueChange={(value) => {
        userToggledRef.current = true;
        setOpen(value === ITEM_VALUE);
      }}
      className={cn("w-full", className)}
    >
      <AccordionItem value={ITEM_VALUE} className="border-b-0">
        <AccordionTrigger className="w-auto flex-none justify-start gap-2 rounded-md py-1.5 pr-1.5 text-muted-foreground transition-colors hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="flex items-center gap-2">
            <Brain className={cn("h-4 w-4", isThinking && "animate-pulse text-foreground")} aria-hidden="true" />
            <span className={cn(isThinking && "text-foreground")}>{label}</span>
            {isThinking && (
              <span className="tabular-nums text-xs text-muted-foreground" aria-hidden="true">
                {elapsed}s
              </span>
            )}
          </span>
        </AccordionTrigger>
        {/* Announce only the transitions, not every timer tick. */}
        <span role="status" className="sr-only">
          {isThinking ? "Thinking" : `Finished thinking after ${Math.max(1, seconds)} seconds`}
        </span>
        <AccordionContent className="pb-1 pt-1">
          {resolvedSteps.length === 0 ? (
            <p className="border-l border-border pl-4 text-xs text-muted-foreground">Gathering thoughts…</p>
          ) : (
            <ol className="relative ml-2 space-y-3 border-l border-border pl-5">
              <AnimatePresence initial={false}>
                {resolvedSteps.map((step) => (
                  <motion.li
                    key={step.id}
                    initial={{ opacity: 0, transform: "translateY(-4px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="relative"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-[29px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-background transition-colors duration-200",
                        step.status === "done" && "border-success/40 text-success",
                        step.status === "active" && "border-ring text-foreground",
                        step.status === "pending" && "border-border text-muted-foreground",
                      )}
                    >
                      {statusIcon[step.status]}
                    </span>
                    <p
                      className={cn(
                        "text-sm transition-colors duration-200",
                        step.status === "pending" ? "text-muted-foreground" : "text-foreground",
                      )}
                    >
                      {step.label}
                      <span className="sr-only"> ({step.status})</span>
                    </p>
                    {step.detail && <p className="mt-0.5 break-words text-xs leading-relaxed text-muted-foreground">{step.detail}</p>}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
