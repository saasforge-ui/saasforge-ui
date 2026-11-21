import * as React from "react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/saas/navigation/command-palette";

export default function Example() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={[
          { id: "new-project", label: "Create new project", shortcut: "⌘N", onRun: () => console.log("new project") },
          { id: "invite", label: "Invite team member", onRun: () => console.log("invite") },
          { id: "settings", label: "Go to settings", shortcut: "⌘,", onRun: () => console.log("settings") },
          { id: "logout", label: "Log out", onRun: () => console.log("logout") },
        ]}
      />
    </>
  );
}
