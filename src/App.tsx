import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/common/site-layout";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Showcase from "@/pages/Showcase";
import NotFound from "@/pages/NotFound";
import ComponentsLayout from "@/pages/components/ComponentsLayout";
import ComponentsIndex from "@/pages/components/ComponentsIndex";
import ComponentDetail from "@/pages/components/ComponentDetail";
import TemplatesIndex from "@/pages/templates/TemplatesIndex";
import TemplateDetail from "@/pages/templates/TemplateDetail";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";

function App() {
  usePageViewTracking();

  return (
    <TooltipProvider delayDuration={200}>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Navigate to="/components" replace />} />
          <Route path="/templates" element={<TemplatesIndex />} />
          <Route path="/templates/:slug" element={<TemplateDetail />} />
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
