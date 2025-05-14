
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ThumbsUp, 
  ThumbsDown, 
  BarChart2, 
  MessageSquare,
  Search,
  Calendar,
  Download,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for visualization
const mockFeedbackData = {
  summary: {
    positive: 68,
    neutral: 14,
    negative: 18,
    total: 324,
  },
  trends: [
    { date: "Mon", positive: 36, negative: 5 },
    { date: "Tue", positive: 42, negative: 8 },
    { date: "Wed", positive: 31, negative: 12 },
    { date: "Thu", positive: 28, negative: 10 },
    { date: "Fri", positive: 38, negative: 7 },
    { date: "Sat", positive: 25, negative: 6 },
    { date: "Sun", positive: 32, negative: 4 },
  ],
  topIssues: [
    { issue: "Slow loading times", count: 28, sentiment: "negative" },
    { issue: "Difficult to navigate", count: 16, sentiment: "negative" },
    { issue: "Limited features", count: 12, sentiment: "negative" },
    { issue: "Confusing UI", count: 9, sentiment: "negative" },
  ],
  topPraises: [
    { issue: "Easy to use", count: 42, sentiment: "positive" },
    { issue: "Great customer support", count: 31, sentiment: "positive" },
    { issue: "Helpful features", count: 29, sentiment: "positive" },
    { issue: "Fast and reliable", count: 24, sentiment: "positive" },
  ],
};

interface AIFeedbackAnalyzerProps {
  className?: string;
}

export function AIFeedbackAnalyzer({ className }: AIFeedbackAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("7d");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Simple chart component for visualization
  const SimpleBarChart = ({ data }: { data: any[] }) => {
    const maxValue = Math.max(...data.map(item => Math.max(item.positive, item.negative)));
    
    return (
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="text-xs text-muted-foreground">{item.date}</div>
            <div className="flex h-4 w-full">
              <div 
                className="bg-green-500 rounded-l"
                style={{width: `${(item.positive / maxValue) * 100}%`}}
              />
              <div 
                className="bg-red-500 rounded-r"
                style={{width: `${(item.negative / maxValue) * 100}%`}}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-600">{item.positive}</span>
              <span className="text-red-600">{item.negative}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("bg-background rounded-lg border shadow-sm", className)}>
      <div className="p-4 border-b">
        <h3 className="font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          AI Feedback Analyzer
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze customer feedback and get actionable insights.
        </p>
      </div>
      
      <div className="p-4">
        {/* Search and Filter */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search feedback by keyword, product, or channel..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <Select value={period} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Analyze
            </Button>
          </div>
        </form>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Sentiment Trends</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Summary Numbers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground">Total Feedback</div>
                    <div className="text-2xl font-semibold mt-1">{mockFeedbackData.summary.total}</div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="text-xs text-muted-foreground">Positive</div>
                    <div className="text-2xl font-semibold mt-1 flex items-center">
                      <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                      {mockFeedbackData.summary.positive}%
                    </div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg border-l-4 border-gray-400">
                    <div className="text-xs text-muted-foreground">Neutral</div>
                    <div className="text-2xl font-semibold mt-1">{mockFeedbackData.summary.neutral}%</div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="text-xs text-muted-foreground">Negative</div>
                    <div className="text-2xl font-semibold mt-1 flex items-center">
                      <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                      {mockFeedbackData.summary.negative}%
                    </div>
                  </div>
                </div>
                
                {/* Sentiment Chart */}
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Sentiment Over Time
                  </h4>
                  <SimpleBarChart data={mockFeedbackData.trends} />
                </div>
                
                {/* Top Issues and Praises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="text-sm font-medium flex items-center text-red-500 gap-2 mb-2">
                      <ThumbsDown className="h-4 w-4" />
                      Top Issues
                    </h4>
                    <ul className="space-y-2">
                      {mockFeedbackData.topIssues.map((item, i) => (
                        <li key={i} className="flex justify-between items-center text-sm">
                          <span>{item.issue}</span>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="text-sm font-medium flex items-center text-green-500 gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4" />
                      Top Praises
                    </h4>
                    <ul className="space-y-2">
                      {mockFeedbackData.topPraises.map((item, i) => (
                        <li key={i} className="flex justify-between items-center text-sm">
                          <span>{item.issue}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Export Button */}
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="bg-card p-4 rounded-lg border text-center py-10">
              <h4 className="text-lg font-medium mb-2">Detailed Sentiment Trends</h4>
              <p className="text-muted-foreground mb-4">
                View detailed sentiment analysis trends over time.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="issues">
            <div className="bg-card p-4 rounded-lg border text-center py-10">
              <h4 className="text-lg font-medium mb-2">Detailed Issue Breakdown</h4>
              <p className="text-muted-foreground mb-4">
                View all identified issues and their impact.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="bg-card p-4 rounded-lg border text-center py-10">
              <h4 className="text-lg font-medium mb-2">AI-Generated Suggestions</h4>
              <p className="text-muted-foreground mb-4">
                Get actionable recommendations based on feedback analysis.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
