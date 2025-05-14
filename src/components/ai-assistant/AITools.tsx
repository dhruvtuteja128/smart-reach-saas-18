import { useState } from "react";
import { 
  MessageSquare,
  Bot,
  Settings,
  Play,
  ArrowRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "communication" | "analytics" | "content" | "workflow";
  actions: {
    label: string;
    action: () => void;
  }[];
}

const tools: AITool[] = [
  {
    id: "email-campaign",
    name: "Email Campaign Builder",
    description: "Create email campaigns with AI-generated content",
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    category: "communication",
    actions: [
      {
        label: "Create Campaign",
        action: () => console.log("Create email campaign")
      },
      {
        label: "Generate Template",
        action: () => console.log("Generate email template")
      }
    ]
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    description: "Analyze customer feedback and reviews",
    icon: <Bot className="h-5 w-5 text-purple-500" />,
    category: "analytics",
    actions: [
      {
        label: "Analyze Feedback",
        action: () => console.log("Analyze feedback")
      }
    ]
  },
  {
    id: "content-generator",
    name: "Content Generator",
    description: "Create marketing copy and content",
    icon: <Play className="h-5 w-5 text-green-500" />,
    category: "content",
    actions: [
      {
        label: "Generate Copy",
        action: () => console.log("Generate copy")
      },
      {
        label: "Write Blog Post",
        action: () => console.log("Write blog post")
      }
    ]
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    description: "Create customer journey workflows",
    icon: <Settings className="h-5 w-5 text-amber-500" />,
    category: "workflow",
    actions: [
      {
        label: "Design Workflow",
        action: () => console.log("Design workflow")
      }
    ]
  }
];

interface AIToolsProps {
  onToolSelect?: (toolId: string) => void;
}

export function AITools({ onToolSelect }: AIToolsProps) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  
  const categories = [
    { id: "all", label: "All Tools" },
    { id: "communication", label: "Communication" },
    { id: "analytics", label: "Analytics" },
    { id: "content", label: "Content" },
    { id: "workflow", label: "Workflow" }
  ];
  
  const filteredTools = activeCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);
    
  const handleToolAction = (tool: AITool, actionIndex: number) => {
    tool.actions[actionIndex].action();
    toast({
      title: `${tool.name}: ${tool.actions[actionIndex].label}`,
      description: "Action executed successfully",
    });
    setDrawerOpen(false);
  };
    
  const handleToolClick = (tool: AITool) => {
    setSelectedTool(tool);
    if (onToolSelect) {
      onToolSelect(tool.id);
    }
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col">
      {/* Category Filter */}
      <div className="flex overflow-x-auto no-scrollbar pb-2 mb-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-1 text-sm whitespace-nowrap rounded-full mr-2",
              activeCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTools.map(tool => (
          <button
            key={tool.id}
            className="flex flex-col bg-card rounded-lg border p-4 text-left hover:border-primary transition-colors"
            onClick={() => handleToolClick(tool)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                {tool.icon}
              </div>
              <span className="font-medium text-sm">{tool.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{tool.description}</p>
          </button>
        ))}
      </div>
      
      {/* Tool Detail Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <div className="p-4 bg-background">
            {selectedTool && (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                      {selectedTool.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedTool.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTool.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Available Actions</h4>
                    <div className="space-y-2">
                      {selectedTool.actions.map((action, index) => (
                        <Button 
                          key={index} 
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => handleToolAction(selectedTool, index)}
                        >
                          {action.label}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium pt-2">Usage Examples</h4>
                    <div className="bg-muted rounded-md p-3 text-sm">
                      <p>• "Use {selectedTool.name} to analyze my latest campaign"</p>
                      <p>• "Create a new {selectedTool.name.toLowerCase()} for my marketing team"</p>
                      <p>• "Show me how to optimize with {selectedTool.name}"</p>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    if (selectedTool.actions.length > 0) {
                      handleToolAction(selectedTool, 0);
                    }
                  }}>
                    {selectedTool.actions.length > 0 ? selectedTool.actions[0].label : "Use Tool"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
