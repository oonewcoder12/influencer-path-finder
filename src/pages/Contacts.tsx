import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, MessageCircle, Download, Star, Users } from "lucide-react";
import Header from "@/components/Header";

interface Contact {
  id: number;
  name: string;
  username: string;
  platform: string;
  followers: string;
  engagement: string;
  email?: string;
  status: "Not Contacted" | "Reached Out" | "Responded" | "Negotiating" | "Booked";
  tags: string[];
  addedDate: string;
}

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock data - in a real app, this would come from your state management or API
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarahjohnson",
      platform: "Instagram",
      followers: "125K",
      engagement: "4.2%",
      email: "sarah@email.com",
      status: "Responded",
      tags: ["Fashion", "Lifestyle"],
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Tech Mike",
      username: "@techmike",
      platform: "YouTube",
      followers: "89K",
      engagement: "6.1%",
      status: "Reached Out",
      tags: ["Technology", "Reviews"],
      addedDate: "2024-01-14"
    },
    {
      id: 3,
      name: "FitLife Emma",
      username: "@fitlifeemma",
      platform: "TikTok",
      followers: "200K",
      engagement: "8.3%",
      email: "emma@fitlife.com",
      status: "Booked",
      tags: ["Fitness", "Health"],
      addedDate: "2024-01-13"
    }
  ]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "All" || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Contacted": return "bg-muted text-muted-foreground";
      case "Reached Out": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Responded": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Negotiating": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Booked": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const exportContacts = () => {
    const csvContent = [
      ["Name", "Username", "Platform", "Followers", "Engagement", "Email", "Status", "Tags", "Added Date"],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.username,
        contact.platform,
        contact.followers,
        contact.engagement,
        contact.email || "",
        contact.status,
        contact.tags.join("; "),
        contact.addedDate
      ])
    ].map(row => row.map(field => `"${field}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusOptions = ["All", "Not Contacted", "Reached Out", "Responded", "Negotiating", "Booked"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Contact Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your influencer contacts and track outreach progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {filteredContacts.length} contacts
            </div>
            <Button onClick={exportContacts} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contacts by name, username, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {filteredContacts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "All" 
                  ? "Try adjusting your search or filters"
                  : "Start building your influencer network by shortlisting creators from the Database"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {contact.name}
                        <Badge variant="outline" className="text-xs">
                          {contact.platform}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="font-mono">
                        {contact.username}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="font-semibold">{contact.followers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="font-semibold">{contact.engagement}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-sm">
                        {contact.email || "Not available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Added</p>
                      <p className="font-semibold text-sm">{contact.addedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        DM
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Contacts;