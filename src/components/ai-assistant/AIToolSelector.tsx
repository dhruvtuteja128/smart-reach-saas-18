
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  FileText, 
  BarChart3, 
  Mail, 
  MessageSquare, 
  LayoutGrid, 
  Pencil, 
  Workflow, 
  Megaphone, 
  Image, 
  FileQuestion,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  category: string;
};

// Sample tools
const TOOLS: Tool[] = [
  {
    id: "write-campaign",
    name: "Write Campaign",
    icon: Mail,
    description: "Create email or ad campaigns",
    category: "Creation"
  },
  {
    id: "analyze-data",
    name: "Analyze Data",
    icon: BarChart3,
    description: "Analyze marketing performance",
    category: "Analysis"
  },
  {
    id: "write-copy",
    name: "Write Copy",
    icon: Pencil,
    description: "Generate copy for ads, emails, etc.",
    category: "Creation"
  },
  {
    id: "create-workflow",
    name: "Create Workflow",
    icon: Workflow,
    description: "Build marketing automation workflows",
    category: "Creation"
  },
  {
    id: "fix-content",
    name: "Fix Content",
    icon: FileText,
    description: "Improve existing content",
    category: "Editing"
  },
  {
    id: "generate-ideas",
    name: "Generate Ideas",
    icon: Megaphone,
    description: "Brainstorm marketing ideas",
    category: "Strategy"
  },
  {
    id: "describe-image",
    name: "Describe Image",
    icon: Image,
    description: "Generate image descriptions",
    category: "Creation"
  },
  {
    id: "qa-assistant",
    name: "QA Assistant",
    icon: FileQuestion,
    description: "Review and provide feedback",
    category: "Analysis"
  },
  {
    id: "summarize",
    name: "Summarize",
    icon: LayoutGrid,
    description: "Summarize text or data",
    category: "Analysis"
  },
  {
    id: "chat",
    name: "General Chat",
    icon: MessageSquare,
    description: "General conversation",
    category: "Other"
  }
];

interface AIToolSelectorProps {
  onSelectTool: (toolId: string) => void;
  selectedTool: string | null;
}

export function AIToolSelector({ onSelectTool, selectedTool }: AIToolSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pinnedTools, setPinnedTools] = useState<string[]>(["write-campaign", "analyze-data"]);
  
  // Filter tools based on search query
  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group by category
  const toolsByCategory = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const togglePinTool = (toolId: string) => {
    if (pinnedTools.includes(toolId)) {
      setPinnedTools(pinnedTools.filter(id => id !== toolId));
    } else {
      setPinnedTools([...pinnedTools, toolId]);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium mb-4">Tools</h3>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      
      {pinnedTools.length > 0 && (
        <>
          <div className="mb-2">
            <p className="text-xs text-muted-foreground mb-2">Pinned</p>
            <div className="space-y-1">
              {TOOLS.filter(tool => pinnedTools.includes(tool.id)).map(tool => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left",
                    selectedTool === tool.id ? "bg-primary text-primary-foreground" : ""
                  )}
                  onClick={() => onSelectTool(tool.id)}
                >
                  <tool.icon className="mr-2 h-4 w-4" />
                  <span>{tool.name}</span>
                </Button>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
        </>
      )}
      
      <ScrollArea className="flex-1">
        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <div key={category} className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">{category}</p>
            <div className="space-y-1">
              {tools.map(tool => (
                <div key={tool.id} className="flex items-center">
                  <Button
                    variant={selectedTool === tool.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left",
                      selectedTool === tool.id ? "bg-primary text-primary-foreground" : ""
                    )}
                    onClick={() => onSelectTool(tool.id)}
                  >
                    <tool.icon className="mr-2 h-4 w-4" />
                    <span>{tool.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => togglePinTool(tool.id)}
                  >
                    <Star 
                      className={cn(
                        "h-4 w-4",
                        pinnedTools.includes(tool.id) ? "fill-primary text-primary" : "text-muted-foreground"
                      )} 
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
