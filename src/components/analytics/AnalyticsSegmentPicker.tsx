
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsersIcon, ChevronDown } from "lucide-react";
import { Segment } from "@/types/crm";

const mockSegments: Segment[] = [
  {
    id: "1",
    name: "All Contacts",
    filters: {},
    count: 1245,
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "2",
    name: "High-Intent Leads",
    description: "Contacts with high engagement scores",
    filters: { score: { gte: 80 } },
    count: 312,
    createdAt: "2023-09-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Repeat Customers",
    description: "Customers who have purchased more than once",
    filters: { purchases: { gte: 2 } },
    count: 124,
    createdAt: "2023-09-15T00:00:00Z",
  },
  {
    id: "4",
    name: "Recent Signups",
    description: "New contacts in the last 30 days",
    filters: { created_at: { gte: "30days" } },
    count: 287,
    createdAt: "2023-09-20T00:00:00Z",
  },
];

export function AnalyticsSegmentPicker() {
  const [selectedSegment, setSelectedSegment] = useState<Segment>(mockSegments[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto justify-start">
          <UsersIcon className="mr-2 h-4 w-4" />
          {selectedSegment.name}
          <span className="ml-1 text-xs text-muted-foreground">
            ({selectedSegment.count})
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {mockSegments.map((segment) => (
          <DropdownMenuCheckboxItem
            key={segment.id}
            checked={selectedSegment.id === segment.id}
            onCheckedChange={() => setSelectedSegment(segment)}
          >
            <div className="flex flex-col">
              <span>{segment.name}</span>
              {segment.description && (
                <span className="text-xs text-muted-foreground">
                  {segment.description}
                </span>
              )}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
