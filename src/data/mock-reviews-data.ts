
import { Review, ReviewStats } from "@/types/reviews";

const platforms = ["google", "facebook", "yelp", "in-app"] as const;
const statuses = ["replied", "unreplied", "flagged"] as const;

export function generateMockReviews(): Review[] {
  const reviews: Review[] = [];
  const names = ["Alex Johnson", "Jamie Smith", "Pat Williams", "Morgan Brown", "Sam Davis", "Taylor Wilson", "Jordan Lee", "Casey Miller", "Quinn Thompson", "Riley Garcia"];
  
  // Generate 50 random reviews
  for (let i = 0; i < 50; i++) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomPlatformIndex = Math.floor(Math.random() * platforms.length);
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const rating = Math.floor(Math.random() * 5) + 1;
    
    // Create more realistic dates (within last 90 days)
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    reviews.push({
      id: `review-${i}`,
      customerName: names[randomNameIndex],
      customerAvatar: `https://i.pravatar.cc/150?img=${i % 70}`,
      platform: platforms[randomPlatformIndex],
      rating,
      text: generateReviewText(rating),
      date: date.toISOString(),
      status: statuses[randomStatusIndex],
      customerEmail: `${names[randomNameIndex].toLowerCase().replace(' ', '.')}@example.com`,
      customerPhone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      tags: generateTags(rating),
      notes: Math.random() > 0.6 ? "Follow up with customer about their experience" : undefined,
      replyText: statuses[randomStatusIndex] === "replied" ? generateReplyText(rating) : undefined
    });
  }
  
  return reviews;
}

export function generateMockStats(): ReviewStats {
  // Generate realistic stats
  return {
    averageRating: 4.2,
    totalReviews: 253,
    platformCounts: {
      google: 104,
      facebook: 68,
      yelp: 41,
      inApp: 40
    },
    responseTime: 3.5, // hours
    sentimentAnalysis: {
      positive: 68,
      neutral: 24,
      negative: 8
    },
    ratingTrend: generateRatingTrend()
  };
}

function generateRatingTrend() {
  const trend = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Generate slightly random rating between 3.8 and 4.6
    const rating = 3.8 + Math.random() * 0.8;
    
    trend.push({
      date: date.toISOString().split('T')[0],
      rating: parseFloat(rating.toFixed(1))
    });
  }
  
  return trend;
}

function generateReviewText(rating: number): string {
  if (rating >= 4) {
    const positiveTexts = [
      "Great service! The team was responsive and professional. Would definitely use again.",
      "Very satisfied with the quality of service. They went above and beyond my expectations.",
      "The staff was friendly and helpful. I had a great experience working with them.",
      "Fantastic experience from start to finish. Would highly recommend.",
      "Amazing customer service. They really take care of their customers!"
    ];
    return positiveTexts[Math.floor(Math.random() * positiveTexts.length)];
  } else if (rating === 3) {
    const neutralTexts = [
      "Service was okay. Nothing exceptional but got the job done.",
      "Average experience. Some things could be improved but overall acceptable.",
      "Decent service but took longer than expected to complete.",
      "The product is good but customer service could be better.",
      "Reasonable value for money but there are some areas for improvement."
    ];
    return neutralTexts[Math.floor(Math.random() * neutralTexts.length)];
  } else {
    const negativeTexts = [
      "Disappointed with the service. Expected much better quality.",
      "Poor communication throughout the process. Would not recommend.",
      "Had issues that were never properly resolved despite multiple attempts.",
      "Not satisfied with the end result. Wouldn't use again.",
      "Customer service was unresponsive when I had problems."
    ];
    return negativeTexts[Math.floor(Math.random() * negativeTexts.length)];
  }
}

function generateReplyText(rating: number): string {
  if (rating >= 4) {
    return "Thank you so much for your kind words! We're thrilled to hear you had such a positive experience with us. We look forward to serving you again soon!";
  } else if (rating === 3) {
    return "Thank you for your feedback. We appreciate you taking the time to share your experience, and we'll certainly take your suggestions into consideration as we continue to improve our services.";
  } else {
    return "We sincerely apologize for your experience and would like to make things right. Please contact our customer support team directly so we can address your concerns personally.";
  }
}

function generateTags(rating: number): string[] {
  const allTags = ["positive", "negative", "neutral", "needs follow-up", "product feedback", "service feedback", "pricing feedback"];
  
  if (rating >= 4) {
    return ["positive"];
  } else if (rating === 3) {
    return ["neutral", Math.random() > 0.5 ? "needs follow-up" : "product feedback"];
  } else {
    return ["negative", "needs follow-up"];
  }
}
