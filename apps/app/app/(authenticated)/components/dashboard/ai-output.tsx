'use client';

import { useValidationStore } from '@/store/validation';
import type { ProcessingState, ProcessingStep } from '@/types/processing';
import {} from '@repo/design-system/components/ui/card';
import { Progress } from '@repo/design-system/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CheckCircle2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: 1,
    message: 'Initializing AI analysis...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 2,
    message: 'Analyzing market potential and competitive landscape...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 3,
    message: 'Evaluating social media trends and engagement metrics...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 4,
    message: 'Assessing market demand through search patterns...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 5,
    message: 'Calculating virality potential and reach...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 6,
    message: 'Measuring uniqueness and innovation factors...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 7,
    message: 'Generating comprehensive validation report...',
    progress: 0,
    status: 'pending',
  },
  {
    id: 8,
    message: 'Analysis complete! Redirecting to your detailed report...',
    progress: 0,
    status: 'pending',
  },
];

export function AiOutput() {
  const router = useRouter();
  const [processingState, setProcessingState] = useState<ProcessingState>({
    currentStep: 0,
    steps: PROCESSING_STEPS,
    overallProgress: 0,
  });

  const { validationId, isProcessing, setIsProcessing, reset } =
    useValidationStore();

  useEffect(() => {
    if (!validationId || !isProcessing) return;

    let currentStepIndex = 0;
    const stepDuration = 3000;
    let redirectAttempts = 0;

    const progressInterval = setInterval(() => {
      setProcessingState((prev) => {
        const updatedSteps = [...prev.steps];

        // Update previous step to completed if exists
        if (currentStepIndex > 0) {
          updatedSteps[currentStepIndex - 1].status = 'completed';
          updatedSteps[currentStepIndex - 1].progress = 100;
        }

        // Update current step
        if (currentStepIndex < updatedSteps.length) {
          updatedSteps[currentStepIndex].status = 'processing';
          updatedSteps[currentStepIndex].progress = Math.min(
            updatedSteps[currentStepIndex].progress + 2,
            100
          );
        }

        // Calculate overall progress
        const overallProgress =
          (currentStepIndex * 100 + updatedSteps[currentStepIndex]?.progress ||
            0) / updatedSteps.length;

        // Move to next step if current step is complete
        if (updatedSteps[currentStepIndex]?.progress === 100) {
          currentStepIndex++;
        }

        // When all steps are complete, check validation status
        if (currentStepIndex >= updatedSteps.length) {
          clearInterval(progressInterval);

          const checkValidation = async () => {
            try {
              const response = await fetch(
                `/api/validations/${validationId}/status`
              );
              const data = await response.json();

              if (data.validation?.status === 'COMPLETED') {
                setIsProcessing(false);
                reset();
                router.push(`/validations/${validationId}/results`);
              } else if (redirectAttempts < 10) {
                redirectAttempts++;
                setTimeout(checkValidation, 1000);
              } else {
                toast.error('Validation processing took too long');
                setIsProcessing(false);
                reset();
              }
            } catch (error) {
              console.error('Error checking validation status:', error);
              setIsProcessing(false);
              reset();
            }
          };

          checkValidation();
        }

        return {
          currentStep: currentStepIndex,
          steps: updatedSteps,
          overallProgress,
        };
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
      if (!isProcessing) {
        reset();
      }
    };
  }, [validationId, router, isProcessing, setIsProcessing, reset]);

  if (!validationId) {
    return (
      <div className="flex min-h-[600px] w-full flex-col items-center justify-center space-y-4 text-center">
        <div className="relative">
          <Bot className="relative h-16 w-16 animate-[pulse_2s_ease-in-out_infinite] text-primary" />
        </div>
        <div className="max-w-[280px] space-y-2">
          <h3 className="font-semibold text-xl">AI Validation Assistant</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Fill out the form on the left to start validating your idea. Our AI
            will analyze market potential, trends, and provide detailed
            insights.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {['Market Analysis', 'Social Trends', 'Virality Score'].map(
            (feature) => (
              <div
                key={feature}
                className="flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 font-medium text-xs"
              >
                <Sparkles className="h-3.5 w-3.5 animate-[pulse_2s_ease-in-out_infinite] text-primary" />
                {feature}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[600px]">
      <div className="absolute inset-x-0 top-0">
        <Progress value={processingState.overallProgress} className="h-1" />
      </div>
      <div className="space-y-6 pt-6">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {processingState.steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: step.status !== 'pending' ? 1 : 0,
                  y: step.status !== 'pending' ? 0 : 10,
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                {step.status === 'completed' ? (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </motion.div>
                ) : (
                  <div className="h-5 w-5">
                    <div className="h-full w-full animate-[spin_1s_linear_infinite] rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
                <span className="flex-1 text-sm">{step.message}</span>
                <span className="text-muted-foreground text-sm">
                  {step.progress}%
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
