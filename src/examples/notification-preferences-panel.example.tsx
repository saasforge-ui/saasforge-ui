import * as React from "react";
import { NotificationPreferencesPanel } from "@/components/saas/communication/notification-preferences-panel";

export default function Example() {
  const [preferences, setPreferences] = React.useState([
    { id: "billing", label: "Billing updates", description: "Invoices, payment failures", email: true, push: false },
    { id: "team", label: "Team activity", description: "New members, role changes", email: true, push: true },
    { id: "product", label: "Product updates", description: "New features and releases", email: false, push: false },
  ]);

  return (
    <NotificationPreferencesPanel
      preferences={preferences}
      onChange={(id, channel, value) =>
        setPreferences((prev) => prev.map((p) => (p.id === id ? { ...p, [channel]: value } : p)))
      }
    />
  );
}
