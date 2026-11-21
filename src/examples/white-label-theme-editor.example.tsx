import { WhiteLabelThemeEditor } from "@/components/saas/settings/white-label-theme-editor";

export default function Example() {
  return (
    <WhiteLabelThemeEditor
      initialTheme={{
        brandName: "Northwind",
        primaryColor: "#6366f1",
        accentColor: "#f97316",
        fontFamily: "Inter",
        logoUrl: null,
      }}
    />
  );
}
