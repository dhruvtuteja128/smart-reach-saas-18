
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
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
  ResponsiveContainer,
  Cell
} from "recharts";
import { DollarSign, TrendingUp, Clock, LineChart } from "lucide-react";

const revenueBySourceData = [
  { name: "Email", value: 18500 },
  { name: "WhatsApp", value: 12400 },
  { name: "SMS", value: 8700 },
  { name: "Google Ads", value: 25600 },
  { name: "Meta Ads", value: 19200 },
  { name: "Organic", value: 9800 },
];

const roasData = [
  { name: "Email", value: 12.4 },
  { name: "WhatsApp", value: 9.8 },
  { name: "SMS", value: 7.6 },
  { name: "Google Ads", value: 4.2 },
  { name: "Meta Ads", value: 3.8 },
];

const conversionTimeData = [
  { name: "Same Day", value: 28 },
  { name: "1-3 Days", value: 42 },
  { name: "4-7 Days", value: 18 },
  { name: "8-14 Days", value: 8 },
  { name: "15+ Days", value: 4 },
];

export function AnalyticsRevenue() {
  const config = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#5E5CE6",
        dark: "#5E5CE6",
      },
    },
    roas: {
      label: "ROAS",
      theme: {
        light: "#2DD4BF",
        dark: "#2DD4BF",
      },
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Revenue" 
          value="$94,200" 
          description="From all campaigns"
          icon={<DollarSign />}
          trend="up"
          trendValue="12.5%"
        />
        <StatsCard 
          title="Avg. ROAS" 
          value="5.8x"
          description="Return on ad spend"
          icon={<TrendingUp />}
          trend="up"
          trendValue="0.4x"
        />
        <StatsCard 
          title="Avg. Time to Conversion" 
          value="3.2 days"
          description="From first contact"
          icon={<Clock />}
          trend="down"
          trendValue="0.5 days"
        />
        <StatsCard 
          title="Customer LTV" 
          value="$842"
          description="Lifetime value"
          icon={<LineChart />}
          trend="up"
          trendValue="5.8%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Revenue by Channel</h3>
          <div className="h-[350px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueBySourceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Bar dataKey="value" name="Revenue">
                    {revenueBySourceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? "#5E5CE6" : "#7E69AB"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">ROAS by Channel</h3>
          <div className="h-[350px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roasData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value.toFixed(1)}x`} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Bar dataKey="value" name="ROAS">
                    {roasData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? "#2DD4BF" : "#22D3EE"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
      
      <div>
        <ChartCard 
          title="Time to Conversion" 
          description="Average days from first touchpoint to purchase" 
          type="pie"
          data={conversionTimeData}
        />
      </div>
    </div>
  );
}
