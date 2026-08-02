import * as React from "react";
import { TabBarOverflow } from "@/components/free/tab-bar-overflow";

export default function Example() {
  const [activeTabId, setActiveTabId] = React.useState("overview");

  return (
    <TabBarOverflow
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      maxVisible={3}
      tabs={[
        { id: "overview", label: "Overview" },
        { id: "members", label: "Members" },
        { id: "billing", label: "Billing" },
        { id: "integrations", label: "Integrations" },
        { id: "webhooks", label: "Webhooks" },
        { id: "audit-log", label: "Audit log" },
      ]}
    />
  );
}
