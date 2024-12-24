'use server';

import { auth } from '@clerk/nextjs';
import { db } from '@repo/database';
import { revalidatePath } from 'next/cache';

export async function createValidation(data: ValidationFormData) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    // Create validation record
    const validation = await db.validation.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        status: 'IN_PROGRESS',
        filePath: data.files.map((f) => f.url).join(','),
      },
    });

    // Queue the validation job
    await queueValidationJob(validation.id);

    revalidatePath('/validations');
    return { success: true, validationId: validation.id };
  } catch (error) {
    console.error('Error creating validation:', error);
    return { success: false, error: 'Failed to create validation' };
  }
}

async function queueValidationJob(validationId: string) {
  // We'll implement this next when we set up the AI processing pipeline
  // This will trigger the async processing
}
