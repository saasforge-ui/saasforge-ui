import { MentionAutocompleteInput } from "@/components/saas/communication/mention-autocomplete-input";

export default function Example() {
  return (
    <MentionAutocompleteInput
      users={[
        { id: "u1", name: "Sarah Chen" },
        { id: "u2", name: "Marcus Webb" },
        { id: "u3", name: "Priya Nair" },
      ]}
      onSubmit={(content, mentionedIds) => console.log("submit", content, mentionedIds)}
    />
  );
}
