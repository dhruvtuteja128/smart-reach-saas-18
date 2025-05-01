
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, BarChart3, Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: "active" | "paused" | "draft" | "scheduled";
  audience: string;
  reach: number;
  budget: string;
  startDate: string;
  endDate: string | null;
}

const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Summer Sale Promotion",
    type: "ads",
    status: "active",
    audience: "All Customers",
    reach: 45000,
    budget: "$500",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
  },
  {
    id: "c2",
    name: "New Product Launch",
    type: "ads",
    status: "scheduled",
    audience: "High Value Customers",
    reach: 12000,
    budget: "$750",
    startDate: "2025-05-10",
    endDate: null,
  },
  {
    id: "c3",
    name: "Remarketing Campaign",
    type: "ads",
    status: "draft",
    audience: "Abandoned Cart",
    reach: 8500,
    budget: "$300",
    startDate: "",
    endDate: null,
  },
  {
    id: "c4",
    name: "Brand Awareness",
    type: "ads",
    status: "paused",
    audience: "New Visitors",
    reach: 32000,
    budget: "$1200",
    startDate: "2025-04-15",
    endDate: "2025-04-30",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-amber-100 text-amber-800",
  draft: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
};

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  const handleCreateCampaign = () => {
    navigate("/ai-campaign");
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ad Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage and optimize your advertising campaigns
            </p>
          </div>
          <Button onClick={handleCreateCampaign} className="md:w-auto w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </header>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." className="pl-9" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {campaigns.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="bg-primary/10 p-6 rounded-full inline-block mx-auto mb-4">
                  <BarChart3 className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No campaigns yet</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Create your first campaign to start reaching your audience and growing your business.
                </p>
                <Button onClick={handleCreateCampaign}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="cursor-pointer" onClick={() => navigate(`/ai-campaign?id=${campaign.id}`)}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{campaign.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Audience: {campaign.audience} • Budget: {campaign.budget}
                            </CardDescription>
                          </div>
                          <Badge className={statusColors[campaign.status]}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Reach</p>
                            <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{campaign.startDate || "Not set"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="font-medium">{campaign.endDate || "Ongoing"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {campaigns.filter(c => c.status === "active").length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No active campaigns.</p>
            ) : (
              <div className="grid gap-4">
                {campaigns.filter(c => c.status === "active").map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="cursor-pointer" onClick={() => navigate(`/ai-campaign?id=${campaign.id}`)}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{campaign.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Audience: {campaign.audience} • Budget: {campaign.budget}
                            </CardDescription>
                          </div>
                          <Badge className={statusColors[campaign.status]}>Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Reach</p>
                            <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{campaign.startDate || "Not set"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="font-medium">{campaign.endDate || "Ongoing"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Similar content for other tabs - showing only "all" and "active" for brevity */}
          <TabsContent value="scheduled">
            <p className="text-center text-muted-foreground py-8">
              Showing scheduled campaigns...
            </p>
          </TabsContent>
          <TabsContent value="paused">
            <p className="text-center text-muted-foreground py-8">
              Showing paused campaigns...
            </p>
          </TabsContent>
          <TabsContent value="draft">
            <p className="text-center text-muted-foreground py-8">
              Showing draft campaigns...
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Campaigns;
