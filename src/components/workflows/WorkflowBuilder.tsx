
import { useState } from "react";
import {
  ArrowsOut,
  ArrowsIn,
  Clock,
  Code,
  Cog,
  FileText,
  Mail,
  MessagesSquare,
  MessageCircle,
  MousePointerClick,
  PanelRight,
  Plus,
  Save,
  Tag,
  Timer,
  User,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface WorkflowBuilderProps {
  onSave?: () => void;
  onClose: () => void;
}

export function WorkflowBuilder({ onSave, onClose }: WorkflowBuilderProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showSettings, setShowSettings] = useState(false);

  // Mock data for the node categories - in a real implementation, this would be more robust
  const nodeCategories = [
    {
      title: "Triggers",
      description: "Start your workflow with a trigger",
      items: [
        { id: "trigger-contact", label: "Contact Added", icon: Users },
        { id: "trigger-form", label: "Form Submitted", icon: FileText },
        { id: "trigger-campaign", label: "Campaign Clicked", icon: MousePointerClick },
        { id: "trigger-page", label: "Page Viewed", icon: FileText },
        { id: "trigger-tag", label: "Tag Added", icon: Tag },
        { id: "trigger-webhook", label: "Custom Webhook", icon: Code },
      ],
    },
    {
      title: "Actions",
      description: "Add actions to your workflow",
      items: [
        { id: "action-email", label: "Send Email", icon: Mail },
        { id: "action-sms", label: "Send SMS", icon: MessageCircle },
        { id: "action-whatsapp", label: "Send WhatsApp", icon: MessagesSquare },
        { id: "action-add-tag", label: "Add Tag", icon: Tag },
        { id: "action-remove-tag", label: "Remove Tag", icon: Tag },
        { id: "action-assign", label: "Assign to Sales Rep", icon: User },
      ],
    },
    {
      title: "Conditions",
      description: "Add conditional logic",
      items: [
        { id: "condition-tag", label: "If Tag Exists", icon: Tag },
        { id: "condition-score", label: "If Lead Score >", icon: Workflow },
        { id: "condition-click", label: "If Email Clicked", icon: MousePointerClick },
        { id: "condition-reply", label: "If No Reply after X time", icon: MessagesSquare },
      ],
    },
    {
      title: "Delays",
      description: "Add waiting periods",
      items: [
        { id: "delay-time", label: "Wait for X time", icon: Clock },
        { id: "delay-until", label: "Wait until specific time", icon: Timer },
        { id: "delay-condition", label: "Wait until condition met", icon: Workflow },
      ],
    },
    {
      title: "Goals/Exits",
      description: "End your workflow",
      items: [
        { id: "exit-converted", label: "Converted", icon: Zap },
        { id: "exit-unsubscribed", label: "Unsubscribed", icon: X },
        { id: "exit-purchase", label: "Purchase Made", icon: Workflow },
        { id: "exit-manual", label: "Manual Exit", icon: X },
      ],
    },
  ];

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 10);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center bg-background/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">New Workflow</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-md">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ArrowsIn className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ArrowsOut className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            <Cog className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Elements */}
        <div className="w-64 border-r overflow-auto bg-background/95 backdrop-blur-sm">
          <div className="p-4">
            <h2 className="font-medium mb-4">Workflow Elements</h2>
            <div className="space-y-6">
              {nodeCategories.map((category) => (
                <div key={category.title} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 rounded-md cursor-move hover:bg-muted text-sm"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("application/json", JSON.stringify(item));
                        }}
                      >
                        <div className="bg-primary/10 p-1.5 rounded">
                          <item.icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div 
          className="flex-1 bg-muted/30 overflow-auto p-8" 
          style={{ 
            backgroundImage: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
            backgroundSize: "20px 20px" 
          }}
        >
          <div 
            className="min-h-full bg-white rounded-lg shadow-sm border flex items-center justify-center"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: "center center",
              transition: "transform 0.2s ease-in-out",
              width: "2000px",
              height: "1500px"
            }}
          >
            {/* Empty state or starter node */}
            <div className="text-center p-8 max-w-md">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start Building Your Workflow</h3>
              <p className="text-muted-foreground mb-6">
                Drag elements from the left sidebar to begin creating your automation workflow.
                Start with a trigger and connect it to actions, conditions, or delays.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Trigger
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Configuration (shown when a node is selected) */}
        {selectedNode && (
          <div className="w-72 border-l overflow-auto bg-background/95 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Element Settings</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure your selected element here.
                </p>
                {/* Placeholder for node configuration form */}
                <div className="space-y-4">
                  <p className="text-sm">Settings would appear here based on the selected node type.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Settings Sheet */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Workflow Settings</SheetTitle>
              <SheetDescription>
                Configure settings for your entire workflow
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Workflow Name</h3>
                <input
                  type="text"
                  placeholder="Enter workflow name"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status</h3>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Paused</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Run only once per contact</span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Segment filter for entry</h3>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>All Contacts</option>
                  <option>New Subscribers</option>
                  <option>Custom Segment</option>
                </select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
