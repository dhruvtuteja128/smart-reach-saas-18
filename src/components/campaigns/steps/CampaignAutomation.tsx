
import { useState } from "react";
import { useCampaign } from "@/components/campaigns/CampaignContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, Plus, CalendarDays, LayoutGrid } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const CampaignAutomation = () => {
  const { campaign, updateAutomation } = useCampaign();
  const [date, setDate] = useState<Date | undefined>(campaign.automation.scheduledDate);
  
  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    updateAutomation({ scheduledDate: date });
  };

  const handleTimingChange = (value: string) => {
    updateAutomation({ timing: value as "now" | "scheduled" | "recurring" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Step 4: Automation & Timing</h2>
      <p className="text-muted-foreground mb-6">Configure when and how your campaign will run</p>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium block mb-3">When should this campaign be sent?</Label>
          <RadioGroup
            value={campaign.automation.timing}
            onValueChange={handleTimingChange}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className={`relative p-4 cursor-pointer border-2 ${campaign.automation.timing === "now" ? "border-primary" : "border-transparent"}`}>
              <RadioGroupItem
                value="now"
                id="timing-now"
                className="absolute top-4 right-4"
              />
              <div className="mb-2 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <Label htmlFor="timing-now" className="text-base font-medium cursor-pointer">
                Send Immediately
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Send to all recipients as soon as you launch
              </p>
            </Card>
            
            <Card className={`relative p-4 cursor-pointer border-2 ${campaign.automation.timing === "scheduled" ? "border-primary" : "border-transparent"}`}>
              <RadioGroupItem
                value="scheduled"
                id="timing-scheduled"
                className="absolute top-4 right-4"
              />
              <div className="mb-2 text-primary">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <Label htmlFor="timing-scheduled" className="text-base font-medium cursor-pointer">
                Schedule for Later
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Send on a specific date and time
              </p>
            </Card>
            
            <Card className={`relative p-4 cursor-pointer border-2 ${campaign.automation.timing === "recurring" ? "border-primary" : "border-transparent"}`}>
              <RadioGroupItem
                value="recurring"
                id="timing-recurring"
                className="absolute top-4 right-4"
              />
              <div className="mb-2 text-primary">
                <CalendarDays className="h-8 w-8" />
              </div>
              <Label htmlFor="timing-recurring" className="text-base font-medium cursor-pointer">
                Recurring Campaign
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Send on a regular schedule
              </p>
            </Card>
          </RadioGroup>
        </div>
        
        {campaign.automation.timing === "scheduled" && (
          <Card className="p-4">
            <h3 className="font-medium mb-3">Schedule Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Time</Label>
                <Select defaultValue="9">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
        
        {campaign.automation.timing === "recurring" && (
          <Card className="p-4">
            <h3 className="font-medium mb-3">Recurring Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Starting From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </Card>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-medium">Automation Rules</Label>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Rule
            </Button>
          </div>
          
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center">
              <LayoutGrid className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No automation rules added</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Add rules like "Wait X days after previous message" or "If user clicked → Send follow-up"
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Automation Rule
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
