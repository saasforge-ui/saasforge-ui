import { NavLink } from "react-router-dom";
import { Lock } from "lucide-react";
import { categories, componentRegistry } from "@/data/components";
import { cn } from "@/lib/utils";

export function ComponentsSidebar() {
  return (
    <nav aria-label="Component categories" className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {category}
          </h3>
          <ul className="space-y-0.5">
            {componentRegistry
              .filter((c) => c.category === category)
              .map((component) => (
                <li key={component.slug}>
                  <NavLink
                    to={`/components/${component.slug}`}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                        isActive && "bg-accent font-medium text-foreground",
                      )
                    }
                  >
                    <span>{component.name}</span>
                    {!component.isFree && <Lock className="h-3 w-3 shrink-0" aria-label="Pro component" />}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
