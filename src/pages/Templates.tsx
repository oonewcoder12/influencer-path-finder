import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Copy, Mail } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'initial' | 'follow-up' | 'negotiation' | 'collaboration';
  variables: string[];
  createdAt: string;
  lastUsed?: string;
}

const AVAILABLE_VARIABLES = [
  { key: 'influencer_name', label: 'Influencer Name', example: 'Sarah Johnson' },
  { key: 'platform', label: 'Platform', example: 'Instagram' },
  { key: 'follower_count', label: 'Follower Count', example: '125K' },
  { key: 'engagement_rate', label: 'Engagement Rate', example: '4.2%' },
  { key: 'niche', label: 'Niche', example: 'Fashion' },
  { key: 'brand_name', label: 'Brand Name', example: 'Your Brand' },
  { key: 'campaign_type', label: 'Campaign Type', example: 'Product Review' },
  { key: 'compensation', label: 'Compensation', example: '$500' },
  { key: 'deliverables', label: 'Deliverables', example: '2 Instagram posts + 1 story' },
  { key: 'timeline', label: 'Timeline', example: '2 weeks' },
];

const SAMPLE_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Initial Outreach - Fashion',
    subject: 'Collaboration Opportunity with {{brand_name}} - {{campaign_type}}',
    body: `Hi {{influencer_name}},

I hope this email finds you well! I've been following your {{platform}} content and absolutely love your style and engagement with your {{follower_count}} followers.

We're reaching out because we think you'd be a perfect fit for our upcoming {{campaign_type}} campaign. Your content in the {{niche}} space aligns beautifully with our brand values.

Here's what we're offering:
• Compensation: {{compensation}}
• Deliverables: {{deliverables}}
• Timeline: {{timeline}}
• Creative freedom to maintain your authentic voice

Would you be interested in learning more about this collaboration? I'd love to discuss the details further.

Best regards,
[Your Name]
{{brand_name}} Partnership Team`,
    category: 'initial',
    variables: ['influencer_name', 'platform', 'follower_count', 'brand_name', 'campaign_type', 'niche', 'compensation', 'deliverables', 'timeline'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Follow-up Email',
    subject: 'Following up on our collaboration proposal',
    body: `Hi {{influencer_name}},

I wanted to follow up on the collaboration opportunity I sent your way last week regarding our {{campaign_type}} campaign.

I understand you're probably busy, but I wanted to make sure my email didn't get lost in your inbox. The offer is still on the table:

• {{compensation}} compensation
• {{deliverables}}
• Full creative control

Your {{niche}} content really resonates with our target audience, and we'd love to work with you.

If you're interested or have any questions, please don't hesitate to reach out. If this isn't the right fit, no worries at all - I'd appreciate a quick response so I know where we stand.

Best,
[Your Name]`,
    category: 'follow-up',
    variables: ['influencer_name', 'campaign_type', 'compensation', 'deliverables', 'niche'],
    createdAt: '2024-01-16',
  }
];

export default function Templates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(SAMPLE_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'initial' as EmailTemplate['category'],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('email-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Save templates to localStorage
  useEffect(() => {
    localStorage.setItem('email-templates', JSON.stringify(templates));
  }, [templates]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  const renderPreview = (template: EmailTemplate) => {
    let subject = template.subject;
    let body = template.body;

    // Replace variables with sample data
    AVAILABLE_VARIABLES.forEach(variable => {
      const regex = new RegExp(`\\{\\{${variable.key}\\}\\}`, 'g');
      subject = subject.replace(regex, variable.example);
      body = body.replace(regex, variable.example);
    });

    return { subject, body };
  };

  const handleSaveTemplate = () => {
    const variables = extractVariables(editForm.subject + ' ' + editForm.body);
    const newTemplate: EmailTemplate = {
      id: isCreating ? Date.now().toString() : selectedTemplate!.id,
      name: editForm.name,
      subject: editForm.subject,
      body: editForm.body,
      category: editForm.category,
      variables,
      createdAt: isCreating ? new Date().toISOString().split('T')[0] : selectedTemplate!.createdAt,
      lastUsed: selectedTemplate?.lastUsed,
    };

    if (isCreating) {
      setTemplates([...templates, newTemplate]);
      toast({ title: "Template created successfully!" });
    } else {
      setTemplates(templates.map(t => t.id === newTemplate.id ? newTemplate : t));
      toast({ title: "Template updated successfully!" });
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({ title: "Template deleted successfully!" });
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTemplates([...templates, newTemplate]);
    toast({ title: "Template duplicated successfully!" });
  };

  const startEditing = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category,
    });
    setIsEditing(true);
  };

  const startCreating = () => {
    setEditForm({
      name: '',
      subject: '',
      body: '',
      category: 'initial',
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage personalized email templates for your outreach campaigns
            </p>
          </div>
          <Button onClick={startCreating} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="initial">Initial Outreach</option>
            <option value="follow-up">Follow-up</option>
            <option value="negotiation">Negotiation</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary" className="capitalize">
                    {template.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {template.subject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.variables.slice(0, 3).map((variable) => (
                    <Badge key={variable} variant="outline" className="text-xs">
                      {variable}
                    </Badge>
                  ))}
                  {template.variables.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.variables.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Preview: {template.name}</DialogTitle>
                        <DialogDescription>
                          Preview with sample data
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Subject:</Label>
                          <p className="text-sm bg-muted p-2 rounded">
                            {renderPreview(template).subject}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Body:</Label>
                          <div className="text-sm bg-muted p-4 rounded whitespace-pre-wrap">
                            {renderPreview(template).body}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Variables Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Available Variables
            </CardTitle>
            <CardDescription>
              Use these variables in your templates. They'll be automatically replaced with actual data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {AVAILABLE_VARIABLES.map((variable) => (
                <div key={variable.key} className="bg-muted p-3 rounded">
                  <code className="text-sm font-mono text-primary">
                    {`{{${variable.key}}}`}
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">
                    {variable.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ex: {variable.example}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? 'Create New Template' : 'Edit Template'}
            </DialogTitle>
            <DialogDescription>
              Use variables like {`{{influencer_name}}`} for personalization
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder="e.g., Initial Outreach - Fashion"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value as EmailTemplate['category']})}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="initial">Initial Outreach</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="collaboration">Collaboration</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                value={editForm.subject}
                onChange={(e) => setEditForm({...editForm, subject: e.target.value})}
                placeholder="e.g., Collaboration Opportunity with {{brand_name}}"
              />
            </div>
            <div>
              <Label htmlFor="body">Email Body</Label>
              <Textarea
                id="body"
                value={editForm.body}
                onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                placeholder="Hi {{influencer_name}},..."
                rows={12}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate}>
                {isCreating ? 'Create Template' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}