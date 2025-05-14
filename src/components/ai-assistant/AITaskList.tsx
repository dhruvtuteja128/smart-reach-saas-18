
import { AITask, AITaskCard } from "./AITaskCard";
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  SlidersHorizontal,
  Bot,
  Loader2
} from "lucide-react";

interface AITaskListProps {
  tasks: AITask[];
  isLoading?: boolean;
}

export function AITaskList({ tasks, isLoading }: AITaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [taskType, setTaskType] = useState<string>("all");
  const [taskStatus, setTaskStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  
  const handleApprove = (taskId: string) => {
    console.log(`Approved task: ${taskId}`);
  };
  
  const handleReject = (taskId: string) => {
    console.log(`Rejected task: ${taskId}`);
  };
  
  const handleEdit = (taskId: string) => {
    console.log(`Edit task: ${taskId}`);
  };
  
  const handleViewDetails = (taskId: string) => {
    console.log(`View details for task: ${taskId}`);
  };

  // Filter tasks based on search, type, status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = taskType === "all" || task.type === taskType;
    const matchesStatus = taskStatus === "all" || task.status === taskStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default: // "newest"
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Loading AI tasks...</p>
      </div>
    );
  }

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bot className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-2">No tasks found</h3>
        {searchQuery || taskType !== "all" || taskStatus !== "all" ? (
          <p className="text-muted-foreground text-sm max-w-md">
            Try changing your search or filter settings to see more results.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm max-w-md">
            Your AI assistant hasn't generated any tasks yet. Try asking it to help with your marketing campaigns.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input 
            type="search"
            placeholder="Search tasks..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Task Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="campaign">Campaign</SelectItem>
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="workflow">Workflow</SelectItem>
              <SelectItem value="content">Content</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={taskStatus} onValueChange={setTaskStatus}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] bg-background">
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tasks */}
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <AITaskCard
            key={task.id}
            task={task}
            onApprove={handleApprove}
            onReject={handleReject}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
