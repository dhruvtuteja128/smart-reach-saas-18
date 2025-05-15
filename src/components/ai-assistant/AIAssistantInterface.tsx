import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff,
  Download,
  Settings,
  History,
  Clock,
  RefreshCw,
  Zap,
  ZapOff,
  AlertCircle,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AIMessage } from "./AIMessage";
import { AIVoiceWaveform } from "./AIVoiceWaveform";
import { useToast } from "@/hooks/use-toast";
import { AIToolSelector } from "./AIToolSelector";
import { AIAssistantProfile } from "./AIAssistantProfile";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { useNavigate } from "react-router-dom"; // Add this import

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

// Mock function to simulate AI response
const mockAIResponse = async (message: string, selectedTool?: string): Promise<Partial<Message>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerMsg = message.toLowerCase();
  
  // Intent detection based on input
  let intent: string | undefined;
  let actions: {label: string, action: string}[] = [];
  let content = "";
  
  if (selectedTool === "write-campaign" || lowerMsg.includes("campaign") || lowerMsg.includes("email")) {
    intent = "campaign";
    content = "I've created a draft email campaign based on your request. It includes a responsive design with a clear call-to-action that aligns with your brand guidelines.";
    actions = [
      { label: "View Campaign", action: "view" },
      { label: "Edit Content", action: "edit" },
      { label: "Schedule", action: "schedule" }
    ];
  } 
  else if (selectedTool === "create-workflow" || lowerMsg.includes("workflow") || lowerMsg.includes("automation")) {
    intent = "workflow";
    content = "I've designed a workflow automation with the following steps: trigger on website visit, wait 24 hours, send email follow-up, and tag contacts who click as 'interested'.";
    actions = [
      { label: "View Workflow", action: "view" },
      { label: "Edit Steps", action: "edit" },
      { label: "Activate", action: "activate" }
    ];
  }
  else if (selectedTool === "analyze-data" || lowerMsg.includes("analytics") || lowerMsg.includes("performance")) {
    intent = "analytics";
    content = "Based on your recent campaign performance, I can see that your open rates are 24% (3% above industry average), but click-through rates are 1.8% (0.7% below average). Your best performing segment is 'loyal customers' with a 32% open rate.";
    actions = [
      { label: "View Full Report", action: "report" },
      { label: "Export Data", action: "export" },
    ];
  }
  else if (selectedTool === "write-copy" || lowerMsg.includes("copy") || lowerMsg.includes("write") || lowerMsg.includes("headline")) {
    intent = "copywriting";
    content = "Here are 3 headline options for your promotion:\n\n1. \"Transform Your Marketing: 50% Off Premium Features Today\"\n\n2. \"Unlock Growth: Limited-Time Marketing Suite Offer\"\n\n3. \"Boost Results in Half the Time: Special Promo Inside\"";
    actions = [
      { label: "Copy to Clipboard", action: "copy" },
      { label: "Generate More", action: "more" },
      { label: "Use in Campaign", action: "use" }
    ];
  }
  else {
    // Default response
    content = "I'm your AI marketing assistant. I can help you create campaigns, design workflows, analyze data, generate copy, and more. What would you like assistance with today?";
  }
  
  return { content, intent, actions, timestamp: new Date(), role: "assistant" };
};

interface AIAssistantInterfaceProps {
  autoActionsEnabled: boolean;
  onAutoActionsToggle: (enabled: boolean) => void;
}

