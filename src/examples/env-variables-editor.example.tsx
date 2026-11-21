import { EnvVariablesEditor } from "@/components/saas/developer/env-variables-editor";

export default function Example() {
  return (
    <EnvVariablesEditor
      className="mx-auto max-w-3xl"
      initialValues={{
        Development: [
          { key: "DATABASE_URL", value: "postgres://localhost:5432/acme_dev" },
          { key: "STRIPE_SECRET_KEY", value: "sk_test_example_dev", secret: true },
          { key: "NEXT_PUBLIC_APP_URL", value: "http://localhost:3000" },
        ],
        Preview: [
          { key: "DATABASE_URL", value: "postgres://preview.db.acme.dev:5432/acme", secret: true },
          { key: "NEXT_PUBLIC_APP_URL", value: "https://preview.acme.dev" },
        ],
        Production: [
          { key: "DATABASE_URL", value: "postgres://prod.db.acme.dev:5432/acme", secret: true },
          { key: "STRIPE_SECRET_KEY", value: "sk_live_example_not_real", secret: true },
          { key: "NEXT_PUBLIC_APP_URL", value: "https://app.acme.dev" },
        ],
      }}
      // Simulate a network round-trip.
      onSave={() => new Promise((resolve) => setTimeout(resolve, 800))}
    />
  );
}
