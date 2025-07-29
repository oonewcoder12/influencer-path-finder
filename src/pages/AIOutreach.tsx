import React, { useState } from 'react';
import { Search, Users, Mail, BarChart3, Settings, Plus, Filter, Star, Instagram, Youtube, MessageSquare, Calendar, TrendingUp, Eye, Heart, Share2, DollarSign, Play, Pause, Edit, Send, Bot, User, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AIOutreach = () => {
  const [activeTab, setActiveTab] = useState('outreach');
  const [campaignStep, setCampaignStep] = useState('brief'); // brief, results, emails, dashboard
  const [campaignBrief, setCampaignBrief] = useState('');
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);

  // Mock data for found influencers after AI search
  const mockInfluencers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      handle: '@sarahfitness',
      platform: 'instagram',
      followers: '245K',
      engagement: '4.2%',
      avgViews: '18K',
      niche: 'Fitness & Wellness',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c799?w=150&h=150&fit=crop&crop=face',
      matchScore: 95,
      rate: '$500-800',
      responseRate: '95%',
      aiReason: 'Perfect match for fitness brands, high engagement with wellness content, LA-based for local partnerships',
      emailStatus: 'sent',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      handle: '@marcustech',
      platform: 'youtube',
      followers: '890K',
      engagement: '6.8%',
      avgViews: '125K',
      niche: 'Technology',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      matchScore: 88,
      rate: '$2000-3500',
      responseRate: '78%',
      aiReason: 'Tech-focused audience, high video engagement, experienced with brand partnerships',
      emailStatus: 'responded',
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      handle: '@emmastyle',
      platform: 'instagram',
      followers: '156K',
      engagement: '5.4%',
      avgViews: '22K',
      niche: 'Fashion & Lifestyle',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      matchScore: 82,
      rate: '$800-1200',
      responseRate: '88%',
      aiReason: 'Fashion-forward content, NYC location, strong lifestyle brand alignment',
      emailStatus: 'negotiating',
      lastActivity: '4 hours ago'
    }
  ];

  const mockConversations = [
    {
      id: 1,
      influencer: 'Sarah Johnson',
      messages: [
        { type: 'ai', content: 'Hi Sarah! I came across your amazing fitness content and think you\'d be perfect for our new protein supplement launch. Would you be interested in a partnership?', timestamp: '2 days ago' },
        { type: 'influencer', content: 'Hi! Thanks for reaching out. I\'d love to learn more about your brand and what you have in mind.', timestamp: '1 day ago' },
        { type: 'ai', content: 'Great! Our premium whey protein is launching next month. We\'d love to send you samples and discuss a content partnership. What are your rates for feed posts?', timestamp: '1 day ago' },
        { type: 'influencer', content: 'For feed posts, my rate is $600. I also offer story packages at $200. Would love to try your product first!', timestamp: '4 hours ago' }
      ],
      status: 'negotiating',
      aiHandling: true
    },
    {
      id: 2,
      influencer: 'Marcus Chen',
      messages: [
        { type: 'ai', content: 'Hello Marcus! Your tech reviews are incredibly detailed. We\'d love to collaborate on reviewing our new wireless earbuds. Interested?', timestamp: '3 days ago' },
        { type: 'influencer', content: 'Thanks! I\'d be happy to review them. My YouTube review rate is $2,500 and includes dedicated video + social promotion.', timestamp: '2 days ago' },
        { type: 'ai', content: 'That works for us! I\'ll send you the product details and contract. When would be the best time for you to receive the earbuds?', timestamp: '2 days ago' }
      ],
      status: 'accepted',
      aiHandling: false
    }
  ];

  const CampaignBriefStep = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">AI Campaign Assistant</h2>
        <p className="text-muted-foreground text-lg">Describe your campaign and let AI find the perfect influencers and handle outreach</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Campaign Brief</label>
              <textarea
                className="w-full px-4 py-4 border rounded-xl h-40 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your campaign in detail... 

