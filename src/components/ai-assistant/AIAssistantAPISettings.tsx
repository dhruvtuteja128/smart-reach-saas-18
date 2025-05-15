import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Loader, Check, XCircle, AlertTriangle, Terminal, Shield, Clock } from "lucide-react";
import { useOpenAI } from "@/contexts/OpenAIContext";
import { DEFAULT_MODEL } from "@/lib/openai";

export function AIAssistantAPISettings() {
  const { isApiKeyValid, isApiAvailable, isTestingConnection, testConnection, errorMessage, lastChecked } = useOpenAI();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState("sk-proj-**************************************************");

  const formatLastChecked = () => {
    if (!lastChecked) return "Never";
    
    // If checked today, show time
    const now = new Date();
    if (lastChecked.toDateString() === now.toDateString()) {
      return `Today at ${lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date
    return lastChecked.toLocaleDateString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" /> OpenAI API Configuration
        </CardTitle>
        <CardDescription>
          Configure OpenAI API settings for AI assistant and campaign generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {isApiKeyValid && isApiAvailable && (
          <Alert className="border-green-500 bg-green-500/10">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>Connected</AlertTitle>
            <AlertDescription>
              OpenAI API connection is active and working correctly.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Show key</span>
              <Switch
                id="show-key"
                checked={showApiKey}
                onCheckedChange={setShowApiKey}
              />
            </div>
          </div>
          <Input
            id="apiKey"
            type={showApiKey ? "text" : "password"}
            value={apiKeyValue}
            onChange={(e) => setApiKeyValue(e.target.value)}
            className="font-mono"
            disabled={true}
          />
          <p className="text-xs text-muted-foreground">
            Your API key is securely stored. This field is read-only.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">AI Model</Label>
          <Input id="model" value={DEFAULT_MODEL} disabled />
          <p className="text-xs text-muted-foreground">
            Using the latest OpenAI model for optimal performance.
          </p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last checked: {formatLastChecked()}</span>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs ${isApiAvailable ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
            {isApiAvailable ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="space-y-2 border p-3 rounded-md bg-muted/30">
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 mt-0.5 text-blue-500" />
            <div>
              <h4 className="text-sm font-semibold">Security Note</h4>
              <p className="text-xs text-muted-foreground">
                Your API key is securely stored and never exposed to frontend code. All API calls are proxied through our secure backend.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={testConnection}
          disabled={isTestingConnection}
        >
          {isTestingConnection ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
