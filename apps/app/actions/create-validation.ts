'use server';

import { startAIProcessing } from '@/lib/ai-processing';
import type { ValidationFormInput } from '@/lib/validations/validation-form';
import { validationFormSchema } from '@/lib/validations/validation-form';
import { auth } from '@clerk/nextjs/server';
import { db } from '@repo/database';

export async function createValidation(data: ValidationFormInput) {
  console.log('Received validation data:', data);

  if (!data || typeof data !== 'object') {
    console.error('Invalid input data received:', data);
    return {
      success: false,
      error: 'Invalid input data',
    };
  }

  try {
    // Validate input data
    const validatedData = validationFormSchema.safeParse(data);

    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error);
      return {
        success: false,
        error: 'Invalid form data: ' + validatedData.error.message,
      };
    }

    const { userId } = await auth();
    if (!userId) {
      console.error('No user ID found');
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    console.log('Creating validation for user:', userId);

    // Create validation first
    const validation = await db.validation.create({
      data: {
        userId,
        title: validatedData.data.title,
        description: validatedData.data.description,
        category: validatedData.data.category,
        filePath: validatedData.data.files.map((f) => f.url).join(','),
        status: 'IN_PROGRESS',
      },
    });

    // Start AI processing in the background
    startAIProcessing({
      validationId: validation.id,
      title: validation.title,
      description: validation.description,
      category: validation.category,
      files: validation.filePath?.split(',') ?? [],
    }).catch((error) => {
      console.error('AI Processing error:', error);
    });

    return { success: true, validationId: validation.id };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create validation';
    console.error('Create validation error:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
