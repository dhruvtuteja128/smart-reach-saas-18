
import { useState } from "react";
import { 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  onActionClick: (action: string) => void;
}

export function AIMessage({ message, onFeedback, onActionClick }: MessageProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case "campaign":
        return "bg-blue-100 text-blue-800";
      case "workflow":
        return "bg-purple-100 text-purple-800";
      case "analytics":
        return "bg-emerald-100 text-emerald-800";
      case "copywriting":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex items-start gap-4",
      message.role === "user" && "flex-row-reverse"
    )}>
      {/* Avatar or icon */}
      <div className={cn(
        "p-2 rounded-full flex-shrink-0",
        message.role === "assistant" ? "bg-primary/10" : "bg-secondary/10"
      )}>
        {message.role === "assistant" ? (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        ) : (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-secondary"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 1 0-16 0"></path>
          </svg>
        )}
      </div>

      {/* Message content */}
      <div className={cn(
        "flex flex-col",
        message.role === "user" ? "items-end" : "items-start",
        "max-w-[calc(100%-80px)]"
      )}>
        {/* Intent badge for AI messages */}
        {message.role === "assistant" && message.intent && (
          <Badge className={cn(getIntentColor(message.intent), "mb-2")}>
            {message.intent.charAt(0).toUpperCase() + message.intent.slice(1)}
          </Badge>
        )}
        
        <div className={cn(
          "rounded-lg p-4", 
          message.role === "assistant" 
            ? "bg-background border" 
            : "bg-primary text-primary-foreground"
        )}>
          <div className="whitespace-pre-wrap text-sm">
            {message.content}
          </div>
        </div>
        
        {/* Action buttons */}
        {message.role === "assistant" && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((action, index) => (
              <Button 
                key={index} 
                variant="secondary" 
                size="sm"
                onClick={() => onActionClick(action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
        
        {/* Timestamp and actions */}
        <div className={cn(
          "flex items-center gap-2 mt-1 text-xs text-muted-foreground",
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        )}>
          <span>{formatTime(message.timestamp)}</span>
          
          {message.role === "assistant" && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={handleCopy}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onFeedback(message.id, true)}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onFeedback(message.id, false)}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onActionClick("regenerate")}>
                    Regenerate response
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onActionClick("improve")}>
                    Improve response
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onActionClick("shorten")}>
                    Make it shorter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onActionClick("expand")}>
                    Make it longer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
