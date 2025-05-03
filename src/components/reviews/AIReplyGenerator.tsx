
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIReplyGeneratorProps {
  reviewText: string;
  rating: number;
  customerName: string;
  onGenerate: (text: string) => void;
  onCancel: () => void;
}

export function AIReplyGenerator({
  reviewText,
  rating,
  customerName,
  onGenerate,
  onCancel,
}: AIReplyGeneratorProps) {
  const [tone, setTone] = useState<string>("professional");
  const [includeDiscount, setIncludeDiscount] = useState<boolean>(false);
  const [includeFollowUp, setIncludeFollowUp] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedReply, setGeneratedReply] = useState<string>("");
  
  const generateReply = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      const firstName = customerName.split(" ")[0];
      let reply = "";
      
      if (rating >= 4) {
        switch (tone) {
          case "friendly":
            reply = `Hey ${firstName}! Thanks so much for your awesome review! We're super happy to hear you had such a great experience with us. Your feedback really makes our day! 😊`;
            break;
          case "professional":
            reply = `Dear ${firstName}, thank you for your positive review. We greatly appreciate your feedback and are pleased that our service met your expectations. Your satisfaction is our priority.`;
            break;
          case "cheerful":
            reply = `Wow ${firstName}! You just made our day with this wonderful review! 🎉 We're absolutely thrilled that you enjoyed your experience with us. Thank you for your kind words!`;
            break;
          default:
            reply = `Thank you for your review, ${firstName}. We appreciate your positive feedback.`;
        }
      } else if (rating === 3) {
        switch (tone) {
          case "friendly":
            reply = `Hey ${firstName}! Thanks for sharing your thoughts with us. We appreciate your honest feedback and we're always working to make things better. We'd love to hear more about how we can improve next time!`;
            break;
          case "professional":
            reply = `Thank you for your feedback, ${firstName}. We value your comments and are constantly striving to improve our services. We appreciate you taking the time to share your experience with us.`;
            break;
          case "apologetic":
            reply = `${firstName}, we're sorry your experience wasn't perfect. Thank you for your feedback as it helps us improve. We'd appreciate the opportunity to better understand your concerns and address them properly.`;
            break;
          default:
            reply = `Thank you for your review, ${firstName}. We appreciate your feedback and will use it to improve.`;
        }
      } else {
        switch (tone) {
          case "apologetic":
            reply = `${firstName}, we sincerely apologize for your disappointing experience. This is not the level of service we aim to provide, and we would like to make things right. Please accept our deepest apologies.`;
            break;
          case "professional":
            reply = `Dear ${firstName}, thank you for bringing this to our attention. We regret that your experience did not meet your expectations. Your feedback is important to us, and we would appreciate the opportunity to address your concerns personally.`;
            break;
          default:
            reply = `We apologize for your experience, ${firstName}. Your feedback is important to us, and we'd like to resolve this situation.`;
        }
      }
      
      if (includeDiscount && rating <= 3) {
        reply += ` As a token of our appreciation for your feedback, we'd like to offer you a 15% discount on your next purchase with us. Please use the code THANKYOU15 on your next order.`;
      }
      
      if (includeFollowUp) {
        reply += ` Our customer success manager will reach out to you shortly to discuss your experience in more detail. We value your business and are committed to ensuring your complete satisfaction.`;
      }
      
      setGeneratedReply(reply);
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4 flex items-center gap-2">
        <Wand2 className="h-4 w-4" />
        AI Reply Generator
      </h4>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="tone">Select tone:</Label>
          <Tabs defaultValue="professional" value={tone} onValueChange={setTone} className="mt-2">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="friendly">Friendly</TabsTrigger>
              <TabsTrigger value="cheerful">Cheerful</TabsTrigger>
              <TabsTrigger value="apologetic">Apologetic</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="discount"
              checked={includeDiscount}
              onCheckedChange={(checked) => 
                setIncludeDiscount(checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="discount"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Include discount code
              </Label>
              <p className="text-xs text-muted-foreground">
                Adds a 15% discount code for the customer
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="follow-up"
              checked={includeFollowUp}
              onCheckedChange={(checked) => 
                setIncludeFollowUp(checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="follow-up"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Include follow-up message
              </Label>
              <p className="text-xs text-muted-foreground">
                Adds a message about a customer success manager following up
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {!generatedReply ? (
            <Button 
              onClick={generateReply}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Reply"}
            </Button>
          ) : (
            <>
              <Textarea 
                value={generatedReply}
                onChange={(e) => setGeneratedReply(e.target.value)}
                className="h-28"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={() => onGenerate(generatedReply)}>
                  Use this Reply
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
