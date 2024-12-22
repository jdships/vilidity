'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { cn } from '@repo/design-system/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';

interface InsightFeedback {
  helpful: boolean;
  timestamp: Date;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'technical' | 'user' | 'competition' | 'business';
  importance: 'high' | 'medium' | 'low';
  details: string;
  feedback?: InsightFeedback;
  createdAt: Date;
}

interface AiInsightBoxProps {
  insights: Insight[];
  className?: string;
  onFeedback?: (insightId: string, isHelpful: boolean) => void;
  isLoading?: boolean;
}

export function AiInsightBox({
  insights,
  className,
  onFeedback,
  isLoading = false,
}: AiInsightBoxProps) {
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(
    new Set()
  );

  const toggleInsight = (id: string) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedInsights(newExpanded);
  };

  const getCategoryColor = (category: Insight['category']) => {
    const colors = {
      market: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      technical: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      user: 'bg-green-500/10 text-green-700 dark:text-green-400',
      competition: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
      business: 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
    };
    return colors[category];
  };

  const getImportanceColor = (importance: Insight['importance']) => {
    const colors = {
      high: 'bg-red-500/10 text-red-700 dark:text-red-400',
      medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
      low: 'bg-green-500/10 text-green-700 dark:text-green-400',
    };
    return colors[importance];
  };

  return (
    <Card className={cn('w-full transition-all', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          AI Insights
          {isLoading && (
            <Badge variant="secondary" className="animate-pulse">
              Analyzing...
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          AI-generated insights and recommendations for your idea
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleInsight(insight.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={cn(getCategoryColor(insight.category))}>
                      {insight.category}
                    </Badge>
                    <Badge
                      className={cn(getImportanceColor(insight.importance))}
                    >
                      {insight.importance} priority
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </div>
                {expandedInsights.has(insight.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <CardDescription>{insight.description}</CardDescription>
            </CardHeader>
            {expandedInsights.has(insight.id) && (
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {insight.details}
                  </p>
                  {onFeedback && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(insight.id, true)}
                        className={cn(
                          'gap-2',
                          insight.feedback?.helpful === true && 'text-green-600'
                        )}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        Helpful
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(insight.id, false)}
                        className={cn(
                          'gap-2',
                          insight.feedback?.helpful === false && 'text-red-600'
                        )}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
