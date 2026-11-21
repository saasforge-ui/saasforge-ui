import { DynamicFieldArrayForm } from "@/components/saas/forms/dynamic-field-array-form";

export default function Example() {
  return <DynamicFieldArrayForm onSubmit={(invites) => console.log("invites sent", invites)} />;
}
