
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  smartMode: boolean;
}

export function SuggestedPrompts({ onSelect, smartMode }: SuggestedPromptsProps) {
  // Different sets of suggestions based on the current mode
  const smartSuggestions = [
    "Create an email campaign for new customers",
    "Build a re-engagement workflow",
    "Analyze my last campaign performance",
    "Write 3 subject lines for a product launch",
    "Generate a WhatsApp message template"
  ];
  
  const strictSuggestions = [
    "Show me how to create a new campaign",
    "What are best practices for SMS marketing?",
    "Tips for improving email open rates",
    "How to segment customers effectively",
    "Explain A/B testing for campaigns"
  ];
  
  const suggestions = smartMode ? smartSuggestions : strictSuggestions;
  
  return (
    <div className="p-4 flex items-center justify-center">
      <div className="flex flex-wrap gap-2 justify-center max-w-3xl">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(suggestion)}
            className="bg-background hover:bg-accent"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
