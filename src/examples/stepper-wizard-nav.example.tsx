import { StepperWizardNav } from "@/components/free/stepper-wizard-nav";

export default function Example() {
  return (
    <StepperWizardNav
      currentStep={1}
      onStepClick={(index) => console.log("go to step", index)}
      steps={[
        { id: "account", label: "Account" },
        { id: "profile", label: "Profile" },
        { id: "confirm", label: "Confirm" },
      ]}
    />
  );
}
