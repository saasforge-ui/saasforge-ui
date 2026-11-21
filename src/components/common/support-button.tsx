import { Heart } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface SupportButtonProps extends Omit<ButtonProps, "asChild"> {
  /** Where the button was clicked, for analytics. */
  placement: string;
  children?: React.ReactNode;
}

/** Optional donation link. Renders nothing when no Ko-fi URL is configured. */
export function SupportButton({ placement, children = "Support on Ko-fi", ...props }: SupportButtonProps) {
  if (!siteConfig.kofiUrl) return null;
  return (
    <Button variant="outline" {...props} asChild>
      <a
        href={siteConfig.kofiUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("support_click", { path: placement })}
      >
        <Heart />
        {children}
      </a>
    </Button>
  );
}
