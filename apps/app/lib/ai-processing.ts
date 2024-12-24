import { db } from '@repo/database';

interface ProcessingInput {
  validationId: string;
  title: string;
  description: string;
  category: string;
  files: string[];
}

export async function startAIProcessing({
  validationId,
  title,
  description,
  category,
  files,
}: {
  validationId: string;
  title: string;
  description: string;
  category: string;
  files: string[];
}) {
  try {
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 15000));

    // Update status to COMPLETED and create result
    await db.validation.update({
      where: { id: validationId },
      data: {
        status: 'COMPLETED',
        result: {
          create: {
            viralityScore: Math.random() * 100,
            uniquenessScore: Math.random() * 100,
            problemSolvingScore: Math.random() * 100,
            overallScore: Math.random() * 100,
            insights: {},
            suggestions: 'Sample suggestions',
          },
        },
        metrics: {
          create: {
            marketSize: Math.floor(Math.random() * 1000),
            targetAudience: Math.floor(Math.random() * 100),
            competitorCount: Math.floor(Math.random() * 50),
            growthPotential: Math.floor(Math.random() * 100),
            marketTrends: {},
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error('AI Processing error:', error);

    // Update status to FAILED
    await db.validation.update({
      where: { id: validationId },
      data: { status: 'FAILED' },
    });

    throw error;
  }
}

function getMimeType(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    txt: 'text/plain',
  };

  return mimeTypes[extension || ''] || 'application/octet-stream';
}
