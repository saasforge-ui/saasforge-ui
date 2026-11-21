import { AlertBanner } from "@/components/saas/notifications/alert-banner-auto-dismiss";

export default function Example() {
  return (
    <div className="w-full max-w-md space-y-3">
      <AlertBanner variant="info" title="New version available" description="Refresh to get the latest features." />
      <AlertBanner variant="success" title="Changes saved" description="Your profile was updated successfully." />
      <AlertBanner variant="warning" title="Storage almost full" description="You've used 92% of your plan's storage." />
      <AlertBanner variant="error" title="Payment failed" description="We couldn't charge your card ending in 4242." />
      <AlertBanner
        variant="info"
        title="This banner will auto-dismiss"
        description="Watch the progress bar at the bottom."
        autoDismissMs={6000}
      />
    </div>
  );
}
