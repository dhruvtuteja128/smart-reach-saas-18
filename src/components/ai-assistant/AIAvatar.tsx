
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Bot, 
  Loader2, 
  AlertTriangle,
  ZapOff
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AICommandPanel } from "./AICommandPanel";

type AIState = "online" | "processing" | "error" | "idle";

interface AIAvatarProps {
  state?: AIState;
  name?: string;
  className?: string;
}

export function AIAvatar({ 
  state = "online", 
  name = "AIDA", 
  className 
}: AIAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pulseState, setPulseState] = useState(false);

  // Create a nice breathing effect when online
  useEffect(() => {
    if (state === "online") {
      const interval = setInterval(() => {
        setPulseState(prev => !prev);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [state]);

  const getBackgroundClass = () => {
    switch (state) {
      case "online":
        return "bg-primary";
      case "processing":
        return "bg-amber-500";
      case "error":
        return "bg-destructive";
      case "idle":
        return "bg-muted";
    }
  };

  const getStatusIcon = () => {
    switch (state) {
      case "online":
        return <Bot className="h-6 w-6 text-primary-foreground" />;
      case "processing":
        return <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />;
      case "error":
        return <AlertTriangle className="h-6 w-6 text-primary-foreground" />;
      case "idle":
        return <ZapOff className="h-6 w-6 text-primary-foreground" />;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className={cn(
              "fixed z-50 flex items-center justify-center rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110",
              getBackgroundClass(),
              pulseState && state === "online" && "animate-pulse",
              className
            )}
            aria-label={`${name} AI Assistant`}
          >
            {getStatusIcon()}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] p-0">
          <AICommandPanel 
            assistantName={name} 
            onClose={() => setIsOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
