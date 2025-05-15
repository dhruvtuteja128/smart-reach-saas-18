
import { useState } from "react";
import { 
  Search, 
  PlugZap, 
  Filter, 
  Facebook, 
  ShoppingCart, 
  MailPlus, 
  CreditCard, 
  Database, 
  BarChart3, 
  MessageSquare,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PluginStatus = "installed" | "available" | "pending" | "error";
type PluginCategory = "analytics" | "crm" | "ecommerce" | "messaging" | "payment" | "social" | "utilities";

interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType | string;
  category: PluginCategory;
  status: PluginStatus;
  isPopular?: boolean;
  isVerified?: boolean;
  developer: string;
  version: string;
}

// Define category to colors mapping
const categoryColorMap: Record<PluginCategory, {
  bg: string;
  text: string;
}> = {
  analytics: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400"
  },
  crm: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400"
  },
  ecommerce: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400"
  },
  messaging: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400"
  },
  payment: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400"
  },
  social: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400"
  },
  utilities: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-600 dark:text-gray-400"
  }
};

// Sample plugins data
const mockPlugins: Plugin[] = [
  {
    id: "shopify",
    name: "Shopify",
    description: "Create products, manage orders, and track inventory",
    icon: ShoppingCart,
    category: "ecommerce",
    status: "installed",
    isPopular: true,
    isVerified: true,
    developer: "Shopify Inc.",
    version: "2.1.0"
  },
  {
    id: "discord",
    name: "Discord",
    description: "Send notifications to Discord channels",
    icon: MessageSquare,
    category: "messaging",
    status: "available",
    isPopular: true,
    developer: "Discord Inc.",
    version: "1.5.2"
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track website analytics and visitor behavior",
    icon: BarChart3,
    category: "analytics",
    status: "installed",
    isVerified: true,
    developer: "Google LLC",
    version: "3.0.1"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Manage contacts, deals, and marketing campaigns",
    icon: Database,
    category: "crm",
    status: "available",
    developer: "HubSpot Inc.",
    version: "2.3.0"
  },
  {
    id: "stripe",
    name: "Stripe Payments",
    description: "Process payments and manage subscriptions",
    icon: CreditCard,
    category: "payment",
    status: "pending",
    isVerified: true,
    developer: "Stripe Inc.",
    version: "1.8.0"
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Create and manage email marketing campaigns",
    icon: MailPlus,
    category: "messaging",
    status: "error",
    developer: "Mailchimp",
    version: "2.0.3"
  },
  {
    id: "facebook",
    name: "Facebook Ads",
    description: "Create and manage Facebook ad campaigns",
    icon: Facebook,
    category: "social",
    status: "available",
    isPopular: true,
    developer: "Meta Platforms Inc.",
    version: "3.2.1"
  },
  {
    id: "custom-plugin",
    name: "Custom Plugin",
    description: "A custom plugin created by your team",
    icon: FileCode,
    category: "utilities",
    status: "installed",
    developer: "Your Company",
    version: "1.0.0"
  }
];

// Plugin status component
const PluginStatus = ({ status }: { status: PluginStatus }) => {
  switch (status) {
    case "installed":
      return (
        <Badge variant="outline" className="gap-1 text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800">
          <CheckCircle className="h-3 w-3" />
          <span>Installed</span>
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="gap-1 text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
      );
    case "error":
      return (
        <Badge variant="outline" className="gap-1 text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <AlertCircle className="h-3 w-3" />
          <span>Error</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="gap-1">
          <span>Available</span>
        </Badge>
      );
  }
};

