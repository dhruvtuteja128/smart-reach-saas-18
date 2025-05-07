
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  User, 
  Building2, 
  Users, 
  PlugZap, 
  Bell, 
  CreditCard, 
  Settings2, 
  Key, 
  Shield 
} from "lucide-react";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { CompanySettings } from "@/components/settings/CompanySettings";
import { TeamManagement } from "@/components/settings/TeamManagement";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { AutomationSettings } from "@/components/settings/AutomationSettings";
import { ApiSettings } from "@/components/settings/ApiSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "company", label: "Company Settings", icon: Building2 },
    { id: "team", label: "Team Management", icon: Users },
    { id: "integrations", label: "Integrations", icon: PlugZap },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "automation", label: "Automation Preferences", icon: Settings2 },
    { id: "api", label: "API & Webhooks", icon: Key },
    { id: "security", label: "Security & Privacy", icon: Shield },
  ];

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account, workspace, and platform preferences
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Tabs */}
          <div className="md:hidden w-full mb-6">
            <TabsList className="w-full overflow-x-auto flex-wrap justify-start h-auto p-1 gap-1">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-3 py-2"
                  onClick={() => setActiveTab(tab.id)}
                  data-state={activeTab === tab.id ? "active" : "inactive"}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            orientation="vertical"
            className="flex flex-col md:flex-row w-full gap-8"
          >
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="justify-start gap-3 px-4 py-3 w-full text-left"
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 bg-card rounded-lg border shadow-sm p-1">
              <TabsContent value="profile" className="m-0 p-6">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="company" className="m-0 p-6">
                <CompanySettings />
              </TabsContent>
              
              <TabsContent value="team" className="m-0 p-6">
                <TeamManagement />
              </TabsContent>
              
              <TabsContent value="integrations" className="m-0 p-6">
                <IntegrationsSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0 p-6">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="billing" className="m-0 p-6">
                <BillingSettings />
              </TabsContent>
              
              <TabsContent value="automation" className="m-0 p-6">
                <AutomationSettings />
              </TabsContent>
              
              <TabsContent value="api" className="m-0 p-6">
                <ApiSettings />
              </TabsContent>
              
              <TabsContent value="security" className="m-0 p-6">
                <SecuritySettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
