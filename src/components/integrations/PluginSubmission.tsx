
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Upload, AlertCircle, CheckCircle2, Clock, ShieldCheck, Clipboard, ClipboardCopy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function PluginSubmission() {
  const [submissionType, setSubmissionType] = useState("community");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!agreeToTerms) {
      toast({
        title: "Terms and conditions required",
        description: "Please agree to the terms and conditions before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulated submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Plugin submitted successfully",
        description: "Your plugin has been submitted for review. We'll notify you once it's approved."
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/40 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-2">Submit Your Plugin</h2>
        <p className="text-muted-foreground">
          Submit your plugin for review and make it available to users after approval.
        </p>
      </div>
      
      <Tabs defaultValue="checklist">
        <TabsList>
          <TabsTrigger value="checklist">Submission Checklist</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="submission-form">Submission Form</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checklist" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Submission Checklist
              </CardTitle>
              <CardDescription>
                Ensure your plugin meets all requirements before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Plugin Manifest</h3>
                  <p className="text-sm text-muted-foreground">
                    Your plugin must have a valid plugin.json file with all required fields
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Endpoint Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Your API endpoint must be publicly accessible and use HTTPS
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Include clear documentation on how to use your plugin and what it does
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Error Handling</h3>
                  <p className="text-sm text-muted-foreground">
                    Your plugin must handle errors gracefully and return appropriate status codes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Only request permissions that are necessary for your plugin's functionality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" /> Review Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-medium text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Automated Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated checks for manifest validity, endpoint availability, and basic functionality.
                    <span className="block mt-1 text-xs">Est. time: Immediate</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-medium text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Security Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Manual review of your plugin for security vulnerabilities and permission scope.
                    <span className="block mt-1 text-xs">Est. time: 1-3 business days</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-medium text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Functional Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Testing of your plugin's functionality, user experience, and API reliability.
                    <span className="block mt-1 text-xs">Est. time: 2-4 business days</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-medium text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Final Approval & Publishing</h3>
                  <p className="text-sm text-muted-foreground">
                    Your plugin is approved and published to the marketplace.
                    <span className="block mt-1 text-xs">Est. time: 1 business day after passing all reviews</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Plugin Guidelines
              </CardTitle>
              <CardDescription>
                Follow these guidelines to ensure your plugin meets our standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Functionality & Performance</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>Plugins must provide clear value to users</li>
                      <li>Functionality must match the description</li>
                      <li>Plugins must respond within a reasonable time frame (under 5 seconds)</li>
                      <li>Include proper error handling for all possible failure cases</li>
                      <li>Implement rate limiting to prevent abuse</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Security & Privacy</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>All endpoints must use HTTPS with valid SSL certificates</li>
                      <li>Only collect user data necessary for the plugin's functionality</li>
                      <li>Clearly disclose what data is collected and how it is used</li>
                      <li>Implement proper authentication and authorization</li>
                      <li>Store sensitive data securely and encrypt it in transit</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">User Experience</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>Provide clear and concise descriptions of your plugin's functionality</li>
                      <li>Use appropriate language and tone for a professional audience</li>
                      <li>Minimize user friction by reducing the number of required steps</li>
                      <li>Provide helpful error messages that guide users to resolution</li>
                      <li>Include documentation on how to use your plugin effectively</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Content Restrictions</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>No adult, offensive, or inappropriate content</li>
                      <li>No plugins that promote illegal activities</li>
                      <li>No misleading functionality or descriptions</li>
                      <li>No malware, spyware, or other harmful code</li>
                      <li>No plugins that impersonate other services or brands without permission</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Technical Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>Follow our API formats and schema requirements</li>
                      <li>Maintain compatibility with the latest version of our AI Assistant</li>
                      <li>Implement proper versioning for your plugin</li>
                      <li>Ensure your plugin remains operational and maintained</li>
                      <li>Provide support contact information for users</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submission-form" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" /> Plugin Submission
              </CardTitle>
              <CardDescription>
                Provide additional information for the review process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="submission-type" className="mb-2 block">Submission Type</Label>
                <Tabs value={submissionType} onValueChange={setSubmissionType} className="w-full">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="community">
                      Community Plugin
                    </TabsTrigger>
                    <TabsTrigger value="verified">
                      Verified Plugin
                      <Badge variant="outline" className="ml-2 bg-primary/10">Premium</Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  {submissionType === "community" ? (
                    "Community plugins are open to all developers and undergo standard review."
                  ) : (
                    "Verified plugins undergo enhanced security reviews and receive priority support."
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="test-account" className="mb-2 block">Test Account Information (Optional)</Label>
                <Textarea 
                  id="test-account"
                  placeholder="Provide test account credentials for our review team if your plugin requires authentication..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This information will only be used during the review process.
                </p>
              </div>
              
              <div>
                <Label htmlFor="additional-notes" className="mb-2 block">Additional Notes</Label>
                <Textarea 
                  id="additional-notes"
                  placeholder="Any additional information or special instructions for reviewers..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="agree-terms" 
                  checked={agreeToTerms} 
                  onCheckedChange={setAgreeToTerms}
                />
                <Label htmlFor="agree-terms" className="text-sm cursor-pointer">
                  I agree to the <a href="#" className="text-primary hover:underline">Developer Terms of Service</a> and <a href="#" className="text-primary hover:underline">Plugin Guidelines</a>
                </Label>
              </div>
              
              {submissionType === "verified" && (
                <div className="flex items-start gap-3 p-3 rounded-md bg-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">
                    Verified plugins require additional review and may include a fee. Our team will contact you with details after submission.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigator.clipboard.writeText("plugin-submission-v1")}>
                <ClipboardCopy className="mr-2 h-4 w-4" />
                Copy Submission ID
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Clipboard className="mr-2 h-4 w-4 animate-pulse" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Plugin
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
