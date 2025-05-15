
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Communication from "./pages/Communication";
import Campaigns from "./pages/Campaigns";
import CampaignsList from "./pages/CampaignsList";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import CampaignEditorPage from "./pages/CampaignEditorPage";
import CampaignSchedulerPage from "./pages/CampaignSchedulerPage";
import CRM from "./pages/CRM";
import Reviews from "./pages/Reviews";
import Workflows from "./pages/Workflows";
import Analytics from "./pages/Analytics";
import Assistant from "./pages/Assistant";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AICampaign from "./pages/AICampaign";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/campaigns" element={<CampaignsList />} />
        <Route path="/campaigns/:id/view" element={<CampaignDetailPage />} />
        <Route path="/campaigns/:id/edit" element={<CampaignEditorPage />} />
        <Route path="/campaigns/:id/schedule" element={<CampaignSchedulerPage />} />
        <Route path="/ai-campaign" element={<AICampaign />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
