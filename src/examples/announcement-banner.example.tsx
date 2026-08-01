import { AnnouncementBanner } from "@/components/free/announcement-banner";

export default function Example() {
  return (
    <div className="w-full max-w-lg">
      <AnnouncementBanner
        message="Scheduled maintenance on August 3rd from 2-4 AM UTC."
        variant="warning"
        ctaLabel="Learn more"
        onCtaClick={() => console.log("learn more")}
        onDismiss={() => console.log("dismissed")}
      />
    </div>
  );
}
