import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Database, Target, Play, Users, Star, Check, X, Calendar, TrendingUp } from "lucide-react";
import SignupModal from "./SignupModal";
import AISearchModal from "./AISearchModal";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAISearchModal, setShowAISearchModal] = useState(false);

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  const handleCreateCampaign = (campaignData: any) => {
    console.log("Creating campaign with:", campaignData);
  };

  const testimonials = [
    {
      quote: "It's a game changer. Finding the right influencers used to take weeks, now it takes minutes.",
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow",
      avatar: "SC"
    },
    {
      quote: "The AI recommendations are spot-on. Our campaign ROI increased by 300%.",
      name: "Michael Rodriguez", 
      role: "Brand Manager",
      company: "StyleCo",
      avatar: "MR"
    },
    {
      quote: "Finally, a platform that understands our brand voice and finds perfect creator matches.",
      name: "Emma Thompson",
      role: "CEO",
      company: "GreenLife",
      avatar: "ET"
    }
  ];

  const features = [
    {
      icon: Database,
      title: "AI-Powered Discovery",
      description: "Find perfect influencers from millions of profiles using advanced AI matching algorithms.",
      highlight: "10M+ influencer profiles"
    },
    {
      icon: Target,
      title: "Smart Campaign Management",
      description: "Automate outreach with personalized messaging and track performance in real-time.",
      highlight: "5x faster outreach"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Get detailed insights on campaign performance, ROI, and influencer effectiveness.",
      highlight: "Real-time metrics"
    },
    {
      icon: Users,
      title: "Relationship Management",
      description: "Build and maintain long-term relationships with creators through our CRM tools.",
      highlight: "Lifetime value tracking"
    }
  ];

  const comparisonFeatures = [
    { feature: "AI-Powered Discovery", us: true, manual: false, agencies: true, other: false },
    { feature: "Real-time Analytics", us: true, manual: false, agencies: true, other: true },
    { feature: "Automated Outreach", us: true, manual: false, agencies: false, other: true },
    { feature: "Pricing Transparency", us: true, manual: true, agencies: false, other: false },
    { feature: "Campaign ROI Tracking", us: true, manual: false, agencies: true, other: true },
    { feature: "Relationship Management", us: true, manual: false, agencies: false, other: false }
  ];

  const steps = [
    {
      number: "1",
      title: "Describe Your Brand",
      description: "Tell our AI about your brand, target audience, and campaign goals."
    },
    {
      number: "2", 
      title: "Get AI Matches",
      description: "Our algorithm finds the perfect influencers based on your criteria."
    },
    {
      number: "3",
      title: "Launch Campaigns",
      description: "Send personalized outreach and track performance in real-time."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-subtle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-float">
              <Zap className="w-4 h-4 mr-2" />
              Built for Marketing Teams and Agencies
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Influencers
              </span>
              <br />
              in Minutes, Not Weeks
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with creators who align perfectly with your brand using AI. 
              Automate outreach, manage relationships, and scale your influencer marketing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => setShowSignupModal(true)}
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((testimonial, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground border-2 border-background">
                    {testimonial.avatar}
                  </div>
                ))}
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by 500+ marketing teams worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to scale influencer marketing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From discovery to campaign management, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-elegant transition-smooth">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant="outline" className="mb-3">{feature.highlight}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Here's what marketing teams are saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose our AI approach?
            </h2>
            <p className="text-xl text-muted-foreground">
              See how we compare to traditional methods
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2">Feature</th>
                    <th className="text-center py-4 px-2">
                      <Badge variant="default">Our AI Platform</Badge>
                    </th>
                    <th className="text-center py-4 px-2 text-muted-foreground">Manual Research</th>
                    <th className="text-center py-4 px-2 text-muted-foreground">Agencies</th>
                    <th className="text-center py-4 px-2 text-muted-foreground">Other Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-2 font-medium">{item.feature}</td>
                      <td className="text-center py-4 px-2">
                        {item.us ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.manual ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.agencies ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.other ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your influencer marketing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of marketing teams who've already scaled their influencer campaigns with AI
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => setShowSignupModal(true)}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm mt-4 opacity-75">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Modals */}
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={handleSignupSuccess}
      />
      
      <AISearchModal 
        isOpen={showAISearchModal}
        onClose={() => setShowAISearchModal(false)}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
};

export default HeroSection;