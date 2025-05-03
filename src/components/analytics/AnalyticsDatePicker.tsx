import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";

export function AnalyticsDatePicker() {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const [preset, setPreset] = useState("7days");

  const handlePresetChange = (newPreset: string) => {
    setPreset(newPreset);
    const now = new Date();
    
    switch (newPreset) {
      case "today":
        setDate({ from: now, to: now });
        break;
      case "7days":
        setDate({
          from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          to: now,
        });
        break;
      case "30days":
        setDate({
          from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          to: now,
        });
        break;
      case "custom":
        // Keep current date selection
        break;
    }
  };

  const formatDateRange = () => {
    if (!date.from) return "Select date";
    if (!date.to) return format(date.from, "MMM d, yyyy");
    
    return `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="grid gap-4 p-4">
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant={preset === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetChange("today")}
            >
              Today
            </Button>
            <Button
              variant={preset === "7days" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetChange("7days")}
            >
              7 days
            </Button>
            <Button
              variant={preset === "30days" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetChange("30days")}
            >
              30 days
            </Button>
            <Button
              variant={preset === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetChange("custom")}
            >
              Custom
            </Button>
          </div>
          <Calendar
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate || { from: undefined });
              setPreset("custom");
            }}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
