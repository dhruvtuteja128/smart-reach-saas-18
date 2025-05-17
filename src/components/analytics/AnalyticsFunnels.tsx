import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowRight, 
  Plus, 
  Edit, 
  Trash, 
  Mail, 
  Globe,
  FileText,
  DollarSign, 
  CircleCheck,
  Save,
  X 
} from "lucide-react";
import { FunnelBuilder } from "@/components/analytics/FunnelBuilder";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FunnelVisualization } from "@/components/analytics/FunnelVisualization";
import { v4 as uuidv4 } from "uuid";
import { FunnelStep } from "@/types/crm";
import { motion } from "framer-motion";

// Icons for different step types
const stepTypeIcons: Record<string, React.ReactNode> = {
  "Email Opened": <Mail className="h-4 w-4" />,
  "Email Clicked": <CircleCheck className="h-4 w-4" />,
  "Website Visit": <Globe className="h-4 w-4" />, // Updated icon
  "WhatsApp Sent": <Mail className="h-4 w-4" />,
  "WhatsApp Reply": <Mail className="h-4 w-4" />,
  "Form Submission": <FileText className="h-4 w-4" />, // Updated icon
  "Lead Created": <CircleCheck className="h-4 w-4" />,
  "Demo Booked": <CircleCheck className="h-4 w-4" />,
  "Purchase Completed": <DollarSign className="h-4 w-4" />,
};

// Template funnels
const funnelTemplates = [
  {
    name: "Marketing Funnel",
    steps: [
      { id: "step1", event: "Email Opened", count: 5000 },
      { id: "step2", event: "Email Clicked", count: 2500 },
      { id: "step3", event: "Website Visit", count: 1200 },
      { id: "step4", event: "Form Submission", count: 600 },
      { id: "step5", event: "Purchase Completed", count: 250 },
    ],
  },
  {
    name: "Lead Generation Funnel",
    steps: [
      { id: "step1", event: "Website Visit", count: 3000 },
      { id: "step2", event: "Form Submission", count: 850 },
      { id: "step3", event: "Lead Created", count: 750 },
      { id: "step4", event: "Demo Booked", count: 320 },
    ],
  },
  {
    name: "Webinar Funnel",
    steps: [
      { id: "step1", event: "Email Opened", count: 4200 },
      { id: "step2", event: "Email Clicked", count: 1850 },
      { id: "step3", event: "Form Submission", count: 980 },
      { id: "step4", event: "WhatsApp Sent", count: 780 },
      { id: "step5", event: "Demo Booked", count: 420 },
    ],
  },
];

// Initial funnels data
const initialFunnels = [
  {
    id: "1",
    name: "Marketing to Purchase",
    steps: [
      { id: "step1", event: "Email Opened", count: 8540 },
      { id: "step2", event: "Email Clicked", count: 3280 },
      { id: "step3", event: "Website Visit", count: 1840 },
      { id: "step4", event: "Form Submission", count: 780 },
      { id: "step5", event: "Purchase Completed", count: 420 },
    ],
    createdAt: new Date("2025-04-01").toISOString(),
  },
  {
    id: "2",
    name: "Lead to Demo",
    steps: [
      { id: "step1", event: "Lead Created", count: 2450 },
      { id: "step2", event: "WhatsApp Sent", count: 1870 },
      { id: "step3", event: "WhatsApp Reply", count: 1240 },
      { id: "step4", event: "Demo Booked", count: 580 },
    ],
    createdAt: new Date("2025-04-15").toISOString(),
  },
];

