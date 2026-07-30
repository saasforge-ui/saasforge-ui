import * as React from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/free/confirmation-dialog";

export default function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        variant="destructive"
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}
