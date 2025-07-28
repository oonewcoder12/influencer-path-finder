import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Mail, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Target,
  Plus,
  MoreHorizontal,
  Sparkles,
  Search,
  MessageSquare,
  Wand2,
  ArrowRight,
  List,
  History
} from "lucide-react";
import Header from "@/components/Header";
import AISearchModal from "@/components/AISearchModal";
import ListManagement from "@/components/ListManagement";

const Dashboard = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [savedLists, setSavedLists] = useState([
    { id: 1, name: "Tech Influencers Q4", count: 12, created: "2 days ago" },
    { id: 2, name: "Fashion Micro-Influencers", count: 8, created: "1 week ago" },
    { id: 3, name: "Gaming Content Creators", count: 15, created: "2 weeks ago" }
  ]);
  const [searchHistory, setSearchHistory] = useState([
    "Tech influencers with 50K+ followers for SaaS launch",
    "Fashion micro-influencers in California",
    "Gaming content creators with high engagement"
  ]);
  const stats = [
    {
      title: "Total Campaigns",
      value: "12",
      change: "+2 this month",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Active Outreach",
      value: "47",
      change: "15 pending",
      icon: Mail,
      color: "text-green-600"
    },
    {
      title: "Response Rate",
      value: "34%",
      change: "+5% vs last month",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Saved Contacts",
      value: "238",
      change: "+18 this week",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: "Summer Tech Launch",
      status: "active",
      progress: 65,
      influencers: 8,
      responses: 5,
      budget: "$5,000",
      deadline: "Jul 30, 2024"
    },
    {
      id: 2,
      name: "Back to School",
      status: "draft",
      progress: 20,
      influencers: 12,
      responses: 0,
      budget: "$3,500",
      deadline: "Aug 15, 2024"
    },
    {
      id: 3,
      name: "Holiday Collection",
      status: "planning",
      progress: 5,
      influencers: 0,
      responses: 0,
      budget: "$8,000",
      deadline: "Nov 1, 2024"
    }
  ];

  const recentActivity = [
    {
      type: "response",
      influencer: "Sarah Johnson",
      campaign: "Summer Tech Launch",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2b3e5?w=150&h=150&fit=crop&crop=face"
    },
    {
      type: "sent",
      influencer: "Mike Chen",
      campaign: "Back to School",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      type: "added",
      influencer: "Emma Rodriguez",
      campaign: "Summer Tech Launch",
      time: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "draft": return "bg-yellow-500";
      case "planning": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "response": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "sent": return <Mail className="w-4 h-4 text-blue-600" />;
      case "added": return <Plus className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAISearch = () => {
    if (aiQuery.trim()) {
      setIsAIModalOpen(true);
    }
  };

  const handleCreateCampaign = (results: any) => {
    // Add the new campaign to saved lists
    const newList = {
      id: savedLists.length + 1,
      name: results.campaignName,
      count: results.influencers.length,
      created: "Just now"
    };
    setSavedLists([newList, ...savedLists]);
    
    // Add to search history if not already there
    if (!searchHistory.includes(aiQuery)) {
      setSearchHistory([aiQuery, ...searchHistory.slice(0, 4)]);
    }
    
    setAiQuery("");
  };

  const quickSearchSuggestions = [
    "Tech influencers for SaaS launch",
    "Fashion micro-influencers",
    "Gaming content creators",
    "Fitness enthusiasts with 10K+ followers"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* AI-Powered Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Influencer Discovery</h1>
              <p className="text-muted-foreground">Discover perfect influencers using natural language</p>
            </div>
          </div>

          {/* AI Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Input
                placeholder="Describe your perfect influencer campaign... e.g., 'Find tech influencers with 50K+ followers for our SaaS launch'"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                className="h-14 pl-12 pr-32 text-base bg-background/60 backdrop-blur-sm border-2"
              />
              <Wand2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Button 
                onClick={handleAISearch}
                disabled={!aiQuery.trim()}
                variant="hero"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {quickSearchSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiQuery(suggestion);
                    setTimeout(() => handleAISearch(), 100);
                  }}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Saved Influencer Lists */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <List className="w-5 h-5" />
              My Influencer Lists
            </h2>
            <div className="space-y-4">
              {savedLists.map((list) => (
                <Card key={list.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{list.name}</h3>
                    <Badge variant="secondary">{list.count} influencers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Created {list.created}</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setIsListModalOpen(true)}
                    >
                      View List
                    </Button>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full h-20 border-dashed"
                onClick={() => setIsAIModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New List with AI
              </Button>
            </div>
          </div>

          {/* Active Campaigns */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Campaigns
            </h2>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Influencers</p>
                        <p className="font-medium">{campaign.influencers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Responses</p>
                        <p className="font-medium">{campaign.responses}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deadline</p>
                        <p className="font-medium">{campaign.deadline}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Search History & Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Searches
            </h2>
            <Card className="p-6 mb-6">
              <div className="space-y-3">
                {searchHistory.map((search, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setAiQuery(search);
                      handleAISearch();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm">{search}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>

            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <Card className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activity.avatar} alt={activity.influencer} />
                      <AvatarFallback>{activity.influencer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.type === "response" && "Response from "}
                        {activity.type === "sent" && "Message sent to "}
                        {activity.type === "added" && "Added "}
                        <span className="text-primary">{activity.influencer}</span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.campaign}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Activity
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <AISearchModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)}
        onCreateCampaign={handleCreateCampaign}
      />
      
      <ListManagement 
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;