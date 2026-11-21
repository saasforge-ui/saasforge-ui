import * as React from "react";
import { ImageUp, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface WhiteLabelTheme {
  brandName: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string | null;
}

export type WhiteLabelThemeAction =
  | { type: "SET_BRAND_NAME"; name: string }
  | { type: "SET_PRIMARY_COLOR"; color: string }
  | { type: "SET_ACCENT_COLOR"; color: string }
  | { type: "SET_FONT"; font: string }
  | { type: "SET_LOGO"; url: string | null }
  | { type: "RESET"; theme: WhiteLabelTheme };

export const DEFAULT_WHITE_LABEL_THEME: WhiteLabelTheme = {
  brandName: "Acme",
  primaryColor: "#6366f1",
  accentColor: "#f97316",
  fontFamily: "Inter",
  logoUrl: null,
};

export const FONT_OPTIONS = ["Inter", "Poppins", "Sora", "IBM Plex Sans", "Georgia"];

/** Pure reducer driving the live-preview state. No side effects — safe to unit test directly. */
export function themeReducer(state: WhiteLabelTheme, action: WhiteLabelThemeAction): WhiteLabelTheme {
  switch (action.type) {
    case "SET_BRAND_NAME":
      return { ...state, brandName: action.name };
    case "SET_PRIMARY_COLOR":
      return { ...state, primaryColor: action.color };
    case "SET_ACCENT_COLOR":
      return { ...state, accentColor: action.color };
    case "SET_FONT":
      return { ...state, fontFamily: action.font };
    case "SET_LOGO":
      return { ...state, logoUrl: action.url };
    case "RESET":
      return action.theme;
    default:
      return state;
  }
}

export interface WhiteLabelThemeEditorProps {
  initialTheme?: WhiteLabelTheme;
  onChange?: (theme: WhiteLabelTheme) => void;
  isLoading?: boolean;
  className?: string;
}

export function WhiteLabelThemeEditor({
  initialTheme = DEFAULT_WHITE_LABEL_THEME,
  onChange,
  isLoading = false,
  className,
}: WhiteLabelThemeEditorProps) {
  const [theme, dispatch] = React.useReducer(themeReducer, initialTheme);
  const objectUrlRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    onChange?.(theme);
  }, [theme, onChange]);

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    dispatch({ type: "SET_LOGO", url });
  }

  if (isLoading) {
    return (
      <div className={cn("grid w-full gap-4 md:grid-cols-2", className)}>
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className={cn("grid w-full gap-4 md:grid-cols-2", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Brand settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="wlte-brand-name">Brand name</Label>
            <Input
              id="wlte-brand-name"
              value={theme.brandName}
              onChange={(e) => dispatch({ type: "SET_BRAND_NAME", name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="wlte-primary-color">Primary color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="wlte-primary-color"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => dispatch({ type: "SET_PRIMARY_COLOR", color: e.target.value })}
                  aria-label="Primary color"
                  className="h-9 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-background p-1"
                />
                <span className="font-mono text-xs text-muted-foreground">{theme.primaryColor}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wlte-accent-color">Accent color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="wlte-accent-color"
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => dispatch({ type: "SET_ACCENT_COLOR", color: e.target.value })}
                  aria-label="Accent color"
                  className="h-9 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-background p-1"
                />
                <span className="font-mono text-xs text-muted-foreground">{theme.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="wlte-font">Font</Label>
            <Select value={theme.fontFamily} onValueChange={(font) => dispatch({ type: "SET_FONT", font })}>
              <SelectTrigger id="wlte-font">
                <SelectValue placeholder="Choose a font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="wlte-logo">Logo</Label>
            <label
              htmlFor="wlte-logo"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input px-3 py-4 text-sm text-muted-foreground hover:bg-accent"
            >
              <ImageUp className="h-4 w-4" aria-hidden="true" />
              {theme.logoUrl ? "Replace logo" : "Upload logo"}
              <input
                id="wlte-logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="sr-only"
                aria-label="Upload logo"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card
        className="overflow-hidden"
        style={{ fontFamily: theme.fontFamily }}
        aria-label="Live brand preview"
      >
        <div className="flex items-center gap-2 border-b border-border p-4" style={{ color: theme.primaryColor }}>
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt={`${theme.brandName} logo`} className="h-7 w-7 rounded object-cover" />
          ) : (
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {theme.brandName.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="text-sm font-semibold text-foreground">{theme.brandName}</span>
        </div>
        <CardContent className="space-y-3 pt-4">
          <p className="text-sm text-muted-foreground">
            This is how {theme.brandName || "your brand"} looks with your current theme applied.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Primary action
            </button>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
              style={{ backgroundColor: theme.accentColor }}
            >
              Accent action
            </button>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: theme.accentColor }}>
              Highlighted metric
            </p>
            <p className="text-2xl font-semibold tracking-tight">$12,480</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
