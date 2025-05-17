
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Cog, 
  Trash,
  Mail,
  MessageCircle,
  MessagesSquare,
  FileText,
  Code,
  Tag,
  User,
  Users,
  Clock,
  Timer,
  MousePointerClick,
  Workflow,
  X,
  Zap,
  Save
} from "lucide-react";
import { toast } from "sonner";

interface WorkflowNodeProps {
  data: {
    type: string;
    label: string;
    icon: string;
    onConfigure?: (id: string, config: any) => void;
    onDelete?: (id: string) => void;
    id: string;
    config?: any;  // Explicitly add config property to the interface
  };
  id: string;
  selected: boolean;
}

export function WorkflowNode({ 
  data,
  id,
  selected 
}: WorkflowNodeProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [nodeLabel, setNodeLabel] = useState(data.label);

  const renderIcon = () => {
    switch (data.icon) {
      case 'Mail': return <Mail className="h-4 w-4 text-primary" />;
      case 'MessageCircle': return <MessageCircle className="h-4 w-4 text-primary" />;
      case 'MessagesSquare': return <MessagesSquare className="h-4 w-4 text-primary" />;
      case 'FileText': return <FileText className="h-4 w-4 text-primary" />;
      case 'Code': return <Code className="h-4 w-4 text-primary" />;
      case 'Tag': return <Tag className="h-4 w-4 text-primary" />;
      case 'User': return <User className="h-4 w-4 text-primary" />;
      case 'Users': return <Users className="h-4 w-4 text-primary" />;
      case 'Clock': return <Clock className="h-4 w-4 text-primary" />;
      case 'Timer': return <Timer className="h-4 w-4 text-primary" />;
      case 'MousePointerClick': return <MousePointerClick className="h-4 w-4 text-primary" />;
      case 'Workflow': return <Workflow className="h-4 w-4 text-primary" />;
      case 'X': return <X className="h-4 w-4 text-primary" />;
      case 'Zap': return <Zap className="h-4 w-4 text-primary" />;
      default: return <Workflow className="h-4 w-4 text-primary" />;
    }
  };

  // Determine if we should show source/target handles based on node type
  const showSourceHandle = data.type !== 'exit';
  const showTargetHandle = data.type !== 'trigger';

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    if (data.onConfigure) {
      data.onConfigure(id, { label: nodeLabel });
      toast.success("Node settings updated");
    }
    setShowSettings(false);
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <div 
        className={`bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-3 w-56 ${selected ? 'border-primary' : ''} hover:shadow-md transition-shadow`}
      >
        {showTargetHandle && (
          <Handle 
            type="target" 
            position={Position.Top} 
            className="bg-muted-foreground w-2 h-2"
          />
        )}
        
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-muted-foreground">{data.type}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleOpenSettings}>
              <Cog className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDelete}>
              <Trash className="h-3 w-3 text-destructive" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded">
            {renderIcon()}
          </div>
          <span className="font-medium text-sm">{data.label}</span>
        </div>
        
        {showSourceHandle && (
          <Handle 
            type="source" 
            position={Position.Bottom} 
            className="bg-muted-foreground w-2 h-2"
          />
        )}
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {data.type}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="node-label" className="text-right">
                Label
              </Label>
              <Input
                id="node-label"
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                className="col-span-3"
              />
            </div>
            {data.type === 'action-email' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email-template" className="text-right">
                  Email Template
                </Label>
                <Input
                  id="email-template"
                  defaultValue="Welcome Email"
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseSettings}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
