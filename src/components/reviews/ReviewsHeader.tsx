
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

interface ReviewsHeaderProps {
  onDateRangeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onRequestReviewClick: () => void;
  dateRange: string;
  searchQuery: string;
}

export function ReviewsHeader({
  onDateRangeChange,
  onSearchChange,
  onRequestReviewClick,
  dateRange,
  searchQuery
}: ReviewsHeaderProps) {
  const dateRangeLabels: Record<string, string> = {
    "7": "Last 7 Days",
    "30": "Last 30 Days",
    "90": "Last 90 Days",
    "365": "Last Year"
  };
  
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold">Customer Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage customer reviews across all platforms
        </p>
      </header>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, keyword, or platform..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {dateRangeLabels[dateRange] || `Last ${dateRange} Days`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDateRangeChange("7")}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDateRangeChange("30")}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDateRangeChange("90")}>
                Last 90 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDateRangeChange("365")}>
                Last Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={onRequestReviewClick}>
            Request Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
