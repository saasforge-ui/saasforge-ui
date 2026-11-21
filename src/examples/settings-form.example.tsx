import { SettingsForm } from "@/components/saas/settings/settings-form";

export default function Example() {
  return (
    <SettingsForm
      defaultValues={{
        name: "Sarah Chen",
        email: "sarah@acme.io",
        companyName: "Acme Technologies",
        website: "https://acme.io",
        language: "en",
        timezone: "UTC",
        emailNotifications: true,
      }}
      onSubmit={(values) => console.log("save", values)}
      onChangePassword={() => console.log("change password")}
      onEnableTwoFactor={() => console.log("enable 2fa")}
    />
  );
}
