import { ApiRequestPlayground } from "@/components/saas/developer/api-request-playground";
import type { ApiRequest, ApiResponse } from "@/components/saas/developer/api-request-playground";

// Simulated backend so the playground works without a network.
async function simulateRequest(request: ApiRequest): Promise<ApiResponse> {
  const latency = 250 + Math.round(Math.random() * 450);
  await new Promise((resolve) => setTimeout(resolve, latency));

  if (!request.headers.Authorization) {
    return { status: 401, durationMs: latency, body: { error: { code: "unauthorized", message: "Missing Authorization header." } } };
  }
  if (request.url.includes("/missing")) {
    return { status: 404, durationMs: latency, body: { error: { code: "not_found", message: "No such resource." } } };
  }
  if (request.method === "DELETE") {
    return { status: 204, durationMs: latency, body: "" };
  }
  if (request.method === "GET") {
    return {
      status: 200,
      durationMs: latency,
      body: {
        data: [
          { id: "cus_01", email: "jane@example.com", plan: "pro", created: "2026-10-02T09:14:00Z" },
          { id: "cus_02", email: "omar@example.com", plan: "starter", created: "2026-10-11T16:40:00Z" },
        ],
        has_more: false,
      },
    };
  }
  return {
    status: request.method === "POST" ? 201 : 200,
    durationMs: latency,
    body: { id: "cus_03", object: "customer", ...(request.body ? JSON.parse(request.body) : {}), updated: new Date().toISOString() },
  };
}

export default function Example() {
  return (
    <ApiRequestPlayground
      className="mx-auto max-w-3xl"
      defaultMethod="GET"
      defaultUrl="https://api.acme.dev/v1/customers?limit=2"
      defaultHeaders={[
        { key: "Authorization", value: "Bearer sk_test_demo_key" },
        { key: "Content-Type", value: "application/json" },
      ]}
      defaultBody={'{\n  "email": "lee@example.com",\n  "plan": "pro"\n}'}
      onSend={simulateRequest}
    />
  );
}
