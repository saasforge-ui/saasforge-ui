import { WebhookEventLog } from "@/components/saas/developer/webhook-event-log";
import type { WebhookEvent } from "@/components/saas/developer/webhook-event-log";

const demoEvents: WebhookEvent[] = [
  {
    id: "evt_1Q8xA2",
    type: "invoice.paid",
    endpoint: "https://api.acme.dev/webhooks/billing",
    status: "delivered",
    httpCode: 200,
    timestamp: "2026-10-31T14:02:11Z",
    request: { id: "evt_1Q8xA2", type: "invoice.paid", data: { invoice: "in_9821", amount: 4900, currency: "usd" } },
    response: { received: true },
  },
  {
    id: "evt_1Q8w7K",
    type: "customer.subscription.updated",
    endpoint: "https://hooks.acme-internal.io/crm/sync",
    status: "failed",
    httpCode: 500,
    timestamp: "2026-10-31T13:47:55Z",
    attempts: 3,
    request: { id: "evt_1Q8w7K", type: "customer.subscription.updated", data: { subscription: "sub_771", plan: "pro", seats: 12 } },
    response: { error: "Internal Server Error", trace: "TypeError: Cannot read properties of undefined (reading 'seats')" },
  },
  {
    id: "evt_1Q8vR9",
    type: "checkout.session.completed",
    endpoint: "https://api.acme.dev/webhooks/billing",
    status: "retrying",
    httpCode: 503,
    timestamp: "2026-10-31T13:30:02Z",
    attempts: 2,
    request: { id: "evt_1Q8vR9", type: "checkout.session.completed", data: { session: "cs_552", customer: "cus_02" } },
    response: "Service Unavailable",
  },
  {
    id: "evt_1Q8uM4",
    type: "customer.created",
    endpoint: "https://hooks.acme-internal.io/crm/sync",
    status: "failed",
    httpCode: null,
    timestamp: "2026-10-31T12:58:40Z",
    attempts: 1,
    request: { id: "evt_1Q8uM4", type: "customer.created", data: { customer: "cus_03", email: "lee@example.com" } },
  },
  {
    id: "evt_1Q8tB1",
    type: "invoice.payment_failed",
    endpoint: "https://api.acme.dev/webhooks/billing",
    status: "delivered",
    httpCode: 202,
    timestamp: "2026-10-31T11:15:27Z",
    request: { id: "evt_1Q8tB1", type: "invoice.payment_failed", data: { invoice: "in_9790", attempt: 2 } },
    response: { queued: true },
  },
];

export default function Example() {
  return (
    <WebhookEventLog
      className="mx-auto max-w-4xl"
      events={demoEvents}
      // Simulate a redelivery: succeeds after a short delay.
      onRetry={() => new Promise((resolve) => setTimeout(() => resolve({ status: "delivered", httpCode: 200, response: { received: true } }), 1400))}
    />
  );
}
