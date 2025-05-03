
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { AnalyticsCampaigns } from "@/components/analytics/AnalyticsCampaigns";
import { AnalyticsAudience } from "@/components/analytics/AnalyticsAudience";
import { AnalyticsRevenue } from "@/components/analytics/AnalyticsRevenue";
import { AnalyticsFunnels } from "@/components/analytics/AnalyticsFunnels";
import { AnalyticsChannels } from "@/components/analytics/AnalyticsChannels";
import { AnalyticsDatePicker } from "@/components/analytics/AnalyticsDatePicker";
import { AnalyticsSegmentPicker } from "@/components/analytics/AnalyticsSegmentPicker";
import { AiInsightsPanel } from "@/components/analytics/AiInsightsPanel";
import { Lightbulb } from "lucide-react";

const Analytics = () => {
  const [showInsights, setShowInsights] = useState(false);

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Attribution</h1>
            <p className="text-muted-foreground mt-1">
              Track performance and measure ROI across all your marketing channels
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <AnalyticsDatePicker />
            <AnalyticsSegmentPicker />
            <Button 
              variant="outline" 
              onClick={() => setShowInsights(!showInsights)}
              className="flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              AI Insights
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-6">
          {showInsights && <AiInsightsPanel />}
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience Behavior</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="funnels">Funnels</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <AnalyticsOverview />
            </TabsContent>
            
            <TabsContent value="campaigns">
              <AnalyticsCampaigns />
            </TabsContent>
            
            <TabsContent value="audience">
              <AnalyticsAudience />
            </TabsContent>
            
            <TabsContent value="revenue">
              <AnalyticsRevenue />
            </TabsContent>
            
            <TabsContent value="funnels">
              <AnalyticsFunnels />
            </TabsContent>
            
            <TabsContent value="channels">
              <AnalyticsChannels />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
