
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Filter, MoreHorizontal, Search } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp" | "ads";
  status: "live" | "paused" | "scheduled";
  sent: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  conversions: number;
  revenue: number;
  tags: string[];
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale Announcement",
    type: "email",
    status: "live",
    sent: 5420,
    openRate: 28.4,
    clickRate: 12.3,
    replyRate: 3.5,
    conversions: 87,
    revenue: 12450,
    tags: ["sale", "summer"],
  },
  {
    id: "2",
    name: "New Customer Welcome",
    type: "whatsapp",
    status: "live",
    sent: 1240,
    openRate: 95.2,
    clickRate: 24.5,
    replyRate: 18.7,
    conversions: 65,
    revenue: 8750,
    tags: ["welcome", "onboarding"],
  },
  {
    id: "3",
    name: "Abandoned Cart Recovery",
    type: "sms",
    status: "live",
    sent: 978,
    openRate: 92.1,
    clickRate: 15.2,
    replyRate: 8.4,
    conversions: 47,
    revenue: 6240,
    tags: ["recovery", "cart"],
  },
  {
    id: "4",
    name: "Product Launch Teaser",
    type: "ads",
    status: "paused",
    sent: 12450,
    openRate: 0,
    clickRate: 3.2,
    replyRate: 0,
    conversions: 96,
    revenue: 15680,
    tags: ["launch", "product"],
  },
  {
    id: "5",
    name: "Customer Feedback Request",
    type: "email",
    status: "scheduled",
    sent: 0,
    openRate: 0,
    clickRate: 0,
    replyRate: 0,
    conversions: 0,
    revenue: 0,
    tags: ["feedback", "survey"],
  },
];

export function AnalyticsCampaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(filteredCampaigns.map(c => c.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleSelectCampaign = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns([...selectedCampaigns, id]);
    } else {
      setSelectedCampaigns(selectedCampaigns.filter(campaignId => campaignId !== id));
    }
  };

  const isAllSelected = 
    filteredCampaigns.length > 0 && 
    selectedCampaigns.length === filteredCampaigns.length;

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case "live": return "bg-green-500";
      case "paused": return "bg-amber-500";
      case "scheduled": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getChannelColor = (type: Campaign['type']) => {
    switch (type) {
      case "email": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "sms": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "whatsapp": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "ads": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-8 w-full sm:w-[250px]" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          {selectedCampaigns.length > 0 && (
            <Button variant="outline" size="sm">
              {selectedCampaigns.length} selected
            </Button>
          )}
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={isAllSelected} 
                  onCheckedChange={handleSelectAll} 
                  aria-label="Select all" 
                />
              </TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Sent</TableHead>
              <TableHead className="text-right">Open Rate</TableHead>
              <TableHead className="text-right">Click Rate</TableHead>
              <TableHead className="text-right">Reply Rate</TableHead>
              <TableHead className="text-right">Conversions</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCampaigns.includes(campaign.id)} 
                    onCheckedChange={(checked) => 
                      handleSelectCampaign(campaign.id, !!checked)
                    } 
                    aria-label={`Select ${campaign.name}`} 
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="flex gap-1 mt-1">
                      {campaign.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getChannelColor(campaign.type)}>
                    {campaign.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(campaign.status)}`}></div>
                    <span className="capitalize">{campaign.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{campaign.sent.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {campaign.openRate > 0 ? `${campaign.openRate.toFixed(1)}%` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.clickRate > 0 ? `${campaign.clickRate.toFixed(1)}%` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.replyRate > 0 ? `${campaign.replyRate.toFixed(1)}%` : '-'}
                </TableCell>
                <TableCell className="text-right">{campaign.conversions}</TableCell>
                <TableCell className="text-right">
                  ${campaign.revenue.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
