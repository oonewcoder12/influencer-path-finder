import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Heart,
  BarChart3,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  Brain,
  Eye,
  MessageSquare,
  Share2
} from "lucide-react";

interface BrandProfile {
  industry: string;
  targetAudience: {
    ageRange: [number, number];
    gender: string;
    interests: string[];
    location: string;
  };
  brandValues: string[];
  campaignGoals: string[];
  budget: [number, number];
  preferredContentTypes: string[];
}

interface CompatibilityScore {
  overall: number;
  audienceMatch: number;
  contentAlignment: number;
  engagementQuality: number;
  brandSafety: number;
  costEfficiency: number;
}

interface PredictedMetrics {
  estimatedReach: number;
  expectedEngagement: number;
  predictedConversions: number;
  roiEstimate: number;
  optimalPostTime: string;
  bestContentFormat: string;
}

interface EnhancedMatchingSystemProps {
  influencer: {
    id: number;
    name: string;
    niche: string;
    followers: string;
    engagement: string;
    location: string;
  };
}

export default function EnhancedMatchingSystem({ influencer }: EnhancedMatchingSystemProps) {
  const [brandProfile, setBrandProfile] = useState<Partial<BrandProfile>>({
    industry: "Fashion & Beauty",
    targetAudience: {
      ageRange: [25, 35],
      gender: "Female",
      interests: ["Fashion", "Beauty", "Lifestyle"],
      location: "United States"
    },
    brandValues: ["Sustainability", "Inclusivity", "Quality"],
    campaignGoals: ["Brand Awareness", "Product Launch"],
    budget: [500, 2000]
  });

  const [showSetup, setShowSetup] = useState(false);

  // Mock compatibility analysis
  const compatibilityScore: CompatibilityScore = {
    overall: 87,
    audienceMatch: 92,
    contentAlignment: 85,
    engagementQuality: 89,
    brandSafety: 95,
    costEfficiency: 78
  };

  // Mock predicted metrics
  const predictedMetrics: PredictedMetrics = {
    estimatedReach: 45000,
    expectedEngagement: 2250,
    predictedConversions: 180,
    roiEstimate: 3.2,
    optimalPostTime: "Tuesday 2 PM",
    bestContentFormat: "Carousel post with tutorial"
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-blue-600 bg-blue-50";
    if (score >= 50) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreLevel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* Brand Profile Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Brand Profile Matching
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showSetup ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Set up your brand profile to get AI-powered compatibility scores and predictions
              </p>
              <Button onClick={() => setShowSetup(true)}>
                <Brain className="w-4 h-4 mr-2" />
                Configure Brand Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Age Range</label>
                  <div className="px-3">
                    <Slider
                      value={brandProfile.targetAudience?.ageRange || [25, 35]}
                      onValueChange={(value) => setBrandProfile({
                        ...brandProfile,
                        targetAudience: {
                          ...brandProfile.targetAudience!,
                          ageRange: value as [number, number]
                        }
                      })}
                      max={65}
                      min={18}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{brandProfile.targetAudience?.ageRange?.[0]}</span>
                      <span>{brandProfile.targetAudience?.ageRange?.[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Budget Range</label>
                  <div className="px-3">
                    <Slider
                      value={brandProfile.budget || [500, 2000]}
                      onValueChange={(value) => setBrandProfile({
                        ...brandProfile,
                        budget: value as [number, number]
                      })}
                      max={10000}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>${brandProfile.budget?.[0]}</span>
                      <span>${brandProfile.budget?.[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => setShowSetup(false)} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Compatibility
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compatibility Score */}
      {!showSetup && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Compatibility Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center space-y-2">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreColor(compatibilityScore.overall)}`}>
                  <span className="text-2xl font-bold">{compatibilityScore.overall}%</span>
                  <span className="ml-2 text-sm font-medium">{getScoreLevel(compatibilityScore.overall)} Match</span>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Audience Match</span>
                    </div>
                    <span className="text-sm font-medium">{compatibilityScore.audienceMatch}%</span>
                  </div>
                  <Progress value={compatibilityScore.audienceMatch} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Content Alignment</span>
                    </div>
                    <span className="text-sm font-medium">{compatibilityScore.contentAlignment}%</span>
                  </div>
                  <Progress value={compatibilityScore.contentAlignment} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Engagement Quality</span>
                    </div>
                    <span className="text-sm font-medium">{compatibilityScore.engagementQuality}%</span>
                  </div>
                  <Progress value={compatibilityScore.engagementQuality} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Cost Efficiency</span>
                    </div>
                    <span className="text-sm font-medium">{compatibilityScore.costEfficiency}%</span>
                  </div>
                  <Progress value={compatibilityScore.costEfficiency} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Predicted Performance */}
      {!showSetup && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Predicted Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold">{predictedMetrics.estimatedReach.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Estimated Reach</div>
              </div>

              <div className="text-center space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold">{predictedMetrics.expectedEngagement.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Expected Engagement</div>
              </div>

              <div className="text-center space-y-2">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Share2 className="w-6 h-6 text-purple-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold">{predictedMetrics.predictedConversions}</div>
                <div className="text-sm text-muted-foreground">Predicted Conversions</div>
              </div>

              <div className="text-center space-y-2">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold">{predictedMetrics.roiEstimate}x</div>
                <div className="text-sm text-muted-foreground">ROI Estimate</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">Optimal Posting Time</span>
                </div>
                <p className="text-sm text-muted-foreground">{predictedMetrics.optimalPostTime}</p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="font-medium">Best Content Format</span>
                </div>
                <p className="text-sm text-muted-foreground">{predictedMetrics.bestContentFormat}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audience Overlap Analysis */}
      {!showSetup && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Audience Overlap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Age Demographics Match</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Interest Alignment</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Geographic Overlap</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Purchasing Power Match</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                  <span className="text-sm font-medium">89%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}