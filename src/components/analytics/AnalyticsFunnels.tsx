
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
import { ArrowRight, Plus } from "lucide-react";

// Funnel step types for the builder
type FunnelStep = {
  id: string;
  event: string;
  count: number;
  conversionRate?: number;
};

// Mock funnel data
const funnelStepOptions = [
  "Email Opened",
  "Email Clicked",
  "Website Visit",
  "WhatsApp Sent",
  "WhatsApp Reply",
  "Form Submission",
  "Lead Created",
  "Demo Booked",
  "Purchase Completed",
];

const predefinedFunnels = [
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
  },
];

export function AnalyticsFunnels() {
  const [selectedFunnelId, setSelectedFunnelId] = useState(predefinedFunnels[0].id);
  const [funnels, setFunnels] = useState(predefinedFunnels);
  
  // Get the selected funnel
  const selectedFunnel = funnels.find(funnel => funnel.id === selectedFunnelId) || funnels[0];
  
  // Calculate conversion rates for the steps
  const stepsWithConversionRates = selectedFunnel.steps.map((step, index, array) => {
    if (index === 0) {
      return { ...step, conversionRate: 100 };
    }
    const conversionRate = (step.count / array[0].count) * 100;
    const dropOffRate = index > 0 
      ? ((array[index-1].count - step.count) / array[index-1].count) * 100
      : 0;
      
    return { 
      ...step, 
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      dropOffRate: parseFloat(dropOffRate.toFixed(1))
    };
  });

  return (
    <div className="space-y-6">
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
        
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create New Funnel
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{selectedFunnel.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-8">
            {stepsWithConversionRates.map((step, index) => (
              <div key={step.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    <span className="font-medium">{step.event}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{step.count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {step.conversionRate}% of total
                    </div>
                  </div>
                </div>
                
                <div className="h-3 w-full rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${step.conversionRate}%` }}
                  ></div>
                </div>
                
                {index < stepsWithConversionRates.length - 1 && (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <ArrowRight className="h-3 w-3" />
                      <span>{step.dropOffRate}% drop-off</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Custom Funnel Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Build a custom funnel by selecting events in sequence to track how users progress through your sales and marketing processes.
            </p>
            
            <div className="grid gap-4">
              <div className="flex items-end gap-2">
                <Select disabled>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {funnelStepOptions.map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" disabled>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button className="w-full" disabled>
                Create Funnel
              </Button>
              
              <p className="text-sm text-center text-muted-foreground italic">
                Custom funnel building is coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
