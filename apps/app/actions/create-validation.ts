'use server';

import { startAIProcessing } from '@/lib/ai-processing';
import type { ValidationFormInput } from '@/lib/validations/validation-form';
import { validationFormSchema } from '@/lib/validations/validation-form';
import { auth } from '@clerk/nextjs/server';
import { db } from '@repo/database';
import { revalidatePath } from 'next/cache';

export async function createValidation(data: ValidationFormInput) {
  if (!data) {
    return {
      success: false,
      error: 'No data provided',
    };
  }

  try {
    // Validate input data
    const validatedData = validationFormSchema.parse(data);

    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Create validation record with metrics in a transaction
    const validation = await db.$transaction(async (tx) => {
      try {
        // Create the validation
        const validation = await tx.validation.create({
          data: {
            userId,
            title: validatedData.title,
            description: validatedData.description,
            category: validatedData.category,
            filePath: validatedData.files.map((f) => f.url).join(','),
            status: 'PENDING',
          },
        });

        // Create initial metrics
        await tx.validationMetrics.create({
          data: {
            validationId: validation.id,
            marketSize: 0,
            targetAudience: 0,
            competitorCount: 0,
            growthPotential: 0,
            marketTrends: {},
          },
        });

        return validation;
      } catch (txError) {
        console.error('Transaction error:', txError);
        throw new Error('Failed to create validation record');
      }
    });

    // Start the AI processing in the background
    try {
      await startAIProcessing({
        validationId: validation.id,
        title: validation.title,
        description: validation.description,
        category: validation.category,
        files: validation.filePath?.split(',') ?? [],
      });
    } catch (aiError) {
      console.error('AI Processing error:', aiError);
      // Don't throw here, we still want to return the validation
    }

    revalidatePath('/validations');
    return { success: true, validationId: validation.id };
  } catch (error) {
    console.error('Error creating validation:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create validation',
    };
  }
}
