
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "@/types/communication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ContactsTableProps = {
  contacts: Contact[];
  selectedContacts: string[];
  onContactSelect: (contactId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onContactClick: (contact: Contact) => void;
};

export const ContactsTable = ({
  contacts,
  selectedContacts,
  onContactSelect,
  onSelectAll,
  onContactClick
}: ContactsTableProps) => {
  const allSelected = contacts.length > 0 && contacts.every(contact => 
    selectedContacts.includes(contact.id)
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Lead": return "bg-blue-500/10 text-blue-500";
      case "Qualified": return "bg-amber-500/10 text-amber-500";
      case "Customer": return "bg-green-500/10 text-green-500";
      case "Inactive": return "bg-gray-500/10 text-gray-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="border rounded-md overflow-auto">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={(checked) => {
                  onSelectAll(checked === true);
                }}
              />
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email / Phone</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow 
                key={contact.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onContactClick(contact)}
              >
                <TableCell 
                  className="w-12"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox 
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => {
                      onContactSelect(contact.id, checked === true);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      {contact.company && (
                        <div className="text-sm text-muted-foreground">
                          {contact.company}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{contact.email}</span>
                    {contact.phone && (
                      <span className="text-sm text-muted-foreground">
                        {contact.phone}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {contact.source || "Direct"}
                </TableCell>
                <TableCell>
                  {formatDate(contact.lastActivity)}
                </TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", getStatusColor(contact.status || 'Lead'))}>
                    {contact.status || 'Lead'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={cn("font-medium", getScoreColor(contact.score || 0))}>
                    {contact.score || 0}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Never';
  
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
