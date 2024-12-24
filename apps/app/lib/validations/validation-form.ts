import { z } from 'zod';

export const validationFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  category: z.enum(['SaaS', 'Mobile App', 'E-commerce', 'Hardware', 'Other'], {
    required_error: 'Please select a category',
  }),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  files: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string(),
        mimeType: z.string(),
        size: z.number().max(5 * 1024 * 1024, 'File must be less than 5MB'),
      })
    )
    .max(5, 'Maximum 5 files allowed'),
});

export type ValidationFormInput = z.infer<typeof validationFormSchema>;
