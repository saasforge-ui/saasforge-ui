import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepperWizardNav, type StepperStep } from "@/components/saas/navigation/stepper-wizard-nav";
import { SignupForm, type SignupFormValues } from "@/components/saas/auth/signup-form";
import { ValidatedFormWizard, type ValidatedFormWizardValues } from "@/components/saas/forms/validated-form-wizard";
import { OnboardingWizard } from "@/components/saas/auth/onboarding-wizard";
import { FileUploadDropzone } from "@/components/saas/forms/file-upload-dropzone";
import { EmptyState } from "@/components/saas/utilities/empty-state";

const pageSteps: StepperStep[] = [
  { id: "account", label: "Create account" },
  { id: "workspace", label: "Workspace" },
  { id: "team", label: "Invite team" },
  { id: "done", label: "All set" },
];

/**
 * Onboarding Flow — a full-page template composed entirely from existing
 * SaaSForge UI Pro components. A centered, sidebar-less first-run flow:
 * Stepper Wizard Nav tracks overall progress, Signup Form creates the
 * account, Validated Form Wizard collects workspace details, Onboarding
 * Wizard (wrapping File Upload Dropzone and Empty State) handles branding
 * and team invites.
 */
export default function OnboardingFlowTemplate() {
  const [pageStep, setPageStep] = React.useState(0);
  const [accountName, setAccountName] = React.useState<string | null>(null);

  function handleSignup(values: SignupFormValues) {
    console.log("account created", values);
    setAccountName(values.name);
    setPageStep(1);
  }

  function handleWorkspaceSubmit(values: ValidatedFormWizardValues) {
    console.log("workspace details submitted", values);
    setPageStep(2);
  }

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-tight">Welcome to Acme</h1>
          <p className="mt-1 text-sm text-muted-foreground">Let's get your workspace set up in a few quick steps.</p>
        </div>

        <StepperWizardNav
          steps={pageSteps}
          currentStep={pageStep}
          onStepClick={(index) => setPageStep(index)}
        />

        <div className="flex justify-center">
          {pageStep === 0 && <SignupForm onSubmit={handleSignup} className="max-w-md" />}

          {pageStep === 1 && (
            <ValidatedFormWizard onSubmit={handleWorkspaceSubmit} className="max-w-md" />
          )}

          {pageStep === 2 && (
            <OnboardingWizard
              className="max-w-md"
              onComplete={() => setPageStep(3)}
              steps={[
                {
                  id: "branding",
                  title: "Add your logo",
                  description: "Upload a square logo so teammates recognize your workspace.",
                  content: <FileUploadDropzone accept="image/*" maxSizeMB={2} multiple={false} />,
                },
                {
                  id: "team",
                  title: "Invite your team",
                  description: "You can always invite more teammates later from Settings.",
                  content: (
                    <EmptyState
                      title="No teammates invited yet"
                      description="Invite colleagues to collaborate on this workspace."
                      primaryAction={{ label: "Invite teammates", onClick: () => console.log("invite teammates") }}
                      secondaryAction={{ label: "Skip for now", onClick: () => console.log("skip invites") }}
                    />
                  ),
                },
              ]}
            />
          )}

          {pageStep === 3 && (
            <div className="w-full max-w-md space-y-4 rounded-lg border border-success/30 bg-success/10 p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">You're all set{accountName ? `, ${accountName.split(" ")[0]}` : ""}!</p>
                <p className="mt-1 text-sm text-muted-foreground">Your workspace is ready. Head to your dashboard to get started.</p>
              </div>
              <Button className="w-full" onClick={() => console.log("go to dashboard")}>
                Go to dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
