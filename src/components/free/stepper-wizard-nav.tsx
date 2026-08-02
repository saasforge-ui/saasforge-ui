import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperWizardNavProps {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function StepperWizardNav({ steps, currentStep, onStepClick, className }: StepperWizardNavProps) {
  return (
    <ol className={cn("flex w-full items-center", className)} aria-label="Progress">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && index < currentStep;

        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              {isClickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                    "bg-success text-success-foreground",
                  )}
                >
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                    isComplete && "bg-success text-success-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isComplete && !isCurrent && "bg-muted text-muted-foreground",
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                </span>
              )}
              <span className={cn("text-xs", isCurrent ? "font-medium text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className={cn("mx-2 h-px flex-1 translate-y-[-0.75rem]", isComplete ? "bg-success" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
