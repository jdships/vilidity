'use client';

import type { Validation, ValidationResult } from '@repo/database';
import { Card } from '@repo/design-system/components/ui/card';
import { Progress } from '@repo/design-system/components/ui/progress';
import { useEffect, useState } from 'react';

interface ValidationResultsProps {
  validation: Validation & {
    result: ValidationResult | null;
  };
}

export function ValidationResults({
  validation: initialValidation,
}: ValidationResultsProps) {
  const [validation, setValidation] = useState(initialValidation);
  const result = validation.result;

  useEffect(() => {
    if (validation.status === 'COMPLETED' || validation.status === 'FAILED') {
      return;
    }

    const eventSource = new EventSource(
      `/api/validations/${validation.id}/status`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.result) {
        setValidation((prev) => ({
          ...prev,
          status: data.status,
          result: data.result,
        }));
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [validation.id, validation.status]);

  if (!result) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-semibold text-xl">Analysis in Progress</h2>
          <Progress value={undefined} className="w-[60%]" />
          <p className="text-muted-foreground">
            We're currently analyzing your idea. This may take a few minutes.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 font-semibold text-xl">Scores</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Virality Potential</span>
              <span>{Math.round(result.viralityScore)}%</span>
            </div>
            <Progress value={result.viralityScore} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Uniqueness</span>
              <span>{Math.round(result.uniquenessScore)}%</span>
            </div>
            <Progress value={result.uniquenessScore} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Problem Solving</span>
              <span>{Math.round(result.problemSolvingScore)}%</span>
            </div>
            <Progress value={result.problemSolvingScore} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Overall Score</span>
              <span className="font-semibold">
                {Math.round(result.overallScore)}%
              </span>
            </div>
            <Progress value={result.overallScore} className="bg-primary/20" />
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-xl">Key Insights</h2>
          <div className="prose prose-neutral dark:prose-invert">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(result.insights, null, 2)}
            </pre>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-xl">Suggestions</h2>
          <p className="text-muted-foreground">{result.suggestions}</p>
        </Card>
      </div>
    </div>
  );
}
