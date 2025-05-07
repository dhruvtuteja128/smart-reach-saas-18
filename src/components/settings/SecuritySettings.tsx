import { useState } from "react";
import { Shield, Smartphone, Key, UserCheck, AlertTriangle, Trash2, Download, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type SessionDevice = {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<SessionDevice[]>([
    { 
      id: "session-1", 
      device: "MacBook Pro", 
      browser: "Chrome 112",
      ip: "192.168.1.1",
      location: "San Francisco, CA, USA",
      lastActive: "Current session",
      current: true
    },
    { 
      id: "session-2", 
      device: "iPhone 13", 
      browser: "Safari Mobile 16",
      ip: "192.168.0.5",
      location: "San Francisco, CA, USA",
      lastActive: "2 hours ago",
      current: false
    },
    { 
      id: "session-3", 
      device: "Windows PC", 
      browser: "Firefox 102",
      ip: "86.75.30.9",
      location: "New York, NY, USA",
      lastActive: "5 days ago",
      current: false
    },
  ]);

  const handleEnableTwoFactor = () => {
    // In a real app, this would make an API call to generate
    // a new 2FA secret and QR code for the user
    setTwoFactorEnabled(true);
    setShowQrCode(true);
  };

  const handleVerifyTwoFactor = () => {
    // In a real app, this would verify the user's input against the generated secret
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure.",
    });
    setShowQrCode(false);
  };

  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    toast({
      title: "Two-factor authentication disabled",
      variant: "destructive",
      description: "Your account is now less secure.",
    });
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
    toast({
      title: "Session revoked",
      description: "The session has been successfully terminated.",
    });
  };

  const handleRevokeAll = () => {
    // Keep only the current session
    setSessions(sessions.filter(session => session.current));
    toast({
      title: "All other sessions revoked",
      description: "All sessions except your current one have been terminated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export is being prepared. You will receive an email when it's ready.",
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      toast({
        title: "Confirmation required",
        description: 'Please type "DELETE" to confirm account deletion.',
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Account deletion requested",
      description: "Your request has been received. Your account will be scheduled for deletion.",
      variant: "destructive",
    });
    
    setDeleteConfirmation("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security & Privacy</h2>
        <p className="text-muted-foreground">Manage your account security and privacy settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-muted-foreground" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!twoFactorEnabled && !showQrCode && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium">Enable two-factor authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with an additional authentication step.
                  </p>
                </div>
                <Button onClick={handleEnableTwoFactor} className="w-full md:w-auto">
                  Enable 2FA
                </Button>
              </div>
            </div>
          )}
          
          {showQrCode && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-md mb-4">
                  <Shield className="h-16 w-16 text-muted-foreground" />
                  <span className="sr-only">QR Code for 2FA setup</span>
                </div>
                <div className="text-center">
                  <h4 className="font-medium mb-2">Scan this QR code</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use an authenticator app like Google Authenticator, Authy, or 1Password to scan this QR code.
                  </p>
                  <div className="bg-muted p-2 rounded-md text-center mb-4">
                    <code className="font-mono">XJIE LMDP QWER 12AS 45ZX CV78</code>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    If you can't scan the QR code, you can use this code to manually set up your authenticator app.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-center space-x-2">
                      <Input 
                        placeholder="Enter 6-digit code" 
                        className="w-40 text-center"
                      />
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" onClick={() => setShowQrCode(false)}>Cancel</Button>
                      <Button onClick={handleVerifyTwoFactor}>Verify</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {twoFactorEnabled && !showQrCode && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Two-factor authentication is enabled</h4>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your account is protected with an authenticator app.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleDisableTwoFactor}
                  className="w-full md:w-auto text-destructive hover:text-destructive"
                >
                  Disable 2FA
                </Button>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Recovery codes</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Save these recovery codes in a secure place. You can use them to log in if you lose access to your authenticator app.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <code key={i} className="bg-muted p-2 rounded-md text-center text-xs font-mono">
                      {`${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`}
                    </code>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Download Codes
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate New Codes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-muted-foreground" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage devices and locations where you're currently logged in
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {sessions.map((session) => (
              <div key={session.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{session.device}</h4>
                      {session.current && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{session.browser}</span>
                      <span className="mx-1">•</span>
                      <span className="text-muted-foreground">{session.location}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Last active: {session.lastActive}</span>
                      <span className="mx-1">•</span>
                      <span>IP: {session.ip}</span>
                    </div>
                  </div>
                  
                  {!session.current && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRevokeSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span>Revoke</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          <div className="text-sm text-muted-foreground">
            <span>{sessions.length} active {sessions.length === 1 ? "session" : "sessions"}</span>
          </div>
          <Button variant="outline" onClick={handleRevokeAll}>
            Sign Out All Other Sessions
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Password
          </CardTitle>
          <CardDescription>
            Update your password regularly to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="mt-1.5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="mt-1.5" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" className="mt-1.5" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            IP Access Controls
          </CardTitle>
          <CardDescription>
            Restrict account access to specific IP addresses or ranges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">IP Whitelist</h4>
              <p className="text-sm text-muted-foreground">
                Only allow access from specific IP addresses
              </p>
            </div>
            <Switch />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Input placeholder="Enter IP address or range (e.g., 192.168.1.1 or 192.168.1.0/24)" className="flex-1" />
            <Button variant="outline">Add IP</Button>
          </div>
          
          <div className="text-center border rounded-md p-4">
            <p className="text-sm text-muted-foreground">
              No IP addresses have been whitelisted yet.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-muted-foreground" />
            Data Export
          </CardTitle>
          <CardDescription>
            Download a copy of your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-medium">Request data export</h4>
              <p className="text-sm text-muted-foreground">
                You will receive an email with a link to download your data within 24 hours.
              </p>
            </div>
            <Button onClick={handleExportData} variant="outline" className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-1" />
              <span>Export Data</span>
            </Button>
          </div>
          
          <div className="pt-2">
            <h4 className="font-medium mb-2">What's included in your export</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Account information and profile settings</li>
              <li>Campaigns and automation workflows</li>
              <li>Contact lists and segments</li>
              <li>Analytics and reporting data</li>
              <li>Templates and saved content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 text-sm">
            <p className="text-destructive font-medium mb-1">Warning: This action cannot be undone</p>
            <p className="text-muted-foreground">
              Once you delete your account, all of your data will be permanently removed.
              This includes your profile, campaigns, contacts, analytics, and all other data associated with your account.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full md:w-auto">
                <Trash2 className="h-4 w-4 mr-1" />
                <span>Delete Account</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Delete Account
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove all of your data from our servers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Why are you deleting your account?</Label>
                  <RadioGroup 
                    value={deleteReason} 
                    onValueChange={setDeleteReason}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="too-expensive" id="r1" />
                      <Label htmlFor="r1">Too expensive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-useful" id="r2" />
                      <Label htmlFor="r2">Not useful for my needs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="different-service" id="r3" />
                      <Label htmlFor="r3">Switching to a different service</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="r4" />
                      <Label htmlFor="r4">Other reason</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delete-confirmation" className="text-destructive">
                    Type "DELETE" to confirm
                  </Label>
                  <Input 
                    id="delete-confirmation" 
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="DELETE"
                    className="border-destructive focus-visible:ring-destructive"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE"}
                >
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

function RadioGroup({ className, ...props }: React.ComponentProps<"div"> & { value?: string; onValueChange?: (value: string) => void }) {
  return <div className={className} {...props} />;
}