export function AIAssistantInterface({ 
  autoActionsEnabled,
  onAutoActionsToggle
}: AIAssistantInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState<"text" | "voice" | "hybrid">("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add initial greeting message when component mounts
  useEffect(() => {
    const initialMessage: Message = {
      id: "initial",
      role: "assistant",
      content: "👋 Hi there! I'm your marketing AI assistant. I can help with campaigns, workflows, analytics, copywriting, and more. What can I help you with today?",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      const aiResponse = await mockAIResponse(inputValue, selectedTool || undefined);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content || "",
        timestamp: new Date(),
        intent: aiResponse.intent,
        actions: aiResponse.actions
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-execute actions if enabled and the action is available
      if (autoActionsEnabled && assistantMessage.actions && assistantMessage.actions.length > 0) {
        const firstAction = assistantMessage.actions[0];
        toast({
          description: `Auto-executing: ${firstAction.label}`
        });
        
        // Here would be the logic to actually execute the action
        // For demo purposes, we'll just log it
        console.log("Auto-executing action:", firstAction);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Sorry, I couldn't process your request. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        description: "Voice recording started. Speak clearly..."
      });
      // This would be where you implement actual voice recording
      // For demo, we'll simulate with a timeout
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("Generate an email campaign for new product launch");
        toast({
          description: "Voice input captured"
        });
      }, 3000);
    } else {
      toast({
        description: "Voice recording cancelled"
      });
    }
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    if (isPositive) {
      toast({
        description: "Thank you for your positive feedback!"
      });
    } else {
      toast({
        description: "Thank you for your feedback. We'll use it to improve our AI responses."
      });
    }
    // In a real app, you'd send this feedback to your backend
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case "view":
        toast({
          description: "Opening in viewer..."
        });
        break;
      case "edit":
        toast({
          description: "Opening editor..."
        });
        break;
      case "schedule":
        toast({
          description: "Opening scheduler..."
        });
        break;
      case "activate":
        toast({
          description: "Workflow activated!"
        });
        break;
      case "report":
        toast({
          description: "Generating full analytics report..."
        });
        break;
      case "export":
        toast({
          description: "Exporting data..."
        });
        break;
      case "copy":
        // In a real app, you would need to extract the text to copy
        navigator.clipboard.writeText("Sample text copied to clipboard");
        toast({
          description: "Copied to clipboard!"
        });
        break;
      case "more":
        toast({
          description: "Generating more options..."
        });
        break;
      case "use":
        toast({
          description: "Adding to campaign editor..."
        });
        break;
      default:
        toast({
          description: `Action ${action} triggered`
        });
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: "reset",
      role: "assistant",
      content: "Chat history has been cleared. How else can I help you today?",
      timestamp: new Date(),
    }]);
    toast({
      description: "Chat history cleared"
    });
  };

  const handleExport = (format: "pdf" | "html") => {
    toast({
      description: `Exporting conversation as ${format.toUpperCase()}...`
    });
    // Implementation would connect to a PDF/HTML generator
    setTimeout(() => {
      toast({
        description: `${format.toUpperCase()} export complete!`
      });
    }, 1500);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast({
      description: `Tool selected: ${toolId}`
    });
  };

  const handleVoiceModeChange = (mode: "text" | "voice" | "hybrid") => {
    setVoiceMode(mode);
    toast({
      description: `Voice mode set to ${mode}`
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
      {/* Left panel - Tool selector */}
      <div className="md:col-span-2 bg-background border rounded-lg p-4 hidden md:block">
        <AIToolSelector onSelectTool={handleToolSelect} selectedTool={selectedTool} />
      </div>
      
      {/* Center panel - Chat interface */}
      <div className="md:col-span-7 flex flex-col h-full bg-background border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Badge variant={isLoading ? "outline" : "default"} className="gap-1">
              {isLoading ? <Loader className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
              <span>{isLoading ? "Processing..." : "Ready"}</span>
            </Badge>
            
            {selectedTool && (
              <Badge variant="secondary" className="gap-1">
                <span>Using: {selectedTool}</span>
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleClearChat}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleExport("pdf")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export conversation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Chat history</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex items-center">
              <Switch 
                checked={autoActionsEnabled} 
                onCheckedChange={onAutoActionsToggle}
                id="auto-actions" 
                className="mr-2"
              />
              <label htmlFor="auto-actions" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                {autoActionsEnabled ? <Zap className="h-3 w-3" /> : <ZapOff className="h-3 w-3" />}
                <span className="hidden sm:inline">Auto-Actions</span>
              </label>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 pb-20">
            {messages.map((message) => (
              <AIMessage 
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
                onActionClick={handleActionClick}
              />
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg className="h-8 w-8 text-primary animate-pulse" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2 pt-2">
                  <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-1/2" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Context-aware suggestion chips */}
        {!isLoading && messages.length > 0 && (
          <div className="p-4 border-t">
            <SuggestedPrompts 
              onSelect={(prompt) => setInputValue(prompt)} 
              smartMode={true}
            />
          </div>
        )}
        
        {/* Voice waveform (shown when recording or in voice mode) */}
        {isRecording && (
          <div className="p-4 border-t bg-muted/20">
            <AIVoiceWaveform playing={true} />
          </div>
        )}
        
        {/* Input Area */}
        <div className="border-t p-4 bg-background/95 backdrop-blur-sm">
          <div className="relative flex items-center">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or type a command..."
              className="resize-none pr-24 min-h-[60px] max-h-[120px]"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className={cn(isRecording && "text-red-500")}
                      onClick={toggleRecording}
                      disabled={isLoading}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isRecording ? "Stop recording" : "Start voice input"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                type="button"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="text-primary rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel - Assistant Profile */}
      <div className="md:col-span-3 bg-background border rounded-lg p-4 hidden md:block">
        <AIAssistantProfile 
          onVoiceModeChange={handleVoiceModeChange}
          currentVoiceMode={voiceMode}
        />
      </div>
    </div>
  );
}
