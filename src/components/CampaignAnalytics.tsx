import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Mail, Eye, MessageSquare, Clock, Users, Target } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  steps: any[];
  totalInfluencers: number;
  sentEmails: number;
  openRate: number;
  responseRate: number;
  createdAt: string;
  lastModified: string;
}

interface CampaignAnalyticsProps {
  campaign: Campaign;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

const MetricCard = ({ title, value, subtitle, trend, trendValue, icon: Icon, color = 'text-primary' }: MetricCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {subtitle && <span className="text-sm text-muted-foreground">{subtitle}</span>}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center space-x-1 text-xs ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-3 w-3" />
              ) : null}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </CardContent>
  </Card>
);

export default function CampaignAnalytics({ campaign }: CampaignAnalyticsProps) {
  const deliveryRate = campaign.totalInfluencers > 0 ? (campaign.sentEmails / campaign.totalInfluencers) * 100 : 0;
  const clickThroughRate = campaign.openRate > 0 ? (campaign.responseRate / campaign.openRate) * 100 : 0;
  
  // Mock data for step-by-step performance
  const stepPerformance = campaign.steps.map((step, index) => ({
    stepNumber: index + 1,
    templateName: step.templateName || `Step ${index + 1}`,
    sent: Math.floor(campaign.sentEmails * (1 - index * 0.1)),
    opened: Math.floor(campaign.sentEmails * (campaign.openRate / 100) * (1 - index * 0.15)),
    replied: Math.floor(campaign.sentEmails * (campaign.responseRate / 100) * (1 - index * 0.2))
  }));

  // Mock hourly performance data
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    opens: Math.floor(Math.random() * 20) + 5,
    clicks: Math.floor(Math.random() * 10) + 2
  }));

  const bestPerformingHour = hourlyData.reduce((best, current) => 
    current.opens > best.opens ? current : best
  );

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sent"
          value={campaign.sentEmails}
          subtitle={`of ${campaign.totalInfluencers}`}
          trend={campaign.sentEmails > 0 ? 'up' : 'neutral'}
          trendValue={`${deliveryRate.toFixed(1)}% delivered`}
          icon={Mail}
          color="text-blue-600"
        />
        
        <MetricCard
          title="Open Rate"
          value={`${campaign.openRate}%`}
          trend={campaign.openRate > 25 ? 'up' : campaign.openRate > 15 ? 'neutral' : 'down'}
          trendValue={campaign.openRate > 25 ? 'Above average' : 'Industry avg: 25%'}
          icon={Eye}
          color="text-green-600"
        />
        
        <MetricCard
          title="Response Rate"
          value={`${campaign.responseRate}%`}
          trend={campaign.responseRate > 5 ? 'up' : campaign.responseRate > 2 ? 'neutral' : 'down'}
          trendValue={campaign.responseRate > 5 ? 'Excellent' : 'Industry avg: 5%'}
          icon={MessageSquare}
          color="text-purple-600"
        />
        
        <MetricCard
          title="Click Rate"
          value={`${clickThroughRate.toFixed(1)}%`}
          subtitle="of opens"
          trend={clickThroughRate > 10 ? 'up' : 'neutral'}
          trendValue={`${Math.floor(campaign.sentEmails * clickThroughRate / 100)} clicks`}
          icon={Target}
          color="text-orange-600"
        />
      </div>

      {/* Campaign Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Campaign Progress
          </CardTitle>
          <CardDescription>
            Track the progress of your multi-step email sequence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(deliveryRate)}% complete</span>
          </div>
          <Progress value={deliveryRate} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 text-center pt-4">
            <div>
              <div className="text-2xl font-bold text-muted-foreground">{campaign.totalInfluencers - campaign.sentEmails}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{campaign.sentEmails}</div>
              <div className="text-sm text-muted-foreground">Sent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.floor(campaign.sentEmails * campaign.responseRate / 100)}</div>
              <div className="text-sm text-muted-foreground">Responses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Performance</CardTitle>
          <CardDescription>
            See how each email in your sequence is performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stepPerformance.map((step) => (
              <div key={step.stepNumber} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {step.stepNumber}
                    </div>
                    <div>
                      <div className="font-medium">{step.templateName}</div>
                      <div className="text-sm text-muted-foreground">
                        Email Step {step.stepNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {step.sent > 0 ? `${((step.replied / step.sent) * 100).toFixed(1)}% response` : 'Not sent'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{step.sent}</div>
                    <div className="text-muted-foreground">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{step.opened}</div>
                    <div className="text-muted-foreground">Opened</div>
                    {step.sent > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {((step.opened / step.sent) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{step.replied}</div>
                    <div className="text-muted-foreground">Replied</div>
                    {step.opened > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {((step.replied / step.opened) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Time</CardTitle>
            <CardDescription>
              Optimal hours for email engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {bestPerformingHour.hour}:00
              </div>
              <div className="text-sm text-muted-foreground">
                Peak engagement hour
              </div>
              <div className="text-xs text-muted-foreground">
                {bestPerformingHour.opens} opens, {bestPerformingHour.clicks} clicks
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Health</CardTitle>
            <CardDescription>
              Overall campaign performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Delivery Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(deliveryRate, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{deliveryRate.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Engagement Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(campaign.openRate * 2, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{Math.min(campaign.openRate * 2, 100).toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Conversion Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(campaign.responseRate * 10, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{campaign.responseRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}