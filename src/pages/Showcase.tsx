import * as React from "react";
import { useParams } from "react-router-dom";
import { ComponentPreviewFrame } from "@/components/common/component-preview-frame";
import { getComponentBySlug } from "@/data/components";
import { componentDocs } from "@/data/component-docs";

export default function Showcase() {
  const { slug } = useParams<{ slug: string }>();
  const [variant, setVariant] = React.useState<"light" | "dark">("light");
  const component = slug ? getComponentBySlug(slug) : undefined;
  const doc = component ? componentDocs[component.slug] : undefined;

  if (!component) {
    return <p className="p-10 text-center text-muted-foreground">Unknown component: {slug}</p>;
  }

  return (
    <ComponentPreviewFrame title={component.name} category={component.category} variant={variant}>
      <div className="mb-6 flex justify-center gap-2 text-xs">
        <button
          className="rounded-full border border-border px-3 py-1"
          onClick={() => setVariant("light")}
          aria-pressed={variant === "light"}
        >
          Light
        </button>
        <button
          className="rounded-full border border-border px-3 py-1"
          onClick={() => setVariant("dark")}
          aria-pressed={variant === "dark"}
        >
          Dark
        </button>
      </div>
      {doc ? doc.preview : <p className="text-center text-muted-foreground">Preview available in Pro.</p>}
    </ComponentPreviewFrame>
  );
}
