import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DAChecker from "./pages/DAChecker.tsx";
import BacklinkChecker from "./pages/BacklinkChecker.tsx";
import SERPChecker from "./pages/SERPChecker.tsx";
import IPLookup from "./pages/IPLookup.tsx";
import SiteAudit from "./pages/SiteAudit.tsx";
import KeywordTool from "./pages/KeywordTool.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/da-checker" element={<DAChecker />} />
          <Route path="/backlink-checker" element={<BacklinkChecker />} />
          <Route path="/serp-checker" element={<SERPChecker />} />
          <Route path="/ip-lookup" element={<IPLookup />} />
          <Route path="/site-audit" element={<SiteAudit />} />
          <Route path="/keyword-tool" element={<KeywordTool />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
