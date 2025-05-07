
import { useState } from "react";
import { Bell, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  const [notificationType, setNotificationType] = useState("all");
  const [emailPreferences, setEmailPreferences] = useState({
    newLead: true,
    campaignStatus: true,
    failedAutomation: true,
    paymentIssue: true,
    review: false,
    newsletter: false,
  });
  
  const [inAppPreferences, setInAppPreferences] = useState({
    newLead: true,
    campaignStatus: true,
    failedAutomation: true,
    paymentIssue: true,
    review: true,
    newsletter: false,
  });
  
  const [smsPreferences, setSmsPreferences] = useState({
    newLead: false,
    campaignStatus: false,
    failedAutomation: true,
    paymentIssue: true,
    review: false,
    newsletter: false,
  });
  
  const [digestPreferences, setDigestPreferences] = useState({
    dailyDigest: true,
    weeklyDigest: false,
  });

  const updateEmailPreference = (key: keyof typeof emailPreferences, value: boolean) => {
    setEmailPreferences({ ...emailPreferences, [key]: value });
  };

  const updateInAppPreference = (key: keyof typeof inAppPreferences, value: boolean) => {
    setInAppPreferences({ ...inAppPreferences, [key]: value });
  };

  const updateSmsPreference = (key: keyof typeof smsPreferences, value: boolean) => {
    setSmsPreferences({ ...smsPreferences, [key]: value });
  };

  const updateDigestPreference = (key: keyof typeof digestPreferences, value: boolean) => {
    // If turning on one digest type, turn off the other
    if (value === true) {
      if (key === 'dailyDigest') {
        setDigestPreferences({ dailyDigest: true, weeklyDigest: false });
      } else {
        setDigestPreferences({ dailyDigest: false, weeklyDigest: true });
      }
    } else {
      setDigestPreferences({ ...digestPreferences, [key]: value });
    }
  };
  
  const notificationItems = [
    { id: "newLead", label: "New lead added" },
    { id: "campaignStatus", label: "Campaign status changes" },
    { id: "failedAutomation", label: "Failed automation" },
    { id: "paymentIssue", label: "Payment issues" },
    { id: "review", label: "Review submitted" },
    { id: "newsletter", label: "Platform news and updates" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="text-muted-foreground">Manage how you receive notifications and updates</p>
      </div>
      
      <Tabs defaultValue="all" value={notificationType} onValueChange={setNotificationType}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="inapp">In-App</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-1">
            <Bell className="h-4 w-4" />
            <span>Test Notifications</span>
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure the emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`email-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`email-${item.id}`} 
                      checked={emailPreferences[item.id as keyof typeof emailPreferences]}
                      onCheckedChange={(checked) => updateEmailPreference(item.id as keyof typeof emailPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Configure the notifications you see in the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`inapp-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`inapp-${item.id}`} 
                      checked={inAppPreferences[item.id as keyof typeof inAppPreferences]}
                      onCheckedChange={(checked) => updateInAppPreference(item.id as keyof typeof inAppPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Configure the SMS alerts for critical updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`sms-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`sms-${item.id}`} 
                      checked={smsPreferences[item.id as keyof typeof smsPreferences]}
                      onCheckedChange={(checked) => updateSmsPreference(item.id as keyof typeof smsPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary Digests</CardTitle>
              <CardDescription>Configure your regular summary reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="daily-digest" className="flex-1">
                      Daily digest (sent at 8:00 AM)
                    </Label>
                  </div>
                  <Switch 
                    id="daily-digest" 
                    checked={digestPreferences.dailyDigest}
                    onCheckedChange={(checked) => updateDigestPreference('dailyDigest', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="weekly-digest" className="flex-1">
                      Weekly digest (sent on Mondays)
                    </Label>
                  </div>
                  <Switch 
                    id="weekly-digest" 
                    checked={digestPreferences.weeklyDigest}
                    onCheckedChange={(checked) => updateDigestPreference('weeklyDigest', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure the emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`email-tab-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`email-tab-${item.id}`} 
                      checked={emailPreferences[item.id as keyof typeof emailPreferences]}
                      onCheckedChange={(checked) => updateEmailPreference(item.id as keyof typeof emailPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inapp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Configure the notifications you see in the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`inapp-tab-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`inapp-tab-${item.id}`} 
                      checked={inAppPreferences[item.id as keyof typeof inAppPreferences]}
                      onCheckedChange={(checked) => updateInAppPreference(item.id as keyof typeof inAppPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Configure the SMS alerts for critical updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={`sms-tab-${item.id}`} className="flex-1">
                      {item.label}
                    </Label>
                    <Switch 
                      id={`sms-tab-${item.id}`} 
                      checked={smsPreferences[item.id as keyof typeof smsPreferences]}
                      onCheckedChange={(checked) => updateSmsPreference(item.id as keyof typeof smsPreferences, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
