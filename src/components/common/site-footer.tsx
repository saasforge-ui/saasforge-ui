import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { GithubIcon } from "@/components/common/github-icon";
import { SupportButton } from "@/components/common/support-button";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Layers className="h-4 w-4" />
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Free forever, open source under the MIT license.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link to="/components" className="text-muted-foreground hover:text-foreground">
            Components
          </Link>
          <Link to="/templates" className="text-muted-foreground hover:text-foreground">
            Templates
          </Link>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => trackEvent("github_click", { path: "footer" })}
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
          <SupportButton size="sm" placement="footer" />
        </div>
      </div>
    </footer>
  );
}
