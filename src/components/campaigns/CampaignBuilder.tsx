
import { useState } from "react";
import { CampaignProgress } from "@/components/campaigns/CampaignProgress";
import { CampaignType } from "@/components/campaigns/steps/CampaignType";
import { CampaignAudience } from "@/components/campaigns/steps/CampaignAudience";
import { CampaignMessage } from "@/components/campaigns/steps/CampaignMessage";
import { CampaignAutomation } from "@/components/campaigns/steps/CampaignAutomation";
import { CampaignReview } from "@/components/campaigns/steps/CampaignReview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { CampaignProvider } from "@/components/campaigns/CampaignContext";

export type CampaignStep = 1 | 2 | 3 | 4 | 5;

interface CampaignBuilderProps {
  isLoading: boolean;
}

export const CampaignBuilder = ({ isLoading }: CampaignBuilderProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CampaignStep>(1);
  
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as CampaignStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as CampaignStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Campaign saved",
      description: "Your campaign has been saved as a draft.",
    });
  };

  return (
    <CampaignProvider>
      <div className={isLoading ? "opacity-60 pointer-events-none" : ""}>
        <CampaignProgress currentStep={currentStep} />
        
        <div className="mt-8 bg-background rounded-lg border shadow-sm">
          <div className="p-6">
            {currentStep === 1 && <CampaignType />}
            {currentStep === 2 && <CampaignAudience />}
            {currentStep === 3 && <CampaignMessage />}
            {currentStep === 4 && <CampaignAutomation />}
            {currentStep === 5 && <CampaignReview />}
          </div>
          
          <div className="p-6 border-t bg-muted/40 flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNextStep}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button>
                  Launch Campaign
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </CampaignProvider>
  );
};
