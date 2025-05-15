
import { createContext, useContext, useState, ReactNode } from "react";

export interface CampaignState {
  id: string | null;
  name: string;
  type: "email" | "sms" | "whatsapp" | "ads" | "";
  audience: string; // Adding the audience property that was missing
  content: string;
  subject: string;
  schedule: Date | null;
  status: "draft" | "scheduled" | "running" | "completed" | "paused";
}

interface CampaignContextType {
  campaign: CampaignState;
  setCampaign: (campaign: CampaignState) => void;
  updateCampaign: (update: Partial<CampaignState>) => void;
}

const defaultCampaign: CampaignState = {
  id: null,
  name: "",
  type: "",
  audience: "", // Initialize with empty string
  content: "",
  subject: "",
  schedule: null,
  status: "draft",
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaign, setCampaign] = useState<CampaignState>(defaultCampaign);

  const updateCampaign = (update: Partial<CampaignState>) => {
    setCampaign((prev) => ({ ...prev, ...update }));
  };

  return (
    <CampaignContext.Provider value={{ campaign, setCampaign, updateCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
};
