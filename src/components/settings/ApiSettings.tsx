
import { useState } from "react";
import { Key, Eye, EyeOff, Copy, RefreshCw, Check, Trash2, PlusCircle, Link, CornerRightDown, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed?: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
};

type Webhook = {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  created: string;
  lastTriggered?: string;
};

export function ApiSettings() {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showSecret, setShowSecret] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [webhookName, setWebhookName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk_prod_86ac634s9d87f6sad5f4sa6df4s65a4f",
      created: "2023-03-15",
      lastUsed: "2023-05-07",
      permissions: {
        read: true,
        write: true,
      },
    },
    {
      id: "key-2",
      name: "Dashboard Integration",
      key: "sk_test_54sa65d4f65sa4d6f54sa65f4sa65df4",
      created: "2023-04-02",
      lastUsed: "2023-05-06",
      permissions: {
        read: true,
        write: false,
      },
    },
    {
      id: "key-3",
      name: "Development Key",
      key: "sk_dev_65sa4d6f54asd652345sdfxcv46xcv54",
      created: "2023-05-01",
      permissions: {
        read: true,
        write: true,
      },
    },
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "wh-1",
      name: "New Contact Notification",
      url: "https://example.com/webhooks/new-contact",
      events: ["contact.created", "contact.updated"],
      active: true,
      created: "2023-04-12",
      lastTriggered: "2023-05-06",
    },
    {
      id: "wh-2",
      name: "Campaign Status Updates",
      url: "https://example.com/webhooks/campaign-status",
      events: ["campaign.started", "campaign.completed", "campaign.failed"],
      active: true,
      created: "2023-04-15",
      lastTriggered: "2023-05-07",
    },
  ]);

  const eventOptions = [
    { value: "contact.created", label: "Contact Created" },
    { value: "contact.updated", label: "Contact Updated" },
    { value: "contact.deleted", label: "Contact Deleted" },
    { value: "campaign.started", label: "Campaign Started" },
    { value: "campaign.completed", label: "Campaign Completed" },
    { value: "campaign.failed", label: "Campaign Failed" },
    { value: "message.sent", label: "Message Sent" },
    { value: "message.delivered", label: "Message Delivered" },
    { value: "message.failed", label: "Message Failed" },
    { value: "payment.succeeded", label: "Payment Succeeded" },
    { value: "payment.failed", label: "Payment Failed" },
  ];

  const toggleEventSelection = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Key name required",
        description: "Please provide a name for your API key",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would be an API call to create a new key
    const newKey: ApiKey = {
      id: `key-${apiKeys.length + 1}`,
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      permissions: {
        read: true,
        write: true,
      },
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    
    toast({
      title: "API Key Generated",
      description: "Your new API key has been created successfully.",
    });
  };

  const createWebhook = () => {
    if (!webhookName.trim()) {
      toast({
        title: "Webhook name required",
        description: "Please provide a name for your webhook",
        variant: "destructive",
      });
      return;
    }
    
    if (!webhookUrl.trim()) {
      toast({
        title: "Webhook URL required",
        description: "Please provide a URL for your webhook",
        variant: "destructive",
      });
      return;
    }

    if (selectedEvents.length === 0) {
      toast({
        title: "Events required",
        description: "Please select at least one event to trigger this webhook",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would be an API call to create a new webhook
    const newWebhook: Webhook = {
      id: `wh-${webhooks.length + 1}`,
      name: webhookName,
      url: webhookUrl,
      events: selectedEvents,
      active: true,
      created: new Date().toISOString().split("T")[0],
    };
    
    setWebhooks([...webhooks, newWebhook]);
    setWebhookName("");
    setWebhookUrl("");
    setSelectedEvents([]);
    
    toast({
      title: "Webhook Created",
      description: "Your new webhook has been created successfully.",
    });
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API Key Deleted",
      description: "The API key has been deleted successfully.",
    });
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, active: !webhook.active } : webhook
    ));
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast({
      title: "Webhook Deleted",
      description: "The webhook has been deleted successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard.",
    });
  };

  // Helper function to mask API key
  const maskApiKey = (key: string) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">API & Webhooks</h2>
        <p className="text-muted-foreground">Manage your API keys and webhook integrations</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create API Key</CardTitle>
              <CardDescription>Generate a new API key for your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Key name (e.g., Production Backend)"
                    value={newKeyName}
                    onChange={e => setNewKeyName(e.target.value)}
                  />
                </div>
                <Button onClick={generateApiKey} className="gap-1">
                  <Key className="h-4 w-4" />
                  <span>Generate Key</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active API Keys</CardTitle>
              <CardDescription>Manage your existing API keys</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{apiKey.name}</h3>
                          <Badge variant="outline" className="bg-primary/5 text-xs">
                            {apiKey.lastUsed ? "Active" : "Never Used"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted p-1 text-xs rounded font-mono">
                            {showSecret ? apiKey.key : maskApiKey(apiKey.key)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created {apiKey.created}</span>
                          {apiKey.lastUsed && <span>Last used {apiKey.lastUsed}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={apiKey.permissions.write ? "default" : "outline"} className="text-xs">
                          {apiKey.permissions.write ? "Read & Write" : "Read Only"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => deleteApiKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {apiKeys.length === 0 && (
                  <div className="p-8 text-center">
                    <Key className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No API keys</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven't created any API keys yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>API Key Settings</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Show API Key Values</Label>
                  <p className="text-sm text-muted-foreground">
                    Display full API key values instead of masked versions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={showSecret} 
                    onCheckedChange={setShowSecret}
                  />
                  {showSecret ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">API Access Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all API key usage and access attempts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">IP Restrictions</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict API access to whitelisted IP addresses
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="pt-2">
                <Label>API Rate Limit</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Select defaultValue="60">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="120">120</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="600">600</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm">requests per minute</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Webhook</CardTitle>
              <CardDescription>Set up a new webhook endpoint to receive events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input 
                      id="webhook-name"
                      placeholder="e.g., New Contact Notification"
                      value={webhookName}
                      onChange={e => setWebhookName(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                    <Input 
                      id="webhook-url"
                      placeholder="https://example.com/webhook"
                      value={webhookUrl}
                      onChange={e => setWebhookUrl(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Events to Subscribe</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {eventOptions.map(event => (
                      <div key={event.value} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`event-${event.value}`} 
                          checked={selectedEvents.includes(event.value)}
                          onChange={() => toggleEventSelection(event.value)}
                          className="rounded"
                        />
                        <label htmlFor={`event-${event.value}`} className="text-sm">
                          {event.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button onClick={createWebhook} className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Webhook</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Webhooks</CardTitle>
              <CardDescription>Manage your webhook endpoints</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{webhook.name}</h3>
                            <Badge 
                              variant={webhook.active ? "default" : "secondary"}
                              className={webhook.active ? "bg-green-600" : ""}
                            >
                              {webhook.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link className="h-3 w-3 text-muted-foreground" />
                            <code className="text-xs break-all">{webhook.url}</code>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={webhook.active} 
                            onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => deleteWebhook(webhook.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CornerRightDown className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Events</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map(event => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created {webhook.created}</span>
                        {webhook.lastTriggered && (
                          <span>Last triggered {webhook.lastTriggered}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {webhooks.length === 0 && (
                  <div className="p-8 text-center">
                    <Link className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No webhooks</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven't created any webhooks yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Webhook Settings</CardTitle>
              <CardDescription>Configure global webhook settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Webhook Retries</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retry failed webhook deliveries
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="3">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Select attempts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm">retries</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Webhook Logs</Label>
                  <p className="text-sm text-muted-foreground">
                    Store webhook request and response logs
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Webhook Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Maximum time to wait for webhook response
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="10">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm">seconds</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for Label
function Label({ className, ...props }: React.HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props} />
  );
}
