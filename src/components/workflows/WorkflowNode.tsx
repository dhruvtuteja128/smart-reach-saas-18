
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Cog, Trash } from "lucide-react";

interface WorkflowNodeProps {
  type: string;
  label: string;
  icon: LucideIcon;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function WorkflowNode({ 
  type, 
  label, 
  icon: Icon, 
  onEdit, 
  onDelete 
}: WorkflowNodeProps) {
  return (
    <div 
      className="bg-white border rounded-lg shadow-sm p-3 w-56 cursor-grab" 
      draggable
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-muted-foreground">{type}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onEdit}>
            <Cog className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onDelete}>
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium text-sm">{label}</span>
      </div>
    </div>
  );
}
