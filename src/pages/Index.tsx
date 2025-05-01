
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { AiSuggestionCard } from "@/components/dashboard/AiSuggestionCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, MessageCircle, Mail, BarChart3, Star, FileText, Zap } from "lucide-react";

// Mock data
const performanceData = [
  { name: "Mon", value: 420 },
  { name: "Tue", value: 380 },
  { name: "Wed", value: 550 },
  { name: "Thu", value: 490 },
  { name: "Fri", value: 600 },
  { name: "Sat", value: 450 },
  { name: "Sun", value: 470 },
];

const channelData = [
  { name: "Email", value: 42 },
  { name: "SMS", value: 28 },
  { name: "Chat", value: 15 },
  { name: "Ads", value: 15 },
];

const recentActivities = [
  {
    id: "1",
    title: "New Lead: Sarah Johnson",
    description: "Submitted contact form on pricing page",
    timestamp: "10m ago",
    icon: <Users className="h-4 w-4 text-primary" />,
    type: "system"
  },
  {
    id: "2",
    title: "Email Campaign: Summer Promotion",
    description: "32% open rate, 12% click-through",
    timestamp: "1h ago",
    icon: <Mail className="h-4 w-4 text-primary" />,
    type: "email"
  },
  {
    id: "3",
    title: "Review: ABC Car Dealership",
    description: "⭐⭐⭐⭐⭐ Great experience with the sales team!",
    timestamp: "3h ago",
    icon: <Star className="h-4 w-4 text-primary" />,
    type: "review"
  },
  {
    id: "4",
    title: "SMS: Appointment Reminder",
    description: "198 recipients, 2 replies",
    timestamp: "5h ago",
    icon: <MessageCircle className="h-4 w-4 text-primary" />,
    type: "sms"
  },
  {
    id: "5",
    title: "Meta Ad Performance: Spring Collection",
    description: "$246 spent, 36 conversions, 3.2x ROAS",
    timestamp: "12h ago",
    icon: <FileText className="h-4 w-4 text-primary" />,
    type: "system"
  },
];

const aiSuggestions = [
  {
    id: "1",
    content: "Your Google Ads have low click-through rates. Consider updating headlines with more compelling copy."
  },
  {
    id: "2",
    content: "SMS campaign open rates are dropping. Try sending between 2-4pm for better engagement based on customer behavior."
  },
  {
    id: "3",
    content: "Website chat widget is seeing increased traffic. Consider adding an AI chatbot to handle common questions."
  }
];

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSuggestionAction = (id: string) => {
    toast({
      title: "Applied suggestion",
      description: "The AI recommendation has been implemented.",
    });
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your marketing performance and campaigns
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Leads" 
            value="1,284"
            trend="up"
            trendValue="12.5%"
            icon={<Users className="h-5 w-5" />}
            className={isLoading ? "animate-pulse" : ""}
          />
          <StatsCard 
            title="Average CTR" 
            value="3.2%"
            trend="down"
            trendValue="0.8%"
            icon={<FileText className="h-5 w-5" />}
            className={isLoading ? "animate-pulse" : ""}
          />
          <StatsCard 
            title="Revenue" 
            value="$24,580"
            trend="up"
            trendValue="18.2%"
            icon={<BarChart3 className="h-5 w-5" />}
            className={isLoading ? "animate-pulse" : ""}
          />
          <StatsCard 
            title="Avg. Rating" 
            value="4.8"
            description="Based on 142 reviews"
            icon={<Star className="h-5 w-5" />}
            className={isLoading ? "animate-pulse" : ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <ChartCard
            title="Weekly Performance"
            type="line"
            data={performanceData}
            className={`lg:col-span-2 ${isLoading ? "animate-pulse" : ""}`}
          />

          {/* Channel Distribution */}
          <ChartCard
            title="Channel Distribution"
            type="pie"
            data={channelData}
            className={isLoading ? "animate-pulse" : ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Suggestions */}
          <div className={`lg:col-span-1 ${isLoading ? "animate-pulse" : ""}`}>
            <AiSuggestionCard
              title="AI Recommendations"
              suggestions={aiSuggestions}
              onAction={handleSuggestionAction}
            />
            
            <div className="mt-6 bg-primary/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-semibold">AI Marketing Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Generate content, optimize campaigns, and get insights with our AI assistant.
              </p>
              <Button size="sm" className="w-full">
                <Zap className="h-4 w-4 mr-2" /> Launch Assistant
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`lg:col-span-2 ${isLoading ? "animate-pulse" : ""}`}>
            <RecentActivityCard
              title="Recent Activity"
              activities={recentActivities}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
