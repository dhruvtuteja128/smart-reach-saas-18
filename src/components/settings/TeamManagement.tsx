
import { useState } from "react";
import { Users, Search, Plus, Trash2, MoreVertical, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "inactive";
};

export function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("marketer");
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "admin", status: "active" },
    { id: "2", name: "Jamie Smith", email: "jamie@example.com", role: "marketer", status: "active" },
    { id: "3", name: "Taylor Wilson", email: "taylor@example.com", role: "sales", status: "active" },
    { id: "4", name: "Morgan Lee", email: "morgan@example.com", role: "support", status: "invited" },
    { id: "5", name: "Casey Brown", email: "casey@example.com", role: "custom", status: "inactive" },
  ]);

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inviteNewMember = () => {
    if (!newMemberEmail.trim()) return;
    
    const newMember: TeamMember = {
      id: `${teamMembers.length + 1}`,
      name: newMemberEmail.split("@")[0],
      email: newMemberEmail,
      role: newMemberRole,
      status: "invited"
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
  };

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const changeRole = (id: string, role: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? {...member, role} : member
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "invited": return "bg-amber-500";
      case "inactive": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Team Management</h2>
        <p className="text-muted-foreground">Manage your team members and their permissions</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage users and their roles</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-1 h-4 w-4" /> Invite User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your workspace.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    placeholder="colleague@example.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="role">
                    Role
                  </label>
                  <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={inviteNewMember}>Send Invitation</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
                <div className="col-span-5 md:col-span-4">User</div>
                <div className="hidden md:block md:col-span-3">Email</div>
                <div className="col-span-4 md:col-span-2">Role</div>
                <div className="col-span-2 md:col-span-2">Status</div>
                <div className="col-span-1 md:col-span-1"></div>
              </div>
              
              <div className="divide-y">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="grid grid-cols-12 gap-4 p-4 items-center text-sm">
                    <div className="col-span-5 md:col-span-4 font-medium">{member.name}</div>
                    <div className="hidden md:block md:col-span-3 text-muted-foreground">{member.email}</div>
                    <div className="col-span-4 md:col-span-2">
                      <Select defaultValue={member.role} onValueChange={(value) => changeRole(member.id, value)}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="marketer">Marketer</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                        <span className="capitalize text-sm">{member.status}</span>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Activity className="h-4 w-4" /> View Activity
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeMember(member.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredMembers.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No team members found matching your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Permission Presets</CardTitle>
          <CardDescription>Configure default permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Admin</h3>
                <Badge variant="secondary" className="whitespace-normal h-auto py-1 text-xs">
                  Full access to all features and settings
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Marketer</h3>
                <Badge variant="secondary" className="whitespace-normal h-auto py-1 text-xs">
                  Create campaigns, edit content, view analytics
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Sales</h3>
                <Badge variant="secondary" className="whitespace-normal h-auto py-1 text-xs">
                  Manage leads, create deals, view CRM data
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Support</h3>
                <Badge variant="secondary" className="whitespace-normal h-auto py-1 text-xs">
                  Respond to messages, handle reviews, view customer data
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Custom</h3>
                <Badge variant="secondary" className="whitespace-normal h-auto py-1 text-xs">
                  Customized permissions based on specific needs
                </Badge>
              </div>
            </div>
            
            <Button variant="outline">Customize Role Permissions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
