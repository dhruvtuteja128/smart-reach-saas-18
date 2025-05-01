
import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Conversation, Contact, Message, MessageChannel } from "@/types/communication";

interface ConversationViewProps {
  conversation: Conversation;
  contact: Contact;
  onSendMessage: (conversationId: string, content: string) => void;
}

const channelLabels: Record<MessageChannel, string> = {
  sms: "SMS",
  email: "Email",
  whatsapp: "WhatsApp",
  chat: "Live Chat"
};

export function ConversationView({ conversation, contact, onSendMessage }: ConversationViewProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(conversation.id, message);
    setMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium">{contact.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              {channelLabels[conversation.channel]}
            </p>
          </div>
        </div>
        
        <div>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex max-w-[80%]",
              message.isOutbound ? "ml-auto" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "rounded-lg p-3",
                message.isOutbound 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div className="text-xs mt-1 opacity-80 flex items-center gap-1 justify-end">
                {formatMessageTime(message.timestamp)}
                {message.isOutbound && message.status && (
                  <span>{message.status === "read" ? "✓✓" : "✓"}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type your message (${channelLabels[conversation.channel]})`}
            className="min-h-[80px]"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" title="Attach file">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Insert emoji">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Schedule
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              AI Suggestions
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            Send <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
