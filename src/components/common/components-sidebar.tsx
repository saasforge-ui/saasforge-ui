import { NavLink } from "react-router-dom";
import { categories, componentRegistry } from "@/data/components";
import { categoryIcons } from "@/lib/category-icons";
import { cn } from "@/lib/utils";

export function ComponentsSidebar() {
  return (
    <nav aria-label="Component categories" className="space-y-6">
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        return (
          <div key={category}>
            <h3 className="mb-2 flex items-center gap-1.5 px-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              {category}
            </h3>
            <ul className="space-y-0.5 border-l border-border pl-2.5">
              {componentRegistry
                .filter((c) => c.category === category)
                .map((component) => (
                  <li key={component.slug}>
                    <NavLink
                      to={`/components/${component.slug}`}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                          isActive && "bg-accent font-medium text-foreground",
                        )
                      }
                    >
                      {component.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
