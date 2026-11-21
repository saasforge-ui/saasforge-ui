import { ValidatedFormWizard } from "@/components/saas/forms/validated-form-wizard";

export default function Example() {
  return <ValidatedFormWizard onSubmit={(values) => console.log("submitted", values)} />;
}
