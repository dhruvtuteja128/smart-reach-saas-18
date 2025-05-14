
import { PlugZap } from "lucide-react";

export function IntegrationsEmptyState() {
  return (
    <div className="text-center p-12 border rounded-lg bg-muted/20">
      <PlugZap className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-medium">No integrations found</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        We couldn't find any integrations matching your search. Try adjusting your filters or search query.
      </p>
    </div>
  );
}
