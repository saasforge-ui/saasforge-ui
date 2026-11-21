import * as React from "react";
import { FilterToolbar, type FilterValue } from "@/components/saas/utilities/filter-toolbar";

export default function Example() {
  const [search, setSearch] = React.useState("");
  const [values, setValues] = React.useState<Record<string, FilterValue>>({ status: "all" });

  return (
    <FilterToolbar
      searchValue={search}
      onSearchChange={setSearch}
      filters={[
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Active", value: "active" },
            { label: "Invited", value: "invited" },
            { label: "Suspended", value: "suspended" },
          ],
        },
      ]}
      values={values}
      onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
      sortOptions={[
        { label: "Newest first", value: "newest" },
        { label: "Oldest first", value: "oldest" },
      ]}
      sortValue="newest"
      onClear={() => {
        setSearch("");
        setValues({ status: "all" });
      }}
    />
  );
}
