import { MessageBubbleList } from "@/components/saas/communication/message-bubble-list";

export default function Example() {
  return (
    <MessageBubbleList
      currentUserId="me"
      messages={[
        { id: "1", senderId: "them", senderName: "Marcus Webb", content: "Did you see the new designs?", timestamp: "2026-07-30T09:00:00Z" },
        { id: "2", senderId: "me", senderName: "You", content: "Yes, they look great!", timestamp: "2026-07-30T09:02:00Z" },
      ]}
    />
  );
}
