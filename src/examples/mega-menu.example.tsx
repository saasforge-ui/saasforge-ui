import { MegaMenu } from "@/components/saas/navigation/mega-menu";

export default function Example() {
  return (
    <MegaMenu
      label="Products"
      onNavigate={(href) => console.log("navigate", href)}
      sections={[
        {
          title: "Platform",
          links: [
            { label: "Dashboards", description: "Build internal tools fast", href: "/dashboards" },
            { label: "Analytics", description: "Track what matters", href: "/analytics" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "/docs" },
            { label: "API reference", href: "/api" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
          ],
        },
      ]}
    />
  );
}
