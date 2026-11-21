import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const settingsFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  companyName: z.string().min(2, "Company name is required."),
  website: z.string().url("Enter a valid URL.").or(z.literal("")),
  language: z.string(),
  timezone: z.string(),
  emailNotifications: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export interface SettingsFormProps {
  defaultValues: SettingsFormValues;
  onSubmit: (values: SettingsFormValues) => void;
  onChangePassword?: () => void;
  onEnableTwoFactor?: () => void;
  isSubmitting?: boolean;
  twoFactorEnabled?: boolean;
  languageOptions?: { value: string; label: string }[];
  className?: string;
}

const defaultLanguageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];

export function SettingsForm({
  defaultValues,
  onSubmit,
  onChangePassword,
  onEnableTwoFactor,
  isSubmitting = false,
  twoFactorEnabled = false,
  languageOptions = defaultLanguageOptions,
  className,
}: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={className ? className : "w-full max-w-lg space-y-6 text-left"}
    >
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="settings-name">Name</Label>
            <Input id="settings-name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-email">Email</Label>
            <Input id="settings-email" type="email" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="settings-company">Company name</Label>
            <Input id="settings-company" {...register("companyName")} />
            {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-website">Website</Label>
            <Input id="settings-website" {...register("website")} />
            {errors.website && <p className="text-xs text-destructive">{errors.website.message}</p>}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="settings-language">Language</Label>
            <Select value={watch("language")} onValueChange={(v) => setValue("language", v, { shouldDirty: true })}>
              <SelectTrigger id="settings-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border p-4">
            <div>
              <Label htmlFor="settings-notifications">Email notifications</Label>
              <p className="text-xs text-muted-foreground">Get notified about billing and account activity.</p>
            </div>
            <Switch
              id="settings-notifications"
              checked={watch("emailNotifications")}
              onCheckedChange={(v) => setValue("emailNotifications", v, { shouldDirty: true })}
            />
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="flex items-center justify-between rounded-md border border-border p-4">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground">Last changed a while ago.</p>
            </div>
            {onChangePassword && (
              <Button type="button" variant="outline" size="sm" onClick={onChangePassword}>
                Change password
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between rounded-md border border-border p-4">
            <div>
              <p className="text-sm font-medium">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground">
                {twoFactorEnabled ? "Enabled." : "Not enabled yet."}
              </p>
            </div>
            {onEnableTwoFactor && !twoFactorEnabled && (
              <Button type="button" variant="outline" size="sm" onClick={onEnableTwoFactor}>
                Enable
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Button type="submit" disabled={isSubmitting || !isDirty}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}
