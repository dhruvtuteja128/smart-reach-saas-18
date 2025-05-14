
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  Smartphone, 
  Shield, 
  Globe, 
  Download, 
  Trash 
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SecuritySettings() {
  const [twoFactorMethod, setTwoFactorMethod] = useState("app");
  const [whitelistEnabled, setWhitelistEnabled] = useState(false);
  const [ipAddresses, setIpAddresses] = useState("");
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [accountDeleteConfirm, setAccountDeleteConfirm] = useState("");

  const handleDeleteAccount = () => {
    if (accountDeleteConfirm === "DELETE") {
      toast({
        title: "Account Deleted",
        description: "Your account has been scheduled for deletion. You will receive a confirmation email shortly.",
      });
      setDeleteAccountDialog(false);
    } else {
      toast({
        title: "Confirmation Failed",
        description: "Please type DELETE in all caps to confirm account deletion.",
        variant: "destructive",
      });
    }
  };
  
  const handleDataExport = () => {
    toast({
      title: "Export Requested",
      description: "Your data export has been initiated. You'll receive a download link via email shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security & Privacy</h2>
        <p className="text-muted-foreground">Manage security settings and privacy preferences</p>
      </div>
      
      {/* 2FA Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Two-Factor Authentication</span>
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="two-factor-toggle">Enable Two-Factor Authentication</Label>
            <Switch id="two-factor-toggle" />
          </div>
          
          <RadioGroup 
            value={twoFactorMethod} 
            onValueChange={setTwoFactorMethod}
            className="mt-4"
          >
            <div className="flex items-start space-x-2 mb-3">
              <RadioGroupItem value="app" id="app-method" />
              <Label htmlFor="app-method" className="font-medium">
                <div>Authenticator App</div>
                <p className="font-normal text-muted-foreground text-sm">
                  Use an authenticator app like Google Authenticator or Authy
                </p>
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="sms" id="sms-method" />
              <Label htmlFor="sms-method" className="font-medium">
                <div>SMS Authentication</div>
                <p className="font-normal text-muted-foreground text-sm">
                  Receive verification codes via SMS
                </p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button>Configure 2FA</Button>
        </CardFooter>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <span>Device & Session Management</span>
          </CardTitle>
          <CardDescription>Manage active devices and sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Current Device - Chrome on macOS</p>
                <p className="text-sm text-muted-foreground">Last active: Just now</p>
              </div>
              <div className="text-muted-foreground text-sm">Current</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">iPhone 13 - Safari</p>
                <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">Logout</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Windows PC - Firefox</p>
                <p className="text-sm text-muted-foreground">Last active: 3 days ago</p>
              </div>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Logout from all other devices</Button>
        </CardFooter>
      </Card>

      {/* IP Whitelisting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>IP Whitelisting</span>
          </CardTitle>
          <CardDescription>Restrict account access to specific IP addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="ip-whitelist-toggle">Enable IP Whitelisting</Label>
            <Switch 
              id="ip-whitelist-toggle" 
              checked={whitelistEnabled}
              onCheckedChange={setWhitelistEnabled}
            />
          </div>
          
          {whitelistEnabled && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="ip-addresses">IP Addresses (one per line)</Label>
                <Input 
                  id="ip-addresses"
                  value={ipAddresses}
                  onChange={(e) => setIpAddresses(e.target.value)}
                  placeholder="e.g. 192.168.1.1"
                  className="mt-1.5"
                  multiline
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Your current IP address: 123.45.67.89
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button disabled={!whitelistEnabled}>Save IP Settings</Button>
        </CardFooter>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            <span>Data & Privacy</span>
          </CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Export Your Data</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Download a copy of all your data stored in our platform in a machine-readable format
            </p>
            <Button variant="outline" onClick={handleDataExport}>Request Data Export</Button>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">GDPR & CCPA Compliance</h3>
            <p className="text-sm text-muted-foreground">
              We are committed to ensuring your data privacy rights under GDPR (EU) and CCPA (California).
              <a href="#" className="text-primary ml-1">Learn more</a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="font-medium mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-3">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Dialog open={deleteAccountDialog} onOpenChange={setDeleteAccountDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and all of your data.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="confirm-delete">Type DELETE to confirm</Label>
                  <Input 
                    id="confirm-delete"
                    value={accountDeleteConfirm}
                    onChange={(e) => setAccountDeleteConfirm(e.target.value)}
                    placeholder="DELETE"
                    className="mt-1.5"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteAccountDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    disabled={accountDeleteConfirm !== "DELETE"}
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
