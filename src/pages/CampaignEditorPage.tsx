
import { Layout } from "@/components/Layout";
import { CampaignEditor } from "@/components/campaigns/CampaignEditor";
import { OpenAIProvider } from "@/contexts/OpenAIContext";

const CampaignEditorPage = () => (
  <Layout>
    <OpenAIProvider>
      <CampaignEditor />
    </OpenAIProvider>
  </Layout>
);

export default CampaignEditorPage;
