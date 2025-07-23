import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Heart, Users, TrendingUp, ExternalLink } from "lucide-react";
import Header from "@/components/Header";

const Database = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock influencer data
  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjtech",
      platform: "Instagram",
      followers: "125K",
      engagement: "4.8%",
      niche: "Technology",
      location: "San Francisco",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2b3e5?w=150&h=150&fit=crop&crop=face",
      recentPost: "Latest AI tools review",
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikecreates",
      platform: "YouTube",
      followers: "89K",
      engagement: "6.2%",
      niche: "Design",
      location: "New York",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      recentPost: "UI/UX trends 2024",
      verified: false
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@emmalifestyle",
      platform: "TikTok",
      followers: "234K",
      engagement: "8.1%",
      niche: "Lifestyle",
      location: "Los Angeles",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      recentPost: "Morning routine secrets",
      verified: true
    },
    {
      id: 4,
      name: "David Park",
      handle: "@davidfitness",
      platform: "Instagram",
      followers: "167K",
      engagement: "5.4%",
      niche: "Fitness",
      location: "Miami",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      recentPost: "Home workout tips",
      verified: true
    }
  ];

  const niches = ["All", "Technology", "Design", "Lifestyle", "Fitness", "Travel", "Food", "Fashion"];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Influencer Database</h1>
          <p className="text-muted-foreground">Discover and connect with verified creators across all platforms</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search influencers by name, niche, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>
          
          {/* Niche Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {niches.map((niche) => (
              <Button
                key={niche}
                variant={niche === "All" ? "default" : "secondary"}
                size="sm"
              >
                {niche}
              </Button>
            ))}
          </div>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {influencers.map((influencer) => (
            <Card key={influencer.id} className="p-6 hover:shadow-elegant transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={influencer.avatar} alt={influencer.name} />
                    <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{influencer.name}</h3>
                      {influencer.verified && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                    <p className="text-xs text-muted-foreground">{influencer.location}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold">{influencer.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold">{influencer.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {influencer.platform}
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <Badge variant="outline" className="mr-2">
                  {influencer.niche}
                </Badge>
                <span className="text-sm text-muted-foreground">"{influencer.recentPost}"</span>
              </div>

              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1">
                  Add to Campaign
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Results</Button>
        </div>
      </div>
    </div>
  );
};

export default Database;