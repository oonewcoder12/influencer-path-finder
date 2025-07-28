import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Users, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInfluencers?: number[];
}

const CampaignModal = ({ isOpen, onClose, selectedInfluencers = [] }: CampaignModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    deadline: "",
    deliverables: "",
    brand: "",
    campaignType: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save campaign to localStorage
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    const newCampaign = {
      id: Date.now(),
      ...formData,
      selectedInfluencers,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    campaigns.push(newCampaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));

    toast({
      title: "Campaign created",
      description: `${formData.name} has been created with ${selectedInfluencers.length} influencers.`,
    });

    onClose();
    setFormData({
      name: "",
      description: "",
      budget: "",
      deadline: "",
      deliverables: "",
      brand: "",
      campaignType: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Set up a new influencer marketing campaign
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Summer Jewelry Collection"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Brand/Company</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              placeholder="Your Brand Name"
              required
            />
          </div>

          <div>
            <Label htmlFor="campaignType">Campaign Type</Label>
            <Select value={formData.campaignType} onValueChange={(value) => handleInputChange("campaignType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-launch">Product Launch</SelectItem>
                <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                <SelectItem value="seasonal">Seasonal Campaign</SelectItem>
                <SelectItem value="collaboration">Collaboration</SelectItem>
                <SelectItem value="giveaway">Giveaway/Contest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your campaign goals and requirements..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget" className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Budget
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="$5,000"
              />
            </div>
            <div>
              <Label htmlFor="deadline" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deliverables">Deliverables</Label>
            <Textarea
              id="deliverables"
              value={formData.deliverables}
              onChange={(e) => handleInputChange("deliverables", e.target.value)}
              placeholder="2 Instagram posts, 3 Stories, 1 Reel..."
              rows={2}
            />
          </div>

          {selectedInfluencers.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{selectedInfluencers.length} influencer(s) will be added to this campaign</span>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;