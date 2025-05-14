
import { CheckCircle2, XCircle, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AICommandResponseProps {
  response: string;
  onApprove: () => void;
  onReject: () => void;
}

export function AICommandResponse({ 
  response, 
  onApprove, 
  onReject 
}: AICommandResponseProps) {
  const [feedback, setFeedback] = useState<"none" | "positive" | "negative">("none");
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-4">
      <div className="text-sm mb-4 whitespace-pre-wrap">{response}</div>
      
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-background"
            onClick={onApprove}
          >
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-background"
            onClick={onReject}
          >
            <XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-background"
            onClick={copyToClipboard}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="text-xs">Was this helpful?</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-7 w-7 p-0", 
              feedback === "positive" && "text-primary"
            )}
            onClick={() => setFeedback("positive")}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-7 w-7 p-0", 
              feedback === "negative" && "text-destructive"
            )}
            onClick={() => setFeedback("negative")}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
