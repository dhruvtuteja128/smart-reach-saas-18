
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  type?: "email" | "chat" | "sms" | "review" | "system";
}

interface RecentActivityCardProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
}

export function RecentActivityCard({
  title,
  activities,
  className,
}: RecentActivityCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
            >
              {activity.icon && (
                <div className="mt-1 rounded-md bg-secondary/20 p-1">
                  {activity.icon}
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
