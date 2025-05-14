
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Book, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  LifeBuoy,
  PlaySquare,
  Check,
  AlertCircle
} from "lucide-react";
import { PluginBuilder } from "./PluginBuilder";
import { PluginSandbox } from "./PluginSandbox";
import { PluginDocumentation } from "./PluginDocumentation";
import { PluginSubmission } from "./PluginSubmission";

export function PluginDeveloperConsole() {
  const [activeTab, setActiveTab] = useState("build");
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/40 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Code className="h-6 w-6" /> Plugin Developer Console
        </h2>
        <p className="text-muted-foreground">
          Create, test and submit plugins for our AI Assistant. Extend functionality 
          and integrate with third-party services.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="build" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Build</span>
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <PlaySquare className="h-4 w-4" />
            <span>Test & Debug</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="submit" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Submit</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="build" className="mt-4">
          <PluginBuilder />
        </TabsContent>
        
        <TabsContent value="test" className="mt-4">
          <PluginSandbox />
        </TabsContent>
        
        <TabsContent value="docs" className="mt-4">
          <PluginDocumentation />
        </TabsContent>
        
        <TabsContent value="submit" className="mt-4">
          <PluginSubmission />
        </TabsContent>
      </Tabs>
      
      <div className="flex gap-4 items-start p-4 border rounded-lg bg-muted/20">
        <LifeBuoy className="h-6 w-6 text-primary shrink-0 mt-1" />
        <div>
          <h3 className="font-medium">Need help with plugin development?</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check our <a href="#" className="text-primary hover:underline">Developer Portal</a> for 
            detailed guides or join our <a href="#" className="text-primary hover:underline">Discord community</a> to 
            connect with other developers.
          </p>
        </div>
      </div>
    </div>
  );
}
