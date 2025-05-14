
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AIChat } from "@/components/ai-assistant/AIChat";
import { AssistantPage } from "@/components/ai-assistant/AssistantPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, MessageSquare, Play, Edit } from "lucide-react";

const Assistant = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [smartMode, setSmartMode] = useState(true);

  return (
    <Layout>
      <div className="container mx-auto py-6 h-full flex flex-col">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <TabsList className="mb-6 w-full grid grid-cols-4 md:w-auto md:grid-cols-none">
            <TabsTrigger value="assistant" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span>AI Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-1">
              <Play className="h-4 w-4" />
              <span>Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="plugins" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              <span>Plugins</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant" className="flex-1 overflow-auto">
            <AssistantPage />
          </TabsContent>
          
          <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col">
            <AIChat smartMode={smartMode} />
          </TabsContent>
          
          <TabsContent value="campaigns" className="flex-1 overflow-auto">
            <div className="bg-muted/40 rounded-lg border p-8 text-center">
              <h3 className="text-lg font-medium mb-2">AI Campaign Builder</h3>
              <p className="text-muted-foreground mb-4">
                Create and manage AI-generated campaigns across multiple channels.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["Meta Ads", "Google Ads", "Email", "SMS", "WhatsApp"].map((channel) => (
                  <div 
                    key={channel}
                    className="bg-background rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium">{channel}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Create campaign</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="plugins" className="flex-1 overflow-auto">
            <div className="bg-muted/40 rounded-lg border p-8 text-center">
              <h3 className="text-lg font-medium mb-2">AI Plugin Marketplace</h3>
              <p className="text-muted-foreground mb-4">
                Extend your AI assistant with powerful integrations.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["Calendly", "HubSpot", "Shopify", "Stripe", "Zapier", "Twitter", "LinkedIn", "Instagram"].map((plugin) => (
                  <div 
                    key={plugin}
                    className="bg-background rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium">{plugin}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Install plugin</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Assistant;
