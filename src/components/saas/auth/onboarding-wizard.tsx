import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export interface OnboardingWizardProps {
  steps: OnboardingStep[];
  currentStep?: number;
  onStepChange?: (index: number) => void;
  onComplete: () => void;
  isCompleting?: boolean;
  className?: string;
}

export function OnboardingWizard({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  isCompleting = false,
  className,
}: OnboardingWizardProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const activeStep = currentStep ?? internalStep;
  const step = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function goTo(index: number) {
    if (index < 0 || index >= steps.length) return;
    setInternalStep(index);
    onStepChange?.(index);
  }

  if (!step) return null;

  return (
    <Card className={cn("w-full max-w-lg text-left", className)}>
      <CardHeader>
        <div className="mb-2 flex items-center gap-2" aria-label={`Step ${activeStep + 1} of ${steps.length}`}>
          {steps.map((s, index) => (
            <span
              key={s.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index <= activeStep ? "bg-primary" : "bg-muted",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <CardTitle>{step.title}</CardTitle>
        {step.description && <CardDescription>{step.description}</CardDescription>}
      </CardHeader>
      <CardContent>{step.content}</CardContent>
      <CardFooter className="justify-between gap-2">
        <Button type="button" variant="outline" onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0}>
          Back
        </Button>
        {isLastStep ? (
          <Button type="button" onClick={onComplete} disabled={isCompleting}>
            {isCompleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Finish
          </Button>
        ) : (
          <Button type="button" onClick={() => goTo(activeStep + 1)}>
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