export function AssistantPlugins() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PluginCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<PluginStatus | "all">("all");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("marketplace");
  
  // Apply filters
  const filteredPlugins = mockPlugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || plugin.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    const matchesVerified = !showVerifiedOnly || plugin.isVerified;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesVerified;
  });
  
  const handleInstallPlugin = (pluginId: string) => {
    const plugin = mockPlugins.find(p => p.id === pluginId);
    if (!plugin) return;
    
    toast({
      description: `Installing ${plugin.name}...`
    });
    
    // In a real app, this would trigger an API call
    setTimeout(() => {
      toast({
        description: `${plugin.name} successfully installed!`
      });
    }, 1500);
  };
  
  const handleUninstallPlugin = (pluginId: string) => {
    const plugin = mockPlugins.find(p => p.id === pluginId);
    if (!plugin) return;
    
    toast({
      variant: "destructive",
      description: `Uninstalling ${plugin.name}...`
    });
    
    // In a real app, this would trigger an API call
    setTimeout(() => {
      toast({
        description: `${plugin.name} successfully uninstalled`
      });
    }, 1500);
  };
  
  const handleBuildPlugin = () => {
    toast({
      description: "Opening Plugin Builder..."
    });
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TabsList>
          <TabsTrigger value="marketplace" className="flex items-center gap-1">
            <PlugZap className="h-4 w-4" />
            <span>Marketplace</span>
          </TabsTrigger>
          <TabsTrigger value="installed" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Installed</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex items-center gap-1">
            <FileCode className="h-4 w-4" />
            <span>Developer</span>
          </TabsTrigger>
        </TabsList>
        
        <Button onClick={handleBuildPlugin}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Build Plugin
        </Button>
      </div>
      
      <TabsContent value="marketplace" className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as PluginCategory | "all")}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <span>Category</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="ecommerce">Ecommerce</SelectItem>
              <SelectItem value="messaging">Messaging</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PluginStatus | "all")}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <span>Status</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="installed">Installed</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="verified-only" 
              checked={showVerifiedOnly}
              onCheckedChange={setShowVerifiedOnly}
            />
            <label 
              htmlFor="verified-only" 
              className="text-sm font-medium cursor-pointer"
            >
              Verified only
            </label>
          </div>
        </div>
        
        {/* Popular plugins carousel */}
        {searchQuery === "" && categoryFilter === "all" && statusFilter === "all" && !showVerifiedOnly && (
          <div className="space-y-2">
            <h3 className="font-medium">Popular Plugins</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {mockPlugins.filter(p => p.isPopular).map((plugin) => {
                const IconComponent = plugin.icon as React.ElementType;
                
                return (
                  <Card key={plugin.id} className="min-w-[280px] max-w-[280px]">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className={cn(
                          "p-2 rounded-full",
                          categoryColorMap[plugin.category].bg
                        )}>
                          <IconComponent className={cn(
                            "h-5 w-5",
                            categoryColorMap[plugin.category].text
                          )} />
                        </div>
                        <PluginStatus status={plugin.status} />
                      </div>
                      <CardTitle className="text-base">{plugin.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {plugin.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center mt-4">
                      <div className="text-xs text-muted-foreground">
                        v{plugin.version}
                      </div>
                      {plugin.status === "installed" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUninstallPlugin(plugin.id)}
                        >
                          Uninstall
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleInstallPlugin(plugin.id)}
                        >
                          Install
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        
        {/* All plugins grid */}
        <div className="space-y-2">
          <h3 className="font-medium">
            {searchQuery !== "" || categoryFilter !== "all" || statusFilter !== "all" || showVerifiedOnly 
              ? "Search Results" 
              : "All Plugins"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlugins.map((plugin) => {
              const IconComponent = plugin.icon as React.ElementType;
              
              return (
                <Card key={plugin.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn(
                        "p-2 rounded-full",
                        categoryColorMap[plugin.category].bg
                      )}>
                        <IconComponent className={cn(
                          "h-5 w-5",
                          categoryColorMap[plugin.category].text
                        )} />
                      </div>
                      <PluginStatus status={plugin.status} />
                    </div>
                    <CardTitle className="text-base">{plugin.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {plugin.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        {plugin.developer}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          categoryColorMap[plugin.category].text
                        )}
                      >
                        {plugin.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center mt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      v{plugin.version}
                    </div>
                    {plugin.status === "installed" ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUninstallPlugin(plugin.id)}
                      >
                        Uninstall
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleInstallPlugin(plugin.id)}
                        disabled={plugin.status === "pending" || plugin.status === "error"}
                      >
                        Install
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredPlugins.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No plugins found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                  setShowVerifiedOnly(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="installed" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockPlugins.filter(p => p.status === "installed").map((plugin) => {
            const IconComponent = plugin.icon as React.ElementType;
            
            return (
              <Card key={plugin.id}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      "p-2 rounded-full",
                      categoryColorMap[plugin.category].bg
                    )}>
                      <IconComponent className={cn(
                        "h-5 w-5",
                        categoryColorMap[plugin.category].text
                      )} />
                    </div>
                    <Switch checked={true} />
                  </div>
                  <CardTitle className="text-base">{plugin.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {plugin.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-muted-foreground">
                      {plugin.developer}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        categoryColorMap[plugin.category].text
                      )}
                    >
                      {plugin.category}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center mt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    v{plugin.version}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUninstallPlugin(plugin.id)}
                    >
                      Uninstall
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {mockPlugins.filter(p => p.status === "installed").length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No plugins installed yet.</p>
            <Button 
              className="mt-4"
              onClick={() => setActiveTab("marketplace")}
            >
              Browse Marketplace
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="developer" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Plugin Developer Console</CardTitle>
            <CardDescription>
              Create, test, and manage AI assistant plugins for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <div className="flex justify-center mb-2">
                    <FileCode className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-center text-base">Create Plugin</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-center text-muted-foreground">
                  Build a new plugin using our SDK
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-center">
                  <Button>Start Building</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <div className="flex justify-center mb-2">
                    <PlugZap className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-center text-base">My Plugins</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-center text-muted-foreground">
                  Manage your created plugins
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-center">
                  <Button variant="outline">View Plugins</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <div className="flex justify-center mb-2">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-center text-base">Submit for Review</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-center text-muted-foreground">
                  Submit plugin for verification
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-center">
                  <Button variant="outline">Submit</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Plugin SDK Documentation</h3>
              <Card className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Button variant="link" className="p-0 h-auto">Getting Started</Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <Button variant="link" className="p-0 h-auto">Authentication</Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <Button variant="link" className="p-0 h-auto">API Reference</Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <Button variant="link" className="p-0 h-auto">Webhooks</Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <Button variant="link" className="p-0 h-auto">Testing & Deployment</Button>
                  </li>
                </ul>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
