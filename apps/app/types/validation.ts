export interface ValidationFormData {
  title: string;
  category: string;
  description: string;
  files: {
    key: string;
    url: string;
    name: string;
    size: number;
    mimeType: string;
  }[];
}

export interface ValidationFormState {
  status: 'idle' | 'submitting' | 'processing' | 'completed' | 'error';
  message?: string;
  error?: string;
}
