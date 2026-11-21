import * as React from "react";
import { AiReasoningPanel } from "@/components/saas/ai/ai-reasoning-panel";
import type { ReasoningStep } from "@/components/saas/ai/ai-reasoning-panel";

const demoSteps: ReasoningStep[] = [
  { id: "s1", label: "Reading the question", detail: "The user wants to know why trial conversions dropped in October." },
  { id: "s2", label: "Querying the conversions table", detail: "Trial to paid fell from 14.2% to 11.8%, concentrated in the EU region." },
  { id: "s3", label: "Checking recent releases", detail: "v2.8 moved the billing step behind email verification on Oct 3." },
  { id: "s4", label: "Drafting the answer" },
];

export default function Example() {
  const [steps, setSteps] = React.useState<ReasoningStep[]>([]);
  const [isThinking, setIsThinking] = React.useState(true);
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    setSteps([]);
    setIsThinking(true);
    const timers = demoSteps.map((step, index) => setTimeout(() => setSteps((prev) => [...prev, step]), 400 + index * 1100));
    timers.push(setTimeout(() => setIsThinking(false), 400 + demoSteps.length * 1100));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <AiReasoningPanel steps={steps} isThinking={isThinking} />
      {!isThinking && (
        <p className="text-sm leading-relaxed">
          Conversions dipped because v2.8 added email verification before billing, and EU users on corporate mail often wait hours for it.
        </p>
      )}
      <button
        type="button"
        onClick={() => setRun((value) => value + 1)}
        disabled={isThinking}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium outline-none transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
      >
        Think again
      </button>
    </div>
  );
}
