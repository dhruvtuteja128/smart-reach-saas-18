import { useState } from "react";
import { 
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    intent?: string;
    actions?: {
      label: string;
      action: string;
    }[];
  };
  onFeedback: (messageId: string, isPositive: boolean) => void;
  onActionClick?: (action: string) => void;
}

export function AIMessage({ message, onFeedback, onActionClick }: MessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`flex items-start gap-4 ${message.role === "user" ? "text-right flex-row-reverse" : ""}`}>
      <div className="bg-primary/10 p-2 rounded-full">
        <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24">
          {message.role === "user" ? (
            <path d="M12 19c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4S8 4.79 8 7v8c0 2.21 1.79 4 4 4zm-2 4v-2h4v2h-4z" />
          ) : (
            <path d="M7 22h2v-3h3c2.21 0 4-1.79 4-4s-1.79-4-4-4H9v-3H7v3H4c-2.21 0-4 1.79-4 4s1.79 4 4 4h3v3z" />
          )}
        </svg>
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="text-sm text-muted-foreground">
          {message.role === "user" ? "You" : "Assistant"} • {message.timestamp.toLocaleTimeString()}
        </div>
        
        <div className="whitespace-pre-wrap">{message.content}</div>
        
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                onClick={() => onActionClick && onActionClick(action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onFeedback(message.id, true)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Helpful</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onFeedback(message.id, false)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Not helpful</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleCopyClick}
                    disabled={isCopied}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isCopied ? "Copied!" : "Copy to clipboard"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Block</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
