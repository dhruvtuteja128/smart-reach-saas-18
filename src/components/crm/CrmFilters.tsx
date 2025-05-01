
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SaveIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CrmFilters() {
  const { toast } = useToast();
  const [filterName, setFilterName] = useState("");
  
  const handleSaveSegment = () => {
    if (!filterName.trim()) {
      toast({
        title: "Segment name required",
        description: "Please enter a name for this segment",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Segment saved",
      description: `The segment "${filterName}" has been saved successfully`
    });
    
    setFilterName("");
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Filter Contacts
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any status</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Source</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any source</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="chat">Website Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Lead Score</label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Min" className="w-full" />
              <span className="text-muted-foreground">to</span>
              <Input type="number" placeholder="Max" className="w-full" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hot-lead">Hot Lead</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="trial">Trial User</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Activity</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input placeholder="City, state, or country" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Campaign Engagement</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="opened" />
              <label
                htmlFor="opened"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Opened any campaign
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="clicked" />
              <label
                htmlFor="clicked"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Clicked any link
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="replied" />
              <label
                htmlFor="replied"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Replied to a campaign
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="converted" />
              <label
                htmlFor="converted"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Converted from campaign
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Name this segment to save" 
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" onClick={handleSaveSegment}>
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Segment
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
