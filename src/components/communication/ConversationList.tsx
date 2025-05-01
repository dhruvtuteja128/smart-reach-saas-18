
import { useState } from "react";
import { MessageCircle, Mail, Phone, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Conversation, MessageChannel } from "@/types/communication";
import { Badge } from "@/components/ui/badge";

interface ConversationListProps {
  conversations: Conversation[];
  contacts: Record<string, any>;
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const channelIcons: Record<MessageChannel, React.ReactNode> = {
  sms: <MessageCircle className="h-4 w-4 text-green-500" />,
  email: <Mail className="h-4 w-4 text-blue-500" />,
  whatsapp: <Phone className="h-4 w-4 text-green-600" />,
  chat: <MessageSquare className="h-4 w-4 text-purple-500" />
};

const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return messageTime.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export function ConversationList({
  conversations,
  contacts,
  selectedConversation,
  onSelectConversation
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredConversations = conversations.filter(conv => {
    const contact = contacts[conv.contactId];
    const matchesSearch = !searchQuery || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesChannel = activeTab === "all" || conv.channel === activeTab;
    
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-5 px-4 py-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="flex-1 overflow-y-auto mt-0 data-[state=active]:flex-1">
          <div className="divide-y">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const contact = contacts[conversation.contactId];
                return (
                  <div
                    key={conversation.id}
                    className={cn(
                      "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                      selectedConversation?.id === conversation.id && "bg-muted"
                    )}
                    onClick={() => onSelectConversation(conversation)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {contact.avatar ? (
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-medium">
                            {contact.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                        {channelIcons[conversation.channel]}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {getTimeAgo(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      
                      <p className={cn(
                        "text-sm truncate mt-1",
                        conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"
                      )}>
                        {conversation.lastMessage.isOutbound && "You: "}
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                    
                    {conversation.unread && (
                      <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center">
                        •
                      </Badge>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
