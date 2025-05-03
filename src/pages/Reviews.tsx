
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { ReviewsAnalytics } from "@/components/reviews/ReviewsAnalytics";
import { ReviewsHeader } from "@/components/reviews/ReviewsHeader";
import { ReviewDetailDialog } from "@/components/reviews/ReviewDetailDialog";
import { ReviewRequestDrawer } from "@/components/reviews/ReviewRequestDrawer";
import { useReviews } from "@/hooks/use-reviews";
import { Review } from "@/types/reviews";

const Reviews = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [dateRange, setDateRange] = useState("30");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showRequestDrawer, setShowRequestDrawer] = useState(false);

  const { reviews, isLoading, stats } = useReviews({ 
    platform: selectedTab === "all" ? undefined : selectedTab,
    dateRange,
    search: searchQuery
  });

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <ReviewsHeader 
          onDateRangeChange={setDateRange} 
          onSearchChange={setSearchQuery}
          onRequestReviewClick={() => setShowRequestDrawer(true)}
          dateRange={dateRange}
          searchQuery={searchQuery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                <TabsTrigger value="yelp">Yelp</TabsTrigger>
                <TabsTrigger value="in-app">In-App</TabsTrigger>
                <TabsTrigger value="unreplied">Unreplied</TabsTrigger>
                <TabsTrigger value="low">Low Rating</TabsTrigger>
              </TabsList>
              <TabsContent value={selectedTab} className="mt-0">
                <ReviewsList 
                  reviews={reviews} 
                  isLoading={isLoading} 
                  onReviewClick={setSelectedReview} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <ReviewsAnalytics stats={stats} />
          </div>
        </div>

        {selectedReview && (
          <ReviewDetailDialog
            review={selectedReview}
            open={!!selectedReview}
            onOpenChange={() => setSelectedReview(null)}
          />
        )}

        <ReviewRequestDrawer 
          open={showRequestDrawer}
          onOpenChange={setShowRequestDrawer}
        />
      </div>
    </Layout>
  );
};

export default Reviews;
