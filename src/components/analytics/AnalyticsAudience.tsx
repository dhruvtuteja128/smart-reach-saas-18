
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <div className="space-y-8">
      {/* Cohort Analysis Chart - Full width with proper height */}
      <Card>
        <CardHeader>
          <CardTitle>Cohort Analysis: Retention by Month</CardTitle>
          <CardDescription>User retention rates over time for different cohorts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cohortData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barCategoryGap={10}
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`} 
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    tickMargin={10}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Retention"]}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    animationDuration={300}
                  />
                  <Bar dataKey="Month 1" fill="#5E5CE6" radius={[2, 2, 0, 0]}>
                    <Legend />
                  </Bar>
                  <Bar dataKey="Month 2" fill="#7E69AB" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Month 3" fill="#9B87F5" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Month 4" fill="#D6BCFA" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Month 5" fill="#E5DEFF" radius={[2, 2, 0, 0]} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconSize={10}
                    wrapperStyle={{ paddingTop: '10px' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Two column layout for smaller charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Time of Day Engagement Chart */}
        <Card className="overflow-visible">
          <CardHeader>
            <CardTitle>Time of Day Engagement</CardTitle>
            <CardDescription>When your audience is most active during the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeOfDayData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  barCategoryGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 11 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickMargin={10}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}% engagement`, "Activity"]}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey="engagement" 
                    fill="#2DD4BF" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1200}
                    animationBegin={200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Step-by-step conversion metrics with drop-off rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] flex flex-col justify-center space-y-6">
              {dropoffs.map((step, index) => (
                <div key={step.name} className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm font-mono">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="relative">
                    <div className="h-9 w-full bg-muted rounded-md overflow-hidden">
                      <div 
                        className="h-full rounded-md bg-primary transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${index === 0 ? 100 : (step.value / dropoffs[0].value * 100)}%`,
                        }}
                      />
                    </div>
                    {index > 0 && (
                      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-sm font-medium">
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