Example: 'I'm launching a new fitness protein powder targeted at women aged 25-35. I need micro-influencers (10K-100K followers) in the fitness/wellness niche, preferably in major US cities. Looking for authentic reviews and workout posts featuring the product. Budget is $50-500 per post. Want to focus on high engagement rates over follower count.'"
                value={campaignBrief}
                onChange={(e) => setCampaignBrief(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-3">Campaign Type</label>
                <select className="w-full px-4 py-3 border rounded-lg">
                  <option>Product Review</option>
                  <option>Brand Partnership</option>
                  <option>Event Promotion</option>
                  <option>Sponsored Content</option>
                  <option>Affiliate Program</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Communication Style</label>
                <select className="w-full px-4 py-3 border rounded-lg">
                  <option>Professional & Direct</option>
                  <option>Friendly & Casual</option>
                  <option>Enthusiastic & Personal</option>
                  <option>Formal & Corporate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Budget Range</label>
                <input type="text" placeholder="$100-1000" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timeline</label>
                <input type="text" placeholder="2 weeks" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Reach</label>
                <input type="text" placeholder="500K impressions" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>

            <Button
              onClick={() => {
                setAiProcessing(true);
                setTimeout(() => {
                  setAiProcessing(false);
                  setCampaignStep('results');
                }, 3000);
              }}
              disabled={!campaignBrief || aiProcessing}
              className="w-full py-4"
              size="lg"
            >
              {aiProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  AI is finding perfect influencers...
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5 mr-3" />
                  Launch AI Campaign Assistant
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CampaignResultsStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Found {mockInfluencers.length} Perfect Matches</h2>
          <p className="text-muted-foreground mt-1">Ranked by relevance to your campaign brief</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCampaignStep('brief')}
          >
            Edit Brief
          </Button>
          <Button
            onClick={() => setCampaignStep('emails')}
          >
            Generate Emails <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {mockInfluencers.map((influencer) => (
          <Card key={influencer.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{influencer.name}</h3>
                    <span className="text-muted-foreground">{influencer.handle}</span>
                    {influencer.platform === 'instagram' ? (
                      <Instagram className="w-5 h-5 text-pink-500" />
                    ) : (
                      <Youtube className="w-5 h-5 text-red-500" />
                    )}
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {influencer.matchScore}% Match
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {influencer.followers}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {influencer.engagement}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-blue-500" />
                      {influencer.avgViews}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      {influencer.rate}
                    </span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <p className="text-sm"><strong>Why AI picked them:</strong> {influencer.aiReason}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{influencer.niche}</Badge>
                    <span>{influencer.location}</span>
                    <span>Response rate: {influencer.responseRate}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={selectedInfluencers.includes(influencer.id) ? "secondary" : "default"}
                    size="sm"
                    onClick={() => {
                      if (selectedInfluencers.includes(influencer.id)) {
                        setSelectedInfluencers(selectedInfluencers.filter(id => id !== influencer.id));
                      } else {
                        setSelectedInfluencers([...selectedInfluencers, influencer.id]);
                      }
                    }}
                  >
                    {selectedInfluencers.includes(influencer.id) ? 'Selected ✓' : 'Select'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const EmailGenerationStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI-Generated Personalized Emails</h2>
          <p className="text-muted-foreground mt-1">Review and customize before sending</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCampaignStep('results')}
          >
            Back to Results
          </Button>
          <Button
            onClick={() => setCampaignStep('dashboard')}
          >
            <Send className="w-4 h-4 mr-2" />
            Send All Emails
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {mockInfluencers.filter(inf => selectedInfluencers.includes(inf.id)).map((influencer) => (
          <Card key={influencer.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{influencer.name}</h3>
                  <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Generated Email</span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div><strong>Subject:</strong> Partnership Opportunity - Perfect Fit for Your {influencer.niche} Content</div>
                  <div className="border-t pt-3">
                    <p>Hi {influencer.name.split(' ')[0]},</p>
                    <br />
                    <p>I've been following your {influencer.niche.toLowerCase()} content and I'm really impressed by your authentic approach and high engagement rates ({influencer.engagement}). Your recent posts show exactly the kind of quality content we're looking for.</p>
                    <br />
                    <p>We're launching a new fitness protein powder specifically designed for women, and I think it would be a perfect fit for your audience. Based on your content style and location in {influencer.location}, I believe this partnership could provide real value to your followers.</p>
                    <br />
                    <p>Would you be interested in learning more? We'd love to send you samples and discuss a potential collaboration that aligns with your content style.</p>
                    <br />
                    <p>Looking forward to hearing from you!</p>
                    <br />
                    <p>Best regards,<br />Campaign Manager</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Personalization Score: 94%</span>
                  <span>Predicted Response Rate: {influencer.responseRate}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit Template
                  </Button>
                  <Button size="sm">
                    Approve & Queue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );


  const AnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Campaign Analytics</h2>
      
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Total Emails Sent</div>
              </div>
            </div>
            <div className="text-xs text-green-600">+12% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">342</div>
                <div className="text-sm text-muted-foreground">Total Responses</div>
              </div>
            </div>
            <div className="text-xs text-green-600">+8% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">AI Success Rate</div>
              </div>
            </div>
            <div className="text-xs text-green-600">+3.2% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Active Partnerships</div>
              </div>
            </div>
            <div className="text-xs text-green-600">+15% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Top Performing Email Templates</h4>
              <p className="text-sm text-blue-600">Personalized product-focused emails have 34% higher response rates</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Best Response Times</h4>
              <p className="text-sm text-green-600">Tuesday-Thursday, 10 AM - 2 PM show highest engagement</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">AI Negotiation Success</h4>
              <p className="text-sm text-purple-600">AI successfully closed 78% of negotiations without human intervention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'outreach', label: 'AI Outreach', icon: Bot },
              { key: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
                  activeTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'outreach' && (
            <div>
              {campaignStep === 'brief' && <CampaignBriefStep />}
              {campaignStep === 'results' && <CampaignResultsStep />}
              {campaignStep === 'emails' && <EmailGenerationStep />}
            </div>
          )}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </div>
      </div>

      {/* AI Processing Overlay */}
      {aiProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Working Its Magic</h3>
              <p className="text-muted-foreground mb-4">Analyzing millions of creators to find your perfect matches...</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Scanning creator databases...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
                  <span>Analyzing engagement patterns...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
                  <span>Ranking by campaign fit...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIOutreach;