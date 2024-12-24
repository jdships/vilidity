'use client';

import { Progress } from '@repo/design-system/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ValidationStatus {
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  result?: {
    viralityScore: number;
    uniquenessScore: number;
    problemSolvingScore: number;
    overallScore: number;
  };
}

export function ValidationProgress({ validationId }: { validationId: string }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ValidationStatus | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!validationId) return;

    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/validations/${validationId}/status`);
        const data = await response.json();

        if (data.validation) {
          setStatus(data.validation);

          if (data.validation.status === 'IN_PROGRESS') {
            setProgress((prev) => Math.min(prev + 10, 90));
          } else if (data.validation.status === 'COMPLETED') {
            setProgress(100);
            clearInterval(interval);
            router.push(`/validations/${validationId}/results`);
          } else if (data.validation.status === 'FAILED') {
            clearInterval(interval);
            toast.error('Validation failed');
          }
        }
      } catch (error) {
        console.error('Error checking validation status:', error);
      }
    };

    checkStatus();
    interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [validationId, router]);

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">Analysis in Progress</h2>
      <Progress value={progress} className="w-full" />
      <p className="text-muted-foreground text-sm">
        We're currently analyzing your idea. This may take a few minutes.
      </p>
    </div>
  );
}

// Export both names for backwards compatibility
export { ValidationProgress as ValidationResults };
export { ValidationProgress };
