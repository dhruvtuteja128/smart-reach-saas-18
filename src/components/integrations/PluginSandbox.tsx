
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Code, Play, Eye, ClipboardCopy, Clock, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TestResult = {
  status: "success" | "error" | "pending";
  requestTime?: number;
  response?: any;
  error?: string;
};

export function PluginSandbox() {
  const [endpoint, setEndpoint] = useState("");
  const [requestBody, setRequestBody] = useState(JSON.stringify({
    action: "test",
    parameters: {
      key: "value"
    }
  }, null, 2));
  const [headers, setHeaders] = useState(JSON.stringify({
    "Content-Type": "application/json"
  }, null, 2));
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  
  const handleTest = async () => {
    if (!endpoint) {
      toast({
        title: "Endpoint required",
        description: "Please enter an API endpoint to test",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setResult({ status: "pending" });
    
    try {
      // Parse headers
      let parsedHeaders = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (e) {
        throw new Error("Invalid headers JSON");
      }
      
      // Parse body
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        throw new Error("Invalid request body JSON");
      }
      
      const startTime = performance.now();
      
      // In a real implementation, this would make an actual API call
      // For demo purposes, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const endTime = performance.now();
      const requestTime = Math.round(endTime - startTime);
      
      // Simulate successful response
      if (endpoint.includes("error")) {
        throw new Error("API returned an error");
      }
      
      setResult({
        status: "success",
        requestTime,
        response: {
          success: true,
          message: "Plugin request processed successfully",
          data: {
            id: "plugin-123",
            timestamp: new Date().toISOString(),
            result: "Operation completed"
          }
        }
      });
      
      setActiveTab("response");
      toast({
        title: "Test successful",
        description: `Request completed in ${requestTime}ms`
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      
      setResult({
        status: "error",
        error: message
      });
      
      setActiveTab("response");
      toast({
        title: "Test failed",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyResponse = () => {
    if (result?.response) {
      navigator.clipboard.writeText(JSON.stringify(result.response, null, 2));
      toast({ title: "Response copied to clipboard" });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Plugin Sandbox
          </CardTitle>
          <CardDescription>
            Test your plugin API endpoints in a sandboxed environment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input 
              id="endpoint"
              placeholder="https://api.example.com/plugin"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="request" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Request
              </TabsTrigger>
              <TabsTrigger value="headers" className="flex items-center gap-1">
                <ClipboardCopy className="h-4 w-4" />
                Headers
              </TabsTrigger>
              <TabsTrigger value="response" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                Response
                {result && (
                  <Badge 
                    variant={result.status === "success" ? "default" : "destructive"} 
                    className="ml-2"
                  >
                    {result.status}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="request" className="space-y-2 mt-4">
              <Label htmlFor="request-body">Request Body (JSON)</Label>
              <Textarea 
                id="request-body" 
                className="font-mono h-[300px]" 
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="headers" className="space-y-2 mt-4">
              <Label htmlFor="headers">Request Headers (JSON)</Label>
              <Textarea 
                id="headers" 
                className="font-mono h-[300px]" 
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="response" className="space-y-4 mt-4">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {result.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : result.status === "error" ? (
                        <XCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      <span className="font-medium">
                        {result.status === "success" 
                          ? "Success" 
                          : result.status === "error" 
                            ? "Error" 
                            : "Processing..."}
                      </span>
                    </div>
                    
                    {result.requestTime && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{result.requestTime}ms</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-auto max-h-[300px]">
                    {result.status === "success" ? (
                      <pre>{JSON.stringify(result.response, null, 2)}</pre>
                    ) : result.status === "error" ? (
                      <div className="text-destructive">{result.error}</div>
                    ) : (
                      <div>Processing request...</div>
                    )}
                  </div>
                  
                  {result.status === "success" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyResponse}
                      className="flex items-center gap-1"
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      Copy Response
                    </Button>
                  )}
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center text-muted-foreground">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p>Send a request to see the response</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            disabled={isLoading} 
            onClick={handleTest}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Test API
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Testing Options</CardTitle>
          <CardDescription>
            Configure additional testing parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-background">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Mock Data</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-sm text-muted-foreground">
                  Generate realistic test data for your plugin
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm">Generate Data</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-background">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Schema Validation</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-sm text-muted-foreground">
                  Validate your plugin's input/output schema
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm">Validate Schema</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-background">
              <CardHeader className="py-3">
                <CardTitle className="text-base">AI Integration Test</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-sm text-muted-foreground">
                  Test how your plugin interacts with the AI
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm">Run Integration Test</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
