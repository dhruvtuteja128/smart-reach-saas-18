
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIAssistantAPISettings } from "@/components/ai-assistant/AIAssistantAPISettings";
import { Zap, MessageSquare, Bot } from "lucide-react";

export function AISettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Settings</h1>
        <p className="text-muted-foreground">
          Configure AI features, API connections, and behavior preferences.
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> API Connection
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Assistant Settings
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Bot className="h-4 w-4" /> Voice & Behavior
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <AIAssistantAPISettings />
        </TabsContent>

        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>
                Configure how the AI assistant behaves and responds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Assistant settings content will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>Voice & Behavior Settings</CardTitle>
              <CardDescription>
                Configure voice recognition, speech patterns, and AI personality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Voice and behavior settings content will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
