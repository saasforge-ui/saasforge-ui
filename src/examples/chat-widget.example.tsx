import * as React from "react";
import { ChatWidget } from "@/components/saas/communication/chat-widget";

export default function Example() {
  const [open, setOpen] = React.useState(true);

  return (
    <ChatWidget
      open={open}
      onOpenChange={setOpen}
      currentUserId="me"
      messages={[
        { id: "1", senderId: "support", senderName: "Support", content: "Hi! How can we help today?", timestamp: "2026-07-30T10:00:00Z" },
        { id: "2", senderId: "me", senderName: "You", content: "I have a question about billing.", timestamp: "2026-07-30T10:01:00Z" },
      ]}
      onSend={(content) => console.log("send", content)}
    />
  );
}
