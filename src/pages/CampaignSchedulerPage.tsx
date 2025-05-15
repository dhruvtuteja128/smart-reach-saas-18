
import { Layout } from "@/components/Layout";
import { CampaignScheduler } from "@/components/campaigns/CampaignScheduler";
import { OpenAIProvider } from "@/contexts/OpenAIContext";

const CampaignSchedulerPage = () => (
  <Layout>
    <OpenAIProvider>
      <CampaignScheduler />
    </OpenAIProvider>
  </Layout>
);

export default CampaignSchedulerPage;
