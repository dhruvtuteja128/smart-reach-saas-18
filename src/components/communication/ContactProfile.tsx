
import { Mail, Phone, Tag, Clock, X } from "lucide-react";
import { Contact } from "@/types/communication";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContactProfileProps {
  contact: Contact;
  onClose?: () => void;
  className?: string;
}

export function ContactProfile({ contact, onClose, className }: ContactProfileProps) {
  return (
    <div className={cn("border-l h-full overflow-y-auto", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Contact Details</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="p-4 text-center border-b">
        <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl font-medium">{contact.name.charAt(0)}</span>
          )}
        </div>
        <h2 className="font-semibold text-lg mt-3">{contact.name}</h2>
      </div>
      
      <div className="p-4 space-y-4 border-b">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{contact.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{contact.phone}</span>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
          <Tag className="h-3.5 w-3.5" /> Tags
        </h4>
        <div className="flex flex-wrap gap-1">
          {contact.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Activity
        </h4>
        <p className="text-sm text-muted-foreground">
          Last active: {new Date(contact.lastActivity).toLocaleDateString()}
        </p>
      </div>
      
      <div className="p-4 border-t mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            View History
          </Button>
          <Button variant="outline" size="sm">
            Edit Contact
          </Button>
        </div>
      </div>
    </div>
  );
}
