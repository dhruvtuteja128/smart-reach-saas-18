
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Bot,
  Smile,
  Star,
  User,
  Sparkles,
  LucideIcon,
  Frown,
  Meh,
  Brain,
  LineChart,
  Palette,
  Code,
  LightbulbIcon,
  Settings,
  Mic
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { VoiceSettings } from "./VoiceSettings";

export type AIEmotion = "neutral" | "happy" | "thinking" | "confused" | "excited";
export type AIPersonality = "analyst" | "marketer" | "techie" | "creative";

interface AIAvatarConfig {
  name: string;
  personality: AIPersonality;
  greeting: string;
  showAvatar: boolean;
  showEmotions: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

const personalityIcons: Record<AIPersonality, LucideIcon> = {
  analyst: LineChart,
  marketer: Star,
  techie: Code,
  creative: Palette
};

const personalityColors: Record<AIPersonality, string> = {
  analyst: "bg-blue-500",
  marketer: "bg-purple-500",
  techie: "bg-emerald-500",
  creative: "bg-amber-500"
};

const emotionIcons: Record<AIEmotion, LucideIcon> = {
  neutral: Bot,
  happy: Smile,
  thinking: Brain,
  confused: Meh,
  excited: Sparkles
};

interface AIAvatarEmotionsProps {
  className?: string;
  onConfigChange?: (config: AIAvatarConfig) => void;
}

export function AIAvatarEmotions({ className, onConfigChange }: AIAvatarEmotionsProps) {
  const [currentEmotion, setCurrentEmotion] = useState<AIEmotion>("neutral");
  const [config, setConfig] = useState<AIAvatarConfig>({
    name: "AIDA",
    personality: "marketer",
    greeting: "Hey! How can I help with your marketing today?",
    showAvatar: true,
    showEmotions: true,
    position: "bottom-right"
  });
  const [activeTab, setActiveTab] = useState("appearance");
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Simulate emotion changes
  useEffect(() => {
    const emotions: AIEmotion[] = ["neutral", "happy", "thinking", "excited"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emotions.length;
      setCurrentEmotion(emotions[currentIndex]);
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleConfigChange = (key: keyof AIAvatarConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    
    if (onConfigChange) {
      onConfigChange(newConfig);
    }
  };
  
  const handleSave = () => {
    toast({
      title: "Avatar settings saved",
      description: "Your AI assistant appearance has been updated."
    });
  };
  
  const EmotionIcon = emotionIcons[currentEmotion];
  const PersonalityIcon = personalityIcons[config.personality];

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Avatar preview */}
          <div className={cn(
            "relative flex items-center justify-center p-2 shadow-lg rounded-full w-24 h-24 transition-all",
            personalityColors[config.personality],
            "animate-bounce-slow"
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEmotion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <EmotionIcon className="w-12 h-12" />
              </motion.div>
            </AnimatePresence>
            
            {/* Speaking indicator */}
            {isSpeaking && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                <Mic className="w-3 h-3" />
              </div>
            )}
          </div>
          
          {/* Name badge */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background border px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {config.name}
          </div>
        </div>
      </div>
      
      <div className="bg-muted/40 p-4 rounded-lg border text-center relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-2 text-xs text-muted-foreground">
          Greeting Message
        </div>
        <p className="italic">{config.greeting}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Avatar Display</CardTitle>
              <CardDescription>
                Configure how the AI avatar appears in the interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-avatar">Show Avatar</Label>
                  <p className="text-sm text-muted-foreground">
                    Display the AI assistant avatar
                  </p>
                </div>
                <Switch
                  id="show-avatar"
                  checked={config.showAvatar}
                  onCheckedChange={(checked) => handleConfigChange("showAvatar", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-emotions">Show Emotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow avatar to display emotions
                  </p>
                </div>
                <Switch
                  id="show-emotions"
                  checked={config.showEmotions}
                  onCheckedChange={(checked) => handleConfigChange("showEmotions", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Avatar Position</Label>
                <RadioGroup
                  value={config.position}
                  onValueChange={(value) => handleConfigChange("position", value)}
                  className="grid grid-cols-3 gap-2"
                >
                  <Label
                    htmlFor="top-left"
                    className={cn(
                      "flex items-center justify-center border rounded-md p-2 cursor-pointer hover:bg-accent",
                      config.position === "top-left" && "border-primary"
                    )}
                  >
                    <RadioGroupItem value="top-left" id="top-left" className="sr-only" />
                    Top Left
                  </Label>
                  <Label
                    htmlFor="top-right"
                    className={cn(
                      "flex items-center justify-center border rounded-md p-2 cursor-pointer hover:bg-accent",
                      config.position === "top-right" && "border-primary"
                    )}
                  >
                    <RadioGroupItem value="top-right" id="top-right" className="sr-only" />
                    Top Right
                  </Label>
                  <Label
                    htmlFor="center"
                    className={cn(
                      "flex items-center justify-center border rounded-md p-2 cursor-pointer hover:bg-accent",
                      config.position === "center" && "border-primary"
                    )}
                  >
                    <RadioGroupItem value="center" id="center" className="sr-only" />
                    Center
                  </Label>
                  <Label
                    htmlFor="bottom-left"
                    className={cn(
                      "flex items-center justify-center border rounded-md p-2 cursor-pointer hover:bg-accent",
                      config.position === "bottom-left" && "border-primary"
                    )}
                  >
                    <RadioGroupItem value="bottom-left" id="bottom-left" className="sr-only" />
                    Bottom Left
                  </Label>
                  <Label
                    htmlFor="bottom-right"
                    className={cn(
                      "flex items-center justify-center border rounded-md p-2 cursor-pointer hover:bg-accent",
                      config.position === "bottom-right" && "border-primary"
                    )}
                  >
                    <RadioGroupItem value="bottom-right" id="bottom-right" className="sr-only" />
                    Bottom Right
                  </Label>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assistant-name">Assistant Name</Label>
                <Input
                  id="assistant-name"
                  value={config.name}
                  onChange={(e) => handleConfigChange("name", e.target.value)}
                  placeholder="Enter a name for your AI assistant"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button 
              className="flex-1" 
              onClick={() => {
                setIsSpeaking(!isSpeaking);
              }}
              variant="outline"
            >
              {isSpeaking ? "Stop Speaking" : "Test Speaking Animation"}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1">
                  Test Emotions
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="center">
                <div className="grid grid-cols-5 gap-0">
                  <Button 
                    variant="ghost" 
                    className="flex flex-col h-16 items-center justify-center rounded-none"
                    onClick={() => setCurrentEmotion("neutral")}
                  >
                    <Bot className="h-6 w-6 mb-1" />
                    <span className="text-xs">Neutral</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex flex-col h-16 items-center justify-center rounded-none"
                    onClick={() => setCurrentEmotion("happy")}
                  >
                    <Smile className="h-6 w-6 mb-1" />
                    <span className="text-xs">Happy</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex flex-col h-16 items-center justify-center rounded-none"
                    onClick={() => setCurrentEmotion("thinking")}
                  >
                    <Brain className="h-6 w-6 mb-1" />
                    <span className="text-xs">Thinking</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex flex-col h-16 items-center justify-center rounded-none"
                    onClick={() => setCurrentEmotion("confused")}
                  >
                    <Meh className="h-6 w-6 mb-1" />
                    <span className="text-xs">Confused</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex flex-col h-16 items-center justify-center rounded-none"
                    onClick={() => setCurrentEmotion("excited")}
                  >
                    <Sparkles className="h-6 w-6 mb-1" />
                    <span className="text-xs">Excited</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
        
        <TabsContent value="personality" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Personality</CardTitle>
              <CardDescription>
                Choose a personality for your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroup 
                    value={config.personality}
                    onValueChange={(value) => handleConfigChange("personality", value)}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="analyst" 
                        id="analyst" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="analyst"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <LineChart className="h-6 w-6 mb-3" />
                        <span className="font-medium">Analyst</span>
                        <span className="text-xs text-muted-foreground">
                          Data-driven and precise
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="marketer" 
                        id="marketer" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="marketer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Star className="h-6 w-6 mb-3" />
                        <span className="font-medium">Marketer</span>
                        <span className="text-xs text-muted-foreground">
                          Strategic and persuasive
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <RadioGroup 
                    value={config.personality}
                    onValueChange={(value) => handleConfigChange("personality", value)}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="techie" 
                        id="techie" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="techie"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Code className="h-6 w-6 mb-3" />
                        <span className="font-medium">Techie</span>
                        <span className="text-xs text-muted-foreground">
                          Technical and detailed
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="creative" 
                        id="creative" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="creative"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Palette className="h-6 w-6 mb-3" />
                        <span className="font-medium">Creative</span>
                        <span className="text-xs text-muted-foreground">
                          Imaginative and expressive
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="greeting-message">Greeting Message</Label>
                <Textarea
                  id="greeting-message"
                  value={config.greeting}
                  onChange={(e) => handleConfigChange("greeting", e.target.value)}
                  placeholder="Enter a greeting message"
                  className="resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  This is the first message your AI assistant will say
                </p>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-1 mb-2">
                  <PersonalityIcon className="h-4 w-4" />
                  <span>Personality Preview</span>
                </h4>
                
                {config.personality === "analyst" && (
                  <p className="text-sm">
                    Straightforward and data-driven responses focused on metrics, 
                    analytics, and measurable outcomes. Provides clear insights and 
                    actionable recommendations based on data.
                  </p>
                )}
                
                {config.personality === "marketer" && (
                  <p className="text-sm">
                    Strategic and persuasive communication style with focus on
                    growth, engagement, and conversion. Offers campaign ideas
                    and marketing best practices.
                  </p>
                )}
                
                {config.personality === "techie" && (
                  <p className="text-sm">
                    Technical and detailed responses with precise information about
                    tools, integrations, and systems. Provides step-by-step guidance
                    and technical explanations.
                  </p>
                )}
                
                {config.personality === "creative" && (
                  <p className="text-sm">
                    Imaginative and expressive communication with focus on innovation
                    and creative solutions. Offers unique ideas, engaging content suggestions,
                    and alternative approaches.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voice" className="space-y-4 mt-4">
          <VoiceSettings />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Settings className="mr-2 h-4 w-4" />
          Save Avatar Settings
        </Button>
      </div>
    </div>
  );
}
