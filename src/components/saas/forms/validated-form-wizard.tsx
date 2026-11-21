import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters."),
});

export type ValidatedFormWizardValues = z.infer<typeof formSchema>;

const steps = [
  { id: "account", label: "Account", fields: ["email", "companyName"] as const },
  { id: "profile", label: "Profile", fields: ["fullName", "jobTitle"] as const },
  { id: "review", label: "Review", fields: [] as const },
];

export interface ValidatedFormWizardProps {
  onSubmit?: (values: ValidatedFormWizardValues) => void;
  className?: string;
}

export function ValidatedFormWizard({ onSubmit, className }: ValidatedFormWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidatedFormWizardValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { email: "", companyName: "", fullName: "", jobTitle: "" },
  });

  const goNext = async () => {
    const fields = steps[currentStep].fields;
    const isValid = fields.length === 0 || (await trigger(fields));
    if (isValid) setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const submit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit?.(values);
  });

  const values = getValues();

  if (isSubmitted) {
    return (
      <div className={cn("w-full max-w-md space-y-2 rounded-lg border border-success/30 bg-success/10 p-6 text-center", className)}>
        <Check className="mx-auto h-6 w-6 text-success" />
        <p className="text-sm font-medium text-success">Account details submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md space-y-6", className)}>
      <ol className="flex w-full items-center" aria-label="Progress">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
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

      <form onSubmit={submit} noValidate className="space-y-4">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="wizard-email">Email</Label>
              <Input id="wizard-email" type="email" autoComplete="email" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wizard-company">Company name</Label>
              <Input id="wizard-company" {...register("companyName")} />
              {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="wizard-name">Full name</Label>
              <Input id="wizard-name" autoComplete="name" {...register("fullName")} />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wizard-title">Job title</Label>
              <Input id="wizard-title" {...register("jobTitle")} />
              {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle.message}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <dl className="space-y-2 rounded-md border border-border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{values.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Company name</dt>
              <dd className="font-medium">{values.companyName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Full name</dt>
              <dd className="font-medium">{values.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Job title</dt>
              <dd className="font-medium">{values.jobTitle}</dd>
            </div>
          </dl>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="outline" onClick={goBack} disabled={currentStep === 0}>
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={goNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
