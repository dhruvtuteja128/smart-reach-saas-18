
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
