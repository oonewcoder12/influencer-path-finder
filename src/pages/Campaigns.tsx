import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import VisualSequenceBuilder from '@/components/VisualSequenceBuilder';
import CampaignAnalytics from '@/components/CampaignAnalytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Play, Pause, BarChart3, Clock, Mail, ArrowRight, ArrowDown, Settings, Target } from 'lucide-react';

interface CampaignStep {
  id: string;
  templateId: string;
  templateName: string;
  delay: number; // days
  delayUnit: 'hours' | 'days';
  order: number;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  steps: CampaignStep[];
  totalInfluencers: number;
  sentEmails: number;
  openRate: number;
  responseRate: number;
  createdAt: string;
  lastModified: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
}

const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Fashion Influencer Outreach Q1',
    description: 'Reaching out to fashion influencers for our spring collection campaign',
    status: 'active',
    steps: [
      { id: '1', templateId: '1', templateName: 'Initial Outreach - Fashion', delay: 0, delayUnit: 'days', order: 0 },
      { id: '2', templateId: '2', templateName: 'Follow-up Email', delay: 3, delayUnit: 'days', order: 1 },
      { id: '3', templateId: '3', templateName: 'Final Follow-up', delay: 7, delayUnit: 'days', order: 2 }
    ],
    totalInfluencers: 150,
    sentEmails: 89,
    openRate: 68.5,
    responseRate: 12.3,
    createdAt: '2024-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '2',
    name: 'Fitness Brand Partnership',
    description: 'Multi-step outreach for fitness and wellness influencers',
    status: 'draft',
    steps: [
      { id: '1', templateId: '1', templateName: 'Initial Outreach - Fitness', delay: 0, delayUnit: 'days', order: 0 },
      { id: '2', templateId: '2', templateName: 'Follow-up with Benefits', delay: 5, delayUnit: 'days', order: 1 }
    ],
    totalInfluencers: 0,
    sentEmails: 0,
    openRate: 0,
    responseRate: 0,
    createdAt: '2024-01-22',
    lastModified: '2024-01-22'
  }
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');
  const [selectedCampaignForAnalytics, setSelectedCampaignForAnalytics] = useState<Campaign | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    steps: [] as CampaignStep[]
  });
  const { toast } = useToast();

  // Load data from localStorage
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }

    const savedTemplates = localStorage.getItem('email-templates');
    if (savedTemplates) {
      const parsedTemplates = JSON.parse(savedTemplates);
      setTemplates(parsedTemplates.map((t: any) => ({
        id: t.id,
        name: t.name,
        subject: t.subject,
        category: t.category
      })));
    }
  }, []);

  // Save campaigns to localStorage
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSaveCampaign = () => {
    const newCampaign: Campaign = {
      id: isCreating ? Date.now().toString() : selectedCampaign!.id,
      name: editForm.name,
      description: editForm.description,
      status: 'draft',
      steps: editForm.steps,
      totalInfluencers: 0,
      sentEmails: 0,
      openRate: 0,
      responseRate: 0,
      createdAt: isCreating ? new Date().toISOString().split('T')[0] : selectedCampaign!.createdAt,
      lastModified: new Date().toISOString().split('T')[0]
    };

    if (isCreating) {
      setCampaigns([...campaigns, newCampaign]);
      toast({ title: "Campaign created successfully!" });
    } else {
      setCampaigns(campaigns.map(c => c.id === newCampaign.id ? { ...newCampaign, status: selectedCampaign!.status } : c));
      toast({ title: "Campaign updated successfully!" });
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedCampaign(null);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({ title: "Campaign deleted successfully!" });
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: newStatus, lastModified: new Date().toISOString().split('T')[0] };
      }
      return c;
    }));
    toast({ title: "Campaign status updated!" });
  };

  const startEditing = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setEditForm({
      name: campaign.name,
      description: campaign.description,
      steps: campaign.steps
    });
    setIsEditing(true);
  };

  const startCreating = () => {
    setEditForm({
      name: '',
      description: '',
      steps: []
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleStepsChange = (newSteps: CampaignStep[]) => {
    setEditForm({
      ...editForm,
      steps: newSteps
    });
  };

  const updateStep = (stepId: string, field: keyof CampaignStep, value: any) => {
    setEditForm({
      ...editForm,
      steps: editForm.steps.map(step => {
        if (step.id === stepId) {
          let updatedStep = { ...step, [field]: value };
          
          // If template is changed, update template name
          if (field === 'templateId') {
            const template = templates.find(t => t.id === value);
            updatedStep.templateName = template?.name || '';
          }
          
          return updatedStep;
        }
        return step;
      })
    });
  };

  const removeStep = (stepId: string) => {
    setEditForm({
      ...editForm,
      steps: editForm.steps.filter(step => step.id !== stepId)
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Email Campaigns</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage multi-step outreach sequences for your influencer campaigns
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'analytics' : 'list')}>
              {viewMode === 'list' ? <BarChart3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {viewMode === 'list' ? 'Analytics View' : 'List View'}
            </Button>
            <Button onClick={startCreating} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* Campaigns Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`} />
                      <Badge variant="outline" className="capitalize text-xs">
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {campaign.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Campaign Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/50 p-3 rounded">
                      <div className="text-muted-foreground">Steps</div>
                      <div className="font-semibold">{campaign.steps.length}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <div className="text-muted-foreground">Influencers</div>
                      <div className="font-semibold">{campaign.totalInfluencers}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <div className="text-muted-foreground">Open Rate</div>
                      <div className="font-semibold">{campaign.openRate}%</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <div className="text-muted-foreground">Response Rate</div>
                      <div className="font-semibold">{campaign.responseRate}%</div>
                    </div>
                  </div>

                  {/* Campaign Steps Preview */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Sequence ({campaign.steps.length} steps)</div>
                    <div className="space-y-2">
                      {campaign.steps.slice(0, 2).map((step, index) => (
                        <div key={step.id} className="flex items-center gap-2 text-xs">
                          <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                          <span className="text-muted-foreground truncate">
                            {step.templateName}
                          </span>
                          {step.delay > 0 && (
                            <Badge variant="outline" className="text-xs">
                              +{step.delay}{step.delayUnit === 'hours' ? 'h' : 'd'}
                            </Badge>
                          )}
                        </div>
                      ))}
                      {campaign.steps.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{campaign.steps.length - 2} more steps...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{campaign.name}</DialogTitle>
                          <DialogDescription>{campaign.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-muted rounded">
                              <div className="text-2xl font-bold">{campaign.steps.length}</div>
                              <div className="text-sm text-muted-foreground">Steps</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded">
                              <div className="text-2xl font-bold">{campaign.totalInfluencers}</div>
                              <div className="text-sm text-muted-foreground">Influencers</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded">
                              <div className="text-2xl font-bold">{campaign.openRate}%</div>
                              <div className="text-sm text-muted-foreground">Open Rate</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded">
                              <div className="text-2xl font-bold">{campaign.responseRate}%</div>
                              <div className="text-sm text-muted-foreground">Response Rate</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Email Sequence</h4>
                            <div className="space-y-3">
                              {campaign.steps.map((step, index) => (
                                <div key={step.id} className="flex items-center gap-4 p-3 border rounded">
                                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{step.templateName}</div>
                                    {step.delay > 0 && (
                                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Sent {step.delay} {step.delayUnit} after previous email
                                      </div>
                                    )}
                                  </div>
                                  {index < campaign.steps.length - 1 && (
                                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(campaign)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      disabled={campaign.status === 'completed'}
                    >
                      {campaign.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCampaignForAnalytics(campaign);
                        setViewMode('analytics');
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Analytics View */
          <div className="space-y-6">
            {selectedCampaignForAnalytics ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to Campaigns
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCampaignForAnalytics.name}</h2>
                    <p className="text-muted-foreground">{selectedCampaignForAnalytics.description}</p>
                  </div>
                  <div className="flex-1" />
                  <Badge variant="outline" className="capitalize">
                    {selectedCampaignForAnalytics.status}
                  </Badge>
                </div>
                <CampaignAnalytics campaign={selectedCampaignForAnalytics} />
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Campaign</h3>
                <p className="text-muted-foreground">Choose a campaign to view detailed analytics</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? 'Create New Campaign' : 'Edit Campaign'}
            </DialogTitle>
            <DialogDescription>
              Set up a multi-step email sequence for your outreach campaign
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder="e.g., Fashion Influencer Outreach Q1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  placeholder="Brief description of your campaign goals"
                />
              </div>
            </div>

            {/* Visual Sequence Builder */}
            <VisualSequenceBuilder
              steps={editForm.steps}
              templates={templates}
              onStepsChange={handleStepsChange}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCampaign} disabled={!editForm.name || editForm.steps.length === 0}>
                {isCreating ? 'Create Campaign' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}