
import { createContext, useContext, useState, ReactNode } from "react";
import { MessageChannel } from "@/types/communication";

export type CampaignType = "email" | "sms" | "whatsapp" | "ads";
export type AutomationTiming = "now" | "scheduled" | "recurring";

export interface CampaignState {
  name: string;
  type: CampaignType | null;
  audienceSegment: string | null;
  audienceSize: number;
  filters: Record<string, any>[];
  message: {
    subject?: string;
    content: string;
    mediaUrl?: string;
    goal?: string;
    aiOptimized: boolean;
  };
  automation: {
    timing: AutomationTiming;
    scheduledDate?: Date;
    conditions: any[];
  };
}

interface CampaignContextType {
  campaign: CampaignState;
  updateCampaign: (updates: Partial<CampaignState>) => void;
  updateMessage: (updates: Partial<CampaignState["message"]>) => void;
  updateAutomation: (updates: Partial<CampaignState["automation"]>) => void;
  resetCampaign: () => void;
}

const initialState: CampaignState = {
  name: "",
  type: null,
  audienceSegment: null,
  audienceSize: 0,
  filters: [],
  message: {
    content: "",
    aiOptimized: false,
  },
  automation: {
    timing: "now",
    conditions: [],
  },
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaign, setCampaign] = useState<CampaignState>(initialState);

  const updateCampaign = (updates: Partial<CampaignState>) => {
    setCampaign(prev => ({ ...prev, ...updates }));
  };

  const updateMessage = (updates: Partial<CampaignState["message"]>) => {
    setCampaign(prev => ({
      ...prev,
      message: { ...prev.message, ...updates },
    }));
  };

  const updateAutomation = (updates: Partial<CampaignState["automation"]>) => {
    setCampaign(prev => ({
      ...prev,
      automation: { ...prev.automation, ...updates },
    }));
  };

  const resetCampaign = () => {
    setCampaign(initialState);
  };

  return (
    <CampaignContext.Provider
      value={{ campaign, updateCampaign, updateMessage, updateAutomation, resetCampaign }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
};
