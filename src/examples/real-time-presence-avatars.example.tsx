import { RealTimePresenceAvatars } from "@/components/saas/communication/real-time-presence-avatars";

export default function Example() {
  return (
    <RealTimePresenceAvatars
      simulateActivity={false}
      users={[
        { id: "u1", name: "Ava Thompson", status: "online" },
        { id: "u2", name: "Marcus Lee", status: "online" },
        { id: "u3", name: "Jordan Patel", status: "away" },
        { id: "u4", name: "Ines Rocha", status: "idle" },
        { id: "u5", name: "Tomas Novak", status: "online" },
        { id: "u6", name: "Grace Wu", status: "offline" },
      ]}
    />
  );
}
