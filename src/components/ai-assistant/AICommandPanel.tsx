
import { useState, useRef, useEffect } from "react";
import { Mic, Send, X, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AICommandResponse } from "./AICommandResponse";
import { toast } from "@/hooks/use-toast";

interface AICommandPanelProps {
  assistantName: string;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "Optimize my campaigns",
  "Analyze my leads",
  "Write me an email to a customer",
  "Create a social media post",
  "Suggest ad copy improvements",
];

export function AICommandPanel({ assistantName, onClose }: AICommandPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
        recordingInterval.current = null;
      }
    }
    
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording]);

  const handleSend = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setResponse(`Here's my response to "${prompt}". I've analyzed your request and prepared some suggestions based on your marketing data.`);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
    
    if (!isRecording) {
      // Start recording
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone..."
      });
      
      // Simulate speech recognition after a few seconds
      setTimeout(() => {
        setIsRecording(false);
        setPrompt("Create a Facebook ad campaign for our summer sale");
        toast({
          title: "Voice input captured",
          description: "Text transcribed from your voice"
        });
      }, 3000);
    } else {
      // Stop recording
      toast({
        title: "Voice recording cancelled"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col h-[550px] w-full bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback><Bot className="h-5 w-5 text-primary-foreground" /></AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">{assistantName} Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        {response ? (
          <AICommandResponse 
            response={response} 
            onApprove={() => { 
              console.log("Approved"); 
              setResponse(null);
              setPrompt("");
              toast({
                title: "Command approved",
                description: "The AI assistant will execute your request."
              });
            }}
            onReject={() => {
              console.log("Rejected");
              setResponse(null);
              toast({
                title: "Command rejected",
                description: "The request has been cancelled."
              });
            }}
          />
        ) : (
          <>
            <div className="mb-6 text-center">
              <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
              <p className="text-muted-foreground">Ask me anything about your marketing campaigns, analytics, or content.</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Try these:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((quickPrompt) => (
                  <Button 
                    key={quickPrompt} 
                    variant="outline" 
                    className="text-sm bg-background" 
                    onClick={() => handleQuickPrompt(quickPrompt)}
                  >
                    {quickPrompt}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Input area */}
      <div className={cn(
        "p-4 border-t", 
        isLoading && "opacity-50 pointer-events-none"
      )}>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AIDA anything..."
            className="resize-none pr-20 min-h-[60px] max-h-[180px]"
            disabled={isLoading || isRecording}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button 
              size="icon" 
              variant={isRecording ? "destructive" : "ghost"} 
              className="rounded-full"
              onClick={toggleRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              size="icon"
              className="rounded-full"
              disabled={(!prompt.trim() && !isRecording) || isLoading}
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isRecording && (
          <div className="mt-2 flex items-center justify-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-sm text-destructive">Recording... {formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
