
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { CompanySettings } from "@/components/settings/CompanySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { ApiSettings } from "@/components/settings/ApiSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { TeamManagement } from "@/components/settings/TeamManagement";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { AutomationSettings } from "@/components/settings/AutomationSettings";
import { AISettings } from "@/components/settings/AISettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <div className="p-1">
            <TabsContent value="profile" className="space-y-4">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <CompanySettings />
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <TeamManagement />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <BillingSettings />
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4">
              <AISettings />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <IntegrationsSettings />
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <ApiSettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <AutomationSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
