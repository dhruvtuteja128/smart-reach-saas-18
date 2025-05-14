
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit2,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export type AITaskStatus = "draft" | "approved" | "rejected" | "in-progress";
export type AITaskType = "campaign" | "crm" | "review" | "workflow" | "content";

export interface AITask {
  id: string;
  type: AITaskType;
  title: string;
  description: string;
  reason: string;
  status: AITaskStatus;
  createdAt: Date;
  preview?: string;
}

interface AITaskCardProps {
  task: AITask;
  onApprove: (taskId: string) => void;
  onReject: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onViewDetails: (taskId: string) => void;
}

export function AITaskCard({ 
  task, 
  onApprove, 
  onReject, 
  onEdit, 
  onViewDetails 
}: AITaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusIcon = () => {
    switch(task.status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getTypeColor = () => {
    switch(task.type) {
      case "campaign":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "crm":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "review":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "workflow":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "content":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
    }
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Badge className={cn("capitalize", getTypeColor())}>
              {task.type}
            </Badge>
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <span className="text-xs capitalize text-muted-foreground">
                {task.status}
              </span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(task.id)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(task.id)}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <h3 className="font-semibold mt-2 text-base">{task.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {task.description}
        </p>
        
        {/* AI Reasoning */}
        <div className="mt-2.5 text-xs">
          <span className="text-muted-foreground">AI Reasoning: </span>
          <span>{task.reason}</span>
        </div>
      </div>
      
      {/* Preview */}
      {task.preview && (
        <div className={cn("bg-muted/50 px-4 py-3 border-t border-b", !expanded && "max-h-20 overflow-hidden")}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Preview</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-5 w-5 p-0" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-sm whitespace-pre-line">
            {task.preview}
          </div>
        </div>
      )}
      
      {/* Action Footer */}
      <div className="p-4 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {new Date(task.createdAt).toLocaleString()}
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Eye className="mr-1.5 h-3.5 w-3.5" /> Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Task Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p>{task.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm">{task.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">AI Reasoning</h4>
                  <p className="text-sm">{task.reason}</p>
                </div>
                {task.preview && (
                  <div>
                    <h4 className="text-sm font-medium">Preview</h4>
                    <div className="bg-muted p-3 rounded-md text-sm mt-1 whitespace-pre-line">
                      {task.preview}
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      onReject(task.id);
                      setDetailsOpen(false);
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => {
                      onApprove(task.id);
                      setDetailsOpen(false);
                    }}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {task.status === "draft" && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-destructive"
                onClick={() => onReject(task.id)}
              >
                <XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="h-8"
                onClick={() => onApprove(task.id)}
              >
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
