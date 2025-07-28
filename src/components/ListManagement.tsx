import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  List, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  Share2, 
  Star,
  Search,
  Filter,
  Users
} from "lucide-react";

interface InfluencerList {
  id: number;
  name: string;
  count: number;
  created: string;
  description?: string;
  tags: string[];
  isStarred: boolean;
}

interface ListManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListManagement = ({ isOpen, onClose }: ListManagementProps) => {
  const [lists, setLists] = useState<InfluencerList[]>([
    { 
      id: 1, 
      name: "Tech Influencers Q4", 
      count: 12, 
      created: "2 days ago", 
      description: "Tech reviewers and early adopters for our Q4 campaigns",
      tags: ["Tech", "Software", "Hardware"],
      isStarred: true 
    },
    { 
      id: 2, 
      name: "Fashion Micro-Influencers", 
      count: 8, 
      created: "1 week ago",
      description: "Fashion micro-influencers with high engagement rates",
      tags: ["Fashion", "Lifestyle", "Micro"],
      isStarred: false 
    },
    { 
      id: 3, 
      name: "Gaming Content Creators", 
      count: 15, 
      created: "2 weeks ago",
      description: "Gaming streamers and content creators",
      tags: ["Gaming", "Streaming", "Entertainment"],
      isStarred: true 
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredLists = lists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedTab === "starred") return matchesSearch && list.isStarred;
    return matchesSearch;
  });

  const toggleStar = (id: number) => {
    setLists(lists.map(list => 
      list.id === id ? { ...list, isStarred: !list.isStarred } : list
    ));
  };

  const exportList = (list: InfluencerList) => {
    // Create a sample CSV content
    const csvContent = `Name,Handle,Platform,Followers,Engagement Rate,Email\n` +
                      `Sample Influencer 1,@sample1,Instagram,50000,4.2%,sample1@email.com\n` +
                      `Sample Influencer 2,@sample2,TikTok,75000,6.1%,sample2@email.com`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '_')}_influencers.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <List className="w-5 h-5" />
            Manage Influencer Lists
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search lists, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All Lists ({lists.length})</TabsTrigger>
              <TabsTrigger value="starred">Starred ({lists.filter(l => l.isStarred).length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <div className="grid gap-4">
                {filteredLists.map((list) => (
                  <Card key={list.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{list.name}</h3>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {list.count}
                          </Badge>
                          {list.isStarred && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        
                        {list.description && (
                          <p className="text-muted-foreground mb-3">{list.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {list.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">Created {list.created}</p>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleStar(list.id)}
                        >
                          <Star className={`w-4 h-4 ${list.isStarred ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => exportList(list)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Influencers
                      </Button>
                      <Button variant="outline" size="sm">
                        Create Campaign
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => exportList(list)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {filteredLists.length === 0 && (
                  <div className="text-center py-12">
                    <List className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No lists found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Try adjusting your search terms" : "Create your first influencer list using AI"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListManagement;