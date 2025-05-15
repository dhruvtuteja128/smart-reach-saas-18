
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Globe, Mail, MessageSquare, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock campaign data
const mockCampaignDetails = {
  "c1": {
    id: "c1",
    name: "Summer Sale Email Campaign",
    type: "email",
  },
  "c2": {
    id: "c2",
    name: "New Product Launch - Facebook",
    type: "ads",
  },
  "c3": {
    id: "c3",
    name: "Weekend Flash Sale SMS",
    type: "sms",
  },
  "c4": {
    id: "c4",
    name: "Customer Support Follow-up",
    type: "whatsapp",
  }
};

type ChannelType = "email" | "sms" | "whatsapp" | "facebook" | "instagram" | "twitter";

interface Channel {
  id: ChannelType;
  name: string;
  icon: React.ReactNode;
  available: boolean;
}

export const CampaignScheduler = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const campaign = id ? mockCampaignDetails[id] : null;
  
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>("12:00");
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [optimizeTime, setOptimizeTime] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>([campaign?.type as ChannelType || "email"]);

  const channels: Channel[] = [
    { id: "email", name: "Email", icon: <Mail className="h-4 w-4" />, available: true },
    { id: "sms", name: "SMS", icon: <MessageSquare className="h-4 w-4" />, available: true },
    { id: "whatsapp", name: "WhatsApp", icon: <MessageSquare className="h-4 w-4" />, available: true },
    { id: "facebook", name: "Facebook", icon: <Share2 className="h-4 w-4" />, available: true },
    { id: "instagram", name: "Instagram", icon: <Share2 className="h-4 w-4" />, available: true },
    { id: "twitter", name: "Twitter", icon: <Share2 className="h-4 w-4" />, available: false },
  ];

  const handleChannelToggle = (channelId: ChannelType) => {
    setSelectedChannels(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  const handleScheduleConfirm = () => {
    // In a real app, you'd send this to your API
    const scheduleDetails = {
      campaignId: id,
      date,
      time,
      timezone,
      optimizeTime,
      channels: selectedChannels,
    };
    
    console.log("Scheduling campaign:", scheduleDetails);
    
    toast({
      description: "Campaign scheduled successfully!"
    });
    
    navigate(`/campaigns/${id}/view`);
  };

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="sm" onClick={() => navigate(`/campaigns/${id}/view`)} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaign
        </Button>
        <h1 className="text-2xl font-bold">Schedule Campaign</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Campaign: {campaign.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Publish Date</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="date" 
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Publish Time</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="time" 
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <Label htmlFor="optimize-time" className="font-medium cursor-pointer">
                  Let AI optimize send time
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your audience's behavior and send at the optimal time for engagement.
              </p>
            </div>
            <Switch
              id="optimize-time"
              checked={optimizeTime}
              onCheckedChange={setOptimizeTime}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Distribution Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the channels where you want to publish this campaign
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {channels.map((channel) => (
              <div 
                key={channel.id}
                className={`flex items-center space-x-2 border rounded-md p-3 ${
                  !channel.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary'
                }`}
                onClick={() => {
                  if (channel.available) {
                    handleChannelToggle(channel.id);
                  } else {
                    toast({
                      description: `${channel.name} is not available for your account.`,
                    });
                  }
                }}
              >
                <Checkbox
                  id={`channel-${channel.id}`}
                  checked={selectedChannels.includes(channel.id)}
                  disabled={!channel.available}
                  onCheckedChange={() => {
                    if (channel.available) {
                      handleChannelToggle(channel.id);
                    }
                  }}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor={`channel-${channel.id}`} className="flex items-center cursor-pointer">
                    {channel.icon}
                    <span className="ml-2">{channel.name}</span>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Review & Confirm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Campaign</p>
                <p className="text-sm text-muted-foreground">{campaign.name}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Schedule</p>
                <p className="text-sm text-muted-foreground">
                  {optimizeTime ? "AI Optimized" : `${date} at ${time}`}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Timezone</p>
                <p className="text-sm text-muted-foreground">{timezone}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Channels</p>
                <p className="text-sm text-muted-foreground">
                  {selectedChannels.length 
                    ? channels
                        .filter(channel => selectedChannels.includes(channel.id))
                        .map(channel => channel.name)
                        .join(", ")
                    : "No channels selected"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t">
          <Button variant="outline" onClick={() => navigate(`/campaigns/${id}/view`)}>
            Cancel
          </Button>
          <Button 
            onClick={handleScheduleConfirm} 
            disabled={selectedChannels.length === 0}
          >
            Schedule Campaign
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
