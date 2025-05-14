
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Search, Filter, PlugZap } from "lucide-react";
import { IntegrationsGrid } from "@/components/integrations/IntegrationsGrid";
import { IntegrationsHeader } from "@/components/integrations/IntegrationsHeader";
import { IntegrationsEmptyState } from "@/components/integrations/IntegrationsEmptyState";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Integrations" },
  { id: "advertising", label: "Ads & Analytics" },
  { id: "crm", label: "CRM & Email" },
  { id: "communication", label: "Communication" },
  { id: "ecommerce", label: "Ecommerce & Payments" },
  { id: "productivity", label: "Productivity & Others" }
];

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full animate-fade-in">
        <IntegrationsHeader />
        
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-md">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <Badge variant="outline" className="ml-2">
                <span className="text-xs">{CATEGORIES.length} Categories</span>
              </Badge>
            </div>
          )}
        </div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className={cn(
            "w-full h-auto flex-wrap justify-start p-1 bg-muted/50",
            isMobile ? "overflow-x-auto" : ""
          )}>
            {CATEGORIES.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs px-3 py-1.5 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {CATEGORIES.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <IntegrationsGrid 
                category={category.id} 
                searchQuery={searchQuery}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Integrations;
