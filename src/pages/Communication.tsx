
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ConversationList } from "@/components/communication/ConversationList";
import { ConversationView } from "@/components/communication/ConversationView";
import { ContactProfile } from "@/components/communication/ContactProfile";
import { NewCampaignDrawer } from "@/components/communication/NewCampaignDrawer";
import { Conversation, Contact, Message } from "@/types/communication";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Mock data
const mockContacts: Record<string, Contact> = {
  "c1": {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    tags: ["VIP", "Customer"],
    lastActivity: "2025-04-28T14:30:00.000Z"
  },
  "c2": {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 555-987-6543",
    tags: ["Lead", "Website Visit"],
    lastActivity: "2025-04-29T09:15:00.000Z"
  },
  "c3": {
    id: "c3",
    name: "Michael Wong",
    email: "michael.w@example.com",
    phone: "+1 555-222-3333",
    tags: ["Customer", "Support"],
    lastActivity: "2025-05-01T11:45:00.000Z"
  },
  "c4": {
    id: "c4",
    name: "Emma Davis",
    email: "emma.d@example.com",
    phone: "+1 555-444-5555",
    tags: ["Customer", "Prospect"],
    lastActivity: "2025-04-30T16:20:00.000Z"
  }
};

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    contactId: "c1",
    channel: "sms",
    unread: true,
    lastMessage: {
      id: "m5",
      senderId: "c1",
      content: "Thanks for the information. When can I expect delivery?",
      timestamp: "2025-05-01T09:30:00.000Z",
      isOutbound: false
    },
    messages: [
      {
        id: "m1",
        senderId: "c1",
        content: "Hi there, I'm interested in your product.",
        timestamp: "2025-04-30T10:00:00.000Z",
        isOutbound: false
      },
      {
        id: "m2",
        senderId: "agent",
        content: "Hello John! Thanks for reaching out. Which product are you interested in?",
        timestamp: "2025-04-30T10:05:00.000Z",
        isOutbound: true,
        status: "read"
      },
      {
        id: "m3",
        senderId: "c1",
        content: "I'm looking at the Premium Package on your website.",
        timestamp: "2025-04-30T10:10:00.000Z",
        isOutbound: false
      },
      {
        id: "m4",
        senderId: "agent",
        content: "Great choice! The Premium Package includes all features plus priority support. It's currently on sale for $99/month.",
        timestamp: "2025-04-30T10:15:00.000Z",
        isOutbound: true,
        status: "read"
      },
      {
        id: "m5",
        senderId: "c1",
        content: "Thanks for the information. When can I expect delivery?",
        timestamp: "2025-05-01T09:30:00.000Z",
        isOutbound: false
      }
    ]
  },
  {
    id: "conv2",
    contactId: "c2",
    channel: "email",
    unread: false,
    lastMessage: {
      id: "m7",
      senderId: "agent",
      content: "I've sent you the proposal. Let me know if you have any questions or need any changes!",
      timestamp: "2025-04-29T14:45:00.000Z",
      isOutbound: true,
      status: "delivered"
    },
    messages: [
      {
        id: "m6",
        senderId: "c2",
        content: "Could you send me more information about your services? I'm specifically interested in your marketing automation tools.",
        timestamp: "2025-04-29T14:30:00.000Z",
        isOutbound: false
      },
      {
        id: "m7",
        senderId: "agent",
        content: "I've sent you the proposal. Let me know if you have any questions or need any changes!",
        timestamp: "2025-04-29T14:45:00.000Z",
        isOutbound: true,
        status: "delivered"
      }
    ]
  },
  {
    id: "conv3",
    contactId: "c3",
    channel: "whatsapp",
    unread: true,
    lastMessage: {
      id: "m8",
      senderId: "c3",
      content: "Hi, I'm having an issue with my account. It says my subscription has expired but I just renewed it.",
      timestamp: "2025-05-01T08:15:00.000Z",
      isOutbound: false
    },
    messages: [
      {
        id: "m8",
        senderId: "c3",
        content: "Hi, I'm having an issue with my account. It says my subscription has expired but I just renewed it.",
        timestamp: "2025-05-01T08:15:00.000Z",
        isOutbound: false
      }
    ]
  },
  {
    id: "conv4",
    contactId: "c4",
    channel: "chat",
    unread: false,
    lastMessage: {
      id: "m10",
      senderId: "agent",
      content: "That's great to hear! Let me know if you need any help getting started. Here are some resources you might find useful.",
      timestamp: "2025-04-30T17:05:00.000Z",
      isOutbound: true,
      status: "read"
    },
    messages: [
      {
        id: "m9",
        senderId: "c4",
        content: "Just wanted to let you know I just signed up for your service!",
        timestamp: "2025-04-30T17:00:00.000Z",
        isOutbound: false
      },
      {
        id: "m10",
        senderId: "agent",
        content: "That's great to hear! Let me know if you need any help getting started. Here are some resources you might find useful.",
        timestamp: "2025-04-30T17:05:00.000Z",
        isOutbound: true,
        status: "read"
      }
    ]
  }
];

const Communication = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showCampaignDrawer, setShowCampaignDrawer] = useState(false);
  const [showContactProfile, setShowContactProfile] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark conversation as read when selected
    if (conversation.unread) {
      const updatedConversations = conversations.map(conv =>
        conv.id === conversation.id ? { ...conv, unread: false } : conv
      );
      setConversations(updatedConversations);
    }
    setSelectedConversation(conversation);
    
    // On mobile, hide the contact profile when selecting a conversation
    if (isMobile && showContactProfile) {
      setShowContactProfile(false);
    }
  };
  
  const handleSendMessage = (conversationId: string, content: string) => {
    const timestamp = new Date().toISOString();
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "agent",
      content,
      timestamp,
      isOutbound: true,
      status: "sent"
    };
    
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: newMessage,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );
  };
  
  return (
    <Layout>
      <div className="animate-fade-in h-screen flex flex-col">
        <header className="px-6 py-4 md:px-8 border-b flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Communication Suite</h1>
            <p className="text-muted-foreground mt-1">
              Manage customer conversations across all channels
            </p>
          </div>
          
          <Button onClick={() => setShowCampaignDrawer(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Broadcast
          </Button>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <div className={cn(
            "w-full md:w-80 lg:w-96 flex-shrink-0 border-r h-full",
            selectedConversation && isMobile && "hidden"
          )}>
            <ConversationList
              conversations={conversations}
              contacts={mockContacts}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          
          {selectedConversation ? (
            <>
              <div className={cn(
                "flex-1 h-full",
                isMobile && showContactProfile && "hidden"
              )}>
                <ConversationView
                  conversation={selectedConversation}
                  contact={mockContacts[selectedConversation.contactId]}
                  onSendMessage={handleSendMessage}
                />
              </div>
              
              {!isMobile && (
                <div className="w-80 flex-shrink-0">
                  <ContactProfile
                    contact={mockContacts[selectedConversation.contactId]}
                  />
                </div>
              )}
              
              {isMobile && showContactProfile && (
                <div className="w-full">
                  <ContactProfile
                    contact={mockContacts[selectedConversation.contactId]}
                    onClose={() => setShowContactProfile(false)}
                    className="h-full"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <PlusCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mt-6">No Conversation Selected</h2>
                <p className="text-muted-foreground mt-2">
                  Select a conversation from the list to view the full thread, or start a new broadcast campaign.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setShowCampaignDrawer(true)}>
                    Start New Campaign
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <NewCampaignDrawer 
          open={showCampaignDrawer}
          onOpenChange={setShowCampaignDrawer}
        />
      </div>
    </Layout>
  );
};

export default Communication;
