import { CodeBlockTabs } from "@/components/free/code-block-tabs";

export default function Example() {
  return (
    <CodeBlockTabs
      className="max-w-2xl"
      tabs={[
        {
          label: "npm",
          filename: "terminal",
          code: "npm install @acme/sdk",
        },
        {
          label: "TypeScript",
          filename: "src/lib/acme.ts",
          code: `import { Acme } from "@acme/sdk";

export const acme = new Acme({
  apiKey: process.env.ACME_API_KEY!,
  // Retries idempotent requests with exponential backoff, capped at 3 attempts per call.
  maxRetries: 3,
});

const customer = await acme.customers.create({ email: "jane@example.com", name: "Jane Cooper" });`,
        },
        {
          label: "cURL",
          code: `curl https://api.acme.dev/v1/customers \
  -H "Authorization: Bearer $ACME_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "jane@example.com", "name": "Jane Cooper" }'`,
        },
      ]}
      defaultValue="TypeScript"
    />
  );
}