export function AnalyticsFunnels() {
  // State management
  const [funnels, setFunnels] = useState(initialFunnels);
  const [selectedFunnelId, setSelectedFunnelId] = useState(funnels[0].id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState("");
  const [editingFunnel, setEditingFunnel] = useState<typeof funnels[0] | null>(null);
  
  // Get the selected funnel
  const selectedFunnel = funnels.find(funnel => funnel.id === selectedFunnelId) || funnels[0];
  
  // Calculate conversion rates for the selected funnel
  const stepsWithConversionRates = selectedFunnel.steps.map((step, index, array) => {
    if (index === 0) {
      return { ...step, conversionRate: 100 } as FunnelStep;
    }
    const conversionRate = (step.count / array[0].count) * 100;
    const dropOffRate = index > 0 
      ? ((array[index-1].count - step.count) / array[index-1].count) * 100
      : 0;
      
    return { 
      ...step, 
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      dropOffRate: parseFloat(dropOffRate.toFixed(1))
    } as FunnelStep;
  });

  // Create a new funnel
  const createNewFunnel = () => {
    setIsCreateDialogOpen(true);
  };

  // Handle template selection
  const handleTemplateSelect = (templateName: string) => {
    const template = funnelTemplates.find(t => t.name === templateName);
    
    if (template) {
      const newFunnel = {
        id: uuidv4(),
        name: `${template.name} (Copy)`,
        steps: template.steps,
        createdAt: new Date().toISOString()
      };
      
      setFunnels([...funnels, newFunnel]);
      setSelectedFunnelId(newFunnel.id);
      setIsCreateDialogOpen(false);
      toast.success(`${template.name} created successfully!`);
    }
  };

  // Open the builder for a new funnel
  const startFreshFunnel = () => {
    setEditingFunnel({
      id: uuidv4(),
      name: newFunnelName || "New Funnel",
      steps: [],
      createdAt: new Date().toISOString()
    });
    setIsCreateDialogOpen(false);
    setIsBuilderOpen(true);
  };

  // Edit an existing funnel
  const handleEditFunnel = (funnel: typeof funnels[0]) => {
    setEditingFunnel(funnel);
    setIsBuilderOpen(true);
  };

  // Save the funnel after editing
  const handleSaveFunnel = (updatedFunnel: typeof funnels[0]) => {
    if (funnels.some(f => f.id === updatedFunnel.id)) {
      // Update existing funnel
      setFunnels(funnels.map(f => f.id === updatedFunnel.id ? updatedFunnel : f));
    } else {
      // Add new funnel
      setFunnels([...funnels, updatedFunnel]);
    }
    setSelectedFunnelId(updatedFunnel.id);
    setIsBuilderOpen(false);
    toast.success(`Funnel ${updatedFunnel.name} saved successfully!`);
  };

  // Delete a funnel
  const handleDeleteFunnel = (id: string) => {
    const updatedFunnels = funnels.filter(funnel => funnel.id !== id);
    setFunnels(updatedFunnels);
    
    // If we deleted the selected funnel, select another one
    if (id === selectedFunnelId && updatedFunnels.length > 0) {
      setSelectedFunnelId(updatedFunnels[0].id);
    }
    
    toast.success("Funnel deleted successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Select and Create button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select
          value={selectedFunnelId}
          onValueChange={(value) => setSelectedFunnelId(value)}
        >
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select a funnel" />
          </SelectTrigger>
          <SelectContent>
            {funnels.map((funnel) => (
              <SelectItem key={funnel.id} value={funnel.id}>
                {funnel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="w-full sm:w-auto" onClick={createNewFunnel}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Funnel
          </Button>
        </motion.div>
      </div>
      
      {/* Funnel Visualization */}
      <Card className="overflow-visible">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{selectedFunnel.name}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleEditFunnel(selectedFunnel)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDeleteFunnel(selectedFunnel.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <FunnelVisualization steps={stepsWithConversionRates} />
        </CardContent>
      </Card>
      
      {/* Funnel Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {funnelTemplates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    {template.steps.length} steps • Example conversion: {((template.steps[template.steps.length - 1].count / template.steps[0].count) * 100).toFixed(1)}%
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleTemplateSelect(template.name)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Funnel Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Funnel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                id="funnel-name"
                placeholder="Enter funnel name"
                value={newFunnelName}
                onChange={(e) => setNewFunnelName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Start with:</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button onClick={startFreshFunnel} className="justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Start from scratch
                </Button>
                <div className="text-xs text-muted-foreground mt-2">
                  Or use one of the templates from the Templates section
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Funnel Builder */}
      <Dialog 
        open={isBuilderOpen} 
        onOpenChange={(open) => {
          if (!open) setIsBuilderOpen(false);
        }}
      >
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle>Funnel Builder</DialogTitle>
          </DialogHeader>
          {editingFunnel && (
            <FunnelBuilder 
              funnel={editingFunnel} 
              onSave={handleSaveFunnel}
              onCancel={() => setIsBuilderOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
