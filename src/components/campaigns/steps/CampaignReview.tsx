
import { useState } from "react";
import { useCampaign } from "@/components/campaigns/CampaignContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, MessageCircle, Phone, Ad, Calendar, Clock, Users, Check, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CampaignReview = () => {
  const { campaign } = useCampaign();
  const { toast } = useToast();
  const [confirming, setConfirming] = useState(false);
  
  const getChannelIcon = () => {
    switch (campaign.type) {
      case "email":
        return <Mail className="h-5 w-5" />;
      case "sms":
        return <MessageCircle className="h-5 w-5" />;
      case "whatsapp":
        return <Phone className="h-5 w-5" />;
      case "ads":
        return <Ad className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getChannelName = () => {
    switch (campaign.type) {
      case "email":
        return "Email";
      case "sms":
        return "SMS";
      case "whatsapp":
        return "WhatsApp";
      case "ads":
        return "Ad Campaign";
      default:
        return "Campaign";
    }
  };
  
  const getTimingText = () => {
    switch (campaign.automation.timing) {
      case "now":
        return "Send immediately";
      case "scheduled":
        return campaign.automation.scheduledDate 
          ? `Scheduled for ${format(campaign.automation.scheduledDate, "PPP")}`
          : "Scheduled (no date selected)";
      case "recurring":
        return "Recurring campaign";
      default:
        return "Not specified";
    }
  };

  const handleSendTest = () => {
    toast({
      title: "Test sent",
      description: "A test campaign has been sent to your email"
    });
  };
  
  const handleLaunchCampaign = () => {
    setConfirming(true);
  };
  
  const handleConfirmLaunch = () => {
    toast({
      title: "Campaign launched",
      description: "Your campaign has been successfully launched"
    });
    setConfirming(false);
    // Here you would navigate to the campaigns list
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Step 5: Review & Launch</h2>
      <p className="text-muted-foreground mb-6">Review your campaign details and launch</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Segment:</span>
                <span className="font-medium">{campaign.audienceSegment || "All contacts"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Recipients:</span>
                <Badge variant="secondary">{campaign.audienceSize || 0} contacts</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Filters:</span>
                <span className="font-medium">{campaign.filters.length > 0 ? `${campaign.filters.length} applied` : "None"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {getChannelIcon()}
              Campaign Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Campaign name:</span>
                <span className="font-medium">{campaign.name || "Untitled Campaign"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Channel:</span>
                <Badge>{getChannelName()}</Badge>
              </div>
              {campaign.message.subject && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium">{campaign.message.subject}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Message Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-muted/20">
              {campaign.type === "email" && (
                <>
                  {campaign.message.subject && (
                    <div className="font-medium border-b pb-2 mb-2">
                      Subject: {campaign.message.subject}
                    </div>
                  )}
                  <div className="whitespace-pre-line">
                    {campaign.message.content || "No message content"}
                  </div>
                </>
              )}
              
              {(campaign.type === "sms" || campaign.type === "whatsapp") && (
                <div className="bg-background border rounded-lg p-3 max-w-xs">
                  <div className="text-sm whitespace-pre-line">
                    {campaign.message.content || "No message content"}
                  </div>
                </div>
              )}
              
              {campaign.type === "ads" && (
                <div className="border rounded-lg p-3">
                  <div className="font-semibold mb-2">
                    {campaign.message.subject || "Ad Headline"}
                  </div>
                  <div className="text-sm">
                    {campaign.message.content || "Ad content"}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {campaign.automation.timing === "now" ? (
                <Clock className="h-5 w-5 text-primary" />
              ) : (
                <Calendar className="h-5 w-5 text-primary" />
              )}
              Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Send:</span>
                <span className="font-medium">{getTimingText()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Automation rules:</span>
                <span className="font-medium">{campaign.automation.conditions.length || "None"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              Ready to Launch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                Your campaign is ready to be launched. You can send a test to yourself first or launch it now.
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={handleSendTest}>
                  Send Test to Myself
                </Button>
                <Button className="flex-1" onClick={handleLaunchCampaign}>
                  Launch Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Campaign Launch</DialogTitle>
            <DialogDescription>
              You're about to send this campaign to {campaign.audienceSize || 0} recipients. 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              Please confirm that you have reviewed all content and targeting before launching.
            </div>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-4 text-sm space-y-2 mt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaign:</span>
              <span className="font-medium">{campaign.name || "Untitled Campaign"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Channel:</span>
              <span className="font-medium">{getChannelName()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipients:</span>
              <span className="font-medium">{campaign.audienceSize || 0} contacts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Send time:</span>
              <span className="font-medium">{getTimingText()}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmLaunch}>
              Confirm & Launch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
