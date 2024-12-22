'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Progress } from '@repo/design-system/components/ui/progress';
import { cn } from '@repo/design-system/lib/utils';

interface AnalysisScore {
  category: string;
  score: number;
  description: string;
  status: 'positive' | 'neutral' | 'negative';
}

interface AiAnalysisCardProps {
  title: string;
  description?: string;
  scores: AnalysisScore[];
  className?: string;
  isLoading?: boolean;
}

export function AiAnalysisCard({
  title,
  description,
  scores,
  className,
  isLoading = false,
}: AiAnalysisCardProps) {
  const getScoreColor = (status: AnalysisScore['status']) => {
    switch (status) {
      case 'positive':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'negative':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    }
  };

  return (
    <Card className={cn('w-full transition-all', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {isLoading && (
            <Badge variant="secondary" className="animate-pulse">
              Analyzing...
            </Badge>
          )}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {scores.map((score, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{score.category}</span>
              <Badge
                variant="secondary"
                className={cn(getScoreColor(score.status))}
              >
                {score.score}%
              </Badge>
            </div>
            <Progress
              value={score.score}
              className={cn(
                'h-2',
                score.status === 'positive' && 'bg-green-100 dark:bg-green-900',
                score.status === 'negative' && 'bg-red-100 dark:bg-red-900',
                score.status === 'neutral' && 'bg-yellow-100 dark:bg-yellow-900'
              )}
            />
            <p className="text-muted-foreground text-sm">{score.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
