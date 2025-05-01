
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiSuggestionCardProps {
  title: string;
  suggestions: {
    id: string;
    content: string;
  }[];
  className?: string;
  onAction?: (id: string) => void;
}

export function AiSuggestionCard({
  title,
  suggestions,
  className,
  onAction,
}: AiSuggestionCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-lg border bg-card p-3"
            >
              <p className="text-sm mb-3">{suggestion.content}</p>
              {onAction && (
                <Button variant="outline" size="sm" className="mt-2" onClick={() => onAction(suggestion.id)}>
                  Apply Suggestion
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
