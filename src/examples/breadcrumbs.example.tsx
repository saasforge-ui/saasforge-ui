import { Breadcrumbs } from "@/components/free/breadcrumbs";

export default function Example() {
  return (
    <Breadcrumbs
      onNavigate={(href) => console.log("navigate", href)}
      items={[
        { label: "Dashboard", href: "/" },
        { label: "Settings", href: "/settings" },
        { label: "Billing" },
      ]}
    />
  );
}
