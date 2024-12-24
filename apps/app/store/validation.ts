import { create } from 'zustand';

interface ValidationStore {
  validationId: string | null;
  isProcessing: boolean;
  setValidationId: (id: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  reset: () => void;
}

export const useValidationStore = create<ValidationStore>((set) => ({
  validationId: null,
  isProcessing: false,
  setValidationId: (id) => set({ validationId: id }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  reset: () => set({ validationId: null, isProcessing: false }),
}));
