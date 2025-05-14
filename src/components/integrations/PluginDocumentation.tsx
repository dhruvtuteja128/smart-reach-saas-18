
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Shield, Webhook, Database, Terminal, Code } from "lucide-react";

export function PluginDocumentation() {
  return (
    <div className="space-y-6">
      <div className="bg-muted/40 rounded-lg p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Book className="h-5 w-5" /> Plugin Development Documentation
        </h2>
        <p className="text-muted-foreground mt-1">
          Comprehensive guides and references to help you build powerful plugins for our AI Assistant.
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="events">Events & Triggers</TabsTrigger>
          <TabsTrigger value="schema">Data Schema</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Getting Started with Plugin Development</h3>
            <p>
              Plugins extend the functionality of our AI Assistant by connecting to external services and APIs.
              Our plugin system follows an event-based architecture where plugins can register to handle specific
              triggers or be directly invoked by the AI Assistant.
            </p>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Plugin Structure</h4>
            <p>Every plugin must include:</p>
            <ul>
              <li>A unique identifier and version number</li>
              <li>A clear description of functionality</li>
              <li>API endpoint that handles plugin requests</li>
              <li>Required permissions clearly defined</li>
              <li>Authentication mechanism (if needed)</li>
            </ul>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Plugin Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Action Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Perform actions when triggered by the AI or user. Examples include sending emails,
                    creating tasks, or posting to social media.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Data Provider Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Supply additional data to the AI. Examples include customer information from CRMs,
                    product catalogs, or analytics data.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Communication Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enable communication through additional channels like SMS, chat apps,
                    or communication platforms.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Automation Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create complex workflows by chaining together multiple actions across
                    different services and platforms.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">API Reference</h3>
            <p className="text-muted-foreground mb-4">
              Our plugin API uses a standardized JSON format for requests and responses. All endpoints
              must support HTTPS and handle requests with proper error handling.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" /> Request Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "action": "string",      // Required: The action to perform
  "parameters": {          // Required: Parameters for the action
    "key1": "value1",
    "key2": "value2"
  },
  "context": {             // Optional: Additional context
    "user": "string",
    "timestamp": "string",
    "sessionId": "string"
  },
  "metadata": {            // Optional: Plugin metadata
    "pluginId": "string",
    "pluginVersion": "string"
  }
}`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" /> Response Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "success": boolean,      // Required: Whether the request was successful
  "message": "string",     // Optional: A message describing the result
  "data": {                // Optional: Any data returned from the request
    // Response data structure
  },
  "error": {               // Required if success is false
    "code": "string",
    "message": "string"
  }
}`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" /> Example API Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`// Express.js example
const express = require('express');
const app = express();

app.use(express.json());

app.post('/plugin', (req, res) => {
  const { action, parameters } = req.body;
  
  switch (action) {
    case 'getData':
      // Process getData action
      return res.json({
        success: true,
        data: {
          /* Your data here */
        }
      });
    
    case 'performAction':
      // Process performAction
      return res.json({
        success: true,
        message: 'Action performed successfully'
      });
    
    default:
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ACTION',
          message: \`Unknown action: \${action}\`
        }
      });
  }
});

app.listen(3000, () => {
  console.log('Plugin server running on port 3000');
});`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Authentication Methods</h3>
            <p>
              Secure your plugin's API endpoints with one of these authentication methods:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" /> API Key Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Use API keys to authenticate requests between the AI Assistant and your plugin.
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-xs font-medium mb-1">Headers Example:</p>
                    <code className="text-xs">X-API-Key: your_api_key_here</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best for simple integrations and internal use cases.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" /> OAuth 2.0
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    For plugins that need to access user-specific data or act on behalf of users.
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-xs font-medium mb-1">Headers Example:</p>
                    <code className="text-xs">Authorization: Bearer access_token_here</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended for public plugins and integrations with third-party services.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <h4 className="text-lg font-medium mt-8 mb-3">Authentication Flow</h4>
            <ol className="space-y-2">
              <li><strong>Registration:</strong> Developers register their plugins and receive client credentials</li>
              <li><strong>Configuration:</strong> Users enable your plugin and authorize access</li>
              <li><strong>Authentication:</strong> The AI Assistant handles token management</li>
              <li><strong>Authorization:</strong> Your plugin validates tokens on each request</li>
            </ol>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Events & Triggers</h3>
            <p>
              Plugins can respond to specific events or be explicitly triggered by the AI Assistant or user.
              This event-based system allows plugins to integrate seamlessly into the user experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" /> AI-Triggered Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><strong>ai.intent.detected</strong> - When AI detects a specific user intent</li>
                    <li><strong>ai.recommendation.generated</strong> - After AI creates a recommendation</li>
                    <li><strong>ai.query.requires.external.data</strong> - When AI needs external data</li>
                    <li><strong>ai.action.required</strong> - When AI determines an action is needed</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" /> User-Triggered Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><strong>user.command.issued</strong> - When user issues a specific command</li>
                    <li><strong>user.approval.given</strong> - After user approves an action</li>
                    <li><strong>user.data.requested</strong> - When user asks for specific data</li>
                    <li><strong>user.plugin.direct.invoke</strong> - When user directly calls a plugin</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Event Payload Structure</h4>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "event": "string",       // The event type
  "timestamp": "string",   // ISO timestamp
  "sessionId": "string",   // Current session ID
  "data": {                // Event-specific data
    // Data relevant to the event
  },
  "user": {                // User context (if available)
    "id": "string",
    "preferences": {}
  }
}`}
            </pre>
          </div>
        </TabsContent>
        
        <TabsContent value="schema" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Data Schema</h3>
            <p>
              All plugins must conform to our standardized data schemas to ensure compatibility with the AI Assistant.
            </p>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Plugin Manifest Schema</h4>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" /> Plugin Manifest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "id": "string",               // Unique identifier for the plugin
  "name": "string",             // Display name of the plugin 
  "version": "string",          // Semantic version (e.g., "1.0.0")
  "description": "string",      // Brief description of functionality
  "type": "string",             // Plugin type (action|data|communication|automation)
  "endpoint": "string",         // API endpoint URL
  "icon": "string",             // URL to plugin icon
  
  "developer": {
    "name": "string",           // Developer/company name
    "email": "string",          // Contact email
    "website": "string"         // Developer website URL
  },
  
  "authentication": {
    "type": "string",           // "none", "api_key", or "oauth"
    "apiKeyName": "string",     // Header name for API key auth
    "oauthConfig": {            // Config for OAuth flow
      "authorizationUrl": "string",
      "tokenUrl": "string",
      "scopes": [
        "string"
      ]
    }
  },
  
  "permissions": [              // Required permissions
    "string"
  ],
  
  "actions": [                  // Supported plugin actions
    {
      "id": "string",           // Action identifier
      "name": "string",         // Display name
      "description": "string",  // Brief description
      "parameters": [           // Input parameters
        {
          "name": "string",
          "type": "string",     // string|number|boolean|object|array
          "required": boolean,
          "description": "string"
        }
      ],
      "response": {             // Response format
        "type": "string",
        "description": "string"
      }
    }
  ],
  
  "events": [                   // Events the plugin can respond to
    "string"
  ],
  
  "settings": [                 // User-configurable settings
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "default": "any"
    }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Security Requirements</h3>
            <p>
              Security is paramount for our plugin ecosystem. All plugins must adhere to these 
              security requirements to protect user data and system integrity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>HTTPS Requirement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    All plugin endpoints must use HTTPS with a valid SSL certificate. 
                    Non-HTTPS endpoints will be rejected.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Plugins must clearly define what user data they access and how it's used.
                    All sensitive data must be encrypted in transit and at rest.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rate Limiting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Implement appropriate rate limiting to prevent abuse.
                    Handle rate limit errors gracefully with proper status codes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Input Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    All inputs must be strictly validated to prevent injection attacks.
                    Never trust client-side data without validation.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Security Review Process</h4>
            <p>
              All plugins go through a security review before being approved for the marketplace:
            </p>
            
            <ol className="space-y-2">
              <li><strong>Automated Scanning:</strong> Code and dependency vulnerability scanning</li>
              <li><strong>API Testing:</strong> Endpoint security and data handling verification</li>
              <li><strong>Permission Review:</strong> Verification that requested permissions match functionality</li>
              <li><strong>Privacy Review:</strong> Assessment of data collection and handling practices</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
