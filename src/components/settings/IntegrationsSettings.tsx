
import { useState } from "react";
import { PlugZap, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Integration = {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  isConnected: boolean;
  lastSynced?: string;
};

export function IntegrationsSettings() {
  const [activeTab, setActiveTab] = useState("all");
  const [integrations, setIntegrations] = useState<Integration[]>([
    { 
      id: "google-ads", 
      name: "Google Ads", 
      description: "Connect your Google Ads account to track campaign performance.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/512px-Google_Ads_logo.svg.png", 
      category: "advertising",
      isConnected: true,
      lastSynced: "2 hours ago"
    },
    { 
      id: "meta-ads", 
      name: "Meta Ads", 
      description: "Link your Facebook and Instagram ad accounts to optimize social campaigns.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png", 
      category: "advertising",
      isConnected: true,
      lastSynced: "1 day ago"
    },
    { 
      id: "whatsapp", 
      name: "WhatsApp Business", 
      description: "Connect your WhatsApp Business account to send messages and handle conversations.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png", 
      category: "messaging",
      isConnected: false
    },
    { 
      id: "stripe", 
      name: "Stripe", 
      description: "Process payments and manage subscriptions seamlessly.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png", 
      category: "payment",
      isConnected: true,
      lastSynced: "3 days ago"
    },
    { 
      id: "zapier", 
      name: "Zapier", 
      description: "Connect with 3,000+ apps and automate your workflows.", 
      logo: "https://assets-global.website-files.com/603f6363ca4ac538fdd32ab3/62b9d7e375a8155749b149f1_zapier-icon.png", 
      category: "automation",
      isConnected: false
    },
    { 
      id: "shopify", 
      name: "Shopify", 
      description: "Sync product data and customer information from your Shopify store.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png", 
      category: "ecommerce",
      isConnected: false
    },
    { 
      id: "slack", 
      name: "Slack", 
      description: "Get notifications and updates directly in your Slack workspace.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png", 
      category: "communication",
      isConnected: true,
      lastSynced: "Just now"
    },
    { 
      id: "gmail", 
      name: "Gmail", 
      description: "Import contacts and send emails through your Gmail account.", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png", 
      category: "communication",
      isConnected: false
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? 
        { ...integration, isConnected: !integration.isConnected, lastSynced: integration.isConnected ? undefined : "Just now" } : 
        integration
    ));
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "advertising", label: "Advertising" },
    { id: "messaging", label: "Messaging" },
    { id: "payment", label: "Payment" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "communication", label: "Communication" },
    { id: "automation", label: "Automation" }
  ];

  const filteredIntegrations = activeTab === "all" ? 
    integrations : 
    integrations.filter(integration => integration.category === activeTab);

  const connectedCount = integrations.filter(integration => integration.isConnected).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-muted-foreground">Connect your marketing platform with other tools and services</p>
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="outline" className="px-2 py-1">
          <span className="text-sm font-medium">{connectedCount} Active Connections</span>
        </Badge>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>Integration Marketplace</span>
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start p-1 bg-muted/50">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-xs px-2 py-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map(integration => (
          <Card key={integration.id} className={integration.isConnected ? "border-primary/20" : ""}>
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
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                </div>
                <Switch 
                  checked={integration.isConnected} 
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>
              <CardDescription className="mt-2">{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredIntegrations.length === 0 && (
        <div className="text-center p-8 border rounded-lg bg-muted/20">
          <PlugZap className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No integrations found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            No integrations available for this category.
          </p>
        </div>
      )}
    </div>
  );
}
