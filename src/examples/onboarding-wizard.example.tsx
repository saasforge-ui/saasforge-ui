import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingWizard } from "@/components/saas/auth/onboarding-wizard";

export default function Example() {
  return (
    <OnboardingWizard
      onComplete={() => console.log("onboarding complete")}
      steps={[
        {
          id: "workspace",
          title: "Create your workspace",
          description: "This is what your team will see.",
          content: (
            <div className="space-y-1.5">
              <Label htmlFor="onboarding-workspace-name">Workspace name</Label>
              <Input id="onboarding-workspace-name" placeholder="Acme Technologies" />
            </div>
          ),
        },
        {
          id: "invite",
          title: "Invite your team",
          description: "You can always invite more people later.",
          content: (
            <div className="space-y-1.5">
              <Label htmlFor="onboarding-invite-emails">Emails</Label>
              <Input id="onboarding-invite-emails" placeholder="teammate@company.com" />
            </div>
          ),
        },
        {
          id: "done",
          title: "You're all set",
          description: "Your workspace is ready to go.",
          content: <p className="text-sm text-muted-foreground">Click finish to head to your new dashboard.</p>,
        },
      ]}
    />
  );
}
