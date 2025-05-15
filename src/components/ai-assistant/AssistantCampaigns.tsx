
import { useState } from "react";
import { 
  FileText, 
  PenTool, 
  MessageSquare, 
  MailCheck, 
  Share2,
  Filter,
  Search,
  PlusCircle,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type CampaignStatus = "draft" | "in-progress" | "approved" | "rejected";

type CampaignType = "email" | "social" | "ads" | "sms" | "whatsapp";

interface Campaign {
  id: string;
  title: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  createdAt: Date;
  thumbnail?: string;
  stats?: {
    views?: number;
    clicks?: number;
    conversions?: number;
  };
}

const campaignTypeIcons: Record<CampaignType, React.ElementType> = {
  email: MailCheck,
  social: Share2,
  ads: PenTool,
  sms: MessageSquare,
  whatsapp: MessageSquare
};

const statusVariants: Record<CampaignStatus, {
  color: string;
  icon: React.ElementType;
}> = {
  draft: {
    color: "text-muted-foreground",
    icon: AlertCircle
  },
  "in-progress": {
    color: "text-amber-500",
    icon: Clock
  },
  approved: {
    color: "text-emerald-500",
    icon: CheckCircle2
  },
  rejected: {
    color: "text-red-500",
    icon: XCircle
  }
};

// Sample campaigns data
const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    title: "Summer Sale Email Series",
    description: "3-part email campaign for summer product line",
    type: "email",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    stats: {
      views: 1240,
      clicks: 380,
      conversions: 42
    }
  },
  {
    id: "c2",
    title: "Product Launch - Social Media",
    description: "Instagram and Facebook posts for new product",
    type: "social",
    status: "in-progress",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: "c3",
    title: "Retargeting Google Ads",
    description: "Display ads for cart abandoners",
    type: "ads",
    status: "draft",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "c4",
    title: "End of Month SMS Promotion",
    description: "Special offer for loyal customers",
    type: "sms",
    status: "rejected",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
  },
  {
    id: "c5",
    title: "Spring Collection Announcement",
    description: "Email announcing new collection with 20% discount",
    type: "email",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
    stats: {
      views: 3240,
      clicks: 720,
      conversions: 85
    }
  },
  {
    id: "c6",
    title: "Customer Survey Follow-up",
    description: "WhatsApp message to thank survey participants",
    type: "whatsapp",
    status: "draft",
    createdAt: new Date(), // Now
  }
];

export function AssistantCampaigns() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<CampaignType | "all">("all");
  
  // Apply filters
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesType = typeFilter === "all" || campaign.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleCreateCampaign = () => {
    toast({
      description: "Redirecting to AI Campaign Builder..."
    });
    navigate("/ai-campaign");
  };
  
  const handleCampaignAction = (actionType: string, campaignId: string) => {
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    switch (actionType) {
      case "edit":
        toast({
          description: `Editing campaign: ${campaign.title}`
        });
        navigate(`/ai-campaign?id=${campaignId}`);
        break;
      case "approve":
        toast({
          description: `Campaign approved: ${campaign.title}`
        });
        break;
      case "reject":
        toast({
          description: `Campaign rejected: ${campaign.title}`
        });
        break;
      case "delete":
        toast({
          variant: "destructive",
          description: `Campaign deleted: ${campaign.title}`
        });
        break;
      case "duplicate":
        toast({
          description: `Duplicating campaign: ${campaign.title}`
        });
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CampaignStatus | "all")}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <span>Status</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as CampaignType | "all")}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <span>Type</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="ads">Ads</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleCreateCampaign}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
      </div>
      
      {/* Campaign grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => {
          const StatusIcon = statusVariants[campaign.status].icon;
          const TypeIcon = campaignTypeIcons[campaign.type];
          
          return (
            <Card key={campaign.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="mb-2 flex items-center gap-1">
                    <TypeIcon className="h-3 w-3" />
                    <span className="capitalize">{campaign.type}</span>
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCampaignAction("edit", campaign.id)}>
                        Edit
                      </DropdownMenuItem>
                      {campaign.status === "draft" && (
                        <DropdownMenuItem onClick={() => handleCampaignAction("approve", campaign.id)}>
                          Approve
                        </DropdownMenuItem>
                      )}
                      {campaign.status === "draft" && (
                        <DropdownMenuItem onClick={() => handleCampaignAction("reject", campaign.id)}>
                          Reject
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleCampaignAction("duplicate", campaign.id)}>
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCampaignAction("delete", campaign.id)}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="text-base">{campaign.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <div className="text-xs text-muted-foreground">
                  Created {campaign.createdAt.toLocaleDateString()}
                </div>
                
                {campaign.stats && (
                  <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                    <div className="text-xs">
                      <p className="font-medium">{campaign.stats.views?.toLocaleString()}</p>
                      <p className="text-muted-foreground">Views</p>
                    </div>
                    <div className="text-xs">
                      <p className="font-medium">{campaign.stats.clicks?.toLocaleString()}</p>
                      <p className="text-muted-foreground">Clicks</p>
                    </div>
                    <div className="text-xs">
                      <p className="font-medium">{campaign.stats.conversions?.toLocaleString()}</p>
                      <p className="text-muted-foreground">Conv.</p>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                <div className="flex items-center gap-1">
                  <StatusIcon className={cn(
                    "h-4 w-4",
                    statusVariants[campaign.status].color
                  )} />
                  <span className="text-xs capitalize">{campaign.status.replace("-", " ")}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCampaignAction("edit", campaign.id)}
                  >
                    View
                  </Button>
                  {campaign.status === "draft" && (
                    <Button 
                      size="sm"
                      onClick={() => handleCampaignAction("approve", campaign.id)}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No campaigns found matching your filters.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
