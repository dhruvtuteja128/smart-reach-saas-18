
import { Contact } from "@/types/communication";
import { Interaction } from "@/types/crm";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    tags: ["Enterprise", "Sales Demo"],
    lastActivity: "2023-05-12T14:30:00Z",
    status: "Customer",
    score: 85,
    source: "Website Chat",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 987-6543",
    company: "Global Tech",
    tags: ["Hot Lead", "Marketing"],
    lastActivity: "2023-05-14T10:15:00Z",
    status: "Qualified",
    score: 72,
    source: "Google Ads",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 456-7890",
    company: "Innovate Inc",
    tags: ["SMB", "Free Trial"],
    lastActivity: "2023-05-10T09:45:00Z",
    status: "Lead",
    score: 45,
    source: "Referral",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    tags: ["Newsletter", "Webinar Attendee"],
    lastActivity: "2023-05-09T16:20:00Z",
    status: "Lead",
    score: 38,
    source: "LinkedIn",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 876-5432",
    company: "Wilson Consulting",
    tags: ["Enterprise", "Decision Maker"],
    lastActivity: "2023-05-13T11:30:00Z",
    status: "Customer",
    score: 92,
    source: "Direct",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    phone: "+1 (555) 345-6789",
    tags: ["Churned", "Support Ticket"],
    lastActivity: "2023-05-07T14:10:00Z",
    status: "Inactive",
    score: 20,
    source: "Website",
    location: "Miami, FL",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    id: "7",
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "+1 (555) 567-8901",
    company: "Creative Solutions",
    tags: ["Mid-Market", "Demo Request"],
    lastActivity: "2023-05-11T15:45:00Z",
    status: "Qualified",
    score: 68,
    source: "Google Ads",
    location: "Denver, CO",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: "8",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+1 (555) 789-0123",
    company: "Innovate Solutions",
    tags: ["Enterprise", "Technical Contact"],
    lastActivity: "2023-05-14T09:15:00Z",
    status: "Lead",
    score: 53,
    source: "Webinar",
    location: "Seattle, WA",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg"
  },
  {
    id: "9",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "+1 (555) 890-1234",
    company: "Garcia & Partners",
    tags: ["SMB", "Pricing Request"],
    lastActivity: "2023-05-08T13:20:00Z",
    status: "Lead",
    score: 41,
    source: "Facebook Ads",
    location: "Phoenix, AZ",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: "10",
    name: "Emma Brown",
    email: "emma.brown@example.com",
    phone: "+1 (555) 901-2345",
    company: "Brown Enterprises",
    tags: ["Mid-Market", "Decision Maker"],
    lastActivity: "2023-05-12T10:30:00Z",
    status: "Customer",
    score: 88,
    source: "Referral",
    location: "Boston, MA",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

export const mockInteractions: Interaction[] = [
  {
    id: "i1",
    contactId: "1",
    type: "email",
    title: "Campaign: Product Update",
    description: "Opened email",
    timestamp: "2023-05-12T14:30:00Z",
    campaign: "May Product Update",
    status: "Opened"
  },
  {
    id: "i2",
    contactId: "1",
    type: "pageview",
    title: "Visited Pricing Page",
    description: "Spent 3m 45s on page",
    timestamp: "2023-05-12T14:35:00Z"
  },
  {
    id: "i3",
    contactId: "1",
    type: "message",
    title: "Sales Chat",
    description: "Inquired about enterprise plan",
    timestamp: "2023-05-12T14:40:00Z",
    content: "Hi, I'm interested in learning more about your enterprise plan. Do you offer custom integrations?"
  },
  {
    id: "i4",
    contactId: "2",
    type: "campaign",
    title: "Campaign: Summer Promotion",
    description: "Clicked CTA button",
    timestamp: "2023-05-14T10:15:00Z",
    campaign: "Summer Promotion",
    status: "Clicked"
  },
  {
    id: "i5",
    contactId: "2",
    type: "pageview",
    title: "Visited Demo Page",
    description: "Watched demo video",
    timestamp: "2023-05-14T10:20:00Z"
  },
  {
    id: "i6",
    contactId: "3",
    type: "email",
    title: "Campaign: Welcome Series",
    description: "Opened welcome email",
    timestamp: "2023-05-10T09:45:00Z",
    campaign: "Welcome Series",
    status: "Opened"
  },
  {
    id: "i7",
    contactId: "5",
    type: "purchase",
    title: "Subscription Purchase",
    description: "Purchased Enterprise plan",
    timestamp: "2023-05-13T11:30:00Z",
    content: "Annual Enterprise Plan: $12,000"
  },
  {
    id: "i8",
    contactId: "5",
    type: "review",
    title: "Left a Review",
    description: "5-star product review",
    timestamp: "2023-05-13T16:45:00Z",
    content: "Great product! The automation features have saved our team countless hours. Highly recommend for any growing business."
  },
  {
    id: "i9",
    contactId: "5",
    type: "message",
    title: "Support Chat",
    description: "Asked about API documentation",
    timestamp: "2023-05-14T09:15:00Z",
    content: "Where can I find your API documentation? We're looking to build a custom integration."
  },
  {
    id: "i10",
    contactId: "6",
    type: "campaign",
    title: "Campaign: Win-back",
    description: "Did not open email",
    timestamp: "2023-05-07T14:10:00Z",
    campaign: "Customer Win-back",
    status: "Not opened"
  }
];
