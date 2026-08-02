import * as React from "react";
import { PaginationBar } from "@/components/free/pagination-bar";

export default function Example() {
  const [currentPage, setCurrentPage] = React.useState(5);

  return <PaginationBar currentPage={currentPage} totalPages={20} onPageChange={setCurrentPage} />;
}
