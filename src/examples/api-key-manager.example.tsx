import { ApiKeyManager } from "@/components/saas/settings/api-key-manager";
import { mockApiKeys } from "@/data/mock-data";

export default function Example() {
  return (
    <ApiKeyManager
      apiKeys={mockApiKeys}
      onCreate={() => console.log("create key")}
      onRevoke={(key) => console.log("revoke", key.id)}
      onCopy={(key) => navigator.clipboard.writeText(key.maskedKey)}
    />
  );
}
