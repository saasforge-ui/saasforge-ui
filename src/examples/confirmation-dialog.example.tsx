import * as React from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog, type ConfirmationDialogVariant } from "@/components/free/confirmation-dialog";

const dialogsByVariant: Record<
  ConfirmationDialogVariant,
  { trigger: string; triggerVariant: "destructive" | "outline"; title: string; description: string; confirmLabel: string }
> = {
  destructive: {
    trigger: "Delete project",
    triggerVariant: "destructive",
    title: "Delete project?",
    description: "This action cannot be undone.",
    confirmLabel: "Delete",
  },
  warning: {
    trigger: "Downgrade plan",
    triggerVariant: "outline",
    title: "Downgrade to Free plan?",
    description: "You'll lose access to Pro features at the end of your billing period.",
    confirmLabel: "Downgrade",
  },
  information: {
    trigger: "Sign out",
    triggerVariant: "outline",
    title: "Sign out of your account?",
    description: "You can log back in at any time.",
    confirmLabel: "Sign out",
  },
};

export default function Example() {
  const [openVariant, setOpenVariant] = React.useState<ConfirmationDialogVariant | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.keys(dialogsByVariant) as ConfirmationDialogVariant[]).map((variant) => {
        const config = dialogsByVariant[variant];
        return (
          <Button key={variant} variant={config.triggerVariant} onClick={() => setOpenVariant(variant)}>
            {config.trigger}
          </Button>
        );
      })}

      {openVariant && (
        <ConfirmationDialog
          open={openVariant !== null}
          onOpenChange={(open) => !open && setOpenVariant(null)}
          variant={openVariant}
          title={dialogsByVariant[openVariant].title}
          description={dialogsByVariant[openVariant].description}
          confirmLabel={dialogsByVariant[openVariant].confirmLabel}
          onConfirm={() => setOpenVariant(null)}
        />
      )}
    </div>
  );
}
