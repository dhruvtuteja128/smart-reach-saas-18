
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import {
  Users,
  Mail,
  BarChart3,
  MousePointerClick,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const engagementData = [
  { date: "Mon", opens: 120, clicks: 45, replies: 12 },
  { date: "Tue", opens: 180, clicks: 56, replies: 18 },
  { date: "Wed", opens: 165, clicks: 52, replies: 15 },
  { date: "Thu", opens: 190, clicks: 65, replies: 20 },
  { date: "Fri", opens: 220, clicks: 75, replies: 25 },
  { date: "Sat", opens: 95, clicks: 35, replies: 8 },
  { date: "Sun", opens: 75, clicks: 25, replies: 6 },
];

const sourceData = [
  { name: "Google Ads", value: 34 },
  { name: "WhatsApp", value: 25 },
  { name: "Email", value: 20 },
  { name: "Organic", value: 15 },
  { name: "Referral", value: 6 },
];

const COLORS = ["#5E5CE6", "#2DD4BF", "#FF7E67", "#A099FF", "#22D3EE", "#FB923C"];

export function AnalyticsOverview() {
  const config = {
    opens: {
      label: "Opens",
      theme: {
        light: "#5E5CE6",
        dark: "#5E5CE6",
      },
    },
    clicks: {
      label: "Clicks",
      theme: {
        light: "#2DD4BF",
        dark: "#2DD4BF",
      },
    },
    replies: {
      label: "Replies",
      theme: {
        light: "#FF7E67",
        dark: "#FF7E67",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard 
          title="Total Leads" 
          value="2,453" 
          description="+42 this month"
          icon={<Users />}
          trend="up"
          trendValue="3.2%"
        />
        <StatsCard 
          title="Messages Sent" 
          value="12,758"
          description="+1,247 this week"
          icon={<Mail />}
          trend="up"
          trendValue="8.7%"
        />
        <StatsCard 
          title="Open Rate" 
          value="24.8%"
          description="Industry avg: 21.5%"
          icon={<BarChart3 />}
          trend="up"
          trendValue="2.1%"
        />
        <StatsCard 
          title="Click Rate" 
          value="8.3%"
          description="Industry avg: 7.2%"
          icon={<MousePointerClick />}
          trend="up"
          trendValue="1.4%"
        />
        <StatsCard 
          title="Conversions" 
          value="487"
          description="From all campaigns"
          icon={<ShoppingBag />}
          trend="up"
          trendValue="12.5%"
        />
        <StatsCard 
          title="Revenue" 
          value="$28,459"
          description="Attributed to campaigns"
          icon={<DollarSign />}
          trend="up"
          trendValue="16.2%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartContainer className="h-[350px]" config={config}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name]}
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="opens"
                stroke="var(--color-opens)"
                fill="var(--color-opens)"
                fillOpacity={0.2}
                name="Opens"
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                fill="var(--color-clicks)"
                fillOpacity={0.2}
                name="Clicks"
              />
              <Area
                type="monotone"
                dataKey="replies"
                stroke="var(--color-replies)"
                fill="var(--color-replies)"
                fillOpacity={0.2}
                name="Replies"
              />
              <Legend />
            </AreaChart>
          </ChartContainer>
        </div>

        <div>
          <div className="rounded-xl border bg-card p-6 shadow-sm h-[350px] flex flex-col">
            <h3 className="font-semibold text-lg mb-6">Source Breakdown</h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
