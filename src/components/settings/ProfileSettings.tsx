
import { useState } from "react";
import { User, Upload, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";

export function ProfileSettings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [timeZone, setTimeZone] = useState("UTC−08:00");
  const [language, setLanguage] = useState("en");
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your personal account settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                <User className="h-12 w-12 text-muted-foreground" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label htmlFor="profilePicture" className="cursor-pointer flex flex-col items-center justify-center text-white text-xs">
                    <Upload className="h-5 w-5 mb-1" />
                    <span>Upload</span>
                  </label>
                  <input id="profilePicture" type="file" className="hidden" accept="image/*" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max size.</p>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm">Upload</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          </div>
          
          {/* Name & Email */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1.5"
                readOnly 
              />
              <p className="text-xs text-muted-foreground mt-1.5">Email is managed by your organization.</p>
            </div>
          </div>
          
          {/* Timezone & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger id="timezone" className="mt-1.5">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC−12:00">UTC−12:00</SelectItem>
                  <SelectItem value="UTC−11:00">UTC−11:00</SelectItem>
                  <SelectItem value="UTC−10:00">UTC−10:00</SelectItem>
                  <SelectItem value="UTC−09:00">UTC−09:00</SelectItem>
                  <SelectItem value="UTC−08:00">UTC−08:00 (Pacific)</SelectItem>
                  <SelectItem value="UTC−07:00">UTC−07:00 (Mountain)</SelectItem>
                  <SelectItem value="UTC−06:00">UTC−06:00 (Central)</SelectItem>
                  <SelectItem value="UTC−05:00">UTC−05:00 (Eastern)</SelectItem>
                  <SelectItem value="UTC−04:00">UTC−04:00</SelectItem>
                  <SelectItem value="UTC±00:00">UTC±00:00 (GMT)</SelectItem>
                  <SelectItem value="UTC+01:00">UTC+01:00 (CET)</SelectItem>
                  <SelectItem value="UTC+02:00">UTC+02:00</SelectItem>
                  <SelectItem value="UTC+03:00">UTC+03:00</SelectItem>
                  <SelectItem value="UTC+05:30">UTC+05:30 (India)</SelectItem>
                  <SelectItem value="UTC+08:00">UTC+08:00 (China)</SelectItem>
                  <SelectItem value="UTC+09:00">UTC+09:00 (Japan)</SelectItem>
                  <SelectItem value="UTC+10:00">UTC+10:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="mt-1.5">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="nl">Nederlands</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div>
            <Label htmlFor="theme">Theme Preference</Label>
            <div className="flex items-center gap-4 mt-2">
              <Toggle 
                pressed={!isDarkMode} 
                onPressedChange={() => setIsDarkMode(false)}
                variant="outline"
                size="lg"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Light mode"
              >
                <Sun className="h-5 w-5" />
                <span className="ml-2">Light</span>
              </Toggle>
              
              <Toggle 
                pressed={isDarkMode} 
                onPressedChange={() => setIsDarkMode(true)}
                variant="outline"
                size="lg"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Dark mode"
              >
                <Moon className="h-5 w-5" />
                <span className="ml-2">Dark</span>
              </Toggle>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" className="mt-1.5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="mt-1.5" />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" className="mt-1.5" />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
