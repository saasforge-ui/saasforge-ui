import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface VideoCallParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isCameraOff?: boolean;
}

export interface VideoCallCardProps {
  participants: VideoCallParticipant[];
  isMuted?: boolean;
  isCameraOff?: boolean;
  onToggleMute?: () => void;
  onToggleCamera?: () => void;
  onLeave?: () => void;
  className?: string;
}

export function VideoCallCard({
  participants,
  isMuted = false,
  isCameraOff = false,
  onToggleMute,
  onToggleCamera,
  onLeave,
  className,
}: VideoCallCardProps) {
  return (
    <div className={cn("w-full max-w-lg rounded-lg border border-border bg-card p-4", className)}>
      <div
        className={cn(
          "grid gap-2",
          participants.length === 1 ? "grid-cols-1" : participants.length <= 4 ? "grid-cols-2" : "grid-cols-3",
        )}
      >
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="relative flex aspect-video items-center justify-center rounded-md bg-muted"
          >
            {participant.isCameraOff ? (
              <Avatar className="h-10 w-10">
                {participant.avatarUrl && <AvatarImage src={participant.avatarUrl} alt="" />}
                <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            ) : (
              <Video className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            )}
            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white">
              {participant.isMuted && <MicOff className="h-3 w-3" aria-hidden="true" />}
              {participant.name}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isMuted ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground hover:bg-accent",
          )}
        >
          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={onToggleCamera}
          aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isCameraOff ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground hover:bg-accent",
          )}
        >
          {isCameraOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
        </button>
        {onLeave && (
          <button
            type="button"
            onClick={onLeave}
            aria-label="Leave call"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
