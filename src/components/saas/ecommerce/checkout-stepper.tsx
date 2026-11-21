import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CheckoutStep {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface CheckoutStepperProps {
  steps: CheckoutStep[];
  currentStep?: number;
  onStepChange?: (index: number) => void;
  onComplete: () => void;
  isCompleting?: boolean;
  completeLabel?: string;
  className?: string;
}

export function CheckoutStepper({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  isCompleting = false,
  completeLabel = "Place order",
  className,
}: CheckoutStepperProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const activeStep = currentStep ?? internalStep;
  const isLastStep = activeStep === steps.length - 1;

  function goTo(index: number) {
    if (index < 0 || index >= steps.length) return;
    setInternalStep(index);
    onStepChange?.(index);
  }

  return (
    <div className={cn("w-full max-w-lg text-left", className)}>
      <ol className="mb-6 flex items-center">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isCurrent = index === activeStep;
          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                    isComplete && "bg-success text-success-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isComplete && !isCurrent && "bg-muted text-muted-foreground",
                  )}
                >
                  {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span className={cn("hidden text-sm sm:inline", isCurrent ? "font-medium" : "text-muted-foreground")}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span className={cn("mx-3 h-px flex-1", isComplete ? "bg-success" : "bg-border")} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="rounded-lg border border-border p-4">{steps[activeStep]?.content}</div>

      <div className="mt-4 flex justify-between gap-2">
        <Button type="button" variant="outline" onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0}>
          Back
        </Button>
        {isLastStep ? (
          <Button type="button" onClick={onComplete} disabled={isCompleting}>
            {isCompleting && <Loader2 className="h-4 w-4 animate-spin" />}
            {completeLabel}
          </Button>
        ) : (
          <Button type="button" onClick={() => goTo(activeStep + 1)}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
