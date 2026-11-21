import * as React from "react";
import { DataGridInlineEdit } from "@/components/saas/data/data-grid-inline-edit";

export default function Example() {
  const [rows, setRows] = React.useState([
    { name: "Sarah Chen", role: "Owner", email: "sarah@acme.io" },
    { name: "Marcus Webb", role: "Admin", email: "marcus@acme.io" },
  ]);

  return (
    <DataGridInlineEdit
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
      ]}
      rows={rows}
      onCellChange={(rowIndex, key, value) =>
        setRows((prev) => prev.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row)))
      }
    />
  );
}
