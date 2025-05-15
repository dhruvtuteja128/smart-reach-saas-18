
import { Layout } from "@/components/Layout";
import { CampaignDetail } from "@/components/campaigns/CampaignDetail";
import { OpenAIProvider } from "@/contexts/OpenAIContext";

const CampaignDetailPage = () => (
  <Layout>
    <OpenAIProvider>
      <CampaignDetail />
    </OpenAIProvider>
  </Layout>
);

export default CampaignDetailPage;
