import { Outlet } from "react-router-dom";
import { ComponentsSidebar } from "@/components/common/components-sidebar";

export default function ComponentsLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="scrollbar-thin lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2">
          <ComponentsSidebar />
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
