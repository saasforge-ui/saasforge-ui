import { Button, type ButtonProps } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface PurchaseButtonProps extends Omit<ButtonProps, "onClick"> {
  product?: "saasforge-ui-pro" | "saasforge-ui-ultimate";
  children: React.ReactNode;
}

export function PurchaseButton({ product = "saasforge-ui-pro", children, ...props }: PurchaseButtonProps) {
  const href = product === "saasforge-ui-ultimate" ? siteConfig.kofiUltimateUrl : siteConfig.kofiProductUrl;

  return (
    <Button
      {...props}
      onClick={() => {
        trackEvent("purchase_click", { tier: product === "saasforge-ui-ultimate" ? "ultimate" : "pro" });
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </Button>
  );
}
