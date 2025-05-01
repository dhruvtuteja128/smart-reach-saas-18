
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Interaction } from "@/types/crm";
import { 
  Mail, MessageSquare, Eye, Star, BarChart3, ShoppingCart
} from "lucide-react";

interface TimelineProps {
  interactions: Interaction[];
}

export function Timeline({ interactions }: TimelineProps) {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "pageview":
        return <Eye className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "campaign":
        return <BarChart3 className="h-4 w-4" />;
      case "purchase":
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "email":
        return "text-blue-500 bg-blue-500/10";
      case "message":
        return "text-green-500 bg-green-500/10";
      case "pageview":
        return "text-amber-500 bg-amber-500/10";
      case "review":
        return "text-orange-500 bg-orange-500/10";
      case "campaign":
        return "text-purple-500 bg-purple-500/10";
      case "purchase":
        return "text-emerald-500 bg-emerald-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  if (interactions.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>No interaction history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interactions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ).map((interaction) => (
        <div key={interaction.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn(
              "p-1.5 rounded-full", 
              getInteractionColor(interaction.type)
            )}>
              {getInteractionIcon(interaction.type)}
            </div>
            {/* Vertical line connecting timeline items */}
            <div className="w-0.5 bg-border grow mt-1"></div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{interaction.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {interaction.description}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {formatTimeAgo(interaction.timestamp)}
              </Badge>
            </div>
            
            {interaction.content && (
              <div className="mt-2 text-sm bg-muted/30 p-2 rounded-md border">
                {interaction.content}
              </div>
            )}
            
            {interaction.campaign && (
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Campaign: {interaction.campaign}
                </Badge>
                {interaction.status && (
                  <Badge variant="outline" className="text-xs">
                    {interaction.status}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
