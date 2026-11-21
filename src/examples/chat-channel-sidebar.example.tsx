import * as React from "react";
import { ChatChannelSidebar } from "@/components/saas/communication/chat-channel-sidebar";

export default function Example() {
  const [activeChannelId, setActiveChannelId] = React.useState("general");

  return (
    <ChatChannelSidebar
      activeChannelId={activeChannelId}
      onSelectChannel={setActiveChannelId}
      onCreateChannel={() => console.log("create channel")}
      channels={[
        { id: "general", name: "general", unreadCount: 3 },
        { id: "random", name: "random" },
        { id: "leadership", name: "leadership", isPrivate: true },
      ]}
    />
  );
}
