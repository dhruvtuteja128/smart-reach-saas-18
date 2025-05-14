
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, Code, RefreshCw, FolderUp } from "lucide-react";

// Define the schema for the plugin form
const pluginSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  type: z.enum(["action", "data", "analytics", "communication", "automation"]),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.Y.Z"),
  endpoint: z.string().url("Must be a valid URL"),
  icon: z.string().optional(),
  permissions: z.object({
    readContacts: z.boolean().default(false),
    writeContacts: z.boolean().default(false),
    readCampaigns: z.boolean().default(false),
    writeCampaigns: z.boolean().default(false),
    readAnalytics: z.boolean().default(false),
    sendCommunications: z.boolean().default(false),
  }),
  authentication: z.object({
    type: z.enum(["none", "api_key", "oauth"]),
    apiKeyName: z.string().optional(),
    oauthScopes: z.string().optional(),
  }),
  developerName: z.string().min(2, "Developer name is required"),
  developerEmail: z.string().email("Must be a valid email address"),
  developerWebsite: z.string().url("Must be a valid URL").optional(),
});

type PluginFormValues = z.infer<typeof pluginSchema>;

const defaultValues: Partial<PluginFormValues> = {
  type: "action",
  version: "1.0.0",
  authentication: {
    type: "api_key",
  },
  permissions: {
    readContacts: false,
    writeContacts: false,
    readCampaigns: false,
    writeCampaigns: false,
    readAnalytics: false,
    sendCommunications: false,
  },
};

export function PluginBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const form = useForm<PluginFormValues>({
    resolver: zodResolver(pluginSchema),
    defaultValues,
  });

  function onSubmit(data: PluginFormValues) {
    console.log("Plugin data:", data);
    toast({
      title: "Plugin saved",
      description: "Your plugin configuration has been saved successfully.",
    });
  }

  const templates = [
    {
      id: "discord-notification",
      name: "Discord Notification",
      description: "Send notifications to Discord channels",
      type: "communication",
      endpoint: "https://api.example.com/discord-webhook",
    },
    {
      id: "shopify-coupon",
      name: "Shopify Coupon Generator",
      description: "Create discount codes in Shopify",
      type: "action",
      endpoint: "https://api.example.com/shopify-coupon",
    },
    {
      id: "google-sheets",
      name: "Google Sheets Integration",
      description: "Create and update Google Sheets rows",
      type: "data",
      endpoint: "https://api.example.com/gsheets-api",
    },
  ];

  function loadTemplate(templateId: string) {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      form.setValue("name", template.name);
      form.setValue("description", template.description);
      form.setValue("type", template.type as any);
      form.setValue("endpoint", template.endpoint);
      setSelectedTemplate(templateId);
      setShowTemplates(false);
      
      toast({
        title: "Template loaded",
        description: `The ${template.name} template has been loaded.`,
      });
    }
  }

  return (
    <div>
      {showTemplates ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Plugin Templates</h3>
            <Button variant="outline" size="sm" onClick={() => setShowTemplates(false)}>
              Close Templates
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <Badge>{template.type}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{template.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => loadTemplate(template.id)} className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Plugin Configuration</h3>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowTemplates(true)}
                >
                  <FolderUp className="mr-2 h-4 w-4" />
                  Load Template
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => form.reset(defaultValues)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plugin Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Plugin" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive name for your plugin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plugin Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plugin type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="action">Action</SelectItem>
                          <SelectItem value="data">Data Provider</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="automation">Automation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type determines how the plugin will be categorized
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what your plugin does..."
                          className="resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a clear explanation of your plugin's functionality
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Version</FormLabel>
                        <FormControl>
                          <Input placeholder="1.0.0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Semantic versioning
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Link to your plugin icon
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="endpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Endpoint</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.example.com/plugin" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL that will handle plugin requests
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authentication.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authentication Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select authentication type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="api_key">API Key</SelectItem>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How users will authenticate with your plugin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("authentication.type") === "api_key" && (
                  <FormField
                    control={form.control}
                    name="authentication.apiKeyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key Header Name</FormLabel>
                        <FormControl>
                          <Input placeholder="X-API-Key" {...field} />
                        </FormControl>
                        <FormDescription>
                          The HTTP header name for the API key
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("authentication.type") === "oauth" && (
                  <FormField
                    control={form.control}
                    name="authentication.oauthScopes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OAuth Scopes</FormLabel>
                        <FormControl>
                          <Input placeholder="read write" {...field} />
                        </FormControl>
                        <FormDescription>
                          Space-separated list of OAuth scopes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div>
                  <h4 className="text-sm font-medium mb-2">Required Permissions</h4>
                  <div className="space-y-2 border rounded-md p-3">
                    <FormField
                      control={form.control}
                      name="permissions.readContacts"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Read Contacts
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permissions.writeContacts"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Write Contacts
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permissions.readCampaigns"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Read Campaigns
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permissions.writeCampaigns"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Write Campaigns
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permissions.readAnalytics"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Read Analytics
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permissions.sendCommunications"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Send Communications
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">Developer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="developerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name or company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="developerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="developerWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-website.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Plugin
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
