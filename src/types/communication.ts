
export type MessageChannel = "sms" | "email" | "whatsapp" | "chat";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  lastActivity: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOutbound: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  status?: "sent" | "delivered" | "read";
}

export interface Conversation {
  id: string;
  contactId: string;
  channel: MessageChannel;
  lastMessage: Message;
  unread: boolean;
  flagged?: boolean;
  messages: Message[];
}
