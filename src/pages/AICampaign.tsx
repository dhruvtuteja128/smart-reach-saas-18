
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CampaignBuilder } from "@/components/campaigns/CampaignBuilder";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

const AICampaign = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Create New Campaign</h1>
          <p className="text-muted-foreground mt-1">
            Build an AI-powered campaign that drives results across channels
          </p>
        </header>
        
        <CampaignBuilder isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default AICampaign;
