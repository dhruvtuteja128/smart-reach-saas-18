
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
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cohortData = [
  { month: "Jan", "Month 1": 100, "Month 2": 82, "Month 3": 74, "Month 4": 68, "Month 5": 60 },
  { month: "Feb", "Month 1": 100, "Month 2": 85, "Month 3": 76, "Month 4": 69 },
  { month: "Mar", "Month 1": 100, "Month 2": 80, "Month 3": 72 },
  { month: "Apr", "Month 1": 100, "Month 2": 78 },
  { month: "May", "Month 1": 100 },
];

const timeOfDayData = [
  { hour: "12am", engagement: 2 },
  { hour: "2am", engagement: 1 },
  { hour: "4am", engagement: 0.5 },
  { hour: "6am", engagement: 3 },
  { hour: "8am", engagement: 15 },
  { hour: "10am", engagement: 32 },
  { hour: "12pm", engagement: 45 },
  { hour: "2pm", engagement: 52 },
  { hour: "4pm", engagement: 48 },
  { hour: "6pm", engagement: 35 },
  { hour: "8pm", engagement: 20 },
  { hour: "10pm", engagement: 10 },
];

const funnelData = [
  { name: "Viewed", value: 8540 },
  { name: "Clicked", value: 5280 },
  { name: "Replied", value: 1420 },
  { name: "Converted", value: 480 },
];

export function AnalyticsAudience() {
  const config = {
    retention: {
      label: "Retention",
      theme: {
        light: "#5E5CE6",
        dark: "#5E5CE6",
      },
    },
    engagement: {
      label: "Engagement Score",
      theme: {
        light: "#2DD4BF",
        dark: "#2DD4BF",
      },
    }
  };

  // Calculate funnel drop-offs
  const calculateDropoff = (current: number, previous: number) => {
    return ((previous - current) / previous * 100).toFixed(1);
  };

  const dropoffs = funnelData.map((item, index, arr) => {
    if (index === 0) return { ...item, dropoff: 0 };
    return {
      ...item,
      dropoff: calculateDropoff(item.value, arr[index - 1].value)
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cohort Analysis: Retention by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cohortData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Bar dataKey="Month 1" fill="#5E5CE6" />
                  <Bar dataKey="Month 2" fill="#7E69AB" />
                  <Bar dataKey="Month 3" fill="#9B87F5" />
                  <Bar dataKey="Month 4" fill="#D6BCFA" />
                  <Bar dataKey="Month 5" fill="#E5DEFF" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Time of Day Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeOfDayData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip
                    formatter={(value) => [`${value}% engagement`, "Activity"]}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="engagement" fill="#2DD4BF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col justify-center">
              {dropoffs.map((step, index) => (
                <div key={step.name} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="h-8 w-full bg-muted rounded-md overflow-hidden relative">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${index === 0 ? 100 : (step.value / dropoffs[0].value * 100)}%`,
                        transition: "width 0.5s ease-in-out" 
                      }}
                    />
                    {index > 0 && (
                      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-destructive text-xs text-white px-2 py-0.5 rounded-sm">
                        -{step.dropoff}%
                      </div>
                    )}
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
