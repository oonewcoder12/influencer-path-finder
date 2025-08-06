import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bot, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  Heart,
  Search,
  Lightbulb,
  Brain,
  Zap
} from "lucide-react";

interface AIInsight {
  type: "trending" | "optimal_time" | "audience_match" | "content_type";
  title: string;
  description: string;
  confidence: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface SimilarInfluencer {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  similarity: number;
  reason: string;
  followers: string;
  engagement: string;
}

interface AIDiscoveryEngineProps {
  baseInfluencer?: {
    id: number;
    name: string;
    niche: string;
    platform: string;
  };
}

export default function AIDiscoveryEngine({ baseInfluencer }: AIDiscoveryEngineProps) {
  const [aiQuery, setAiQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mockInsights: AIInsight[] = [
    {
      type: "trending",
      title: "Trending Niche Opportunity",
      description: "Sustainable fashion content is growing 45% faster than general fashion",
      confidence: 92,
      icon: TrendingUp
    },
    {
      type: "optimal_time",
      title: "Best Outreach Window",
      description: "Tuesday 2-4 PM shows 3x higher response rates for fashion influencers",
      confidence: 88,
      icon: Target
    },
    {
      type: "audience_match",
      title: "Audience Alignment Score",
      description: "85% overlap with your target demographic (women 25-35)",
      confidence: 95,
      icon: Users
    },
    {
      type: "content_type",
      title: "High-Converting Content",
      description: "Tutorial-style posts generate 60% more engagement than static images",
      confidence: 89,
      icon: Heart
    }
  ];

  const mockSimilarInfluencers: SimilarInfluencer[] = [
    {
      id: 101,
      name: "Sophia Martinez",
      handle: "@sophiastyle",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      similarity: 94,
      reason: "Similar audience demographics and content style",
      followers: "189K",
      engagement: "5.2%"
    },
    {
      id: 102,
      name: "Lauren Kim",
      handle: "@laurentrends",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2b3e5?w=150&h=150&fit=crop&crop=face",
      similarity: 89,
      reason: "Comparable engagement patterns and posting schedule",
      followers: "156K",
      engagement: "4.8%"
    },
    {
      id: 103,
      name: "Maya Johnson",
      handle: "@mayafashion",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      similarity: 85,
      reason: "Same niche with overlapping brand partnerships",
      followers: "203K",
      engagement: "6.1%"
    }
  ];

  const handleAISearch = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50";
    if (confidence >= 80) return "text-blue-600 bg-blue-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <div className="space-y-6">
      {/* AI Query Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Discovery Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ask AI anything: 'Find fitness influencers with high engagement in Los Angeles'"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={handleAISearch}
              disabled={!aiQuery || isAnalyzing}
              className="px-6"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask AI
                </>
              )}
            </Button>
          </div>

          {/* Suggested Queries */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Try these AI-powered queries:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Find rising micro-influencers in wellness",
                "Show me beauty creators with 90%+ female audience",
                "Identify influencers posting about sustainable fashion",
                "Find creators similar to @username"
              ].map((query) => (
                <Button
                  key={query}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => setAiQuery(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {(showResults || baseInfluencer) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getConfidenceColor(insight.confidence)}`}>
                      <insight.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {insight.confidence}% confident
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Similar Influencers */}
      {baseInfluencer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Similar Influencers
              <Badge variant="secondary">AI Recommended</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSimilarInfluencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={influencer.avatar} alt={influencer.name} />
                    <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{influencer.name}</h4>
                      <span className="text-sm text-muted-foreground">{influencer.handle}</span>
                      <Badge variant="outline" className="text-xs">
                        {influencer.similarity}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{influencer.reason}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{influencer.followers} followers</span>
                      <span>{influencer.engagement} engagement</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Zap className="w-4 h-4 mr-1" />
                      Add to Campaign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}