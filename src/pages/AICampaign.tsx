
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CampaignBuilder } from "@/components/campaigns/CampaignBuilder";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AICampaign = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  
  // Get campaign ID from URL params if editing
  const searchParams = new URLSearchParams(location.search);
  const campaignId = searchParams.get('id');
  
  useEffect(() => {
    // Check if this is an edit or new campaign
    if (campaignId) {
      setIsEdit(true);
      toast({
        title: "Editing campaign",
        description: "You are now editing an existing campaign"
      });
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [campaignId, toast]);

  const handleBack = () => {
    navigate("/campaigns");
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-2" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaigns
        </Button>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Campaign" : "Create New Campaign"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit 
              ? "Update your campaign settings and content" 
              : "Build an AI-powered campaign that drives results across channels"}
          </p>
        </header>
        
        <CampaignBuilder isLoading={isLoading} campaignId={campaignId} />
      </div>
    </Layout>
  );
};

export default AICampaign;
