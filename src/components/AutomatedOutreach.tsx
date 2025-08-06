import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Mail, 
  MessageSquare, 
  Calendar,
  Clock,
  Send,
  Settings,
  PlayCircle,
  PauseCircle,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
  performance: {
    triggered: number;
    successful: number;
    responseRate: number;
  };
}

interface OutreachSequence {
  id: string;
  name: string;
  steps: {
    stepNumber: number;
    delay: number;
    template: string;
    condition?: string;
  }[];
  isActive: boolean;
  stats: {
    enrolled: number;
    completed: number;
    responded: number;
  };
}

export default function AutomatedOutreach() {
  const [activeTab, setActiveTab] = useState("sequences");
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  const { toast } = useToast();

  const automationRules: AutomationRule[] = [
    {
      id: "1",
      name: "New Response Handler",
      trigger: "Influencer responds to email",
      action: "Send thank you message and schedule follow-up",
      isActive: true,
      performance: { triggered: 47, successful: 45, responseRate: 95.7 }
    },
    {
      id: "2", 
      name: "Engagement Boost",
      trigger: "High engagement rate detected",
      action: "Flag for priority outreach",
      isActive: true,
      performance: { triggered: 23, successful: 21, responseRate: 91.3 }
    },
    {
      id: "3",
      name: "Follow-up Reminder",
      trigger: "No response after 7 days",
      action: "Send gentle follow-up email",
      isActive: false,
      performance: { triggered: 89, successful: 34, responseRate: 38.2 }
    }
  ];

  const outreachSequences: OutreachSequence[] = [
    {
      id: "1",
      name: "Standard Outreach Flow",
      steps: [
        { stepNumber: 1, delay: 0, template: "Initial outreach email" },
        { stepNumber: 2, delay: 3, template: "Follow-up email", condition: "No response" },
        { stepNumber: 3, delay: 7, template: "Final follow-up", condition: "No response" }
      ],
      isActive: true,
      stats: { enrolled: 156, completed: 89, responded: 47 }
    },
    {
      id: "2",
      name: "High-Value Influencer Sequence",
      steps: [
        { stepNumber: 1, delay: 0, template: "Personalized premium outreach" },
        { stepNumber: 2, delay: 2, template: "Value proposition follow-up", condition: "No response" },
        { stepNumber: 3, delay: 5, template: "Personal touch message", condition: "No response" }
      ],
      isActive: true,
      stats: { enrolled: 23, completed: 18, responded: 14 }
    }
  ];

  const mockConversations = [
    {
      id: "1",
      influencer: "Sarah Johnson",
      status: "active",
      lastMessage: "Thanks for the follow-up! I'm interested in learning more.",
      aiHandling: true,
      nextAction: "Scheduled call booking email for tomorrow 10 AM"
    },
    {
      id: "2", 
      influencer: "Marcus Chen",
      status: "negotiating",
      lastMessage: "Your rates work for me. When can we start?",
      aiHandling: true,
      nextAction: "Sending contract and timeline details"
    },
    {
      id: "3",
      influencer: "Emma Rodriguez",
      status: "follow-up",
      lastMessage: "I'll think about it and get back to you.",
      aiHandling: false,
      nextAction: "Waiting for manual intervention"
    }
  ];

  const handleToggleAutomation = (ruleId: string) => {
    toast({
      title: "Automation updated",
      description: "Rule status has been changed successfully."
    });
  };

  const handleSequenceToggle = (sequenceId: string) => {
    toast({
      title: "Sequence updated", 
      description: "Outreach sequence status has been changed."
    });
  };

  return (
    <div className="space-y-6">
      {/* Master Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Outreach Automation
            <Badge variant={isAutomationEnabled ? "default" : "secondary"}>
              {isAutomationEnabled ? "Active" : "Paused"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Master Automation Control</h4>
              <p className="text-sm text-muted-foreground">
                Enable or disable all automated outreach activities
              </p>
            </div>
            <Switch 
              checked={isAutomationEnabled}
              onCheckedChange={setIsAutomationEnabled}
            />
          </div>
          
          {isAutomationEnabled && (
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">47</div>
                <div className="text-sm text-muted-foreground">Active Conversations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-muted-foreground">Emails in Queue</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-muted-foreground">AI Success Rate</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button 
          variant={activeTab === "sequences" ? "default" : "ghost"}
          onClick={() => setActiveTab("sequences")}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Sequences
        </Button>
        <Button 
          variant={activeTab === "rules" ? "default" : "ghost"}
          onClick={() => setActiveTab("rules")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Automation Rules
        </Button>
        <Button 
          variant={activeTab === "conversations" ? "default" : "ghost"}
          onClick={() => setActiveTab("conversations")}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          AI Conversations
        </Button>
      </div>

      {/* Email Sequences Tab */}
      {activeTab === "sequences" && (
        <div className="space-y-6">
          {outreachSequences.map((sequence) => (
            <Card key={sequence.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {sequence.name}
                    <Badge variant={sequence.isActive ? "default" : "secondary"}>
                      {sequence.isActive ? "Active" : "Paused"}
                    </Badge>
                  </CardTitle>
                  <Switch 
                    checked={sequence.isActive}
                    onCheckedChange={() => handleSequenceToggle(sequence.id)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sequence Steps */}
                <div className="space-y-3">
                  {sequence.steps.map((step) => (
                    <div key={step.stepNumber} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.template}</div>
                        <div className="text-sm text-muted-foreground">
                          {step.delay === 0 ? "Immediate" : `After ${step.delay} days`}
                          {step.condition && ` • ${step.condition}`}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{sequence.stats.enrolled}</div>
                    <div className="text-sm text-muted-foreground">Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{sequence.stats.completed}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{sequence.stats.responded}</div>
                    <div className="text-sm text-muted-foreground">Responded</div>
                    <div className="text-xs text-muted-foreground">
                      {((sequence.stats.responded / sequence.stats.enrolled) * 100).toFixed(1)}% rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Automation Rules Tab */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          {automationRules.map((rule) => (
            <Card key={rule.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{rule.name}</h4>
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div><strong>Trigger:</strong> {rule.trigger}</div>
                      <div><strong>Action:</strong> {rule.action}</div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 text-sm">
                      <span>Triggered: {rule.performance.triggered}</span>
                      <span>Successful: {rule.performance.successful}</span>
                      <span className="text-green-600">
                        Success Rate: {rule.performance.responseRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggleAutomation(rule.id)}
                    />
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Conversations Tab */}
      {activeTab === "conversations" && (
        <div className="space-y-4">
          {mockConversations.map((conversation) => (
            <Card key={conversation.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{conversation.influencer}</h4>
                    <Badge variant="outline" className="mt-1">
                      {conversation.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {conversation.aiHandling ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Bot className="w-3 h-3 mr-1" />
                        AI Handling
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Needs Attention
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-sm"><strong>Last Message:</strong> "{conversation.lastMessage}"</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm"><strong>Next AI Action:</strong> {conversation.nextAction}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    View Full Conversation
                  </Button>
                  {!conversation.aiHandling && (
                    <Button size="sm">
                      <Zap className="w-4 h-4 mr-1" />
                      Enable AI Response
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}