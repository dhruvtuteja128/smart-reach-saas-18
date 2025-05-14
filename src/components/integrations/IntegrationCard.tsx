
import { useState } from "react";
import { Check, PlugZap, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { IntegrationDetailDialog } from "./IntegrationDetailDialog";

export interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  isConnected: boolean;
  lastSynced?: string;
  authType: "oauth" | "api_key" | "webhook" | "custom";
  isNew?: boolean;
  features?: string[];
}

interface IntegrationCardProps {
  integration: Integration;
  onToggleConnection: (id: string) => void;
}

export function IntegrationCard({ integration, onToggleConnection }: IntegrationCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleToggleConnection = () => {
    onToggleConnection(integration.id);
  };

  const handleOpenSettings = () => {
    if (integration.isConnected) {
      setShowDetail(true);
    } else {
      toast({
        title: "Connect first",
        description: "You need to connect this integration before configuring it.",
      });
    }
  };

  return (
    <>
      <Card className={integration.isConnected ? "border-primary/20" : ""}>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white p-1">
                <img 
                  src={integration.logo} 
                  alt={`${integration.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {integration.name}
                  {integration.isNew && (
                    <Badge className="bg-blue-500 text-[10px] h-5">NEW</Badge>
                  )}
                </CardTitle>
              </div>
            </div>
            <Switch 
              checked={integration.isConnected} 
              onCheckedChange={handleToggleConnection}
            />
          </div>
          <CardDescription className="mt-2">{integration.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-muted/40 text-xs">
                    {integration.authType === "oauth" && "OAuth"}
                    {integration.authType === "api_key" && "API Key"}
                    {integration.authType === "webhook" && "Webhook"}
                    {integration.authType === "custom" && "Custom"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Authentication method</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {integration.features?.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-muted/40 text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div>
              {integration.isConnected ? (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1 flex items-center">
                  <Check className="h-3 w-3" />
                  <span>Connected</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1 flex items-center">
                  <PlugZap className="h-3 w-3" />
                  <span>Not Connected</span>
                </Badge>
              )}
            </div>
            
            {integration.isConnected && integration.lastSynced && (
              <span className="text-xs text-muted-foreground">Last synced: {integration.lastSynced}</span>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleOpenSettings}
            >
              <Settings className="h-3.5 w-3.5" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showDetail && (
        <IntegrationDetailDialog 
          integration={integration} 
          open={showDetail}
          onOpenChange={setShowDetail}
        />
      )}
    </>
  );
}
