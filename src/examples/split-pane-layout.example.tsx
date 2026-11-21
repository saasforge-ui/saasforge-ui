import { SplitPaneLayout } from "@/components/saas/navigation/split-pane-layout";

export default function Example() {
  return (
    <SplitPaneLayout
      left={
        <ul className="space-y-1 text-sm">
          <li>index.tsx</li>
          <li>App.tsx</li>
          <li>components/</li>
        </ul>
      }
      right={<pre className="text-xs text-muted-foreground">{`export default function App() {\n  return <div>Hello</div>;\n}`}</pre>}
    />
  );
}
