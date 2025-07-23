import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Search, Users, Target, ArrowRight, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (results: any) => void;
}

const AISearchModal = ({ isOpen, onClose, onCreateCampaign }: AISearchModalProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [step, setStep] = useState<"input" | "results" | "campaign">("input");
  const { toast } = useToast();

  const exampleQueries = [
    "Find tech influencers with 50K+ followers for our SaaS launch",
    "I need lifestyle creators in California for our wellness brand",
    "Looking for gaming influencers aged 18-25 with high engagement",
    "Find food bloggers who post about healthy recipes"
  ];

  const mockSearchResults = {
    campaignName: "Tech Influencer Outreach",
    targetAudience: "Tech enthusiasts, entrepreneurs, developers",
    estimatedReach: "2.4M",
    estimatedBudget: "$8,500",
    influencers: [
      {
        id: 1,
        name: "Alex Chen",
        handle: "@alextech",
        platform: "YouTube",
        followers: "156K",
        engagement: "7.2%",
        niche: "Technology",
        matchScore: 95,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reason: "Perfect match for tech content with strong developer audience"
      },
      {
        id: 2,
        name: "Sarah Kim",
        handle: "@sarahstartups",
        platform: "LinkedIn",
        followers: "89K",
        engagement: "5.8%",
        niche: "Startups",
        matchScore: 92,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2b3e5?w=150&h=150&fit=crop&crop=face",
        reason: "Entrepreneur-focused content, great for B2B reach"
      },
      {
        id: 3,
        name: "David Park",
        handle: "@davidbuilds",
        platform: "Twitter",
        followers: "234K",
        engagement: "6.4%",
        niche: "Development",
        matchScore: 89,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reason: "Active in developer community, high engagement rates"
      }
    ]
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Parse query and generate mock results
      const campaignName = query.includes("tech") ? "Tech Influencer Outreach" :
                          query.includes("lifestyle") ? "Lifestyle Creator Campaign" :
                          query.includes("gaming") ? "Gaming Influencer Partnership" :
                          query.includes("food") ? "Food Creator Collaboration" :
                          "Custom Influencer Campaign";
      
      setSearchResults({ ...mockSearchResults, campaignName });
      setStep("results");
      setIsSearching(false);
      
      toast({
        title: "AI Search Complete",
        description: `Found ${mockSearchResults.influencers.length} matching influencers`,
      });
    }, 3000);
  };

  const handleCreateCampaign = () => {
    onCreateCampaign(searchResults);
    setStep("campaign");
    
    setTimeout(() => {
      toast({
        title: "Campaign Created!",
        description: "Your influencer campaign has been set up successfully.",
      });
      onClose();
      // Reset state
      setTimeout(() => {
        setStep("input");
        setQuery("");
        setSearchResults(null);
      }, 500);
    }, 2000);
  };

  const resetModal = () => {
    setStep("input");
    setQuery("");
    setSearchResults(null);
    setIsSearching(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Influencer Discovery
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Describe Your Perfect Campaign</h3>
              <p className="text-muted-foreground">
                Tell our AI what kind of influencers you're looking for, and we'll find the perfect matches
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Example: I'm looking for tech influencers with 50K+ followers who create content about AI and startups for our new SaaS platform launch..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
                <div className="grid gap-2">
                  {exampleQueries.map((example, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuery(example)}
                      className="text-left justify-start h-auto p-3 text-wrap"
                    >
                      "{example}"
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              variant="hero"
              size="lg"
              className="w-full"
            >
              {isSearching ? (
                <>
                  <Search className="w-4 h-4 animate-spin" />
                  AI is searching...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Find Perfect Influencers
                </>
              )}
            </Button>
          </div>
        )}

        {step === "results" && searchResults && (
          <div className="space-y-6">
            {/* Campaign Overview */}
            <Card className="p-6 bg-gradient-subtle">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">{searchResults.campaignName}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Estimated Reach</p>
                  <p className="font-semibold text-lg">{searchResults.estimatedReach}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Budget Range</p>
                  <p className="font-semibold text-lg">{searchResults.estimatedBudget}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Influencers Found</p>
                  <p className="font-semibold text-lg">{searchResults.influencers.length}</p>
                </div>
              </div>
            </Card>

            {/* Influencer Results */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Top Matching Influencers
              </h4>
              
              {searchResults.influencers.map((influencer: any) => (
                <Card key={influencer.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={influencer.avatar} alt={influencer.name} />
                        <AvatarFallback>{influencer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold">{influencer.name}</h5>
                          <Badge variant="secondary">{influencer.platform}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {influencer.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{influencer.handle}</p>
                        <p className="text-sm mb-2">{influencer.reason}</p>
                        
                        <div className="flex gap-4 text-sm">
                          <span><strong>{influencer.followers}</strong> followers</span>
                          <span><strong>{influencer.engagement}</strong> engagement</span>
                          <span className="text-primary font-medium">{influencer.niche}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("input")} className="flex-1">
                Refine Search
              </Button>
              <Button onClick={handleCreateCampaign} variant="hero" className="flex-1">
                Create Campaign
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === "campaign" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Campaign Created!</h3>
            <p className="text-muted-foreground">
              Your influencer campaign is being set up. You'll be redirected to the dashboard shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AISearchModal;