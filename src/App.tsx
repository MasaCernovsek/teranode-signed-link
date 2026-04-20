import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index.tsx";
import ProjectView from "./pages/ProjectView.tsx";
import DocumentDetail from "./pages/DocumentDetail.tsx";
import EnvelopeDetail from "./pages/EnvelopeDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import EarlyAccess from "./pages/EarlyAccess.tsx";
import ChainOfCustody from "./pages/ChainOfCustody.tsx";
import ProductLanding from "./pages/ProductLanding.tsx";

const queryClient = new QueryClient();

/** Reset window scroll on client-side navigation (e.g. /chain-of-custody → /product at hero). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/chain-of-custody" element={<ChainOfCustody />} />
            <Route path="/product" element={<ProductLanding />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/project/:id/envelope/:envId" element={<EnvelopeDetail />} />
            <Route path="/project/:id/document/:docId" element={<DocumentDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
