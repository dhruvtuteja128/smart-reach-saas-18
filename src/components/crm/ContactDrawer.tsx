
import { Contact } from "@/types/communication";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { 
  Edit, Mail, Phone, MapPin, Calendar, MessageSquare, Zap
} from "lucide-react";
import { Timeline } from "@/components/crm/Timeline";
import { mockInteractions } from "@/data/mock-crm-data";

interface ContactDrawerProps {
  contact: Contact;
  onClose: () => void;
}

export function ContactDrawer({ contact, onClose }: ContactDrawerProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "High Potential";
    if (score >= 60) return "Good Fit";
    if (score >= 40) return "Average";
    return "Low Fit";
  };
  
  const aiInsight = getAiInsight(contact);
  
  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Contact Details</SheetTitle>
          <SheetDescription>
            View and edit contact information
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {/* Contact Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="text-lg">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                {contact.company && (
                  <p className="text-muted-foreground">{contact.company}</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Contact Status & Score */}
          <div className="flex items-center justify-between mb-6">
            <Badge className="px-3 py-1 font-normal">
              {contact.status || 'Lead'}
            </Badge>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Score:</span>
              <span className={getScoreColor(contact.score || 0)}>
                {contact.score || 0}
              </span>
              <span className="text-xs bg-muted px-2 rounded-full">
                {getScoreLabel(contact.score || 0)}
              </span>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border rounded-lg p-4 mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{contact.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Added {formatDate(contact.lastActivity)}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1">
              {contact.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6 text-xs">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium mb-1">AI Insights</h3>
                <p className="text-sm text-muted-foreground">{aiInsight}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <Zap className="mr-2 h-4 w-4" />
              Add to Workflow
            </Button>
          </div>
          
          {/* Tabs for different views */}
          <Tabs defaultValue="timeline">
            <TabsList className="w-full">
              <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
              <TabsTrigger value="deals" className="flex-1">Deals</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="mt-4">
              <Timeline interactions={mockInteractions.filter(i => i.contactId === contact.id)} />
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="text-center py-6 text-muted-foreground">
                <p>No notes yet</p>
                <Button variant="outline" className="mt-2">Add Note</Button>
              </div>
            </TabsContent>
            <TabsContent value="deals" className="mt-4">
              <div className="text-center py-6 text-muted-foreground">
                <p>No deals associated</p>
                <Button variant="outline" className="mt-2">Create Deal</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Never';
  
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
}

function getAiInsight(contact: Contact): string {
  const insights = [
    "This contact has shown high engagement with email campaigns but hasn't responded to social media outreach.",
    "Based on recent activity, this lead is most likely to convert if sent a limited-time offer.",
    "This contact has similar behavior patterns to customers who upgraded to premium plans.",
    "This contact engages most during business hours between 9-11am and might respond well to morning outreach.",
    "This lead has interacted with pricing pages multiple times but hasn't started a trial - consider offering a demo."
  ];
  
  // Using contact ID to deterministically choose an insight
  const index = parseInt(contact.id.charAt(0), 16) % insights.length;
  return insights[index];
}
