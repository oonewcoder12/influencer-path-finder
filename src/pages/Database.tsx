import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Heart, Users, TrendingUp, ExternalLink, Download, Star, MessageCircle, Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import CampaignModal from "@/components/CampaignModal";
import AIDiscoveryEngine from "@/components/AIDiscoveryEngine";
import BulkOperations from "@/components/BulkOperations";
import EnhancedMatchingSystem from "@/components/EnhancedMatchingSystem";

interface Influencer {
  id: number;
  name: string;
  handle: string;
  email: string;
  platform: string;
  followers: string;
  followersCount: number;
  engagement: string;
  engagementRate: number;
  niche: string;
  location: string;
  city: string;
  state: string;
  country: string;
  avatar: string;
  recentPost: string;
  verified: boolean;
  status: "not-contacted" | "reached-out" | "responded" | "negotiating" | "confirmed" | "declined";
  rating: number;
  notes: string;
  tags: string[];
  price: string;
  lastContact: string;
}

const Database = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedFollowerRange, setSelectedFollowerRange] = useState("All");
  const [selectedEngagementRange, setSelectedEngagementRange] = useState("All");
  const [shortlistedInfluencers, setShortlistedInfluencers] = useState<number[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedInfluencerForCampaign, setSelectedInfluencerForCampaign] = useState<number | null>(null);
  const [activeView, setActiveView] = useState("database"); // database, ai-discovery, bulk-ops
  const [selectedForBulk, setSelectedForBulk] = useState<number[]>([]);
  const { toast } = useToast();

  // Enhanced influencer database with jewelry/fashion focus
  const allInfluencers: Influencer[] = [
    {
      id: 1,
      name: "Sofia Valdez",
      handle: "@sofiajewelry",
      email: "sofia@email.com",
      platform: "Instagram",
      followers: "125K",
      followersCount: 125000,
      engagement: "4.8%",
      engagementRate: 4.8,
      niche: "Jewelry",
      location: "Los Angeles, CA, USA",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2b3e5?w=150&h=150&fit=crop&crop=face",
      recentPost: "Stunning vintage gold rings collection",
      verified: true,
      status: "not-contacted",
      rating: 4.5,
      notes: "",
      tags: ["luxury", "vintage", "gold"],
      price: "$500-1000",
      lastContact: ""
    },
    {
      id: 2,
      name: "Alex Morgan",
      handle: "@alexstyle",
      email: "alex@email.com",
      platform: "TikTok",
      followers: "89K",
      followersCount: 89000,
      engagement: "6.2%",
      engagementRate: 6.2,
      niche: "Fashion",
      location: "New York, NY, USA",
      city: "New York",
      state: "NY",
      country: "USA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      recentPost: "Daily outfit inspiration",
      verified: false,
      status: "not-contacted",
      rating: 4.2,
      notes: "",
      tags: ["daily-wear", "casual"],
      price: "$200-500",
      lastContact: ""
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@emmalifestyle",
      email: "emma@email.com",
      platform: "Instagram",
      followers: "234K",
      followersCount: 234000,
      engagement: "8.1%",
      engagementRate: 8.1,
      niche: "Lifestyle",
      location: "Miami, FL, USA",
      city: "Miami",
      state: "FL",
      country: "USA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      recentPost: "Morning routine with statement jewelry",
      verified: true,
      status: "not-contacted",
      rating: 4.7,
      notes: "",
      tags: ["morning-routine", "statement-pieces"],
      price: "$800-1500",
      lastContact: ""
    },
    {
      id: 4,
      name: "Isabella Chen",
      handle: "@isabellaaccessories",
      email: "isabella@email.com",
      platform: "YouTube",
      followers: "167K",
      followersCount: 167000,
      engagement: "5.4%",
      engagementRate: 5.4,
      niche: "Accessories",
      location: "San Francisco, CA, USA",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      recentPost: "How to style minimalist jewelry",
      verified: true,
      status: "not-contacted",
      rating: 4.4,
      notes: "",
      tags: ["minimalist", "how-to"],
      price: "$600-1200",
      lastContact: ""
    },
    {
      id: 5,
      name: "Maya Patel",
      handle: "@mayaluxe",
      email: "maya@email.com",
      platform: "Instagram",
      followers: "342K",
      followersCount: 342000,
      engagement: "7.3%",
      engagementRate: 7.3,
      niche: "Luxury",
      location: "London, UK",
      city: "London",
      state: "",
      country: "UK",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      recentPost: "Designer diamond pieces worth investing in",
      verified: true,
      status: "not-contacted",
      rating: 4.9,
      notes: "",
      tags: ["luxury", "diamonds", "investment"],
      price: "$1500-3000",
      lastContact: ""
    },
    {
      id: 6,
      name: "Jessica Williams",
      handle: "@jessicabeauty",
      email: "jessica@email.com",
      platform: "TikTok",
      followers: "78K",
      followersCount: 78000,
      engagement: "9.2%",
      engagementRate: 9.2,
      niche: "Beauty",
      location: "Toronto, ON, Canada",
      city: "Toronto",
      state: "ON",
      country: "Canada",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      recentPost: "Jewelry to complement your makeup look",
      verified: false,
      status: "not-contacted",
      rating: 4.1,
      notes: "",
      tags: ["makeup", "beauty", "complement"],
      price: "$300-600",
      lastContact: ""
    }
  ];

  const niches = ["All", "Jewelry", "Fashion", "Lifestyle", "Accessories", "Luxury", "Beauty"];
  const platforms = ["All", "Instagram", "TikTok", "YouTube"];
  const locations = ["All", "USA", "UK", "Canada"];
  const followerRanges = ["All", "50K-100K", "100K-200K", "200K-500K", "500K+"];
  const engagementRanges = ["All", "3-5%", "5-7%", "7-9%", "9%+"];

  // Filter influencers based on all criteria
  const filteredInfluencers = allInfluencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNiche = selectedNiche === "All" || influencer.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === "All" || influencer.platform === selectedPlatform;
    const matchesLocation = selectedLocation === "All" || influencer.country === selectedLocation;
    
    const matchesFollowerRange = selectedFollowerRange === "All" || 
      (selectedFollowerRange === "50K-100K" && influencer.followersCount >= 50000 && influencer.followersCount < 100000) ||
      (selectedFollowerRange === "100K-200K" && influencer.followersCount >= 100000 && influencer.followersCount < 200000) ||
      (selectedFollowerRange === "200K-500K" && influencer.followersCount >= 200000 && influencer.followersCount < 500000) ||
      (selectedFollowerRange === "500K+" && influencer.followersCount >= 500000);
    
    const matchesEngagementRange = selectedEngagementRange === "All" ||
      (selectedEngagementRange === "3-5%" && influencer.engagementRate >= 3 && influencer.engagementRate < 5) ||
      (selectedEngagementRange === "5-7%" && influencer.engagementRate >= 5 && influencer.engagementRate < 7) ||
      (selectedEngagementRange === "7-9%" && influencer.engagementRate >= 7 && influencer.engagementRate < 9) ||
      (selectedEngagementRange === "9%+" && influencer.engagementRate >= 9);

    return matchesSearch && matchesNiche && matchesPlatform && matchesLocation && matchesFollowerRange && matchesEngagementRange;
  });

  // Load shortlisted influencers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shortlistedInfluencers');
    if (saved) {
      setShortlistedInfluencers(JSON.parse(saved));
    }
  }, []);

  // Save shortlisted influencers to localStorage
  useEffect(() => {
    localStorage.setItem('shortlistedInfluencers', JSON.stringify(shortlistedInfluencers));
  }, [shortlistedInfluencers]);

  const toggleShortlist = (influencerId: number) => {
    setShortlistedInfluencers(prev => 
      prev.includes(influencerId) 
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    );
    
    const action = shortlistedInfluencers.includes(influencerId) ? "removed from" : "added to";
    toast({
      title: `Influencer ${action} shortlist`,
      description: action === "added to" ? "You can view your shortlist in the dashboard." : "",
    });
  };

  const exportShortlist = () => {
    const shortlisted = allInfluencers.filter(inf => shortlistedInfluencers.includes(inf.id));
    const csvContent = [
      "Name,Handle,Email,Platform,Followers,Engagement,Niche,Location,Price",
      ...shortlisted.map(inf => 
        `"${inf.name}","${inf.handle}","${inf.email}","${inf.platform}","${inf.followers}","${inf.engagement}","${inf.niche}","${inf.location}","${inf.price}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shortlisted-influencers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: `${shortlisted.length} influencers exported to CSV.`,
    });
  };

  const handleBulkAction = (action: string, data: any) => {
    // Handle bulk operations
    console.log("Bulk action:", action, data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "responded": return "secondary";
      case "reached-out": return "outline";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <Check className="w-3 h-3" />;
      case "responded": return <MessageCircle className="w-3 h-3" />;
      case "reached-out": return <TrendingUp className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Influencer Database</h1>
              <p className="text-muted-foreground">Discover and connect with verified creators across all platforms</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2">
              <Button 
                variant={activeView === "database" ? "default" : "ghost"}
                onClick={() => setActiveView("database")}
              >
                Database
              </Button>
              <Button 
                variant={activeView === "ai-discovery" ? "default" : "ghost"}
                onClick={() => setActiveView("ai-discovery")}
              >
                AI Discovery
              </Button>
              <Button 
                variant={activeView === "bulk-ops" ? "default" : "ghost"}
                onClick={() => setActiveView("bulk-ops")}
              >
                Bulk Operations
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search influencers by name, niche, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
            {shortlistedInfluencers.length > 0 && (
              <Button 
                variant="default" 
                className="flex items-center gap-2"
                onClick={exportShortlist}
              >
                <Download className="w-4 h-4" />
                Export ({shortlistedInfluencers.length})
              </Button>
            )}
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-secondary/50 rounded-lg">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedFollowerRange} onValueChange={setSelectedFollowerRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Followers" />
                </SelectTrigger>
                <SelectContent>
                  {followerRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedEngagementRange} onValueChange={setSelectedEngagementRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Engagement" />
                </SelectTrigger>
                <SelectContent>
                  {engagementRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedNiche("All");
                  setSelectedPlatform("All");
                  setSelectedLocation("All");
                  setSelectedFollowerRange("All");
                  setSelectedEngagementRange("All");
                  setSearchQuery("");
                }}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Niche Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {niches.map((niche) => (
              <Button
                key={niche}
                variant={selectedNiche === niche ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedNiche(niche)}
              >
                {niche}
              </Button>
            ))}
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{filteredInfluencers.length} Influencers Found</h2>
            <p className="text-sm text-muted-foreground">
              {shortlistedInfluencers.length} shortlisted
            </p>
          </div>
        </div>

        {/* Conditional Content Based on Active View */}
        {activeView === "ai-discovery" && (
          <AIDiscoveryEngine />
        )}

        {activeView === "bulk-ops" && (
          <BulkOperations 
            selectedInfluencers={selectedForBulk}
            allInfluencers={filteredInfluencers}
            onSelectionChange={setSelectedForBulk}
            onBulkAction={handleBulkAction}
          />
        )}

        {/* Results - Only show in database view */}
        {activeView === "database" && (
          <>
            <div className="grid lg:grid-cols-2 gap-6">
          {filteredInfluencers.map((influencer) => (
            <Card key={influencer.id} className="p-6 hover:shadow-elegant transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={influencer.avatar} alt={influencer.name} />
                      <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Checkbox 
                      className="absolute -top-2 -right-2"
                      checked={selectedForBulk.includes(influencer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedForBulk([...selectedForBulk, influencer.id]);
                        } else {
                          setSelectedForBulk(selectedForBulk.filter(id => id !== influencer.id));
                        }
                      }}
                    />
                  </div>
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
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleShortlist(influencer.id)}
                  className={shortlistedInfluencers.includes(influencer.id) ? "text-primary" : ""}
                >
                  <Star className={`w-4 h-4 ${shortlistedInfluencers.includes(influencer.id) ? "fill-current" : ""}`} />
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
                <Badge variant={getStatusColor(influencer.status)} className="mr-2 text-xs">
                  {getStatusIcon(influencer.status)}
                  {influencer.status.replace('-', ' ')}
                </Badge>
                <span className="text-sm text-muted-foreground">"{influencer.recentPost}"</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Price: {influencer.price}</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(influencer.rating) ? "fill-current text-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({influencer.rating})</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedInfluencerForCampaign(influencer.id);
                    setShowCampaignModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Campaign
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${influencer.email}`}>
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
          </>
        )}
      </div>
      
      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => {
          setShowCampaignModal(false);
          setSelectedInfluencerForCampaign(null);
        }}
        selectedInfluencers={selectedInfluencerForCampaign ? [selectedInfluencerForCampaign] : []}
      />
    </div>
  );
};

export default Database;