
import { useState } from "react";
import { Bot, Settings2, ListChecks, ClipboardCheck, Clock, MessageSquare, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AIAssistantStats } from "./AIAssistantStats";
import { AITaskList } from "./AITaskList";
import { AISettings } from "./AISettings";
import { AIAvatar } from "./AIAvatar";
import { toast } from "@/hooks/use-toast";
import { AITask } from "./AITaskCard";

// Mock data
const mockTasks: AITask[] = [
  {
    id: "task-1",
    type: "campaign",
    title: "Google Ads Headline Optimization",
    description: "AI has generated new headlines for your underperforming Google search campaign.",
    reason: "Your CTR is 0.8%, which is below the industry average of 2.1%",
    status: "draft",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    preview: "Original: 'Web Design Agency for Small Business'\n\nSuggested: '10X Your Online Growth | Expert Web Design Agency'\n\nExpected CTR improvement: +45%"
  },
  {
    id: "task-2",
    type: "review",
    title: "Response to 2-Star Review",
    description: "AI has drafted a professional response to a recent negative review.",
    reason: "Customer mentioned slow response time and service issues",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    preview: "Thank you for your feedback, John. We sincerely apologize for the delays you experienced with our customer service team. Your concerns have been forwarded to our operations manager, and we've already implemented changes to our response protocol. We'd appreciate the opportunity to make things right - please contact me directly at manager@company.com so we can resolve your specific issues."
  },
  {
    id: "task-3",
    type: "crm",
    title: "Lead Prioritization",
    description: "AI has identified 5 high-priority leads that need immediate follow-up.",
    reason: "Engagement score > 85 and recent website visits to pricing page",
    status: "in-progress",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    preview: "High Priority Leads:\n1. Tech Solutions Inc. - Visited pricing page 4 times in 24 hours\n2. Global Enterprises - Downloaded whitepaper and watched demo\n3. Smith Consulting - Opened 6 emails, clicked on 'contact sales'\n4. Acme Corporation - Form submission with budget >$10k\n5. Johnson & Partners - Return visitor, 12+ page views"
  },
  {
    id: "task-4",
    type: "workflow",
    title: "Email Nurture Workflow",
    description: "AI has created an email nurture sequence for new trial signups.",
    reason: "Current conversion rate from trial to paid is 12%, below target of 20%",
    status: "draft",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    preview: "5-Part Email Sequence:\n1. Day 1: Welcome & Quick Wins\n2. Day 3: Feature Highlight & Use Cases\n3. Day 7: Success Stories & Case Studies\n4. Day 10: Advanced Features & Integrations\n5. Day 13: Limited-Time Upgrade Offer\n\nEstimated improvement: +30% conversion rate"
  },
  {
    id: "task-5",
    type: "content",
    title: "Social Media Content Calendar",
    description: "AI has generated a 2-week content calendar for your social channels.",
    reason: "Engagement dropped by 18% in the last month",
    status: "rejected",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    preview: "Week 1:\nMonday: Industry Tip + Infographic\nWednesday: Customer Spotlight\nFriday: Behind-the-Scenes + Team Feature\n\nWeek 2:\nTuesday: Product Tutorial Video\nThursday: Poll/Question\nSaturday: Weekend Special Offer"
  }
];

export function AssistantPage() {
  const [autoActionsEnabled, setAutoActionsEnabled] = useState(false);
  const [aiState, setAiState] = useState<"online" | "processing" | "error" | "idle">("online");
  const [currentTab, setCurrentTab] = useState("suggestions");
  
  const handleAutoActionsToggle = (enabled: boolean) => {
    setAutoActionsEnabled(enabled);
    toast({
      title: enabled ? "Auto-actions enabled" : "Auto-actions disabled",
      description: enabled 
        ? "AI assistant will now automatically perform selected actions." 
        : "AI assistant will ask for approval before taking actions."
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8" /> AI Assistant
          </h1>
          <p className="text-muted-foreground">Your marketing automation co-pilot</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={autoActionsEnabled} 
              onCheckedChange={handleAutoActionsToggle} 
              id="auto-actions" 
            />
            <label 
              htmlFor="auto-actions" 
              className="text-sm font-medium cursor-pointer"
            >
              Auto-Actions
            </label>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setCurrentTab("settings")}>
            <Settings2 className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button variant="default" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>
      
      <AIAssistantStats />
      
      <Tabs 
        defaultValue="suggestions" 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="mt-8"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="suggestions" className="flex items-center gap-1">
            <ListChecks className="h-4 w-4" />
            <span>Suggestions</span>
          </TabsTrigger>
          <TabsTrigger value="executed" className="flex items-center gap-1">
            <ClipboardCheck className="h-4 w-4" />
            <span>Executed</span>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>In Progress</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings2 className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions" className="space-y-4">
          <AITaskList 
            tasks={mockTasks.filter(task => task.status === "draft")} 
          />
        </TabsContent>
        
        <TabsContent value="executed" className="space-y-4">
          <AITaskList 
            tasks={mockTasks.filter(task => task.status === "approved" || task.status === "rejected")} 
          />
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <AITaskList 
            tasks={mockTasks.filter(task => task.status === "in-progress")} 
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <AISettings />
        </TabsContent>
      </Tabs>
      
      {/* Fixed position AI Avatar */}
      <AIAvatar 
        state={aiState} 
        className="bottom-6 right-6" 
      />
    </div>
  );
}
