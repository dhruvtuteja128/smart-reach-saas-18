
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { Review } from "@/types/reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  onReviewClick: (review: Review) => void;
}

export function ReviewsList({
  reviews,
  isLoading,
  onReviewClick
}: ReviewsListProps) {
  const [sortField, setSortField] = useState<keyof Review>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Review) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    }
    
    if (sortField === "rating") {
      return sortDirection === "asc" 
        ? a.rating - b.rating 
        : b.rating - a.rating;
    }

    // For string fields
    const aValue = String(a[sortField]);
    const bValue = String(b[sortField]);
    return sortDirection === "asc" 
      ? aValue.localeCompare(bValue) 
      : bValue.localeCompare(aValue);
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "google":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "facebook":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "yelp":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "in-app":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "unreplied":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "flagged":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium">No reviews found</h3>
        <p className="text-muted-foreground mt-1">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("customerName")}
              >
                Customer {sortField === "customerName" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("platform")}
              >
                Platform {sortField === "platform" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer w-[120px]"
                onClick={() => handleSort("rating")}
              >
                Rating {sortField === "rating" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Review</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReviews.map((review) => (
              <TableRow 
                key={review.id} 
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => onReviewClick(review)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.customerAvatar} />
                      <AvatarFallback>{review.customerName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="whitespace-nowrap font-medium">{review.customerName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`capitalize ${getPlatformColor(review.platform)}`}
                  >
                    {review.platform === "in-app" ? "In-App" : review.platform}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px]">
                    <p className="line-clamp-2 text-sm">{review.text}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <time className="whitespace-nowrap text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </time>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={`capitalize ${getStatusColor(review.status)}`}
                  >
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <span className="sr-only">Open menu</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onReviewClick(review);
                      }}>
                        View Details
                      </DropdownMenuItem>
                      {review.status !== "replied" && (
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onReviewClick(review);
                        }}>
                          Reply
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Flag Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
