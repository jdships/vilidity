export type ProcessingStep = {
  id: number;
  message: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed';
};

export type ProcessingState = {
  currentStep: number;
  steps: ProcessingStep[];
  overallProgress: number;
};
