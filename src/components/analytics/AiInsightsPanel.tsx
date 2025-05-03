
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronUp, Zap } from "lucide-react";
import { useState } from "react";

interface Insight {
  id: string;
  title: string;
  description: string;
  category: "improvement" | "opportunity" | "warning";
  change?: {
    value: string;
    trend: "up" | "down";
  };
}

const aiInsights: Insight[] = [
  {
    id: "1",
    title: "WhatsApp campaign performance",
    description: "Your WhatsApp campaigns performed 28% better than email campaigns this week due to higher reply rates.",
    category: "improvement",
    change: {
      value: "28%",
      trend: "up",
    },
  },
  {
    id: "2",
    title: "Optimal SMS send time",
    description: "SMS campaigns sent between 12-2 PM have 32% higher response rates than those sent at other times.",
    category: "opportunity",
    change: {
      value: "32%",
      trend: "up",
    },
  },
  {
    id: "3",
    title: "High unsubscribe rates",
    description: "The 'Spring Sale' email campaign had an unsubscribe rate of 4.2%, which is 2.8% higher than your average.",
    category: "warning",
    change: {
      value: "2.8%",
      trend: "up",
    },
  },
  {
    id: "4",
    title: "Audience segment opportunity",
    description: "Creating a dedicated segment for users who clicked but didn't purchase could increase conversions by ~15%.",
    category: "opportunity",
    change: {
      value: "15%",
      trend: "up",
    },
  },
];

export function AiInsightsPanel() {
  const [emailReports, setEmailReports] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronUp className={`h-4 w-4 ${collapsed ? 'rotate-180' : ''} transition-transform`} />
      </Button>
      
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
        </div>
      </CardHeader>
      
      {!collapsed && (
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div 
                key={insight.id}
                className="rounded-lg border bg-card p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        insight.category === "improvement" ? "default" :
                        insight.category === "opportunity" ? "secondary" : "destructive"
                      }
                    >
                      {insight.category === "improvement" ? "Improvement" :
                       insight.category === "opportunity" ? "Opportunity" : "Warning"}
                    </Badge>
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  
                  {insight.change && (
                    <Badge 
                      variant={insight.change.trend === "up" ? "outline" : "outline"}
                      className={
                        insight.category === "warning" && insight.change.trend === "up"
                          ? "bg-destructive/10 text-destructive"
                          : insight.change.trend === "up"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }
                    >
                      {insight.change.trend === "up" ? "↑" : "↓"} {insight.change.value}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="weekly-insights" 
                  checked={emailReports} 
                  onCheckedChange={setEmailReports} 
                />
                <Label htmlFor="weekly-insights">Receive weekly AI insights report via email</Label>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
