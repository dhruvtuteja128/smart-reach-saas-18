
export type ReviewPlatform = "google" | "facebook" | "yelp" | "in-app";
export type ReviewStatus = "replied" | "unreplied" | "flagged";

export interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  platform: ReviewPlatform;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
  customerEmail?: string;
  customerPhone?: string;
  tags?: string[];
  notes?: string;
  replyText?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  platformCounts: {
    google: number;
    facebook: number;
    yelp: number;
    inApp: number;
  };
  responseTime: number;
  sentimentAnalysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
  ratingTrend: {
    date: string;
    rating: number;
  }[];
}
