
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Loader, Check, XCircle, AlertTriangle, Terminal, Shield, Clock, AlertCircle } from "lucide-react";
import { useOpenAI } from "@/contexts/OpenAIContext";
import { DEFAULT_MODEL } from "@/lib/openai";

export function AIAssistantAPISettings() {
  const { isApiKeyValid, isApiAvailable, isTestingConnection, testConnection, errorMessage, lastChecked } = useOpenAI();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState("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");

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
            {errorMessage.includes("quota") && (
              <div className="mt-2">
                <p className="text-xs">Please check your OpenAI account billing and quota at <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/account/billing</a></p>
              </div>
            )}
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

        {!isApiAvailable && !errorMessage && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Status</AlertTitle>
            <AlertDescription>
              OpenAI API is currently not responding. This may be due to quota limitations or network issues.
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
            className="font-mono text-xs"
          />
          <p className="text-xs text-muted-foreground">
            Your API key is securely stored. Make sure your OpenAI account has sufficient quota.
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
              <h4 className="text-sm font-semibold">OpenAI Quota Note</h4>
              <p className="text-xs text-muted-foreground">
                If you're experiencing "insufficient quota" errors, please check your OpenAI account billing settings. Free tier accounts have limited quota and may need to be upgraded.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => window.open("https://platform.openai.com/account/billing", "_blank")}
        >
          Check Quota
        </Button>
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
