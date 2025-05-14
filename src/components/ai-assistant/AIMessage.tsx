
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Bot, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  intent?: string;
  actions?: {
    label: string;
    action: string;
  }[];
}

interface AIMessageProps {
  message: Message;
  onFeedback: (messageId: string, isPositive: boolean) => void;
  onActionClick: (action: string) => void;
}

export function AIMessage({ message, onFeedback, onActionClick }: AIMessageProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"none" | "positive" | "negative">("none");
  
  const isAssistant = message.role === "assistant";
  const hasActions = isAssistant && message.actions && message.actions.length > 0;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleFeedback = (isPositive: boolean) => {
    setFeedback(isPositive ? "positive" : "negative");
    onFeedback(message.id, isPositive);
  };
  
  const getIntentBadge = () => {
    if (!message.intent) return null;
    
    const intentConfig: Record<string, { label: string, className: string }> = {
      campaign: { 
        label: "Campaign", 
        className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      },
      workflow: { 
        label: "Workflow", 
        className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" 
      },
      analytics: { 
        label: "Analytics", 
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
      },
      copywriting: { 
        label: "Copy", 
        className: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" 
      }
    };
    
    const config = intentConfig[message.intent] || { 
      label: message.intent, 
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
    };
    
    return (
      <Badge className={cn("capitalize", config.className)}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className={cn(
      "flex items-start gap-4 animate-fade-in",
      !isAssistant && "flex-row-reverse"
    )}>
      {isAssistant ? (
        <Avatar className="w-8 h-8 bg-primary">
          <AvatarFallback><Bot className="h-5 w-5 text-primary-foreground" /></AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8 h-8 rounded-full bg-secondary">
          <div className="h-full w-full flex items-center justify-center text-secondary-foreground font-medium">
            U
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[85%]",
        !isAssistant && "items-end"
      )}>
        <div className={cn(
          "rounded-lg py-2 px-3",
          isAssistant ? "bg-muted" : "bg-primary text-primary-foreground",
          message.intent && "border-l-4",
          message.intent === "campaign" && "border-purple-500",
          message.intent === "workflow" && "border-orange-500",
          message.intent === "analytics" && "border-blue-500",
          message.intent === "copywriting" && "border-pink-500"
        )}>
          <div className="flex items-center gap-2 mb-1">
            {isAssistant && getIntentBadge()}
            <span className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          
          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        </div>
        
        {isAssistant && (
          <div className="flex flex-wrap items-center mt-2 gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            
            {hasActions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {message.actions.map((action) => (
                  <Button
                    key={action.action}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs bg-background"
                    onClick={() => onActionClick(action.action)}
                  >
                    {action.label}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                ))}
              </div>
            )}
            
            <div className="flex items-center ml-auto gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 w-7 p-0",
                  feedback === "positive" && "text-primary"
                )}
                onClick={() => handleFeedback(true)}
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
                onClick={() => handleFeedback(false)}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
