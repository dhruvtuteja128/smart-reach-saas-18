
import { useState } from "react";
import { Star, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Review } from "@/types/reviews";
import { AIReplyGenerator } from "./AIReplyGenerator";

interface ReviewDetailDialogProps {
  review: Review;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewDetailDialog({
  review,
  open,
  onOpenChange,
}: ReviewDetailDialogProps) {
  const [notes, setNotes] = useState<string>(review.notes || "");
  const [showAIGenerator, setShowAIGenerator] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>(review.replyText || "");
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.customerAvatar} />
                <AvatarFallback>{review.customerName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{review.customerName}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={`capitalize ${getPlatformColor(review.platform)}`}
                  >
                    {review.platform === "in-app" ? "In-App" : review.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">{renderStars(review.rating)}</div>
          </div>
          <DialogDescription className="sr-only">
            Review details and reply options
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Review</h4>
            <div className="bg-secondary/10 rounded-lg p-4">
              <p>{review.text}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Customer Information</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Name:</span> {review.customerName}
                </div>
                {review.customerEmail && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email:</span> {review.customerEmail}
                  </div>
                )}
                {review.customerPhone && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Phone:</span> {review.customerPhone}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {review.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6 px-2 rounded-full">
                  + Add Tag
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Internal Notes</h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add private notes about this review..."
              className="h-20"
            />
          </div>
          
          {showAIGenerator ? (
            <AIReplyGenerator
              reviewText={review.text}
              rating={review.rating}
              customerName={review.customerName}
              onGenerate={setReplyText}
              onCancel={() => setShowAIGenerator(false)}
            />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Your Reply</h4>
                {review.status !== "replied" && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowAIGenerator(true)}
                  >
                    AI Assist
                  </Button>
                )}
              </div>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={
                  review.status === "replied"
                    ? "Your previous reply"
                    : "Write your response to this review..."
                }
                className="h-24"
                disabled={review.status === "replied"}
              />
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <div className="flex gap-2 mr-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Mark as
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  Flagged
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Needs Follow-up
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Resolved
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              Delete
            </Button>
          </div>
          
          {review.status !== "replied" ? (
            <Button className="gap-1">
              <Check className="h-4 w-4" />
              Send Reply
            </Button>
          ) : (
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
