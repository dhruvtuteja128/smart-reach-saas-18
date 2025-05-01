
import { CheckCircle2 } from "lucide-react";
import { CampaignStep } from "./CampaignBuilder";

interface CampaignProgressProps {
  currentStep: CampaignStep;
}

export const CampaignProgress = ({ currentStep }: CampaignProgressProps) => {
  const steps = [
    { id: 1, name: "Campaign Type" },
    { id: 2, name: "Audience" },
    { id: 3, name: "Message" },
    { id: 4, name: "Automation & Timing" },
    { id: 5, name: "Review & Launch" },
  ];

  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted" />
        <ol className="relative flex justify-between text-sm font-medium">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <li key={step.id} className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 
                    ${isCompleted ? 'bg-primary border-primary text-white' :
                      isCurrent ? 'bg-white border-primary text-primary' : 
                      'bg-white border-muted text-muted-foreground'}`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                <div className={`mt-2 text-xs whitespace-nowrap ${isCurrent ? 'font-bold text-primary' : isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.name}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
