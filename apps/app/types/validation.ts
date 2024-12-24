export interface ValidationFile {
  url: string;
  name: string;
  mimeType: string;
}

export interface ValidationFormData {
  title: string;
  category: string;
  description: string;
  files: ValidationFile[];
}

export type ValidationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FAILED';

export interface ValidationFormState {
  status: 'idle' | 'submitting' | 'processing' | 'completed' | 'error';
  message?: string;
  error?: string;
}
