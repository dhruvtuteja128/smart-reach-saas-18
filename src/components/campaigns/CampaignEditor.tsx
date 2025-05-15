
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Save, Image, Link, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data from campaigns
const mockCampaignDetails = {
  "c1": {
    id: "c1",
    name: "Summer Sale Email Campaign",
    type: "email",
    status: "draft",
    content: "# Summer Sale is Here! \n\nDear valued customer,\n\nWe're excited to announce our biggest summer sale yet! Get up to 50% off on all products for a limited time.\n\nShop now to take advantage of these incredible deals before they're gone.\n\n## Featured Products:\n\n- Summer Collection T-shirts\n- Beach Accessories\n- Outdoor Furniture\n\n[SHOP NOW](#) | [VIEW CATALOG](#)",
    subject: "🔥 Summer Sale: Up to 50% Off Everything!",
    audience: "All Customers",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-10",
  },
  "c2": {
    id: "c2",
    name: "New Product Launch - Facebook",
    type: "ads",
    status: "scheduled",
    content: "**Introducing Our Revolutionary New Product!**\n\n*Transform your daily routine with the incredible features of our latest innovation.*\n\nLimited time offer: Get 15% off when you pre-order today!\n\n[LEARN MORE](#) | [PRE-ORDER NOW](#)",
    audience: "Interests: Technology, Innovation",
    scheduledDate: "2025-05-20",
    createdAt: "2025-05-05",
    updatedAt: "2025-05-12",
  },
  "c3": {
    id: "c3",
    name: "Weekend Flash Sale SMS",
    type: "sms",
    status: "running",
    content: "FLASH SALE! 24hrs only: Use code WEEKEND30 for 30% off storewide. Shop now: https://example.com/sale",
    audience: "SMS Subscribers",
    scheduledDate: "2025-05-15",
    createdAt: "2025-05-07",
    updatedAt: "2025-05-15",
  },
  "c4": {
    id: "c4",
    name: "Customer Support Follow-up",
    type: "whatsapp",
    status: "completed",
    content: "Hello! Thanks for contacting our support team. How would you rate your experience with us today? Reply with a number from 1-5, with 5 being excellent.",
    audience: "Recent Support Tickets",
    createdAt: "2025-04-28",
    updatedAt: "2025-05-12",
  }
};

export const CampaignEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialCampaign = id && mockCampaignDetails[id] ? mockCampaignDetails[id] : null;
  
  const [name, setName] = useState(initialCampaign?.name || "");
  const [content, setContent] = useState(initialCampaign?.content || "");
  const [subject, setSubject] = useState(initialCampaign?.subject || "");
  const [audience, setAudience] = useState(initialCampaign?.audience || "");
  const [activeTab, setActiveTab] = useState("content");
  const [isDirty, setIsDirty] = useState(false);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Effect for auto-saving
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (isDirty) {
        handleAutoSave();
      }
    }, 5000); // Auto-save after 5 seconds of inactivity
    
    return () => clearTimeout(autoSaveTimer);
  }, [name, content, subject, audience, isDirty]);
  
  // Set isDirty when any field changes
  useEffect(() => {
    if (initialCampaign) {
      if (
        name !== initialCampaign.name ||
        content !== initialCampaign.content ||
        subject !== initialCampaign.subject ||
        audience !== initialCampaign.audience
      ) {
        setIsDirty(true);
      }
    } else {
      // New campaign
      if (name || content || subject || audience) {
        setIsDirty(true);
      }
    }
  }, [name, content, subject, audience, initialCampaign]);
  
  const handleAutoSave = () => {
    setIsAutosaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAutosaving(false);
      setIsDirty(false);
      setLastSaved(new Date());
    }, 800);
  };

  const handleSave = () => {
    // In a real app, save to API
    toast({
      description: "Campaign saved successfully"
    });
    setIsDirty(false);
    setLastSaved(new Date());
  };
  
  const handleSaveAndExit = () => {
    handleSave();
    navigate(`/campaigns/${id ? id : 'new'}/view`);
  };

  const handlePreview = () => {
    // In a real app, generate a preview
    toast({
      description: "Opening campaign preview..."
    });
  };

  // Function to add formatting to the content textarea
  const addFormatting = (type: 'bold' | 'italic' | 'link' | 'image' | 'heading' | 'list') => {
    let formattingText = '';
    
    switch (type) {
      case 'bold':
        formattingText = '**Bold Text**';
        break;
      case 'italic':
        formattingText = '*Italic Text*';
        break;
      case 'link':
        formattingText = '[Link Text](https://example.com)';
        break;
      case 'image':
        formattingText = '![Alt Text](https://example.com/image.jpg)';
        break;
      case 'heading':
        formattingText = '## Heading';
        break;
      case 'list':
        formattingText = '- List Item 1\n- List Item 2\n- List Item 3';
        break;
      default:
        break;
    }
    
    setContent((prev) => prev + '\n' + formattingText);
  };
  
  if (!initialCampaign && id) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
        <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/campaigns')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/campaigns/${id ? id : ''}`)} className="flex-shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          
          <h1 className="text-2xl font-bold">{id ? 'Edit Campaign' : 'New Campaign'}</h1>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isAutosaving && <span>Saving...</span>}
          {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter campaign name"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Campaign Content</TabsTrigger>
          <TabsTrigger value="settings">Campaign Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Content Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => addFormatting('bold')}>
                    B
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFormatting('italic')}>
                    I
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFormatting('heading')}>
                    H
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFormatting('link')}>
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFormatting('image')}>
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFormatting('list')}>
                    • • •
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your campaign content here..."
                className="min-h-[400px]"
              />
            </CardContent>
            <CardFooter className="border-t flex justify-between">
              <div className="text-sm text-muted-foreground">
                Supports markdown formatting
              </div>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(initialCampaign?.type === 'email' || !initialCampaign) && (
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input 
                    id="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    placeholder="Enter subject line"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input 
                  id="audience" 
                  value={audience} 
                  onChange={(e) => setAudience(e.target.value)} 
                  placeholder="Enter target audience"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={handleSaveAndExit}>
          <Check className="h-4 w-4 mr-2" />
          Save & Exit
        </Button>
      </div>
    </div>
  );
};
