import * as React from "react";
import { VideoCallCard } from "@/components/saas/communication/video-call-card";

export default function Example() {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isCameraOff, setIsCameraOff] = React.useState(false);

  return (
    <VideoCallCard
      isMuted={isMuted}
      isCameraOff={isCameraOff}
      onToggleMute={() => setIsMuted((m) => !m)}
      onToggleCamera={() => setIsCameraOff((c) => !c)}
      onLeave={() => console.log("leave call")}
      participants={[
        { id: "1", name: "Sarah Chen", isCameraOff: true },
        { id: "2", name: "Marcus Webb", isMuted: true, isCameraOff: true },
      ]}
    />
  );
}
