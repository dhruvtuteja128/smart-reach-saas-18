
import { createContext, useContext, useState, ReactNode } from "react";

export type CampaignType = "email" | "sms" | "whatsapp" | "ads" | "";

export interface CampaignState {
  id: string | null;
  name: string;
  type: CampaignType;
  audience: string;
  content: string;
  subject: string;
  schedule: Date | null;
  status: "draft" | "scheduled" | "running" | "completed" | "paused";
  // Add missing properties
  audienceSegment: string | null;
  audienceSize: number;
  filters: string[];
  message: {
    subject: string;
    content: string;
    goal: string;
    aiOptimized: boolean;
  };
  automation: {
    timing: "now" | "scheduled" | "recurring";
    scheduledDate: Date | undefined;
    conditions: any[]; // This would typically have a more specific type
  };
}

interface CampaignContextType {
  campaign: CampaignState;
  setCampaign: (campaign: CampaignState) => void;
  updateCampaign: (update: Partial<CampaignState>) => void;
  // Add missing methods
  updateMessage: (update: Partial<CampaignState["message"]>) => void;
  updateAutomation: (update: Partial<CampaignState["automation"]>) => void;
}

const defaultCampaign: CampaignState = {
  id: null,
  name: "",
  type: "",
  audience: "",
  content: "",
  subject: "",
  schedule: null,
  status: "draft",
  // Initialize new properties
  audienceSegment: null,
  audienceSize: 0,
  filters: [],
  message: {
    subject: "",
    content: "",
    goal: "",
    aiOptimized: false
  },
  automation: {
    timing: "now",
    scheduledDate: undefined,
    conditions: []
  }
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaign, setCampaign] = useState<CampaignState>(defaultCampaign);

  const updateCampaign = (update: Partial<CampaignState>) => {
    setCampaign((prev) => ({ ...prev, ...update }));
  };

  // Add the new methods for updating nested objects
  const updateMessage = (update: Partial<CampaignState["message"]>) => {
    setCampaign((prev) => ({
      ...prev,
      message: { ...prev.message, ...update }
    }));
  };

  const updateAutomation = (update: Partial<CampaignState["automation"]>) => {
    setCampaign((prev) => ({
      ...prev,
      automation: { ...prev.automation, ...update }
    }));
  };

  return (
    <CampaignContext.Provider value={{ 
      campaign, 
      setCampaign, 
      updateCampaign,
      updateMessage,
      updateAutomation
    }}>
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
