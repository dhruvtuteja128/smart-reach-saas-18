
import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AIChat } from "@/components/ai-assistant/AIChat";
import { AITools } from "@/components/ai-assistant/AITools";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Mic,
  MicOff,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Assistant = () => {
  // State for managing the tools panel visibility
  const [showTools, setShowTools] = useState(true);
  const [activePanel, setActivePanel] = useState<string | null>("campaign");
  const [smartMode, setSmartMode] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check viewport size on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowTools(false);
      }
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  const toggleTools = () => {
    setShowTools(!showTools);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-64px)] animate-fade-in">
        <header className="p-4 md:p-6 flex justify-between items-center border-b">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">AI Marketing Assistant</h1>
            <p className="text-muted-foreground">Generate content, analyze data, and automate your marketing tasks</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSmartMode(!smartMode)}
              className={cn(
                "hidden md:flex",
                smartMode ? "bg-primary/10 text-primary" : ""
              )}
            >
              {smartMode ? "Smart Mode" : "Strict Mode"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={toggleTools}
            >
              {showTools ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Tools Panel (Left Side) */}
          <div 
            className={cn(
              "border-r bg-background transition-all duration-300 ease-in-out",
              showTools ? "w-80" : "w-0",
              isMobileView && showTools ? "absolute left-0 top-[121px] bottom-0 z-10 shadow-lg" : ""
            )}
          >
            {showTools && <AITools activePanel={activePanel} setActivePanel={setActivePanel} />}
          </div>

          {/* Chat Interface (Right Side) */}
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <AIChat smartMode={smartMode} />
            </div>
          </div>

          {/* Toggle Tools Panel Button (Desktop) */}
          <button
            className={cn(
              "hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-background border border-r-0 rounded-r-md h-12 w-6 items-center justify-center text-muted-foreground hover:text-foreground",
              showTools ? "left-80" : "left-0"
            )}
            onClick={toggleTools}
          >
            {showTools ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;
