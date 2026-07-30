import { Link, NavLink } from "react-router-dom";
import { Menu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { PurchaseButton } from "@/components/common/purchase-button";
import { GithubIcon } from "@/components/common/github-icon";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import * as React from "react";

const navLinks = [
  { to: "/components", label: "Components" },
  { to: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Layers className="h-5 w-5" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
              onClick={() => trackEvent("github_click", { path: "header" })}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
          <PurchaseButton size="sm">Get Pro</PurchaseButton>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                      isActive && "bg-accent text-foreground",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <PurchaseButton className="w-full">Get Pro</PurchaseButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
