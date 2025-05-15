
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Bot, Volume2, VolumeX, Sliders, Edit, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIAssistantEmotionPreview } from "./AIAssistantEmotionPreview";

interface AIAssistantProfileProps {
  onVoiceModeChange: (mode: "text" | "voice" | "hybrid") => void;
  currentVoiceMode: "text" | "voice" | "hybrid";
}

export function AIAssistantProfile({ 
  onVoiceModeChange,
  currentVoiceMode
}: AIAssistantProfileProps) {
  const [assistantName, setAssistantName] = useState("AIDA");
  const [personality, setPersonality] = useState("balanced");
  const [voiceType, setVoiceType] = useState("confident");
  const [responseSpeed, setResponseSpeed] = useState(50);
  const [emotion, setEmotion] = useState<"neutral" | "happy" | "thinking" | "surprised">("neutral");
  
  const handlePersonalityChange = (value: string) => {
    setPersonality(value);
    toast({
      description: `Personality set to ${value}`
    });
    
    // Simulate emotion change based on personality
    if (value === "friendly") {
      setEmotion("happy");
    } else if (value === "analytical") {
      setEmotion("thinking");
    } else {
      setEmotion("neutral");
    }
  };
  
  const handleVoiceTypeChange = (value: string) => {
    setVoiceType(value);
    toast({
      description: `Voice tone set to ${value}`
    });
  };
  
  const handleSpeedChange = (value: number[]) => {
    setResponseSpeed(value[0]);
  };
  
  const handleNameChange = () => {
    const newName = prompt("Enter a new name for your AI assistant:", assistantName);
    if (newName && newName.trim() !== "") {
      setAssistantName(newName.trim());
      toast({
        description: `Assistant renamed to ${newName.trim()}`
      });
    }
  };
  
  const handleEmotionChange = (emotion: "neutral" | "happy" | "thinking" | "surprised") => {
    setEmotion(emotion);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Assistant Profile</h3>
        <Button variant="outline" size="sm" onClick={handleNameChange}>
          <Edit className="h-4 w-4 mr-1" />
          Rename
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <AIAssistantEmotionPreview emotion={emotion} size="large" />
        <h3 className="text-xl font-semibold mt-3">{assistantName}</h3>
        
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-xs">AI Marketer</Badge>
          <Badge variant="outline" className="text-xs">Smart</Badge>
          <Badge variant="outline" className="text-xs">{personality}</Badge>
        </div>
      </div>
      
      <Card className="p-4 mb-4">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Sliders className="h-4 w-4" />
          Behavior Settings
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="personality" className="text-xs">Personality</Label>
            <Select value={personality} onValueChange={handlePersonalityChange}>
              <SelectTrigger id="personality">
                <SelectValue placeholder="Select personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly & Casual</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="analytical">Analytical</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="emotions" className="text-xs">Emotions</Label>
            <div className="flex items-center justify-between gap-2 mt-1">
              <Button 
                variant={emotion === "neutral" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => handleEmotionChange("neutral")}
              >
                Neutral
              </Button>
              <Button 
                variant={emotion === "happy" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => handleEmotionChange("happy")}
              >
                Happy
              </Button>
              <Button 
                variant={emotion === "thinking" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => handleEmotionChange("thinking")}
              >
                Thinking
              </Button>
              <Button 
                variant={emotion === "surprised" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => handleEmotionChange("surprised")}
              >
                Surprised
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="response-speed" className="text-xs">Response Speed</Label>
            <Slider 
              id="response-speed"
              min={0} 
              max={100} 
              step={10} 
              value={[responseSpeed]} 
              onValueChange={handleSpeedChange}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Detailed</span>
              <span>Balanced</span>
              <span>Quick</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 mb-4">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Voice Settings
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="voice-mode" className="text-xs mb-1 block">Response Mode</Label>
            <RadioGroup
              id="voice-mode"
              value={currentVoiceMode}
              onValueChange={(value) => onVoiceModeChange(value as "text" | "voice" | "hybrid")}
              className="flex"
            >
              <div className="flex items-center space-x-1 flex-1">
                <RadioGroupItem value="text" id="text-only" />
                <Label htmlFor="text-only" className="text-xs">Text</Label>
              </div>
              <div className="flex items-center space-x-1 flex-1">
                <RadioGroupItem value="voice" id="voice-only" />
                <Label htmlFor="voice-only" className="text-xs">Voice</Label>
              </div>
              <div className="flex items-center space-x-1 flex-1">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="text-xs">Both</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="voice-type" className="text-xs">Voice Tone</Label>
            <Select value={voiceType} onValueChange={handleVoiceTypeChange} disabled={currentVoiceMode === "text"}>
              <SelectTrigger id="voice-type">
                <SelectValue placeholder="Select voice tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="confident">Confident</SelectItem>
                <SelectItem value="calm">Calm</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="energetic">Energetic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="listen-mode" className="text-xs">Listen for wake word</Label>
            <Switch id="listen-mode" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Stats
        </h4>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Queries</p>
            <p className="font-medium">241</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Campaigns</p>
            <p className="font-medium">18</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="font-medium">94%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Response</p>
            <p className="font-medium">2.1s</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
