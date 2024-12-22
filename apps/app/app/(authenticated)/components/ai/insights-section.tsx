'use client';

import { AiAnalysisCard } from './ai-analysis-card';
import { AiInsightBox } from './ai-insight-box';

interface InsightsSectionProps {
  insights: any[];
  ideaAnalysis: {
    title: string;
    description: string;
    scores: Array<{
      category: string;
      score: number;
      description: string;
      status: 'positive' | 'neutral' | 'negative';
    }>;
  };
}

export function InsightsSection({
  insights,
  ideaAnalysis,
}: InsightsSectionProps) {
  const handleInsightFeedback = (insightId: string, isHelpful: boolean) => {
    console.log(
      `Insight ${insightId} feedback: ${isHelpful ? 'helpful' : 'not helpful'}`
    );
    // Here you would typically update the insight feedback in your database
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AiAnalysisCard
        title={ideaAnalysis.title}
        description={ideaAnalysis.description}
        scores={ideaAnalysis.scores}
        isLoading={false}
        className="shadow-sm"
      />
      <AiInsightBox
        insights={insights}
        onFeedback={handleInsightFeedback}
        isLoading={false}
        className="shadow-sm"
      />
    </div>
  );
}
