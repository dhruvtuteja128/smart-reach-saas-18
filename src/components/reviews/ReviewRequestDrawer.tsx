
import { useState } from "react";
import { MessageCircle, Mail, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ReviewRequestDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewRequestDrawer({ 
  open, 
  onOpenChange 
}: ReviewRequestDrawerProps) {
  const [channel, setChannel] = useState<string>("sms");
  const [template, setTemplate] = useState<string>("default");
  const [message, setMessage] = useState<string>(
    "Hi {first_name}, thank you for choosing our services! We'd love to hear about your experience. Could you take a moment to leave us a review? Here's the link: {review_link}"
  );

  const templates = {
    default: "Hi {first_name}, thank you for choosing our services! We'd love to hear about your experience. Could you take a moment to leave us a review? Here's the link: {review_link}",
    followUp: "Hi {first_name}, just a friendly reminder to share your feedback about your recent experience with us. It only takes a minute: {review_link}",
    discount: "Hi {first_name}! We value your opinion. Leave a review using this link {review_link} and get 10% off your next purchase with us!",
    googleReview: "Hi {first_name}, we hope you enjoyed your experience with us! If you have a moment, we'd really appreciate it if you could leave us a review on Google: {review_link}"
  };
  
  const handleTemplateChange = (selected: string) => {
    setTemplate(selected);
    setMessage(templates[selected as keyof typeof templates]);
  };

  const handlePersonalizeMessage = () => {
    // Replace placeholders with actual data
    const personalizedMessage = message
      .replace("{first_name}", "Alex")
      .replace("{review_link}", "https://example.com/review/abc123");
    
    return personalizedMessage;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Request Customer Reviews</SheetTitle>
          <SheetDescription>
            Send review requests to your customers through multiple channels.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <Label htmlFor="channel">Communication Channel</Label>
            <Tabs defaultValue="sms" value={channel} onValueChange={setChannel} className="mt-2">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label>Message Template</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {template === "default" ? "Default" : 
                     template === "followUp" ? "Follow-up" : 
                     template === "discount" ? "With Discount" : 
                     "Google Review"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleTemplateChange("default")}>
                    Default Template
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTemplateChange("followUp")}>
                    Follow-up Template
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTemplateChange("discount")}>
                    With Discount
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTemplateChange("googleReview")}>
                    Google Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mt-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use {"{first_name}"} to include customer name and {"{review_link}"} for the review link.
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <TabsContent value="sms" className="p-0 mt-2">
              <Input id="recipient" placeholder="Enter phone number" />
            </TabsContent>
            <TabsContent value="email" className="p-0 mt-2">
              <Input id="recipient" placeholder="Enter email address" />
            </TabsContent>
            <TabsContent value="whatsapp" className="p-0 mt-2">
              <Input id="recipient" placeholder="Enter WhatsApp number" />
            </TabsContent>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Preview</h4>
            <div className="bg-background p-3 rounded-md text-sm">
              {handlePersonalizeMessage()}
            </div>
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button className="gap-2">
            <SendHorizontal className="h-4 w-4" />
            Send Request
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
