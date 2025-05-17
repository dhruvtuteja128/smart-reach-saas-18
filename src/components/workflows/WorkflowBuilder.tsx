
import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  ZoomIn,
  ZoomOut,
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
import { WorkflowNode } from "./WorkflowNode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Define node types for our workflow
const nodeTypes = {
  workflowNode: WorkflowNode,
};

interface WorkflowBuilderProps {
  onSave?: (name: string, status: string) => void;
  onClose: () => void;
  workflowId?: string | null;
  workflow?: any;
}

export function WorkflowBuilder({ onSave, onClose, workflowId, workflow }: WorkflowBuilderProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [workflowName, setWorkflowName] = useState(workflow?.name || "");
  const [workflowStatus, setWorkflowStatus] = useState(workflow?.status || "draft");
  
  // Initialize with sample nodes if editing an existing workflow
  const initialNodes = workflowId 
    ? [
        {
          id: 'trigger-1',
          type: 'workflowNode',
          position: { x: 250, y: 50 },
          data: {
            id: 'trigger-1',
            type: 'trigger',
            label: 'New Contact Added',
            icon: 'Users',
            onConfigure: handleConfigureNode,
            onDelete: handleDeleteNode
          }
        },
        {
          id: 'action-1',
          type: 'workflowNode',
          position: { x: 250, y: 175 },
          data: {
            id: 'action-1',
            type: 'action',
            label: 'Send Welcome Email',
            icon: 'Mail',
            onConfigure: handleConfigureNode,
            onDelete: handleDeleteNode
          }
        }
      ]
    : [];

  const initialEdges = workflowId
    ? [
        {
          id: 'e1-2',
          source: 'trigger-1',
          target: 'action-1',
          type: 'smoothstep',
        }
      ]
    : [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  function handleConfigureNode(nodeId: string, config: any) {
    setNodes((nds) => nds.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            label: config.label || node.data.label,
            config: {
              ...(node.data.config || {}),
              ...config
            }
          }
        };
      }
      return node;
    }));
  }
  
  function handleDeleteNode(nodeId: string) {
    // First, find all edges connected to this node and remove them
    const nodesToDelete = [nodeId];
    
    setEdges((eds) => eds.filter(edge => 
      !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target)
    ));
    
    // Then remove the node
    setNodes((nds) => nds.filter(node => !nodesToDelete.includes(node.id)));
    
    toast.success("Node removed from workflow");
  }

  const onConnect = useCallback((params: Connection) => {
    // Check if we already have a connection from this source
    const sourceHasConnection = edges.some(
      edge => edge.source === params.source && edge.sourceHandle === params.sourceHandle
    );
    
    // For simplicity, let's allow multiple connections from a single source
    setEdges((eds) => addEdge({...params, type: 'smoothstep'}, eds));
    toast.success("Nodes connected successfully");
  }, [edges, setEdges]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const itemData = event.dataTransfer.getData('application/json');
    
    try {
      const data = JSON.parse(itemData);
      
      // Get position where item was dropped
      const position = {
        x: (event.clientX - reactFlowBounds.left) / (zoom / 100),
        y: (event.clientY - reactFlowBounds.top) / (zoom / 100),
      };

      const nodeId = `${data.id}-${uuidv4().substring(0, 8)}`;
      
      const newNode: Node = {
        id: nodeId,
        type: 'workflowNode',
        position,
        data: {
          id: nodeId,
          type: data.id.split('-')[0],
          label: data.label,
          icon: data.icon.name,
          onConfigure: handleConfigureNode,
          onDelete: handleDeleteNode
        },
      };

      setNodes((nds) => [...nds, newNode]);
      toast.success(`Added ${data.label} node to workflow`);
    } catch (error) {
      console.error('Error creating new node:', error);
      toast.error('Could not add node to workflow');
    }
  };

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }
    
    if (onSave) {
      onSave(workflowName, workflowStatus);
    }
    
    toast.success("Workflow saved successfully");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center bg-background/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">
            {workflowId ? `Edit: ${workflowName || "Untitled Workflow"}` : "New Workflow"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-md">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
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
          <Button size="sm" onClick={handleSaveWorkflow}>
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
          className="flex-1 bg-muted/30 overflow-auto" 
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            style={{ width: '100%', height: '100%' }}
            minZoom={0.5}
            maxZoom={2}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
            }}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <Background gap={15} />
            <Controls />
            <MiniMap />
            <Panel position="top-center">
              <div className="bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md mt-2">
                <p className="text-sm">Drag elements from the left sidebar onto the canvas to build your workflow</p>
              </div>
            </Panel>
          </ReactFlow>
        </div>

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
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input
                  id="workflow-name"
                  placeholder="Enter workflow name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={workflowStatus} onValueChange={setWorkflowStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="run-once">Run only once per contact</Label>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" id="run-once" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
