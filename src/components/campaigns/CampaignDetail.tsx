
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Copy, 
  Download, 
  Edit, 
  FileText, 
  Mail, 
  MessageSquare, 
  Share2, 
  Trash2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

type CampaignType = "email" | "ads" | "sms" | "whatsapp";
type CampaignStatus = "draft" | "scheduled" | "running" | "completed" | "paused";

interface CampaignStats {
  sent?: number;
  opened?: number;
  clicked?: number;
  converted?: number;
  impressions?: number;
  reach?: number;
  engagement?: number;
}

interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  content: string;
  subject?: string;
  audience: string;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  stats?: CampaignStats;
  thumbnail?: string;
}

// Mock data
const mockCampaignDetails: Record<string, Campaign> = {
  "c1": {
    id: "c1",
    name: "Summer Sale Email Campaign",
    type: "email",
    status: "draft",
    content: "# Summer Sale is Here! \n\nDear valued customer,\n\nWe're excited to announce our biggest summer sale yet! Get up to 50% off on all products for a limited time.\n\nShop now to take advantage of these incredible deals before they're gone.\n\n## Featured Products:\n\n- Summer Collection T-shirts\n- Beach Accessories\n- Outdoor Furniture\n\n[SHOP NOW](#) | [VIEW CATALOG](#)",
    subject: "🔥 Summer Sale: Up to 50% Off Everything!",
    audience: "All Customers",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-10",
    stats: {
      sent: 0,
      opened: 0,
      clicked: 0
    }
  },
  "c2": {
    id: "c2",
    name: "New Product Launch - Facebook",
    type: "ads",
    status: "scheduled",
    content: "**Introducing Our Revolutionary New Product!**\n\n*Transform your daily routine with the incredible features of our latest innovation.*\n\nLimited time offer: Get 15% off when you pre-order today!\n\n[LEARN MORE](#) | [PRE-ORDER NOW](#)",
    audience: "Interests: Technology, Innovation",
    scheduledDate: "2025-05-20",
    createdAt: "2025-05-05",
    updatedAt: "2025-05-12",
    stats: {
      impressions: 0,
      reach: 0,
      engagement: 0
    },
    thumbnail: "/placeholder.svg"
  },
  "c3": {
    id: "c3",
    name: "Weekend Flash Sale SMS",
    type: "sms",
    status: "running",
    content: "FLASH SALE! 24hrs only: Use code WEEKEND30 for 30% off storewide. Shop now: https://example.com/sale",
    audience: "SMS Subscribers",
    scheduledDate: "2025-05-15",
    createdAt: "2025-05-07",
    updatedAt: "2025-05-15",
    stats: {
      sent: 5430,
      clicked: 876,
      converted: 234
    }
  },
  "c4": {
    id: "c4",
    name: "Customer Support Follow-up",
    type: "whatsapp",
    status: "completed",
    content: "Hello! Thanks for contacting our support team. How would you rate your experience with us today? Reply with a number from 1-5, with 5 being excellent.",
    audience: "Recent Support Tickets",
    createdAt: "2025-04-28",
    updatedAt: "2025-05-12",
    stats: {
      sent: 1250,
      opened: 1100,
      clicked: 850,
      converted: 720
    }
  }
};

const typeIcons = {
  email: <Mail className="h-4 w-4" />,
  ads: <ExternalLink className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4" />
};

const statusColors: Record<CampaignStatus, string> = {
  draft: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  running: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  paused: "bg-amber-100 text-amber-800",
};

export const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, fetch campaign data from API
  const campaign = id ? mockCampaignDetails[id] : null;

  if (!campaign) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
        <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/campaigns')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/campaigns/${id}/edit`);
  };

  const handleSchedule = () => {
    navigate(`/campaigns/${id}/schedule`);
  };

  const handleClone = () => {
    toast({
      description: `Campaign "${campaign.name}" has been cloned.`
    });
    // In a real app, clone the campaign and redirect to it
  };

  const handleDelete = () => {
    toast({
      variant: "destructive",
      description: `Campaign "${campaign.name}" has been deleted.`
    });
    navigate('/campaigns');
    // In a real app, delete the campaign via API
  };

  const handleExport = (format: 'pdf' | 'html') => {
    toast({
      description: `Exporting campaign as ${format.toUpperCase()}...`
    });
    // In a real app, generate and download the export
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="sm" onClick={() => navigate('/campaigns')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
        <h1 className="text-2xl font-bold">{campaign.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left sidebar - Campaign summary */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Type</p>
                <p className="flex items-center font-medium">
                  {typeIcons[campaign.type]}
                  <span className="ml-2 capitalize">{campaign.type}</span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={statusColors[campaign.status]}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Target Audience</p>
                <p className="font-medium">{campaign.audience}</p>
              </div>
              
              {campaign.scheduledDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled For</p>
                  <p className="font-medium">{campaign.scheduledDate}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{campaign.updatedAt}</p>
              </div>
              
              {campaign.stats && (
                <>
                  <Separator />
                  <div>
                    <p className="font-medium mb-2">Campaign Performance</p>
                    
                    {campaign.stats.sent !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Sent</span>
                        <span>{campaign.stats.sent.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.opened !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Opened</span>
                        <span>{campaign.stats.opened.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.clicked !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Clicked</span>
                        <span>{campaign.stats.clicked.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.converted !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Converted</span>
                        <span>{campaign.stats.converted.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.impressions !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Impressions</span>
                        <span>{campaign.stats.impressions.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.reach !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Reach</span>
                        <span>{campaign.stats.reach.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {campaign.stats.engagement !== undefined && (
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Engagement</span>
                        <span>{campaign.stats.engagement.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Center - Campaign content preview */}
        <div className="md:col-span-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Campaign Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {campaign.subject && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Subject Line</p>
                  <p className="font-medium">{campaign.subject}</p>
                </div>
              )}
              
              {campaign.thumbnail && (
                <div className="mb-4">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={campaign.thumbnail} 
                      alt={campaign.name} 
                      className="object-cover w-full h-full rounded-md"
                    />
                  </AspectRatio>
                </div>
              )}
              
              <div className="prose prose-sm max-w-none">
                {/* This would typically use a markdown renderer in a real app */}
                <pre className="whitespace-pre-wrap font-sans">{campaign.content}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Quick actions */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
              
              <Button variant="outline" className="w-full" onClick={handleSchedule}>
                <Calendar className="h-4 w-4 mr-2" />
                {campaign.scheduledDate ? "Reschedule" : "Schedule"}
              </Button>
              
              <Button variant="outline" className="w-full" onClick={handleClone}>
                <Copy className="h-4 w-4 mr-2" />
                Clone Campaign
              </Button>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => handleExport('html')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export HTML
                </Button>
              </div>
              
              <Separator />
              
              <Button variant="destructive" className="w-full" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
