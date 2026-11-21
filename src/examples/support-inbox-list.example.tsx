import * as React from "react";
import { SupportInboxList } from "@/components/saas/communication/support-inbox-list";

export default function Example() {
  const [selectedId, setSelectedId] = React.useState("conv_01");

  return (
    <SupportInboxList
      selectedId={selectedId}
      onSelect={setSelectedId}
      conversations={[
        { id: "conv_01", customerName: "Sarah Chen", lastMessage: "The export is still failing.", timestamp: "2026-07-30T09:00:00Z", unreadCount: 2, status: "open" },
        { id: "conv_02", customerName: "Marcus Webb", lastMessage: "Thanks for the quick fix!", timestamp: "2026-07-29T15:20:00Z", status: "pending" },
        { id: "conv_03", customerName: "Priya Nair", lastMessage: "Resolved, thank you.", timestamp: "2026-07-27T11:00:00Z", status: "closed" },
      ]}
    />
  );
}
