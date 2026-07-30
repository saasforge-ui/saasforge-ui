import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/common/site-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Showcase from "@/pages/Showcase";
import NotFound from "@/pages/NotFound";
import ComponentsLayout from "@/pages/components/ComponentsLayout";
import ComponentsIndex from "@/pages/components/ComponentsIndex";
import ComponentDetail from "@/pages/components/ComponentDetail";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";

function App() {
  usePageViewTracking();

  return (
    <TooltipProvider delayDuration={200}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<ComponentsLayout />}>
            <Route index element={<ComponentsIndex />} />
            <Route path=":slug" element={<ComponentDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/showcase/:slug" element={<Showcase />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
