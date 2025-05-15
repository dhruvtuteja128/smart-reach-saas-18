
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface AIAssistantEmotionPreviewProps {
  emotion: "neutral" | "happy" | "thinking" | "surprised";
  size?: "small" | "medium" | "large";
  className?: string;
}

export function AIAssistantEmotionPreview({ 
  emotion = "neutral",
  size = "medium", 
  className
}: AIAssistantEmotionPreviewProps) {
  // Define size classes
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-24 w-24"
  };
  
  // Define emotion styles
  const getEmotionStyles = () => {
    switch (emotion) {
      case "happy":
        return {
          background: "bg-emerald-100 dark:bg-emerald-900",
          icon: "text-emerald-600 dark:text-emerald-300",
          animation: "animate-pulse"
        };
      case "thinking":
        return {
          background: "bg-amber-100 dark:bg-amber-900",
          icon: "text-amber-600 dark:text-amber-300",
          animation: ""
        };
      case "surprised":
        return {
          background: "bg-purple-100 dark:bg-purple-900",
          icon: "text-purple-600 dark:text-purple-300",
          animation: "animate-bounce"
        };
      default: // neutral
        return {
          background: "bg-primary/10",
          icon: "text-primary",
          animation: ""
        };
    }
  };
  
  const emotionStyles = getEmotionStyles();
  
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(
        sizeClasses[size],
        emotionStyles.background,
        emotionStyles.animation
      )}>
        <AvatarFallback>
          <Bot className={cn(
            "h-1/2 w-1/2",
            emotionStyles.icon
          )} />
        </AvatarFallback>
      </Avatar>
      
      {/* Add emotion indicator dot */}
      <span className={cn(
        "absolute bottom-0 right-0 rounded-full border-2 border-background",
        size === "small" ? "h-2 w-2" : size === "medium" ? "h-3 w-3" : "h-4 w-4",
        emotion === "happy" ? "bg-emerald-500" : 
        emotion === "thinking" ? "bg-amber-500" : 
        emotion === "surprised" ? "bg-purple-500" : 
        "bg-primary"
      )} />
    </div>
  );
}
