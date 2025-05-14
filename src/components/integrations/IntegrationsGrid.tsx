import { useState } from "react";
import { IntegrationCard, Integration } from "./IntegrationCard";
import { IntegrationsEmptyState } from "./IntegrationsEmptyState";
import { toast } from "@/hooks/use-toast";

// Mock data for integrations
const INITIAL_INTEGRATIONS: Integration[] = [
  { 
    id: "google-ads", 
    name: "Google Ads", 
    description: "Connect your Google Ads account to track campaign performance and automate ad creation.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/512px-Google_Ads_logo.svg.png", 
    category: "advertising",
    isConnected: true,
    lastSynced: "2 hours ago",
    authType: "oauth",
    features: ["Real-time"]
  },
  { 
    id: "meta-ads", 
    name: "Meta Ads", 
    description: "Link your Facebook and Instagram ad accounts to optimize social campaigns.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png", 
    category: "advertising",
    isConnected: true,
    lastSynced: "1 day ago",
    authType: "oauth",
    features: ["Daily Sync"]
  },
  { 
    id: "tiktok-ads", 
    name: "TikTok Ads", 
    description: "Connect to TikTok's ad platform to manage and track performance of your campaigns.", 
    logo: "https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png", 
    category: "advertising",
    isConnected: false,
    authType: "oauth",
    isNew: true
  },
  { 
    id: "google-analytics", 
    name: "Google Analytics", 
    description: "Import analytics data to measure campaign performance and user behavior.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Google_Analytics_logo_lockup.svg/512px-Google_Analytics_logo_lockup.svg.png", 
    category: "advertising",
    isConnected: true,
    lastSynced: "1 hour ago",
    authType: "oauth"
  },
  { 
    id: "hubspot", 
    name: "HubSpot", 
    description: "Sync contacts, companies and deals with your HubSpot CRM.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png", 
    category: "crm",
    isConnected: false,
    authType: "api_key"
  },
  { 
    id: "salesforce", 
    name: "Salesforce", 
    description: "Integrate your Salesforce data to streamline customer information.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png", 
    category: "crm",
    isConnected: false,
    authType: "oauth",
  },
  { 
    id: "mailchimp", 
    name: "Mailchimp", 
    description: "Sync email lists and campaign data with Mailchimp.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mailchimp_playground.svg/512px-Mailchimp_playground.svg.png", 
    category: "crm",
    isConnected: true,
    lastSynced: "3 days ago",
    authType: "api_key"
  },
  { 
    id: "whatsapp", 
    name: "WhatsApp Business", 
    description: "Connect your WhatsApp Business account to send messages and handle conversations.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png", 
    category: "communication",
    isConnected: false,
    authType: "api_key"
  },
  { 
    id: "slack", 
    name: "Slack", 
    description: "Get notifications and updates directly in your Slack workspace.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png", 
    category: "communication",
    isConnected: true,
    lastSynced: "Just now",
    authType: "oauth",
    features: ["Real-time"]
  },
  { 
    id: "twilio", 
    name: "Twilio", 
    description: "Send SMS messages and make voice calls through your Twilio account.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/512px-Twilio-logo-red.svg.png", 
    category: "communication",
    isConnected: true,
    lastSynced: "12 hours ago",
    authType: "api_key"
  },
  { 
    id: "stripe", 
    name: "Stripe", 
    description: "Process payments and manage subscriptions seamlessly.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png", 
    category: "ecommerce",
    isConnected: true,
    lastSynced: "3 days ago",
    authType: "api_key"
  },
  { 
    id: "shopify", 
    name: "Shopify", 
    description: "Sync product data and customer information from your Shopify store.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/512px-Shopify_logo_2018.svg.png", 
    category: "ecommerce",
    isConnected: false,
    authType: "oauth"
  },
  { 
    id: "paypal", 
    name: "PayPal", 
    description: "Process payments and access transaction data from PayPal.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png", 
    category: "ecommerce",
    isConnected: false,
    authType: "oauth"
  },
  { 
    id: "zapier", 
    name: "Zapier", 
    description: "Connect with 3,000+ apps and automate your workflows.", 
    logo: "https://assets-global.website-files.com/603f6363ca4ac538fdd32ab3/62b9d7e375a8155749b149f1_zapier-icon.png", 
    category: "productivity",
    isConnected: false,
    authType: "webhook",
    features: ["Webhook"]
  },
  { 
    id: "zoom", 
    name: "Zoom", 
    description: "Create and manage Zoom meetings from your marketing platform.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Zoom_logo_2022.svg/512px-Zoom_logo_2022.svg.png", 
    category: "productivity",
    isConnected: false,
    authType: "oauth",
    isNew: true
  },
  { 
    id: "gmail", 
    name: "Gmail", 
    description: "Import contacts and send emails through your Gmail account.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png", 
    category: "communication",
    isConnected: false,
    authType: "oauth"
  },
  { 
    id: "notion", 
    name: "Notion", 
    description: "Connect your Notion workspace to sync documents and databases.", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", 
    category: "productivity",
    isConnected: false,
    authType: "oauth",
    isNew: true
  },
  { 
    id: "webhooks", 
    name: "Custom Webhooks", 
    description: "Create webhooks to connect with any custom service or tool.", 
    logo: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png", 
    category: "productivity",
    isConnected: false,
    authType: "webhook",
    features: ["Developer"]
  }
];

interface IntegrationsGridProps {
  category: string;
  searchQuery: string;
}

export function IntegrationsGrid({ category, searchQuery }: IntegrationsGridProps) {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  
  // Filter based on category and search query
  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = category === "all" || integration.category === category;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleConnection = (id: string) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newConnection = !integration.isConnected;
        
        // Show toast message
        if (newConnection) {
          toast({
            title: "Integration activated",
            description: `${integration.name} has been successfully activated`
          });
        } else {
          toast({
            title: "Integration deactivated",
            description: `${integration.name} has been successfully deactivated`,
            variant: "destructive"
          });
        }
        
        return { 
          ...integration, 
          isConnected: newConnection,
          lastSynced: newConnection ? "Just now" : undefined 
        };
      }
      return integration;
    }));
  };

  if (filteredIntegrations.length === 0) {
    return <IntegrationsEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredIntegrations.map(integration => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onToggleConnection={handleToggleConnection}
        />
      ))}
    </div>
  );
}
