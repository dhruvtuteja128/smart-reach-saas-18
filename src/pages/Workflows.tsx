
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { WorkflowList } from "@/components/workflows/WorkflowList";
import { 
  BellRing, 
  Calendar, 
  Mail, 
  MessageCircle, 
  Plus, 
  Zap 
} from "lucide-react";
import { toast } from "sonner";

const Workflows = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: "1",
      name: "Welcome Series",
      status: "active",
      lastUpdated: "2025-04-15T10:30:00",
      contactsCount: 1245,
      actionsPerformed: 3870,
      triggers: ["New Signup"],
      channels: ["email", "sms"]
    },
    {
      id: "2",
      name: "Abandoned Cart Recovery",
      status: "active",
      lastUpdated: "2025-05-01T14:15:00",
      contactsCount: 872,
      actionsPerformed: 2616,
      triggers: ["Cart Abandoned"],
      channels: ["email", "whatsapp"]
    },
    {
      id: "3",
      name: "Re-engagement Campaign",
      status: "paused",
      lastUpdated: "2025-04-28T09:45:00",
      contactsCount: 2143,
      actionsPerformed: 4286,
      triggers: ["Inactivity (30 days)"],
      channels: ["email"]
    },
    {
      id: "4",
      name: "Post-Purchase Follow-up",
      status: "draft",
      lastUpdated: "2025-05-02T16:20:00",
      contactsCount: 0,
      actionsPerformed: 0,
      triggers: ["Purchase Completed"],
      channels: ["email", "sms"]
    },
  ]);

  const handleCreateWorkflow = () => {
    toast("Workflow Builder coming soon", {
      description: "The visual workflow builder is under development and will be available soon!",
      action: {
        label: "Learn More",
        onClick: () => console.log("Learn more clicked")
      }
    });
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== id));
    toast.success("Workflow deleted successfully");
  };

  const handleToggleStatus = (id: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        const newStatus = workflow.status === "active" ? "paused" : 
                         workflow.status === "paused" ? "active" : 
                         workflow.status;
        return { ...workflow, status: newStatus };
      }
      return workflow;
    }));
    
    const workflow = workflows.find(w => w.id === id);
    const statusAction = workflow?.status === "active" ? "paused" : "activated";
    toast.success(`Workflow ${statusAction} successfully`);
  };

  const handleDuplicateWorkflow = (id: string) => {
    const workflowToDuplicate = workflows.find(workflow => workflow.id === id);
    
    if (workflowToDuplicate) {
      const duplicatedWorkflow = {
        ...workflowToDuplicate,
        id: `${Date.now()}`,
        name: `${workflowToDuplicate.name} (Copy)`,
        status: "draft",
        lastUpdated: new Date().toISOString(),
        contactsCount: 0,
        actionsPerformed: 0,
      };
      
      setWorkflows([...workflows, duplicatedWorkflow]);
      toast.success("Workflow duplicated successfully");
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Automation Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Create automated marketing sequences across multiple channels
            </p>
          </div>
          <Button 
            onClick={handleCreateWorkflow}
            className="md:self-start flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create New Workflow
          </Button>
        </header>

        {workflows.length > 0 ? (
          <WorkflowList 
            workflows={workflows}
            onDelete={handleDeleteWorkflow}
            onToggleStatus={handleToggleStatus}
            onDuplicate={handleDuplicateWorkflow}
            onEdit={handleCreateWorkflow}
          />
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full inline-block">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">No workflows yet</h2>
              <p className="text-muted-foreground max-w-md">
                Create your first automated workflow to engage with your audience across multiple channels.
              </p>
              <Button onClick={handleCreateWorkflow} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Workflow
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 border rounded-lg bg-muted/40">
          <h2 className="text-xl font-semibold mb-4">Coming Soon: Visual Workflow Builder</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-4 rounded-full mb-3">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Drag & Drop Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Visually design your workflow with our intuitive drag-and-drop interface
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-4 rounded-full mb-3">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Multi-Channel Actions</h3>
              <p className="text-sm text-muted-foreground">
                Send emails, SMS, WhatsApp messages, and update your CRM in a single flow
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-4 rounded-full mb-3">
                <BellRing className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Smart Triggers</h3>
              <p className="text-sm text-muted-foreground">
                Start workflows based on user behavior, time-based events, or custom triggers
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Workflows;
