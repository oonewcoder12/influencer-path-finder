import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Mail, 
  MessageSquare, 
  Calendar,
  CheckSquare,
  Clock,
  Send,
  Filter,
  Download,
  Upload,
  Trash2,
  Star,
  Tag,
  Zap,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkOperationsProps {
  selectedInfluencers: number[];
  allInfluencers: any[];
  onSelectionChange: (influencerIds: number[]) => void;
  onBulkAction: (action: string, data: any) => void;
}

export default function BulkOperations({ 
  selectedInfluencers, 
  allInfluencers, 
  onSelectionChange,
  onBulkAction 
}: BulkOperationsProps) {
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const { toast } = useToast();

  const bulkActions = [
    { value: "email", label: "Send Bulk Email", icon: Mail },
    { value: "campaign", label: "Add to Campaign", icon: Users },
    { value: "tag", label: "Apply Tags", icon: Tag },
    { value: "schedule", label: "Schedule Follow-up", icon: Calendar },
    { value: "export", label: "Export Selection", icon: Download },
    { value: "remove", label: "Remove from List", icon: Trash2 }
  ];

  const emailTemplates = [
    { id: "intro", name: "Initial Outreach", subject: "Partnership Opportunity" },
    { id: "followup", name: "Follow-up Email", subject: "Following up on partnership" },
    { id: "reminder", name: "Gentle Reminder", subject: "Quick reminder about our collaboration" },
    { id: "custom", name: "Custom Template", subject: "Custom subject line" }
  ];

  const smartLists = [
    { 
      id: "high-engagement", 
      name: "High Engagement (>5%)", 
      count: 23,
      criteria: "Engagement rate above 5%",
      autoUpdate: true
    },
    { 
      id: "micro-influencers", 
      name: "Micro Influencers (10K-100K)", 
      count: 47,
      criteria: "Followers between 10K-100K",
      autoUpdate: true
    },
    { 
      id: "verified-creators", 
      name: "Verified Creators", 
      count: 15,
      criteria: "Verified accounts only",
      autoUpdate: true
    },
    { 
      id: "not-contacted", 
      name: "Not Yet Contacted", 
      count: 89,
      criteria: "Status: not-contacted",
      autoUpdate: true
    }
  ];

  const handleBulkAction = (action: string) => {
    setBulkAction(action);
    setShowBulkPanel(true);
  };

  const executeBulkAction = () => {
    switch (bulkAction) {
      case "email":
        toast({
          title: "Bulk email scheduled",
          description: `${selectedInfluencers.length} emails will be sent using the selected template.`
        });
        break;
      case "campaign":
        toast({
          title: "Added to campaign",
          description: `${selectedInfluencers.length} influencers added to the campaign.`
        });
        break;
      case "export":
        toast({
          title: "Export started",
          description: `Exporting data for ${selectedInfluencers.length} influencers.`
        });
        break;
      default:
        toast({
          title: "Action completed",
          description: `Bulk action applied to ${selectedInfluencers.length} influencers.`
        });
    }
    
    onBulkAction(bulkAction, {
      influencers: selectedInfluencers,
      template: emailTemplate,
      schedule: scheduleDate
    });
    
    setShowBulkPanel(false);
  };

  const selectAllInView = () => {
    const allIds = allInfluencers.map(inf => inf.id);
    onSelectionChange(allIds);
  };

  const selectNone = () => {
    onSelectionChange([]);
  };

  const selectByEngagement = (threshold: number) => {
    const highEngagement = allInfluencers
      .filter(inf => inf.engagementRate >= threshold)
      .map(inf => inf.id);
    onSelectionChange(highEngagement);
  };

  return (
    <div className="space-y-6">
      {/* Smart Lists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Smart Lists
            <Badge variant="secondary">Auto-updating</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartLists.map((list) => (
              <div key={list.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{list.name}</h4>
                  <Badge variant="outline">{list.count}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{list.criteria}</p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      // Mock selecting influencers based on criteria
                      const mockSelection = Array.from({ length: list.count }, (_, i) => i + 1);
                      onSelectionChange(mockSelection);
                      toast({
                        title: "Smart list applied",
                        description: `Selected ${list.count} influencers matching "${list.name}"`
                      });
                    }}
                  >
                    <CheckSquare className="w-4 h-4 mr-1" />
                    Select All
                  </Button>
                  {list.autoUpdate && (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Auto-updates
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bulk Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={selectAllInView}>
              <CheckSquare className="w-4 h-4 mr-1" />
              Select All ({allInfluencers.length})
            </Button>
            
            <Button variant="outline" size="sm" onClick={selectNone}>
              Clear Selection
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => selectByEngagement(5)}>
              <Star className="w-4 h-4 mr-1" />
              High Engagement (5%+)
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => selectByEngagement(3)}>
              <TrendingUp className="w-4 h-4 mr-1" />
              Good Engagement (3%+)
            </Button>
          </div>
          
          {selectedInfluencers.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">
                {selectedInfluencers.length} influencer{selectedInfluencers.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedInfluencers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Bulk Actions
              <Badge variant="default">{selectedInfluencers.length} selected</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {bulkActions.map((action) => (
                <Button
                  key={action.value}
                  variant="outline"
                  onClick={() => handleBulkAction(action.value)}
                  className="flex items-center gap-2 justify-start"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Action Panel */}
      {showBulkPanel && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Bulk Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bulkAction === "email" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Template</label>
                  <Select value={emailTemplate} onValueChange={setEmailTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose template" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {template.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Send Schedule</label>
                  <Select value={scheduleDate} onValueChange={setScheduleDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="When to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send immediately</SelectItem>
                      <SelectItem value="1hour">In 1 hour</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow 9 AM</SelectItem>
                      <SelectItem value="custom">Custom schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {bulkAction === "campaign" && (
              <div>
                <label className="block text-sm font-medium mb-2">Campaign</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer-launch">Summer Product Launch</SelectItem>
                    <SelectItem value="brand-awareness">Brand Awareness Q4</SelectItem>
                    <SelectItem value="holiday-promo">Holiday Promotion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={executeBulkAction} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Execute Action
              </Button>
              <Button variant="outline" onClick={() => setShowBulkPanel(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}