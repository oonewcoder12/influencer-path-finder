import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Clock, Mail, GripVertical, ArrowDown } from 'lucide-react';

interface CampaignStep {
  id: string;
  templateId: string;
  templateName: string;
  delay: number;
  delayUnit: 'hours' | 'days';
  order: number;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
}

interface VisualSequenceBuilderProps {
  steps: CampaignStep[];
  templates: EmailTemplate[];
  onStepsChange: (steps: CampaignStep[]) => void;
}

export default function VisualSequenceBuilder({ 
  steps, 
  templates, 
  onStepsChange 
}: VisualSequenceBuilderProps) {
  const [orderedSteps, setOrderedSteps] = useState<CampaignStep[]>([]);

  useEffect(() => {
    const sorted = [...steps].sort((a, b) => a.order - b.order);
    setOrderedSteps(sorted);
  }, [steps]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newSteps = Array.from(orderedSteps);
    const [reorderedItem] = newSteps.splice(result.source.index, 1);
    newSteps.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedSteps = newSteps.map((step, index) => ({
      ...step,
      order: index
    }));

    setOrderedSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  const addStep = () => {
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      templateId: '',
      templateName: '',
      delay: orderedSteps.length === 0 ? 0 : 3,
      delayUnit: 'days',
      order: orderedSteps.length
    };
    const updatedSteps = [...orderedSteps, newStep];
    setOrderedSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  const updateStep = (stepId: string, field: keyof CampaignStep, value: any) => {
    const updatedSteps = orderedSteps.map(step => {
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
    });
    setOrderedSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  const removeStep = (stepId: string) => {
    const updatedSteps = orderedSteps
      .filter(step => step.id !== stepId)
      .map((step, index) => ({ ...step, order: index }));
    setOrderedSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Sequence Builder</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder steps, set delays between emails
          </p>
        </div>
        <Button onClick={addStep} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {orderedSteps.map((step, index) => (
                <div key={step.id}>
                  <Draggable draggableId={step.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-all ${
                          snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                              {index + 1}
                            </div>
                            <CardTitle className="text-base">
                              Step {index + 1}
                              {index === 0 && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Initial
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex-1" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(step.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Email Template</Label>
                              <Select
                                value={step.templateId}
                                onValueChange={(value) => updateStep(step.id, 'templateId', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a template">
                                    {step.templateName && (
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {step.templateName}
                                      </div>
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {templates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <div>
                                          <div className="font-medium">{template.name}</div>
                                          <div className="text-xs text-muted-foreground">
                                            {template.category}
                                          </div>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {index > 0 && (
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label>Delay</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={step.delay}
                                    onChange={(e) => updateStep(step.id, 'delay', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                  />
                                </div>
                                <div>
                                  <Label>Unit</Label>
                                  <Select
                                    value={step.delayUnit}
                                    onValueChange={(value: 'hours' | 'days') => updateStep(step.id, 'delayUnit', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="hours">Hours</SelectItem>
                                      <SelectItem value="days">Days</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>

                          {step.delay > 0 && index > 0 && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                              <Clock className="h-4 w-4" />
                              This email will be sent {step.delay} {step.delayUnit} after the previous step
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                  
                  {index < orderedSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="flex flex-col items-center">
                        <ArrowDown className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          +{orderedSteps[index + 1]?.delay || 0} {orderedSteps[index + 1]?.delayUnit || 'days'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {orderedSteps.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No steps yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your email sequence by adding your first step
            </p>
            <Button onClick={addStep} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add First Step
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}