import { useState } from "react";
import { useCampaign } from "@/components/campaigns/CampaignContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Sparkles, Save, Palette, Image, FileUp, MessageCircle, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const CampaignMessage = () => {
  const { campaign, updateMessage } = useCampaign();
  const [goal, setGoal] = useState(campaign.message.goal || "");
  const [generating, setGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("compose");

  const handleGenerateContent = () => {
    if (!goal) {
      toast({
        title: "Error", 
        description: "Please enter a campaign goal first",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      let subject = "";
      let content = "";
      
      if (campaign.type === "email") {
        subject = "Special Offer Just For You - Limited Time!";
        content = `Hi {first_name},\n\nWe noticed you've been looking at our premium products recently. We'd love to offer you a special 20% discount on your next purchase!\n\nUse code SPECIAL20 at checkout to claim your discount. This offer is valid for the next 7 days only.\n\nBest regards,\nThe Marketing Team`;
      } else if (campaign.type === "sms" || campaign.type === "whatsapp") {
        content = `Hi {first_name}! Exclusive offer: 20% off your next purchase with code SPECIAL20. Valid for 7 days only. Reply STOP to opt out.`;
      } else {
        // Ads
        subject = "Save 20% On Your Next Purchase";
        content = `Limited time offer! Get 20% off sitewide. Use code SPECIAL20 at checkout.`;
      }
      
      updateMessage({
        subject: subject,
        content: content,
        goal: goal
      });
      
      setGenerating(false);
      
      toast({
        title: "Content generated",
        description: "AI has created message content based on your goal"
      });
    }, 2000);
  };

  const handleToggleAiOptimization = (checked: boolean) => {
    updateMessage({ aiOptimized: checked });
    
    toast({
      title: checked ? "AI optimization enabled" : "AI optimization disabled",
      description: checked 
        ? "Campaign will be automatically optimized for better performance" 
        : "Campaign will use your content without optimization"
    });
  };

  const handleSaveAsTemplate = () => {
    toast({
      title: "Template saved", 
      description: "Your message has been saved as a template" 
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Step 3: Create Message</h2>
      <p className="text-muted-foreground mb-6">Design your campaign message with AI assistance</p>
      
      <Card className="p-4 border border-primary/20 bg-primary/5 mb-6">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">AI-powered content creation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Describe your campaign goal and let our AI generate optimized content for you
            </p>
            
            <div className="mb-4">
              <Label htmlFor="campaign-goal">Campaign Goal</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="campaign-goal" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="E.g., Promote 20% discount to inactive customers"
                  className="flex-1"
                />
                <Button 
                  onClick={handleGenerateContent} 
                  disabled={generating || !goal}
                  className="whitespace-nowrap"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {generating ? "Generating..." : "Generate Content"}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="ai-optimize"
                checked={campaign.message.aiOptimized}
                onCheckedChange={handleToggleAiOptimization}
              />
              <Label htmlFor="ai-optimize">Enable AI optimization (improves performance over time)</Label>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">
            <FileText className="h-4 w-4 mr-2" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="preview">
            <MessageCircle className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-4">
          {(campaign.type === "email" || campaign.type === "ads") && (
            <div>
              <Label htmlFor="subject">Subject Line / Headline</Label>
              <Input 
                id="subject"
                value={campaign.message.subject || ""}
                onChange={(e) => updateMessage({ subject: e.target.value })}
                placeholder="Enter subject line or headline"
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="message-content">Message Content</Label>
            <div className="mt-1 relative">
              <Textarea 
                id="message-content"
                value={campaign.message.content}
                onChange={(e) => updateMessage({ content: e.target.value })}
                placeholder="Enter your message content here..."
                className="min-h-[200px]"
              />
              
              <div className="absolute right-2 bottom-2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                  <Palette className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Available personalization: <Badge variant="outline" className="text-xs">&#123;first_name&#125;</Badge> <Badge variant="outline" className="text-xs">&#123;last_name&#125;</Badge> <Badge variant="outline" className="text-xs">&#123;product&#125;</Badge>
            </div>
          </div>
          
          {(campaign.type === "email" || campaign.type === "ads") && (
            <div>
              <Label>Media</Label>
              <div className="mt-1 border-2 border-dashed rounded-lg p-6 text-center">
                <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                <p className="text-xs text-muted-foreground mb-3">Supports: JPG, PNG, GIF (Max 5MB)</p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="border rounded-lg p-4">
            <div className="bg-background rounded-lg shadow-sm border p-4">
              {campaign.type === "email" && (
                <>
                  <div className="text-sm font-medium border-b pb-2 mb-2">
                    Subject: {campaign.message.subject || "No subject"}
                  </div>
                  <div className="whitespace-pre-line">
                    {campaign.message.content || "No content created yet"}
                  </div>
                </>
              )}
              
              {(campaign.type === "sms" || campaign.type === "whatsapp") && (
                <div className="bg-primary/5 rounded-lg p-3 max-w-xs mx-auto">
                  <div className="text-sm whitespace-pre-line">
                    {campaign.message.content || "No content created yet"}
                  </div>
                </div>
              )}
              
              {campaign.type === "ads" && (
                <div className="border rounded-md p-3">
                  <div className="font-semibold text-base mb-2">
                    {campaign.message.subject || "Ad Headline"}
                  </div>
                  <div className="bg-muted/50 h-36 flex items-center justify-center rounded mb-2">
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-sm">
                    {campaign.message.content || "Ad content will appear here"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button variant="outline" onClick={handleSaveAsTemplate}>
          <Save className="h-4 w-4 mr-2" />
          Save as Template
        </Button>
      </div>
    </div>
  );
};
