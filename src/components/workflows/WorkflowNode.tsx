
import { Handle, Position } from "reactflow";
import { Button } from "@/components/ui/button";
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
  Zap
} from "lucide-react";

interface WorkflowNodeProps {
  data: {
    type: string;
    label: string;
    icon: string;
  };
  selected: boolean;
}

export function WorkflowNode({ 
  data,
  selected 
}: WorkflowNodeProps) {
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

  return (
    <div 
      className={`bg-white border rounded-lg shadow-sm p-3 w-56 ${selected ? 'border-primary' : ''}`}
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
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Cog className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Trash className="h-3 w-3" />
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
  );
}
