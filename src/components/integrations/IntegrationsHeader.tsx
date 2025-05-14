
import { PlugZap, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function IntegrationsHeader() {
  const connectedCount = 12; // This would be dynamic data in a real app
  
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Integrations</h1>
      <p className="text-muted-foreground max-w-2xl">
        Connect your marketing platform with your favorite tools and services to automate your workflows and enhance your campaigns.
      </p>
      
      <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
        <Badge variant="outline" className="px-2 py-1">
          <span className="text-sm font-medium">{connectedCount} Active Connections</span>
        </Badge>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <PlugZap className="h-4 w-4" />
            <span>Request Integration</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>Developer API</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
