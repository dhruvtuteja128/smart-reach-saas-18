
import { useState } from "react";
import { Settings2, Clock, Activity, BarChart4, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AutomationSettings() {
  const [aiOptimization, setAiOptimization] = useState(true);
  const [dedupeThreshold, setDedupeThreshold] = useState(80);
  const [concurrentWorkflows, setConcurrentWorkflows] = useState(5);
  const [defaultDelayHours, setDefaultDelayHours] = useState(24);
  const [defaultDelayMinutes, setDefaultDelayMinutes] = useState(0);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Automation Preferences</h2>
        <p className="text-muted-foreground">Configure how your marketing automations behave</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Default Delay Times
            </CardTitle>
            <CardDescription>Set the default wait times for automation steps</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-delay">Default Delay Between Steps</Label>
            <div className="flex gap-2 items-center">
              <Input 
                type="number" 
                id="default-delay-hours"
                value={defaultDelayHours}
                onChange={e => setDefaultDelayHours(parseInt(e.target.value) || 0)}
                className="w-20"
                min="0"
                max="72"
              />
              <span className="text-sm">hours</span>
              
              <Input 
                type="number" 
                id="default-delay-minutes"
                value={defaultDelayMinutes}
                onChange={e => setDefaultDelayMinutes(parseInt(e.target.value) || 0)}
                className="w-20 ml-2"
                min="0"
                max="59"
              />
              <span className="text-sm">minutes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This is the default time that will be used for "Wait" steps in your automations.
            </p>
          </div>
          
          <div className="space-y-4 pt-2">
            <Label>Common Delay Presets</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { setDefaultDelayHours(1); setDefaultDelayMinutes(0); }}
              >
                1 hour
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setDefaultDelayHours(4); setDefaultDelayMinutes(0); }}
              >
                4 hours
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setDefaultDelayHours(24); setDefaultDelayMinutes(0); }}
              >
                1 day
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setDefaultDelayHours(48); setDefaultDelayMinutes(0); }}
              >
                2 days
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setDefaultDelayHours(72); setDefaultDelayMinutes(0); }}
              >
                3 days
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setDefaultDelayHours(168); setDefaultDelayMinutes(0); }}
              >
                1 week
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Timing Considerations</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="respect-hours" className="cursor-pointer">
                    Respect business hours
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          When enabled, automations will only send messages during your company's business hours.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="respect-hours" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="timezone-adjust" className="cursor-pointer">
                    Adjust for recipient's timezone
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          When enabled, automations will adjust send times based on the recipient's timezone when available.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="timezone-adjust" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              Workflow Execution
            </CardTitle>
            <CardDescription>Configure how your automations run</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="concurrent-workflows">Maximum Concurrent Workflows</Label>
              <span className="font-medium text-sm">{concurrentWorkflows}</span>
            </div>
            <Slider 
              id="concurrent-workflows"
              min={1} 
              max={20} 
              step={1}
              value={[concurrentWorkflows]}
              onValueChange={value => setConcurrentWorkflows(value[0])}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum number of workflows that can run simultaneously.
            </p>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Error Handling</Label>
            <Select defaultValue="retry">
              <SelectTrigger>
                <SelectValue placeholder="Select error handling strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retry">Retry (up to 3 times)</SelectItem>
                <SelectItem value="skip">Skip and continue</SelectItem>
                <SelectItem value="stop">Stop workflow</SelectItem>
                <SelectItem value="notify">Notify admin only</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              How to handle errors that occur during workflow execution.
            </p>
          </div>
          
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <Switch id="debug-mode" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Enable detailed logging for all workflow executions.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-muted-foreground" />
              Duplicate Detection
            </CardTitle>
            <CardDescription>Configure contact deduplication settings</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="dedupe-threshold">
                Similarity threshold: {dedupeThreshold}%
              </Label>
              <span className="text-xs text-muted-foreground">
                {dedupeThreshold < 50 ? "Low" : dedupeThreshold < 80 ? "Medium" : "High"}
              </span>
            </div>
            <Slider 
              id="dedupe-threshold"
              min={30} 
              max={100} 
              step={1}
              value={[dedupeThreshold]}
              onValueChange={value => setDedupeThreshold(value[0])}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Contacts with email or name similarities above this threshold will be flagged as potential duplicates.
            </p>
          </div>
          
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-merge">Auto-merge exact matches</Label>
              <Switch id="auto-merge" defaultChecked />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Automatically merge contacts with identical email addresses.
            </p>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Fields to Compare</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="compare-email" defaultChecked />
                <Label htmlFor="compare-email">Email Address</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="compare-name" defaultChecked />
                <Label htmlFor="compare-name">Full Name</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="compare-phone" defaultChecked />
                <Label htmlFor="compare-phone">Phone Number</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="compare-company" />
                <Label htmlFor="compare-company">Company</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-muted-foreground" />
              AI Optimization
            </CardTitle>
            <CardDescription>Configure AI-driven campaign improvements</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-optimization" className="text-base">Enable AI Optimization</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Allow AI to automatically optimize campaign performance
              </p>
            </div>
            <Switch 
              id="ai-optimization" 
              checked={aiOptimization}
              onCheckedChange={setAiOptimization}
            />
          </div>
          
          {aiOptimization && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Optimization Focus</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue placeholder="Select optimization focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Maximize Engagement</SelectItem>
                    <SelectItem value="conversion">Maximize Conversions</SelectItem>
                    <SelectItem value="balanced">Balanced Approach</SelectItem>
                    <SelectItem value="retention">Customer Retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-subject">Optimize email subjects</Label>
                  <Switch id="auto-subject" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-send-time">Optimize send times</Label>
                  <Switch id="auto-send-time" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-segment">Auto-segment audience</Label>
                  <Switch id="auto-segment" defaultChecked />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}

// Helper component for Info icon used in tooltips
const Info = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
