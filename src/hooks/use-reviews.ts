
import { useState, useEffect } from "react";
import { Review, ReviewStats } from "@/types/reviews";
import { generateMockReviews, generateMockStats } from "@/data/mock-reviews-data";

interface UseReviewsOptions {
  platform?: string;
  dateRange: string;
  search?: string;
}

export function useReviews({ platform, dateRange, search }: UseReviewsOptions) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with delay
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredReviews = generateMockReviews();
      
      // Apply platform filter
      if (platform && platform !== "all") {
        if (platform === "unreplied") {
          filteredReviews = filteredReviews.filter(review => review.status === "unreplied");
        } else if (platform === "low") {
          filteredReviews = filteredReviews.filter(review => review.rating <= 3);
        } else {
          filteredReviews = filteredReviews.filter(review => review.platform === platform);
        }
      }
      
      // Apply date range filter
      const today = new Date();
      const daysToSubtract = parseInt(dateRange, 10);
      const dateThreshold = new Date();
      dateThreshold.setDate(today.getDate() - daysToSubtract);
      
      filteredReviews = filteredReviews.filter(review => {
        const reviewDate = new Date(review.date);
        return reviewDate >= dateThreshold;
      });
      
      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredReviews = filteredReviews.filter(review => 
          review.customerName.toLowerCase().includes(searchLower) ||
          review.text.toLowerCase().includes(searchLower) ||
          review.platform.toLowerCase().includes(searchLower)
        );
      }
      
      setReviews(filteredReviews);
      setStats(generateMockStats());
      setIsLoading(false);
    }, 600);
  }, [platform, dateRange, search]);

  return { reviews, stats, isLoading };
}
