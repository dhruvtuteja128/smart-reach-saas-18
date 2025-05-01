
import { useState } from "react";
import { Mail, MessageCircle, Phone, Ad } from "lucide-react";
import { useCampaign, CampaignType as CampaignTypeEnum } from "@/components/campaigns/CampaignContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CampaignType = () => {
  const { campaign, updateCampaign } = useCampaign();
  const [selectedType, setSelectedType] = useState<CampaignTypeEnum | null>(campaign.type);

  const handleTypeSelect = (type: CampaignTypeEnum) => {
    setSelectedType(type);
    updateCampaign({ type });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCampaign({ name: e.target.value });
  };

  const campaignTypes = [
    {
      id: "email" as CampaignTypeEnum,
      name: "Email Campaign",
      description: "Engage customers with rich, personalized emails",
      icon: <Mail className="h-10 w-10" />,
    },
    {
      id: "sms" as CampaignTypeEnum,
      name: "SMS Campaign",
      description: "Reach customers instantly with text messages",
      icon: <MessageCircle className="h-10 w-10" />,
    },
    {
      id: "whatsapp" as CampaignTypeEnum,
      name: "WhatsApp Campaign",
      description: "Engage with customers through WhatsApp messaging",
      icon: <Phone className="h-10 w-10" />,
    },
    {
      id: "ads" as CampaignTypeEnum,
      name: "Ad Campaign",
      description: "Create Google and Meta Ads campaigns",
      icon: <Ad className="h-10 w-10" />,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Step 1: Campaign Type</h2>
      <p className="text-muted-foreground mb-6">Choose the type of campaign you want to create</p>
      
      <div className="mb-6">
        <Label htmlFor="campaign-name">Campaign Name</Label>
        <Input 
          id="campaign-name" 
          value={campaign.name} 
          onChange={handleNameChange}
          placeholder="Enter a name for your campaign"
          className="mt-1" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all ${
              selectedType === type.id 
                ? "border-primary ring-2 ring-primary ring-opacity-50" 
                : "hover:border-primary/50"
            }`}
            onClick={() => handleTypeSelect(type.id)}
          >
            <CardHeader className="pb-2">
              <div className={`p-2 rounded-full inline-flex ${
                selectedType === type.id 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {type.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-1">{type.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
