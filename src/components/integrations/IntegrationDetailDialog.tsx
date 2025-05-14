import { useState } from "react";
import { Integration } from "./IntegrationCard";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  RotateCw, 
  RefreshCcw, 
  InfoIcon, 
  AlertCircle, 
  Settings, 
  Activity
} from "lucide-react";

interface IntegrationDetailDialogProps {
  integration: Integration;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntegrationDetailDialog({ 
  integration, 
  open, 
  onOpenChange
}: IntegrationDetailDialogProps) {
  const [syncFrequency, setSyncFrequency] = useState("real-time");
  const [notifyOnFailure, setNotifyOnFailure] = useState(true);
  const [notifyOnDisconnect, setNotifyOnDisconnect] = useState(true);
  const [selectedTab, setSelectedTab] = useState("settings");
  
  const handleSaveSettings = () => {
    toast("Settings updated", {
      description: `${integration.name} settings have been saved successfully.`,
    });
    onOpenChange(false);
  };

  const handleReconnect = () => {
    toast("Reconnecting...", {
      description: `Attempting to reconnect to ${integration.name}.`,
    });
  };

  const handleSyncNow = () => {
    toast("Sync started", {
      description: `Manual sync with ${integration.name} has been initiated.`,
    });
  };
  
  // Mock sync logs
  const syncLogs = [
    { id: 1, date: "May 14, 2023 - 15:42", status: "success", message: "Successfully synced 145 contacts" },
    { id: 2, date: "May 14, 2023 - 09:12", status: "success", message: "Successfully synced 23 contacts" },
    { id: 3, date: "May 13, 2023 - 21:30", status: "error", message: "Connection timeout. Retry failed." },
    { id: 4, date: "May 13, 2023 - 15:07", status: "success", message: "Successfully synced 78 contacts" },
    { id: 5, date: "May 12, 2023 - 11:22", status: "success", message: "Successfully synced 35 contacts" },
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded overflow-hidden flex items-center justify-center bg-white">
              <img 
                src={integration.logo} 
                alt={`${integration.name} logo`} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <DialogTitle>{integration.name} Integration</DialogTitle>
          </div>
          <DialogDescription>
            Configure your integration settings, view sync history, and manage notifications.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-1">
              <RefreshCcw className="h-4 w-4" />
              <span>Data Sync</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select 
                value={syncFrequency} 
                onValueChange={setSyncFrequency}
              >
                <SelectTrigger id="sync-frequency">
                  <SelectValue placeholder="Select sync frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-time">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How often should data be synced between systems
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Authentication</Label>
              <div className="p-3 border rounded-md bg-muted/20 flex justify-between items-center">
                <div>
                  <p className="text-sm">{integration.authType === "oauth" ? "OAuth Connection" : "API Key"}</p>
                  <p className="text-xs text-muted-foreground">Connected as user@example.com</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleReconnect}>
                  <RotateCw className="h-3.5 w-3.5 mr-1" />
                  Reconnect
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <Label>Notification Settings</Label>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="notify-failure" 
                  checked={notifyOnFailure}
                  onCheckedChange={(checked) => setNotifyOnFailure(!!checked)} 
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-failure"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notify on sync failure
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications when a sync fails
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="notify-disconnect" 
                  checked={notifyOnDisconnect}
                  onCheckedChange={(checked) => setNotifyOnDisconnect(!!checked)} 
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-disconnect"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notify on disconnection
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications when integration is disconnected
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Data to Sync</Label>
                <Button size="sm" variant="outline" onClick={handleSyncNow}>
                  <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                  Sync Now
                </Button>
              </div>
              
              <div className="border rounded-md divide-y">
                <div className="p-3 flex items-start space-x-2">
                  <Checkbox id="sync-contacts" defaultChecked />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="sync-contacts"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Contacts / Customers
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Sync contact information between systems
                    </p>
                  </div>
                </div>
                
                <div className="p-3 flex items-start space-x-2">
                  <Checkbox id="sync-campaigns" defaultChecked />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="sync-campaigns"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Campaigns / Activities
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Sync campaign data and activities
                    </p>
                  </div>
                </div>
                
                <div className="p-3 flex items-start space-x-2">
                  <Checkbox id="sync-analytics" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="sync-analytics"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Analytics / Metrics
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Import analytics and performance metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL (Advanced)</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://your-service.com/webhook/endpoint" 
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <InfoIcon className="h-3 w-3" />
                For advanced users to receive real-time data updates
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 text-sm font-medium">
                Recent Sync Activity
              </div>
              <div className="divide-y">
                {syncLogs.map(log => (
                  <div key={log.id} className="px-4 py-3 flex items-center gap-3">
                    <div 
                      className={`h-2 w-2 rounded-full ${
                        log.status === "success" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.date}</p>
                    </div>
                    {log.status === "error" && (
                      <Button size="sm" variant="ghost" className="h-8">
                        Retry
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-md p-3 flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p>Logs are kept for 30 days. For longer retention, export your logs.</p>
              <Button size="sm" variant="outline" className="ml-auto">
                Export Logs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
