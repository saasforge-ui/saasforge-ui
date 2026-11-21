import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MegaMenuLink {
  label: string;
  description?: string;
  href: string;
}

export interface MegaMenuSection {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuProps {
  label: string;
  sections: MegaMenuSection[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export function MegaMenu({ label, sections, onNavigate, className }: MegaMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={cn("flex items-center gap-1 text-sm font-medium hover:text-primary", className)}>
          {label}
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[36rem] p-0">
        <div className="grid grid-cols-3 gap-6 p-5">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => onNavigate?.(link.href)}
                      className="text-left text-sm hover:text-primary"
                    >
                      <span className="block font-medium">{link.label}</span>
                      {link.description && <span className="block text-xs text-muted-foreground">{link.description}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
