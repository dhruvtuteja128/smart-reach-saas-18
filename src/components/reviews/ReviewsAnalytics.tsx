
import { BarChart3, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewStats } from "@/types/reviews";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface ReviewsAnalyticsProps {
  stats: ReviewStats | null;
}

export function ReviewsAnalytics({ stats }: ReviewsAnalyticsProps) {
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[300px]">
          <div>Loading analytics...</div>
        </CardContent>
      </Card>
    );
  }
  
  const platformData = [
    { name: "Google", value: stats.platformCounts.google },
    { name: "Facebook", value: stats.platformCounts.facebook },
    { name: "Yelp", value: stats.platformCounts.yelp },
    { name: "In-App", value: stats.platformCounts.inApp },
  ];
  
  const sentimentData = [
    { name: "Positive", value: stats.sentimentAnalysis.positive },
    { name: "Neutral", value: stats.sentimentAnalysis.neutral },
    { name: "Negative", value: stats.sentimentAnalysis.negative },
  ];
  
  const COLORS = ["#5E5CE6", "#2DD4BF", "#FF7E67", "#A099FF"];
  const SENTIMENT_COLORS = ["#22c55e", "#64748b", "#ef4444"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <div>Average Rating</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-yellow-400" : 
                    i < Math.ceil(stats.averageRating) ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"
                  }`}
                />
              ))}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            From {stats.totalReviews} total reviews
          </p>
          
          <div className="h-[100px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.ratingTrend}>
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5E5CE6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#5E5CE6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[3, 5]} 
                  tick={false} 
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => [`${value} stars`, "Rating"]}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px'
                  }}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#5E5CE6" 
                  fillOpacity={1} 
                  fill="url(#colorRating)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} reviews`, ""]}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px'
                  }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px'
                  }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Average Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.responseTime} hours</div>
            <p className="text-sm text-muted-foreground mt-1">
              Industry avg: 7.2 hours
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
