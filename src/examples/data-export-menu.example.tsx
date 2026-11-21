import { DataExportMenu } from "@/components/saas/utilities/data-export-menu";

export default function Example() {
  return (
    <DataExportMenu
      onExportCSV={() => console.log("export csv")}
      onExportJSON={() => console.log("export json")}
    />
  );
}
