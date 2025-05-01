
import { useState } from "react";
import { MessageCircle, Mail, Phone, Send, Calendar, Users, TestTube, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageChannel } from "@/types/communication";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewCampaignDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const channelOptions = [
  {
    id: "sms" as const,
    icon: <MessageCircle className="h-5 w-5" />,
    label: "SMS"
  },
  {
    id: "email" as const,
    icon: <Mail className="h-5 w-5" />,
    label: "Email"
  },
  {
    id: "whatsapp" as const,
    icon: <Phone className="h-5 w-5" />,
    label: "WhatsApp"
  }
];

export function NewCampaignDrawer({ open, onOpenChange }: NewCampaignDrawerProps) {
  const [selectedChannel, setSelectedChannel] = useState<MessageChannel>("sms");
  const [messageContent, setMessageContent] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  
  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId as MessageChannel);
  };
  
  const handleSendCampaign = () => {
    // Here would be the logic to send the campaign
    setShowConfirmDialog(false);
    onOpenChange(false);
    // Display success toast or redirect
  };
  
  const getPlaceholder = () => {
    switch (selectedChannel) {
      case "sms":
        return "Type your SMS message here... Use {first_name} for personalization";
      case "whatsapp":
        return "Type your WhatsApp message here... Use {first_name} for personalization";
      case "email":
        return "Type your email content here... Use {first_name} for personalization";
      default:
        return "Type your message here...";
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[85vh] max-h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-xl">Create New Campaign</DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4 py-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input 
                  id="campaign-name" 
                  placeholder="Enter campaign name..."
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Channel Type</Label>
                <Tabs
                  value={selectedChannel}
                  onValueChange={handleChannelSelect}
                  className="mt-2"
                >
                  <TabsList className="grid grid-cols-3">
                    {channelOptions.map(option => (
                      <TabsTrigger 
                        key={option.id} 
                        value={option.id}
                        className="flex items-center gap-1"
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {channelOptions.map(option => (
                    <TabsContent key={option.id} value={option.id} className="mt-4 space-y-6">
                      <div className="space-y-1">
                        <Label>Message Content</Label>
                        <Textarea
                          placeholder={getPlaceholder()}
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-muted-foreground">
                            <Button variant="ghost" size="sm" className="text-xs">
                              Insert Personalization
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            AI Writer
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Recipient Segment</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select segment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Contacts</SelectItem>
                              <SelectItem value="recent">Recent Customers</SelectItem>
                              <SelectItem value="leads">New Leads</SelectItem>
                              <SelectItem value="inactive">Inactive Users</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Estimated 1,240 recipients
                          </div>
                        </div>
                        
                        <div>
                          <Label>Send Time</Label>
                          <Select defaultValue="now">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select when to send" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="now">Send Immediately</SelectItem>
                              <SelectItem value="schedule">Schedule for Later</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Will be sent as soon as you confirm
                          </div>
                        </div>
                      </div>
                      
                      {option.id === "email" && (
                        <div>
                          <Label>Email Subject</Label>
                          <Input placeholder="Enter email subject line..." className="mt-1" />
                        </div>
                      )}
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <Label>A/B Testing</Label>
                          <Button variant="outline" size="sm">Add Variant</Button>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 mt-2 text-center">
                          <TestTube className="h-10 w-10 mx-auto text-muted-foreground" />
                          <p className="text-sm mt-2">No A/B variants added</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Create variations to test different message content
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="border-t">
            <div className="flex justify-between w-full">
              <Button variant="outline">
                <TestTube className="h-4 w-4 mr-2" />
                Send Test to Myself
              </Button>
              <div className="flex gap-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button 
                  disabled={!messageContent || !campaignName}
                  onClick={() => setShowConfirmDialog(true)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Campaign
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Campaign</DialogTitle>
            <DialogDescription>
              You're about to send a campaign to your selected audience. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaign:</span>
              <span className="font-medium">{campaignName || "Untitled Campaign"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Channel:</span>
              <span className="font-medium">{channelOptions.find(c => c.id === selectedChannel)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipients:</span>
              <span className="font-medium">1,240 contacts</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendCampaign}>
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
