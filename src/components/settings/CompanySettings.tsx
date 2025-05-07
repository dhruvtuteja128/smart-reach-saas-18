
import { useState } from "react";
import { Building2, Upload, Clock, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function CompanySettings() {
  const [companyName, setCompanyName] = useState("Acme Inc");
  const [industry, setIndustry] = useState("technology");
  const [senderName, setSenderName] = useState("Acme Support");
  const [senderEmail, setSenderEmail] = useState("support@acme.com");
  const [timeZone, setTimeZone] = useState("UTC−08:00");
  const [selectedColor, setSelectedColor] = useState("#9b87f5");
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    push: false,
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <p className="text-muted-foreground">Manage your workspace preferences and branding</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Set your company details and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 rounded-md bg-muted flex items-center justify-center overflow-hidden border">
                <Building2 className="h-12 w-12 text-muted-foreground" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label htmlFor="companyLogo" className="cursor-pointer flex flex-col items-center justify-center text-white text-xs">
                    <Upload className="h-5 w-5 mb-1" />
                    <span>Upload</span>
                  </label>
                  <input id="companyLogo" type="file" className="hidden" accept="image/*" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Company Logo</h3>
              <p className="text-sm text-muted-foreground">PNG or SVG recommended. 2MB max size.</p>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm">Upload</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          </div>
          
          {/* Company Name & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
            
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry" className="mt-1.5">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Professional Services</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Communication Settings</CardTitle>
          <CardDescription>Configure default channels and sender information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Default Channels */}
          <div className="space-y-3">
            <Label className="text-base">Default Communication Channels</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email" 
                  checked={channels.email} 
                  onCheckedChange={(checked) => setChannels({...channels, email: !!checked})} 
                />
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sms" 
                  checked={channels.sms} 
                  onCheckedChange={(checked) => setChannels({...channels, sms: !!checked})} 
                />
                <label htmlFor="sms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  SMS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="whatsapp" 
                  checked={channels.whatsapp} 
                  onCheckedChange={(checked) => setChannels({...channels, whatsapp: !!checked})} 
                />
                <label htmlFor="whatsapp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  WhatsApp
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="push" 
                  checked={channels.push} 
                  onCheckedChange={(checked) => setChannels({...channels, push: !!checked})} 
                />
                <label htmlFor="push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Push Notifications
                </label>
              </div>
            </div>
          </div>
          
          {/* Sender Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="senderName">Default Sender Name</Label>
              <Input 
                id="senderName" 
                value={senderName} 
                onChange={(e) => setSenderName(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
            
            <div>
              <Label htmlFor="senderEmail">Default Sender Email</Label>
              <Input 
                id="senderEmail" 
                value={senderEmail} 
                onChange={(e) => setSenderEmail(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
          </div>
          
          {/* Brand Color */}
          <div>
            <Label htmlFor="brandColor" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Brand Color
            </Label>
            <div className="flex items-center gap-4 mt-1.5">
              <Input 
                id="brandColor" 
                type="color" 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input 
                value={selectedColor.toUpperCase()} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-28" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
          <CardDescription>Set your company's working hours and time zone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-sm font-medium">Business Hours</h3>
          </div>
          
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
            
            <div className="flex flex-col">
              <Label>Working Days</Label>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <Button 
                    key={day}
                    variant={i < 5 ? "secondary" : "outline"} 
                    className="px-3 py-1 h-8"
                    size="sm"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="startTime">Opening Hours</Label>
              <Input 
                id="startTime" 
                type="time"
                defaultValue="09:00" 
                className="mt-1.5" 
              />
            </div>
            
            <div>
              <Label htmlFor="endTime">Closing Hours</Label>
              <Input 
                id="endTime" 
                type="time"
                defaultValue="17:00" 
                className="mt-1.5" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
