
import { useState } from "react";
import { useCampaign } from "@/components/campaigns/CampaignContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Layers, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock audience segments
const audienceSegments = [
  { id: "all", name: "All Contacts", count: 1842 },
  { id: "active", name: "Active Customers", count: 967 },
  { id: "inactive", name: "Inactive Users", count: 453 },
  { id: "new-leads", name: "New Leads (Last 30 Days)", count: 124 },
  { id: "high-value", name: "High Value Customers", count: 86 },
];

export const CampaignAudience = () => {
  const { campaign, updateCampaign } = useCampaign();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(campaign.audienceSegment);
  const [showFilters, setShowFilters] = useState(false);

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    const segment = audienceSegments.find(s => s.id === segmentId);
    updateCampaign({ 
      audienceSegment: segmentId,
      audienceSize: segment ? segment.count : 0
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Step 2: Choose Audience</h2>
      <p className="text-muted-foreground mb-6">Select the audience for your campaign</p>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-primary mr-2" />
          <span className="font-medium">Select from saved segments</span>
        </div>
        <div className="relative">
          <Search className="h-4 w-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-muted-foreground" />
          <Input className="pl-9 w-[250px]" placeholder="Search segments..." />
        </div>
      </div>
      
      <RadioGroup
        value={selectedSegment || ""}
        onValueChange={handleSegmentSelect}
        className="space-y-3"
      >
        {audienceSegments.map((segment) => (
          <Card 
            key={segment.id}
            className={`cursor-pointer transition-all ${
              selectedSegment === segment.id 
                ? "border-primary ring-2 ring-primary ring-opacity-50" 
                : "hover:border-primary/50"
            }`}
          >
            <div className="flex items-center p-4">
              <RadioGroupItem 
                value={segment.id} 
                id={`segment-${segment.id}`}
                className="mr-4"
              />
              <div className="flex flex-1 justify-between items-center">
                <Label 
                  htmlFor={`segment-${segment.id}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {segment.name}
                </Label>
                <Badge variant="secondary">{segment.count} contacts</Badge>
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>
      
      <div className="mt-6 flex flex-col border rounded-lg">
        <div 
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">Add audience filters</span>
          </div>
          <Badge variant="outline">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Badge>
        </div>
        
        {showFilters && (
          <div className="p-4 border-t bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Location</Label>
                <Input placeholder="E.g., New York, California" className="mt-1" />
              </div>
              <div>
                <Label>Tags</Label>
                <Input placeholder="E.g., VIP, Interested, Cold lead" className="mt-1" />
              </div>
              <div>
                <Label>Last activity</Label>
                <Input placeholder="E.g., > 30 days ago" className="mt-1" />
              </div>
              <div>
                <Label>Purchase history</Label>
                <Input placeholder="E.g., Purchased Product X" className="mt-1" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Layers className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">Campaign audience</span>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {selectedSegment ? audienceSegments.find(s => s.id === selectedSegment)?.count || 0 : 0} contacts
          </Badge>
        </div>
      </div>
    </div>
  );
};
