import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Database, Target, Play } from "lucide-react";
import SignupModal from "./SignupModal";
import AISearchModal from "./AISearchModal";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAISearchModal, setShowAISearchModal] = useState(false);

  const handleSignupSuccess = () => {
    // After successful signup, show AI search modal
    setTimeout(() => {
      setShowAISearchModal(true);
    }, 500);
  };

  const handleCreateCampaign = (campaignData: any) => {
    // Handle campaign creation - in a real app, this would save to database
    console.log("Creating campaign with:", campaignData);
    // Redirect to dashboard or show success message
  };
  const features = [
    {
      icon: Database,
      title: "Smart Database",
      description: "Access millions of verified influencer profiles with AI-powered insights"
    },
    {
      icon: Target,
      title: "Targeted Outreach",
      description: "Automated campaign management with personalized messaging at scale"
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Machine learning algorithms optimize your influencer selection"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-accent/50 rounded-full px-4 py-2 mb-6 animate-float">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Influencer Outreach</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Influencers
              </span>
              <br />
              Automate Your Outreach
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your influencer marketing with AI. Discover, connect, and manage 
              relationships with creators who align perfectly with your brand.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setShowSignupModal(true)}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 border-border/50 bg-card/50 backdrop-blur hover:shadow-elegant transition-smooth">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default HeroSection;