
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Workflow,
  User,
  FileText,
  BarChart3,
  MessageCircle,
  Search,
  Settings,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AIToolsProps {
  activePanel: string | null;
  setActivePanel: (panel: string | null) => void;
}

export function AITools({ activePanel, setActivePanel }: AIToolsProps) {
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleGenerateCampaign = () => {
    toast.success("Campaign request sent to AI assistant");
  };
  
  const handleGenerateWorkflow = () => {
    toast.success("Workflow request sent to AI assistant");
  };
  
  const handleSearchQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching CRM for "${searchQuery}"`);
    }
  };
  
  const handleGenerateCopy = () => {
    toast.success("Copy generation request sent to AI assistant");
  };
  
  const handleAnalyticsQuery = () => {
    toast.success("Analytics query sent to AI assistant");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">AI Tools</h2>
        <p className="text-sm text-muted-foreground">
          Select a tool to enhance your workflow
        </p>
      </div>
      
      <Tabs defaultValue="campaign" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-5 px-4 py-2">
          <TabsTrigger value="campaign" title="Campaign Creator">
            <Mail className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="workflow" title="Workflow Automation">
            <Workflow className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="crm" title="CRM Intelligence">
            <User className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="copy" title="Copy Generator">
            <FileText className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="analytics" title="Analytics AI">
            <BarChart3 className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          {/* Campaign Creator Panel */}
          <TabsContent value="campaign" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Creator</CardTitle>
                <CardDescription>
                  Generate email, SMS, or WhatsApp campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignType">Campaign Type</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="sms">SMS Campaign</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp Campaign</SelectItem>
                      <SelectItem value="multi">Multi-channel Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignDescription">Campaign Description</Label>
                  <Input
                    id="campaignDescription"
                    placeholder="Describe your campaign purpose and goals"
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignTone">Tone</Label>
                  <Select 
                    value={selectedTone}
                    onValueChange={setSelectedTone}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignAudience">Target Audience</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="inactive">Inactive Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleGenerateCampaign}
                >
                  Generate Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Workflow Automation Panel */}
          <TabsContent value="workflow" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Automation</CardTitle>
                <CardDescription>
                  Create automated marketing sequences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workflowDescription">Workflow Description</Label>
                  <Input
                    id="workflowDescription"
                    placeholder="Describe the workflow you want to create"
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workflowTemplate">Start From Template</Label>
                  <Select defaultValue="blank">
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Blank Workflow</SelectItem>
                      <SelectItem value="welcome">Welcome Series</SelectItem>
                      <SelectItem value="abandoned">Abandoned Cart</SelectItem>
                      <SelectItem value="reengagement">Re-engagement</SelectItem>
                      <SelectItem value="post-purchase">Post-Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workflowTrigger">Start Trigger</Label>
                  <Select defaultValue="signup">
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signup">New Signup</SelectItem>
                      <SelectItem value="purchase">Purchase Completed</SelectItem>
                      <SelectItem value="abandoned">Cart Abandoned</SelectItem>
                      <SelectItem value="tag">Tag Added</SelectItem>
                      <SelectItem value="visit">Website Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleGenerateWorkflow}
                >
                  Create Workflow
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* CRM Intelligence Panel */}
          <TabsContent value="crm" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CRM Intelligence</CardTitle>
                <CardDescription>
                  Query your customer data and get insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSearchQuery}>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about your customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Example Queries</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-left justify-start"
                        onClick={() => setSearchQuery("Who are my top 10 customers by purchase value?")}
                      >
                        Who are my top 10 customers by purchase value?
                      </Button>
                    </li>
                    <li className="text-sm">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-left justify-start"
                        onClick={() => setSearchQuery("Show customers who haven't purchased in 30 days")}
                      >
                        Show customers who haven't purchased in 30 days
                      </Button>
                    </li>
                    <li className="text-sm">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-left justify-start"
                        onClick={() => setSearchQuery("Which customers opened but didn't click my last campaign?")}
                      >
                        Which customers opened but didn't click my last campaign?
                      </Button>
                    </li>
                    <li className="text-sm">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-left justify-start"
                        onClick={() => setSearchQuery("What's the average customer lifetime value?")}
                      >
                        What's the average customer lifetime value?
                      </Button>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Copy Generator Panel */}
          <TabsContent value="copy" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Copy Generator</CardTitle>
                <CardDescription>
                  Generate marketing copy for various channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="copyType">Content Type</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Copy</SelectItem>
                      <SelectItem value="subject">Email Subject Lines</SelectItem>
                      <SelectItem value="sms">SMS Message</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp Message</SelectItem>
                      <SelectItem value="ad">Ad Copy</SelectItem>
                      <SelectItem value="social">Social Media Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="copyDescription">Content Description</Label>
                  <Input
                    id="copyDescription"
                    placeholder="Describe what you want to create"
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="copyTone">Tone</Label>
                  <Select 
                    value={selectedTone}
                    onValueChange={setSelectedTone}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="copyLength">Length</Label>
                  <Select 
                    value={selectedLength}
                    onValueChange={setSelectedLength}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleGenerateCopy}
                >
                  Generate Copy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics AI Panel */}
          <TabsContent value="analytics" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analytics AI</CardTitle>
                <CardDescription>
                  Get insights and visualizations from your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="analyticsDataSource">Data Source</Label>
                  <Select defaultValue="campaigns">
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaigns">Campaigns</SelectItem>
                      <SelectItem value="workflows">Workflows</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analyticsQuery">Analysis Request</Label>
                  <Input
                    id="analyticsQuery"
                    placeholder="What do you want to analyze?"
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analyticsPeriod">Time Period</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analyticsVisualization">Visualization</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visualization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-select</SelectItem>
                      <SelectItem value="line">Line chart</SelectItem>
                      <SelectItem value="bar">Bar chart</SelectItem>
                      <SelectItem value="pie">Pie chart</SelectItem>
                      <SelectItem value="table">Data table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleAnalyticsQuery}
                >
                  Analyze Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
