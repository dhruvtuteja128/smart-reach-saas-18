
import { Bot, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIStatProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

function AIStat({ title, value, icon, description, className }: AIStatProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AIAssistantStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AIStat 
        title="Total Tasks" 
        value="42" 
        icon={<Bot className="h-4 w-4 text-primary" />}
        description="Last 30 days"
      />
      <AIStat 
        title="Approved" 
        value="28" 
        icon={<CheckCircle className="h-4 w-4 text-green-500" />}
        description="67% success rate"
      />
      <AIStat 
        title="In Progress" 
        value="8" 
        icon={<Clock className="h-4 w-4 text-amber-500" />}
        description="Estimated completion: today"
      />
      <AIStat 
        title="Rejected" 
        value="6" 
        icon={<XCircle className="h-4 w-4 text-destructive" />}
        description="14% rejection rate"
      />
    </div>
  );
}
