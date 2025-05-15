
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIAssistantInterface } from "@/components/ai-assistant/AIAssistantInterface";
import { AssistantCampaigns } from "@/components/ai-assistant/AssistantCampaigns";
import { AssistantPlugins } from "@/components/ai-assistant/AssistantPlugins";
import { AIAvatar } from "@/components/ai-assistant/AIAvatar";
import { 
  MessageSquare, 
  FileText, 
  PlugZap, 
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIFloatingButton } from "@/components/ai-assistant/AIFloatingButton";
import { OpenAIProvider } from "@/contexts/OpenAIContext";

const Assistant = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [autoActionsEnabled, setAutoActionsEnabled] = useState(true);
  const [aiState, setAiState] = useState<"online" | "processing" | "error" | "idle">("online");
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  // Toggle auto-actions
  const handleAutoActionsToggle = (enabled: boolean) => {
    setAutoActionsEnabled(enabled);
  };

  return (
    <Layout>
      <OpenAIProvider>
        <div className="container mx-auto py-4 h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" /> AI Assistant
              </h1>
              <p className="text-muted-foreground">Your intelligent marketing co-pilot</p>
            </div>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>AI Chat</span>
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Campaigns</span>
                </TabsTrigger>
                <TabsTrigger value="plugins" className="flex items-center gap-1">
                  <PlugZap className="h-4 w-4" />
                  <span>Plugins</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                {activeTab === "chat" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowFloatingButton(!showFloatingButton)}
                  >
                    {showFloatingButton ? "Hide" : "Show"} Floating Button
                  </Button>
                )}
              </div>
            </div>
            
            <TabsContent value="chat" className="flex-1 overflow-hidden">
              <AIAssistantInterface 
                autoActionsEnabled={autoActionsEnabled} 
                onAutoActionsToggle={handleAutoActionsToggle}
              />
            </TabsContent>
            
            <TabsContent value="campaigns" className="flex-1 overflow-auto">
              <AssistantCampaigns />
            </TabsContent>
            
            <TabsContent value="plugins" className="flex-1 overflow-auto">
              <AssistantPlugins />
            </TabsContent>
          </Tabs>
          
          {/* Floating Assistant Button - only visible on certain tabs */}
          {showFloatingButton && activeTab !== "chat" && (
            <AIFloatingButton className="bottom-6 right-6" />
          )}

          {/* Fixed position AI Avatar - only visible on tab changes or when the chat is inactive */}
          {activeTab !== "chat" && (
            <AIAvatar 
              state={aiState} 
              className="bottom-6 right-6" 
            />
          )}
        </div>
      </OpenAIProvider>
    </Layout>
  );
};

export default Assistant;
