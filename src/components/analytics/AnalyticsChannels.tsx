
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, MessageCircle } from "lucide-react";

const channelComparisonData = [
  { 
    name: "Email", 
    openRate: 24.5, 
    clickRate: 8.7, 
    replyRate: 4.2, 
    conversionRate: 2.1 
  },
  { 
    name: "SMS", 
    openRate: 92.8, 
    clickRate: 10.4, 
    replyRate: 8.6, 
    conversionRate: 3.8 
  },
  { 
    name: "WhatsApp", 
    openRate: 96.2, 
    clickRate: 18.9, 
    replyRate: 14.7, 
    conversionRate: 5.6 
  },
  { 
    name: "Live Chat", 
    openRate: 89.5, 
    clickRate: 26.8, 
    replyRate: 22.4, 
    conversionRate: 7.2 
  },
];

const costPerLeadData = [
  { name: "Email", value: 2.4 },
  { name: "SMS", value: 3.8 },
  { name: "WhatsApp", value: 4.2 },
  { name: "Live Chat", value: 5.5 },
  { name: "Google Ads", value: 12.8 },
  { name: "Meta Ads", value: 10.5 },
];

const recommendations = [
  {
    id: "1",
    channel: "WhatsApp",
    content: "WhatsApp has a 14.7% reply rate, which is 3.5x higher than email. Consider shifting 20% of your email campaigns to WhatsApp for better engagement.",
    metric: "+14.7%",
    metricLabel: "reply rate"
  },
  {
    id: "2",
    channel: "Email",
    content: "Your email open rates increased by 8.3% after subject line optimization. Continue A/B testing subject lines to improve performance.",
    metric: "+8.3%",
    metricLabel: "open rate"
  },
  {
    id: "3",
    channel: "Live Chat",
    content: "Live chat has the highest conversion rate among all channels. Add chat widgets to your high-traffic product pages to capture more leads.",
    metric: "7.2%",
    metricLabel: "conversion"
  },
];

export function AnalyticsChannels() {
  const config = {
    openRate: {
      label: "Open Rate",
      theme: {
        light: "#5E5CE6",
        dark: "#5E5CE6",
      },
    },
    clickRate: {
      label: "Click Rate",
      theme: {
        light: "#2DD4BF",
        dark: "#2DD4BF",
      },
    },
    replyRate: {
      label: "Reply Rate",
      theme: {
        light: "#FF7E67",
        dark: "#FF7E67",
      },
    },
    conversionRate: {
      label: "Conversion Rate",
      theme: {
        light: "#A099FF",
        dark: "#A099FF",
      },
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      case 'live chat':
        return <Phone className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Email Performance" 
          value="24.5%" 
          description="Open rate"
          icon={<Mail />}
          trend="up"
          trendValue="3.2%"
        />
        <StatsCard 
          title="SMS Performance" 
          value="8.6%"
          description="Reply rate"
          icon={<MessageSquare />}
          trend="up"
          trendValue="1.4%"
        />
        <StatsCard 
          title="WhatsApp Performance" 
          value="14.7%"
          description="Reply rate"
          icon={<MessageCircle />}
          trend="up"
          trendValue="2.8%"
        />
        <StatsCard 
          title="Live Chat Performance" 
          value="7.2%"
          description="Conversion rate"
          icon={<Phone />}
          trend="up"
          trendValue="0.5%"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Channel Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, ""]}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="openRate" name="Open Rate" fill="var(--color-openRate)" />
                  <Bar dataKey="clickRate" name="Click Rate" fill="var(--color-clickRate)" />
                  <Bar dataKey="replyRate" name="Reply Rate" fill="var(--color-replyRate)" />
                  <Bar dataKey="conversionRate" name="Conversion Rate" fill="var(--color-conversionRate)" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Cost Per Lead by Channel" 
          description="Average cost to acquire a lead across channels" 
          type="bar"
          data={costPerLeadData}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Channel Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id} 
                  className="p-4 rounded-lg border bg-card flex gap-4 items-start"
                >
                  <div className="mt-0.5">
                    {getChannelIcon(rec.channel)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{rec.channel}</Badge>
                      <Badge variant="default" className="bg-green-500">
                        {rec.metric} {rec.metricLabel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
