
import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ContactsTable } from "@/components/crm/ContactsTable";
import { ContactDrawer } from "@/components/crm/ContactDrawer";
import { CrmFilters } from "@/components/crm/CrmFilters";
import { CrmAnalytics } from "@/components/crm/CrmAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, SlidersHorizontal, Users, Filter, 
  Download, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact } from "@/types/communication";
import { mockContacts } from "@/data/mock-crm-data";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const CRM = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactSelect = (contactId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
  };

  const handleCloseDrawer = () => {
    setActiveContact(null);
  };

  const handleAddContact = () => {
    toast({
      title: "Add Contact",
      description: "The add contact form will open here"
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contacts selected",
        description: "Please select at least one contact",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case "tag":
        toast({
          title: `Tagged ${selectedContacts.length} contacts`,
          description: "Tags have been applied successfully"
        });
        break;
      case "campaign":
        toast({
          title: `Added ${selectedContacts.length} contacts to campaign`,
          description: "Contacts added to campaign successfully"
        });
        break;
      case "export":
        toast({
          title: `Exporting ${selectedContacts.length} contacts`,
          description: "Your export will be ready shortly"
        });
        break;
      case "delete":
        toast({
          title: `Deleted ${selectedContacts.length} contacts`,
          description: "Contacts have been deleted successfully",
          variant: "destructive"
        });
        setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)));
        setSelectedContacts([]);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in space-y-6">
        {/* Header Section */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contacts / CRM</h1>
            <p className="text-muted-foreground mt-1">
              Manage your leads and customers in one place
            </p>
          </div>
          <Button onClick={handleAddContact}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </header>

        {/* Analytics Summary */}
        <CrmAnalytics />
        
        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            
            {selectedContacts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions ({selectedContacts.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction("tag")}>
                    Add/Remove Tags
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("campaign")}>
                    Add to Campaign
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive" 
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && <CrmFilters />}

        {/* Contact Views */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="segments">Saved Segments</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <ContactsTable 
              contacts={filteredContacts} 
              selectedContacts={selectedContacts}
              onContactSelect={handleContactSelect}
              onSelectAll={handleSelectAll}
              onContactClick={handleContactClick}
            />
          </TabsContent>
          <TabsContent value="leads" className="mt-4">
            <ContactsTable 
              contacts={filteredContacts.filter(c => c.status === 'Lead' || c.status === 'Qualified')} 
              selectedContacts={selectedContacts}
              onContactSelect={handleContactSelect}
              onSelectAll={handleSelectAll}
              onContactClick={handleContactClick}
            />
          </TabsContent>
          <TabsContent value="customers" className="mt-4">
            <ContactsTable 
              contacts={filteredContacts.filter(c => c.status === 'Customer')} 
              selectedContacts={selectedContacts}
              onContactSelect={handleContactSelect}
              onSelectAll={handleSelectAll}
              onContactClick={handleContactClick}
            />
          </TabsContent>
          <TabsContent value="segments" className="mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md bg-muted/10">
              <div className="text-center">
                <Users className="h-10 w-10 mb-2 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium">No saved segments yet</h3>
                <p className="text-muted-foreground">Create filters and save them as segments</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Drawer */}
      {activeContact && (
        <ContactDrawer 
          contact={activeContact} 
          onClose={handleCloseDrawer} 
        />
      )}
    </Layout>
  );
};

export default CRM;
