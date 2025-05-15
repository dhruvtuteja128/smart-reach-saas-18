
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AICommandPanel } from "./AICommandPanel";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { AIAssistantEmotionPreview } from "./AIAssistantEmotionPreview";

interface AIFloatingButtonProps {
  className?: string;
}

export function AIFloatingButton({ className }: AIFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button
        className={cn(
          "fixed z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <AICommandPanel 
            assistantName="AIDA" 
            onClose={() => setIsOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
