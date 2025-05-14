
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  smartMode: boolean;
}

export function SuggestedPrompts({ onSelect, smartMode }: SuggestedPromptsProps) {
  // Basic marketing prompts
  const basicPrompts = [
    "Write an email subject line",
    "Create a social media post",
    "Write a product description",
    "Generate a campaign idea"
  ];

  // Advanced context-aware prompts (shown when in smart mode)
  const advancedPrompts = [
    "Optimize my Facebook ad for higher CTR",
    "Create a re-engagement sequence for dormant leads",
    "Analyze last month's campaign performance",
    "Generate 3 variations of our headline for A/B testing",
    "Create a WhatsApp message for order confirmation"
  ];

  const prompts = smartMode ? [...advancedPrompts, ...basicPrompts] : basicPrompts;

  return (
    <div className="flex flex-wrap gap-2 p-3 border-t">
      {prompts.slice(0, 5).map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          className={cn(
            "text-xs bg-background h-7",
            smartMode && "border-primary/20"
          )}
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
