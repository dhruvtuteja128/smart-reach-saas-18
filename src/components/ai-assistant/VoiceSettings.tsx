
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import {
  Volume2,
  Mic,
  MicOff,
  ChevronRight,
  Wand2,
  Save,
  Volume,
  VolumeX,
  Upload,
  BadgeAlert,
  Trash2,
  Sparkles,
  ListMusic
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIVoiceWaveform } from "./AIVoiceWaveform";

export function VoiceSettings() {
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [volume, setVolume] = useState(80);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceTone, setVoiceTone] = useState("friendly");
  const [responseMode, setResponseMode] = useState("hybrid");
  const [customTrigger, setCustomTrigger] = useState("");
  const [shortcutCommands, setShortcutCommands] = useState([
    { phrase: "boost this post", action: "Launch Meta Ad Campaign" },
    { phrase: "analyze performance", action: "Generate Analytics Report" }
  ]);
  const [activeTab, setActiveTab] = useState("voice");
  
  const handleRecordToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Voice training stopped",
        description: "Your voice sample has been processed."
      });
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Voice training started",
        description: "Speak the trigger phrase clearly..."
      });
      
      // Simulate recording for demo purposes
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Voice sample collected",
          description: "Your voice pattern has been saved."
        });
      }, 5000);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "Voice file uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };
  
  const handleDeleteUpload = () => {
    setUploadedFile(null);
    toast({
      title: "Voice file deleted",
      description: "Uploaded voice file has been removed."
    });
  };
  
  const handleAddCommand = () => {
    if (customTrigger.trim()) {
      setShortcutCommands([
        ...shortcutCommands, 
        { phrase: customTrigger, action: "Custom Action" }
      ]);
      setCustomTrigger("");
      toast({
        title: "Command added",
        description: `New voice command "${customTrigger}" has been added.`
      });
    }
  };
  
  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...shortcutCommands];
    updatedCommands.splice(index, 1);
    setShortcutCommands(updatedCommands);
    toast({
      title: "Command removed",
      description: "Voice command has been removed."
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Voice settings saved",
      description: "Your voice preferences have been updated."
    });
  };

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="voice" className="flex items-center gap-1">
              <Volume2 className="h-4 w-4" />
              <span>Voice Settings</span>
            </TabsTrigger>
            <TabsTrigger value="commands" className="flex items-center gap-1">
              <ListMusic className="h-4 w-4" />
              <span>Voice Commands</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Voice Settings</CardTitle>
                <CardDescription>
                  Customize how the AI assistant speaks to you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="voice-toggle">Voice Response</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable AI voice responses
                    </p>
                  </div>
                  <Switch
                    id="voice-toggle"
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Voice Tone</Label>
                  <RadioGroup 
                    defaultValue={voiceTone}
                    onValueChange={setVoiceTone}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="friendly" 
                        id="friendly" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="friendly"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sparkles className="h-6 w-6 mb-3" />
                        <span className="font-medium">Friendly</span>
                        <span className="text-xs text-muted-foreground">
                          Casual and approachable tone
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="confident" 
                        id="confident" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="confident"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sparkles className="h-6 w-6 mb-3" />
                        <span className="font-medium">Confident</span>
                        <span className="text-xs text-muted-foreground">
                          Assertive and knowledgeable
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="calm" 
                        id="calm" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="calm"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sparkles className="h-6 w-6 mb-3" />
                        <span className="font-medium">Calm</span>
                        <span className="text-xs text-muted-foreground">
                          Soothing and measured tone
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="corporate" 
                        id="corporate" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="corporate"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sparkles className="h-6 w-6 mb-3" />
                        <span className="font-medium">Corporate</span>
                        <span className="text-xs text-muted-foreground">
                          Professional and formal
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="volume">Volume</Label>
                    <span className="text-sm">{volume}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      id="volume"
                      defaultValue={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="flex-1"
                    />
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Response Type</Label>
                  <Select defaultValue={responseMode} onValueChange={setResponseMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select response type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Only</SelectItem>
                      <SelectItem value="voice">Voice Only</SelectItem>
                      <SelectItem value="hybrid">Text & Voice</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose how the AI assistant responds to you
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Voice Preview</Label>
                    <AIVoiceWaveform playing={isRecording} />
                    
                    <div className="mt-3 flex justify-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => {
                          toast({
                            title: "Playing sample voice",
                          });
                        }}
                      >
                        <Volume className="h-3 w-3" />
                        Play Sample
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Voice Customization
                </CardTitle>
                <CardDescription>
                  Train the AI to recognize your voice or use custom voice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Voice Upload</Label>
                  <div className="grid gap-2.5">
                    {!uploadedFile ? (
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a voice file for the AI to mimic (MP3, WAV)
                        </p>
                        <div>
                          <Label htmlFor="voice-file" className="cursor-pointer">
                            <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                              Choose File
                            </div>
                            <Input 
                              id="voice-file" 
                              type="file" 
                              className="hidden" 
                              accept="audio/mp3,audio/wav"
                              onChange={handleFileUpload}
                            />
                          </Label>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <ListMusic className="h-5 w-5 text-muted-foreground mr-2" />
                            <span className="font-medium">{uploadedFile.name}</span>
                          </div>
                          <Badge variant="outline">
                            {Math.round(uploadedFile.size / 1024)} KB
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <Progress value={100} />
                          
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Processing voice file",
                                  description: "Your voice template is being created..."
                                });
                              }}
                            >
                              <Wand2 className="mr-1 h-4 w-4" />
                              Process
                            </Button>
                            
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={handleDeleteUpload}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <BadgeAlert className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Supported formats: MP3 or WAV, max 10MB. For best results, upload a clear voice recording with minimal background noise.</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="mb-2 block">Voice Training</Label>
                  <div className="border rounded-md p-4">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Train the AI to recognize your voice by speaking the following phrases:
                      </p>
                      
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Say: "Hey Assistant, create a new campaign."</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          onClick={handleRecordToggle}
                          variant={isRecording ? "destructive" : "default"}
                          className="flex items-center gap-2"
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="h-4 w-4" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="h-4 w-4" />
                              Start Voice Training
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {isRecording && (
                        <div className="flex flex-col items-center">
                          <AIVoiceWaveform playing={true} />
                          <p className="text-sm text-muted-foreground mt-2 animate-pulse">
                            Listening...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t p-4">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Voice Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="commands" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Voice Commands</CardTitle>
                <CardDescription>
                  Create custom voice shortcuts and commands
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="command-input">Add Voice Command</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="command-input"
                      placeholder="E.g., 'Let's boost this'"
                      value={customTrigger}
                      onChange={(e) => setCustomTrigger(e.target.value)}
                    />
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={handleAddCommand} 
                      disabled={!customTrigger.trim()}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create a custom phrase that will trigger a specific action
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Current Voice Commands</Label>
                  <div className="border rounded-md overflow-hidden">
                    {shortcutCommands.length > 0 ? (
                      <div className="divide-y">
                        {shortcutCommands.map((command, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 hover:bg-muted/50"
                          >
                            <div>
                              <p className="font-medium">{command.phrase}</p>
                              <p className="text-xs text-muted-foreground">
                                Action: {command.action}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveCommand(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        <p>No commands added yet</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Default Commands</Label>
                  <div className="border rounded-md overflow-hidden">
                    <div className="divide-y">
                      <div className="flex items-center p-3 bg-muted/50">
                        <div className="flex-1">
                          <p className="font-medium">"Hey Assistant"</p>
                          <p className="text-xs text-muted-foreground">
                            Action: Wake up the assistant
                          </p>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <div className="flex items-center p-3 bg-muted/50">
                        <div className="flex-1">
                          <p className="font-medium">"Create new campaign"</p>
                          <p className="text-xs text-muted-foreground">
                            Action: Open campaign builder
                          </p>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <div className="flex items-center p-3 bg-muted/50">
                        <div className="flex-1">
                          <p className="font-medium">"Show analytics"</p>
                          <p className="text-xs text-muted-foreground">
                            Action: Navigate to analytics page
                          </p>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t p-4">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Command Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
