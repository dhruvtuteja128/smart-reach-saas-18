
import React from "react";
import {
  Mail,
  Browser,
  Form,
  DollarSign,
  CircleCheck,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { FunnelStep } from "@/types/crm";
import { motion } from "framer-motion";

interface FunnelVisualizationProps {
  steps: FunnelStep[];
}

// Icons for step types
const stepTypeIcons: Record<string, React.ReactNode> = {
  "Email Opened": <Mail className="h-4 w-4" />,
  "Email Clicked": <CircleCheck className="h-4 w-4" />,
  "Website Visit": <Browser className="h-4 w-4" />,
  "WhatsApp Sent": <MessageCircle className="h-4 w-4" />,
  "WhatsApp Reply": <MessageCircle className="h-4 w-4" />,
  "Form Submission": <Form className="h-4 w-4" />,
  "Lead Created": <CircleCheck className="h-4 w-4" />,
  "Demo Booked": <CircleCheck className="h-4 w-4" />,
  "Purchase Completed": <DollarSign className="h-4 w-4" />,
};

// Color gradient for the funnel visualization
const getGradientColor = (index: number, total: number) => {
  const colors = [
    "from-primary/90 to-primary/80",
    "from-primary/80 to-primary/70",
    "from-primary/70 to-primary/60",
    "from-primary/60 to-primary/50",
    "from-primary/50 to-primary/40",
  ];
  
  if (index < colors.length) {
    return colors[index];
  }
  return colors[colors.length - 1];
};

export function FunnelVisualization({ steps }: FunnelVisualizationProps) {
  if (!steps || steps.length === 0) {
    return <div className="text-center py-12">No funnel steps available</div>;
  }

  // Direction options: "vertical" | "horizontal"
  const direction = "vertical"; 

  return (
    <div className="min-h-[400px]">
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id} 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {stepTypeIcons[step.event] || <CircleCheck className="h-4 w-4" />}
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
            
            {/* Funnel bar with gradient */}
            <div className="relative">
              <div className="h-12 w-full rounded-md bg-muted overflow-hidden">
                <motion.div 
                  className={`h-full rounded-md bg-gradient-to-r ${getGradientColor(index, steps.length)} shadow-lg`} 
                  style={{ width: `${step.conversionRate}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${step.conversionRate}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
                
                {/* Show drop-off percentage on the bar */}
                {step.dropOffRate > 0 && (
                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-sm font-medium">
                    -{step.dropOffRate.toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrow connector */}
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <ArrowRight className="h-3 w-3" />
                  <span>{step.dropOffRate}% drop-off</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
