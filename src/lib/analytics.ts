export type AnalyticsEvent =
  | "page_view"
  | "component_preview"
  | "free_component_click"
  | "github_click"
  | "pricing_view"
  | "purchase_click";

export interface AnalyticsPayload {
  component?: string;
  category?: string;
  tier?: "free" | "pro" | "ultimate";
  path?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

/**
 * Thin abstraction so a real provider (Plausible, PostHog, GA) can be wired in
 * later without touching call sites.
 */
export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (import.meta.env.DEV) {
    console.debug(`[analytics] ${event}`, payload);
  }
  window.dispatchEvent(new CustomEvent("saasforge:analytics", { detail: { event, payload } }));
  window.umami?.track(event, payload);
}
