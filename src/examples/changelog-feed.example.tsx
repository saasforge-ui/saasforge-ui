import { ChangelogFeed } from "@/components/saas/developer/changelog-feed";
import type { ChangelogEntry } from "@/components/saas/developer/changelog-feed";

// Inline SVG so the demo image needs no network request.
const demoImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0e7ff"/><stop offset="1" stop-color="#f0fdf4"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><rect x="48" y="48" width="544" height="264" rx="12" fill="#fff" stroke="#e5e7eb"/><rect x="72" y="76" width="160" height="12" rx="6" fill="#c7d2fe"/><rect x="72" y="104" width="320" height="8" rx="4" fill="#e5e7eb"/><rect x="72" y="140" width="496" height="140" rx="8" fill="#f8fafc" stroke="#e5e7eb"/><polyline points="88,250 160,210 232,226 304,180 376,196 448,150 552,164" fill="none" stroke="#6366f1" stroke-width="4"/></svg>',
  );

const demoEntries: ChangelogEntry[] = [
  {
    version: "v2.9.0",
    date: "2026-10-28",
    title: "Usage-based billing and a new revenue chart",
    tags: ["new", "improved"],
    description: (
      <p>
        Meter any event with <code>billing.track()</code> and charge per unit, per tier or per package. The revenue dashboard now breaks MRR down by plan and
        shows expansion separately from new business.
      </p>
    ),
    image: { src: demoImage, alt: "Revenue dashboard with the new MRR breakdown chart" },
    changes: [
      { tag: "new", text: "Metered prices with tiered and volume pricing." },
      { tag: "improved", text: "Revenue chart loads 3x faster on large accounts." },
    ],
  },
  {
    version: "v2.8.2",
    date: "2026-10-14",
    title: "Webhook reliability fixes",
    tags: ["fixed"],
    description: "Deliveries that timed out are now retried with exponential backoff for up to 72 hours, and duplicate events are de-duplicated by ID.",
    changes: [
      { tag: "fixed", text: "Retries no longer fire twice when an endpoint responds slowly." },
      { tag: "fixed", text: "Signature header is now included on manual redeliveries." },
    ],
  },
  {
    version: "v2.8.0",
    date: "2026-10-03",
    title: "Email verification before checkout",
    tags: ["new"],
    description: "New accounts verify their email before reaching billing, which cuts fraudulent trials. You can disable it per workspace in Settings.",
  },
  {
    version: "v2.7.1",
    date: "2026-09-19",
    title: "Faster search across customers",
    tags: ["improved"],
    description: "Customer search now matches partial emails and company domains, and results appear as you type.",
  },
  {
    version: "v2.7.0",
    date: "2026-09-05",
    title: "Team roles and audit log",
    tags: ["new", "fixed"],
    description: "Invite teammates as Admin, Member or Viewer. Every settings change is recorded in the new audit log with the actor and timestamp.",
    changes: [
      { tag: "new", text: "Role-based access for workspaces." },
      { tag: "fixed", text: "Invites sent to uppercase emails now match existing users." },
    ],
  },
];

export default function Example() {
  return <ChangelogFeed className="mx-auto max-w-3xl" entries={demoEntries} pageSize={2} />;
}
