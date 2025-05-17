
import { 
  Calendar, 
  Copy, 
  Mail, 
  MessageCircle, 
  MoreHorizontal, 
  Pause, 
  Play, 
  Trash, 
  Users, 
  Zap,
  Settings
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Workflow {
  id: string;
  name: string;
  status: string;
  lastUpdated: string;
  contactsCount: number;
  actionsPerformed: number;
  triggers: string[];
  channels: string[];
}

interface WorkflowListProps {
  workflows: Workflow[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onOpenSettings: (id: string) => void;
}

export function WorkflowList({ 
  workflows, 
  onDelete, 
  onToggleStatus, 
  onDuplicate, 
  onEdit,
  onOpenSettings
}: WorkflowListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-700 dark:text-green-500";
      case "paused": return "bg-orange-500/20 text-orange-700 dark:text-orange-500";
      case "draft": return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  const formatUpdateTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Unknown";
    }
  };

  const renderChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageCircle className="h-4 w-4" />;
      case "whatsapp": return <MessageCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleDeleteClick = (id: string) => {
    setWorkflowToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (workflowToDelete) {
      onDelete(workflowToDelete);
      setWorkflowToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[180px]">Name</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[160px]">Last Updated</TableHead>
              <TableHead className="w-[120px]">Contacts</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
              <TableHead className="w-[150px]">Channels</TableHead>
              <TableHead className="w-[100px] text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onEdit(workflow.id)}>
                <TableCell className="font-medium">
                  {workflow.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(workflow.status)}`}>
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatUpdateTime(workflow.lastUpdated)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {workflow.contactsCount.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {workflow.actionsPerformed.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {workflow.channels.map((channel) => (
                      <div key={channel} className="p-1 bg-muted rounded">
                        {renderChannelIcon(channel)}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(workflow.id)}>
                        Edit Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onOpenSettings(workflow.id)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(workflow.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleStatus(workflow.id)}>
                        {workflow.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(workflow.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-3 rounded-md">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Workflows</p>
                <p className="text-2xl font-bold">{workflows.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-3 rounded-md">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Contacts</p>
                <p className="text-2xl font-bold">
                  {workflows.reduce((sum, workflow) => sum + workflow.contactsCount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-3 rounded-md">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Actions Performed</p>
                <p className="text-2xl font-bold">
                  {workflows.reduce((sum, workflow) => sum + workflow.actionsPerformed, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workflow and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
