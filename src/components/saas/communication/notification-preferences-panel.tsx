import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export type NotificationChannel = "email" | "push" | "sms";

export interface NotificationPreferenceRow {
  id: string;
  label: string;
  description?: string;
  email: boolean;
  push: boolean;
  sms?: boolean;
}

export interface NotificationPreferencesPanelProps {
  preferences: NotificationPreferenceRow[];
  channels?: NotificationChannel[];
  onChange: (id: string, channel: NotificationChannel, value: boolean) => void;
  className?: string;
}

const channelLabel: Record<NotificationChannel, string> = {
  email: "Email",
  push: "Push",
  sms: "SMS",
};

export function NotificationPreferencesPanel({
  preferences,
  channels = ["email", "push"],
  onChange,
  className,
}: NotificationPreferencesPanelProps) {
  return (
    <div className={cn("w-full max-w-lg text-left", className)}>
      <div className="grid items-center gap-3 border-b border-border pb-2" style={{ gridTemplateColumns: `1fr repeat(${channels.length}, 4.5rem)` }}>
        <span />
        {channels.map((channel) => (
          <span key={channel} className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {channelLabel[channel]}
          </span>
        ))}
      </div>
      <div className="divide-y divide-border">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            className="grid items-center gap-3 py-3"
            style={{ gridTemplateColumns: `1fr repeat(${channels.length}, 4.5rem)` }}
          >
            <div>
              <p className="text-sm font-medium">{pref.label}</p>
              {pref.description && <p className="text-xs text-muted-foreground">{pref.description}</p>}
            </div>
            {channels.map((channel) => (
              <div key={channel} className="flex justify-center">
                <Switch
                  checked={Boolean(pref[channel])}
                  onCheckedChange={(value) => onChange(pref.id, channel, value)}
                  aria-label={`${channelLabel[channel]} notifications for ${pref.label}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
