
import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic,
  MicOff,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Download,
  Clock,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AIMessage } from "./AIMessage";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface AIHistoryItem {
  date: string;
  conversations: {
    title: string;
    messageCount: number;
    id: string;
  }[];
}

// Sample conversation history for demo
const sampleConversationHistory: AIHistoryItem[] = [
  {
    date: "Today",
    conversations: [
      { title: "Email Campaign Strategy", messageCount: 8, id: "conv1" },
      { title: "Customer Segmentation Help", messageCount: 5, id: "conv2" }
    ]
  },
  {
    date: "Yesterday",
    conversations: [
      { title: "Abandoned Cart Workflow", messageCount: 12, id: "conv3" },
      { title: "Lead Scoring Analysis", messageCount: 6, id: "conv4" }
    ]
  },
  {
    date: "Past 7 Days",
    conversations: [
      { title: "Social Media Campaign Ideas", messageCount: 9, id: "conv5" },
      { title: "Product Launch Strategy", messageCount: 14, id: "conv6" },
      { title: "Email Subject Line Generator", messageCount: 4, id: "conv7" }
    ]
  }
];

interface AIResponse {
  content: string;
  intent?: string;
  actions?: {
    label: string;
    action: string;
  }[];
}

// Mock function to simulate AI response
const mockAIResponse = async (message: string): Promise<AIResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerMsg = message.toLowerCase();
  
  // Intent detection based on input
  let intent: string | undefined;
  let actions: {label: string, action: string}[] = [];
  let content = "";
  
  if (lowerMsg.includes("campaign") || lowerMsg.includes("email")) {
    intent = "campaign";
    content = "I've created a draft email campaign based on your request. It includes a responsive design with a clear call-to-action that aligns with your brand guidelines.";
    actions = [
      { label: "View Campaign", action: "view" },
      { label: "Edit Content", action: "edit" },
      { label: "Schedule", action: "schedule" }
    ];
  } 
  else if (lowerMsg.includes("workflow") || lowerMsg.includes("automation")) {
    intent = "workflow";
    content = "I've designed a workflow automation with the following steps: trigger on website visit, wait 24 hours, send email follow-up, and tag contacts who click as 'interested'.";
    actions = [
      { label: "View Workflow", action: "view" },
      { label: "Edit Steps", action: "edit" },
      { label: "Activate", action: "activate" }
    ];
  }
  else if (lowerMsg.includes("analytics") || lowerMsg.includes("performance")) {
    intent = "analytics";
    content = "Based on your recent campaign performance, I can see that your open rates are 24% (3% above industry average), but click-through rates are 1.8% (0.7% below average). Your best performing segment is 'loyal customers' with a 32% open rate.";
    actions = [
      { label: "View Full Report", action: "report" },
      { label: "Export Data", action: "export" },
    ];
  }
  else if (lowerMsg.includes("copy") || lowerMsg.includes("write") || lowerMsg.includes("headline")) {
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
  
  return { content, intent, actions };
};

interface AIChatProps {
  smartMode: boolean;
}

export function AIChat({ smartMode }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const aiResponse = await mockAIResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        intent: aiResponse.intent,
        actions: aiResponse.actions
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      toast.error("Sorry, I couldn't process your request. Please try again.");
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
      toast.info("Voice recording started. Speak clearly...");
      // This would be where you implement actual voice recording
      // For demo, we'll simulate with a timeout
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("Generate an email campaign for new product launch");
        toast.info("Voice input captured.");
      }, 3000);
    } else {
      toast.info("Voice recording cancelled.");
    }
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    if (isPositive) {
      toast.success("Thank you for your positive feedback!");
    } else {
      toast.info("Thank you for your feedback. We'll use it to improve our AI responses.");
    }
    // In a real app, you'd send this feedback to your backend
  };

  const handleActionClick = (action: string, messageId: string) => {
    switch (action) {
      case "view":
        toast.info("Opening in viewer...");
        break;
      case "edit":
        toast.info("Opening editor...");
        break;
      case "schedule":
        toast.info("Opening scheduler...");
        break;
      case "activate":
        toast.success("Workflow activated!");
        break;
      case "report":
        toast.info("Generating full analytics report...");
        break;
      case "export":
        toast.info("Exporting data...");
        break;
      case "copy":
        // In a real app, you would need to extract the text to copy
        navigator.clipboard.writeText("Sample text copied to clipboard");
        toast.success("Copied to clipboard!");
        break;
      case "more":
        toast.info("Generating more options...");
        break;
      case "use":
        toast.info("Adding to campaign editor...");
        break;
      default:
        toast.info(`Action ${action} triggered`);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: "reset",
      role: "assistant",
      content: "Chat history has been cleared. How else can I help you today?",
      timestamp: new Date(),
    }]);
    toast.info("Chat history cleared.");
  };

  const handleHistoryItemClick = (id: string, title: string) => {
    toast.info(`Loading conversation: ${title}`);
    setShowHistory(false);
    // In a real app, you would fetch the actual conversation
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Chat Area */}
      <div className={cn(
        "flex flex-col h-full transition-all duration-300 ease-in-out",
        showHistory ? "md:ml-72" : ""
      )}>
        {/* Messages Container */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 pb-20">
            {messages.map((message) => (
              <AIMessage 
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
                onActionClick={(action) => handleActionClick(action, message.id)}
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
          <SuggestedPrompts 
            onSelect={(prompt) => setInputValue(prompt)} 
            smartMode={smartMode}
          />
        )}

        {/* Input Area */}
        <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative flex items-center max-w-4xl mx-auto">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or type a command..."
              className="pr-24"
              disabled={isLoading}
            />
            <div className="absolute right-1 flex gap-1">
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
              
              <Button
                type="button"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="text-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => setShowHistory(!showHistory)}
              >
                <Clock className="h-3 w-3 mr-1" />
                History
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={handleClearChat}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conversation History Sidebar */}
      <div className={cn(
        "absolute left-0 top-[121px] bottom-0 border-r bg-background w-72 transition-all duration-300 ease-in-out transform",
        showHistory ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:z-10",
        !showHistory && "md:hidden"
      )}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">Conversation History</h3>
          <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100%-53px)]">
          <div className="p-2">
            {sampleConversationHistory.map((item) => (
              <div key={item.date} className="mb-4">
                <h4 className="text-xs text-muted-foreground mb-1 px-2">{item.date}</h4>
                {item.conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className="w-full text-left p-2 hover:bg-accent rounded-md text-sm flex justify-between items-center"
                    onClick={() => handleHistoryItemClick(conv.id, conv.title)}
                  >
                    <span className="truncate">{conv.title}</span>
                    <span className="text-xs text-muted-foreground">{conv.messageCount}</span>
                  </button>
                ))}
              </div>
            ))}
            
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="h-3 w-3" />
                Export History
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
