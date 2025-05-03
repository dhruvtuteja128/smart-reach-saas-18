
export interface Interaction {
  id: string;
  contactId: string;
  type: "email" | "message" | "pageview" | "review" | "campaign" | "purchase" | string;
  title: string;
  description: string;
  timestamp: string;
  content?: string;
  campaign?: string;
  status?: string;
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, any>;
  count: number;
  createdAt: string;
}

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Campaign {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp" | "ads" | string;
  status: "live" | "paused" | "scheduled" | "draft" | "completed";
  audience: Segment;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
    converted: number;
    revenue: number;
    openRate?: number;
    clickRate?: number;
    replyRate?: number;
    conversionRate?: number;
  };
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
  tags: string[];
}
