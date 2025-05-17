import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Browser,
  Form,
  DollarSign,
  CircleCheck,
  ArrowDown,
  Plus,
  Trash,
  Save,
  X,
  MessageCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

// Available funnel step options
const funnelStepOptions = [
  { value: "Email Opened", label: "Email Opened", icon: <Mail className="h-4 w-4" /> },
  { value: "Email Clicked", label: "Email Clicked", icon: <CircleCheck className="h-4 w-4" /> },
  { value: "Website Visit", label: "Website Visit", icon: <Browser className="h-4 w-4" /> },
  { value: "WhatsApp Sent", label: "WhatsApp Sent", icon: <MessageCircle className="h-4 w-4" /> },
  { value: "WhatsApp Reply", label: "WhatsApp Reply", icon: <MessageCircle className="h-4 w-4" /> },
  { value: "Form Submission", label: "Form Submission", icon: <Form className="h-4 w-4" /> },
  { value: "Lead Created", label: "Lead Created", icon: <CircleCheck className="h-4 w-4" /> },
  { value: "Demo Booked", label: "Demo Booked", icon: <CircleCheck className="h-4 w-4" /> },
  { value: "Purchase Completed", label: "Purchase Completed", icon: <DollarSign className="h-4 w-4" /> },
];

// Generate random count for demonstration
const generateRandomCount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Calculate step conversions
const calculateStepConversions = (steps) => {
  if (steps.length === 0) return [];
  
  return steps.map((step, index) => {
    if (index === 0) {
      return { ...step, conversionRate: 100, dropOffRate: 0 };
    }
    
    const conversionRate = (step.count / steps[0].count) * 100;
    const dropOffRate = ((steps[index - 1].count - step.count) / steps[index - 1].count) * 100;
    
    return {
      ...step,
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      dropOffRate: parseFloat(dropOffRate.toFixed(1)),
    };
  });
};

interface FunnelBuilderProps {
  funnel: {
    id: string;
    name: string;
    steps: Array<{
      id: string;
      event: string;
      count: number;
    }>;
    createdAt: string;
  };
  onSave: (funnel: any) => void;
  onCancel: () => void;
}

export function FunnelBuilder({ funnel, onSave, onCancel }: FunnelBuilderProps) {
  const [funnelName, setFunnelName] = useState(funnel.name);
  const [steps, setSteps] = useState(funnel.steps);
  const [calculatedSteps, setCalculatedSteps] = useState(calculateStepConversions(funnel.steps));

  // Update calculated steps when steps change
  useEffect(() => {
    setCalculatedSteps(calculateStepConversions(steps));
  }, [steps]);

  // Add a new step to the funnel
  const addStep = () => {
    // Set default count based on previous step if available
    let count = 1000;
    if (steps.length > 0) {
      // New step typically has fewer users than previous step
      count = Math.floor(steps[steps.length - 1].count * 0.6);
    }
    
    const newStep = {
      id: `step-${uuidv4()}`,
      event: funnelStepOptions[0].value,
      count,
    };
    
    setSteps([...steps, newStep]);
  };

  // Remove a step from the funnel
  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  // Update step properties
  const updateStepEvent = (index: number, event: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], event };
    setSteps(newSteps);
  };

  // Update step count
  const updateStepCount = (index: number, count: number) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], count };
    setSteps(newSteps);
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedSteps = [...steps];
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);
    
    setSteps(reorderedSteps);
  };

  // Save the funnel
  const handleSave = () => {
    const updatedFunnel = {
      ...funnel,
      name: funnelName,
      steps: steps,
      // If it's a new funnel, use current date; otherwise keep original
      createdAt: funnel.createdAt || new Date().toISOString()
    };
    
    onSave(updatedFunnel);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Funnel name */}
      <div className="space-y-2">
        <label htmlFor="funnel-name" className="text-sm font-medium">
          Funnel Name
        </label>
        <Input
          id="funnel-name"
          value={funnelName}
          onChange={(e) => setFunnelName(e.target.value)}
          placeholder="Enter funnel name"
        />
      </div>

      {/* Steps builder */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Funnel Steps</h3>
          <Button onClick={addStep} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>

        <div className="border rounded-md p-4">
          {steps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">No steps added yet</p>
              <Button onClick={addStep}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Step
              </Button>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="steps">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {steps.map((step, index) => (
                      <Draggable key={step.id} draggableId={step.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border rounded-md p-4 bg-background shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col sm:flex-row gap-4">
                              {/* Step number */}
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold">
                                {index + 1}
                              </div>
                              
                              {/* Step type selector */}
                              <div className="flex-1">
                                <Select
                                  value={step.event}
                                  onValueChange={(value) => updateStepEvent(index, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {funnelStepOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        <div className="flex items-center">
                                          {option.icon}
                                          <span className="ml-2">{option.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Step count input */}
                              <div className="w-32">
                                <Input
                                  type="number"
                                  value={step.count}
                                  onChange={(e) => updateStepCount(index, Number(e.target.value))}
                                  min={1}
                                  className="w-full"
                                />
                              </div>
                              
                              {/* Conversion rate (calculated) */}
                              <div className="w-24 flex items-center">
                                {index > 0 && calculatedSteps[index] && (
                                  <div className="text-sm text-destructive">
                                    -{calculatedSteps[index].dropOffRate.toFixed(1)}%
                                  </div>
                                )}
                              </div>
                              
                              {/* Delete step button */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeStep(index)}
                                className="h-8 w-8"
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            
                            {/* Show arrow connector between steps */}
                            {index < steps.length - 1 && (
                              <div className="flex justify-center my-2">
                                <ArrowDown className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>

      {/* Live preview */}
      {steps.length > 0 && (
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Live Preview</h3>
          <div className="flex flex-col space-y-4">
            {calculatedSteps.map((step, index) => (
              <div key={step.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {funnelStepOptions.find(option => option.value === step.event)?.icon}
                    <span className="ml-2 font-medium">{step.event}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{step.count.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.conversionRate}% of total
                    </div>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${step.conversionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Funnel
        </Button>
      </div>
    </div>
  );
}
