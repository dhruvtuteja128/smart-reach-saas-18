
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MailCheck, 
  MessageSquare, 
  ExternalLink, 
  MoreHorizontal,
  Edit,
  Eye,
  Copy,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CampaignType = "email" | "ads" | "sms" | "whatsapp";
type CampaignStatus = "draft" | "scheduled" | "running" | "completed" | "paused";

interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  audience: string;
  lastUpdated: string;
  stats?: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
    impressions?: number;
    reach?: number;
  };
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Summer Sale Email Campaign",
    type: "email",
    status: "draft",
    audience: "All Customers",
    lastUpdated: "2025-05-10",
    stats: {
      sent: 0,
      opened: 0,
      clicked: 0,
    }
  },
  {
    id: "c2",
    name: "New Product Launch - Facebook",
    type: "ads",
    status: "scheduled",
    audience: "Interest: Technology",
    lastUpdated: "2025-05-12",
    stats: {
      impressions: 0,
      reach: 0,
    }
  },
  {
    id: "c3",
    name: "Weekend Flash Sale SMS",
    type: "sms",
    status: "running",
    audience: "SMS Subscribers",
    lastUpdated: "2025-05-15",
    stats: {
      sent: 5430,
      clicked: 876,
    }
  },
  {
    id: "c4",
    name: "Customer Support Follow-up",
    type: "whatsapp",
    status: "completed",
    audience: "Recent Support Tickets",
    lastUpdated: "2025-05-12",
    stats: {
      sent: 1250,
      opened: 1100,
    }
  },
  {
    id: "c5",
    name: "Spring Collection Newsletter",
    type: "email",
    status: "paused",
    audience: "Newsletter Subscribers",
    lastUpdated: "2025-05-08",
    stats: {
      sent: 3500,
      opened: 1200,
      clicked: 450,
    }
  },
  {
    id: "c6",
    name: "Holiday Season Promo",
    type: "ads",
    status: "draft",
    audience: "Previous Customers",
    lastUpdated: "2025-05-11",
  }
];

const typeIcons = {
  email: <MailCheck className="h-4 w-4" />,
  ads: <ExternalLink className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4" />,
};

const statusColors: Record<CampaignStatus, string> = {
  draft: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  running: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  paused: "bg-amber-100 text-amber-800",
};

const CampaignsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"table" | "grid">("table");
  
  // Apply filters
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || campaign.type === typeFilter;
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateCampaign = () => {
    navigate("/ai-campaign");
  };

  const handleViewCampaign = (id: string) => {
    navigate(`/campaigns/${id}/view`);
  };

  const handleEditCampaign = (id: string) => {
    navigate(`/campaigns/${id}/edit`);
  };

  const handleScheduleCampaign = (id: string) => {
    navigate(`/campaigns/${id}/schedule`);
  };

  const handleCloneCampaign = (id: string) => {
    toast({
      description: "Campaign cloned successfully."
    });
    // In a real app, you'd clone the campaign and navigate to it
  };
  
  const handleDeleteCampaign = (id: string) => {
    toast({
      variant: "destructive",
      description: "Campaign deleted."
    });
    // In a real app, you'd delete the campaign via API
  };
  
  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Campaign Manager</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and optimize your marketing campaigns
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
            <Input 
              placeholder="Search campaigns..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Campaign Type</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="ads">Ads</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          
          <div className="flex">
            <Button 
              variant={view === "table" ? "default" : "outline"} 
              className="rounded-r-none"
              onClick={() => setView("table")}
            >
              Table
            </Button>
            <Button 
              variant={view === "grid" ? "default" : "outline"} 
              className="rounded-l-none"
              onClick={() => setView("grid")}
            >
              Grid
            </Button>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <Card>
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No campaigns match your current search or filter criteria. Try adjusting your filters or create a new campaign.
              </p>
              <Button onClick={handleCreateCampaign}>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </Card>
        ) : view === "table" ? (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <div className="hover:text-primary cursor-pointer" onClick={() => handleViewCampaign(campaign.id)}>
                        {campaign.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {typeIcons[campaign.type]}
                        <span className="ml-2 capitalize">{campaign.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell>{campaign.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewCampaign(campaign.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCampaign(campaign.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleScheduleCampaign(campaign.id)}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleCloneCampaign(campaign.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:border-primary/50 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      <div className="hover:text-primary cursor-pointer" onClick={() => handleViewCampaign(campaign.id)}>
                        {campaign.name}
                      </div>
                    </CardTitle>
                    <Badge className={statusColors[campaign.status]}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      {typeIcons[campaign.type]}
                      <span className="ml-2 capitalize">{campaign.type}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-muted-foreground">Audience:</span> {campaign.audience}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span> {campaign.lastUpdated}
                    </div>
                  </div>
                  
                  {campaign.stats && (
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center border-t pt-3">
                      {campaign.stats.sent !== undefined && (
                        <div>
                          <div className="text-sm font-medium">{campaign.stats.sent.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Sent</div>
                        </div>
                      )}
                      
                      {campaign.stats.opened !== undefined && (
                        <div>
                          <div className="text-sm font-medium">{campaign.stats.opened.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Opened</div>
                        </div>
                      )}
                      
                      {campaign.stats.clicked !== undefined && (
                        <div>
                          <div className="text-sm font-medium">{campaign.stats.clicked.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Clicked</div>
                        </div>
                      )}
                      
                      {campaign.stats.impressions !== undefined && (
                        <div>
                          <div className="text-sm font-medium">{campaign.stats.impressions.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Impr.</div>
                        </div>
                      )}
                      
                      {campaign.stats.reach !== undefined && (
                        <div>
                          <div className="text-sm font-medium">{campaign.stats.reach.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Reach</div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex justify-between border-t mt-auto">
                  <Button variant="ghost" size="sm" onClick={() => handleViewCampaign(campaign.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditCampaign(campaign.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleScheduleCampaign(campaign.id)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCloneCampaign(campaign.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CampaignsList;
