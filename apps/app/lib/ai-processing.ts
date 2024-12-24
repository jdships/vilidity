import { db } from '@repo/database';
import { analyzeIdea } from './ai-analysis';
import { extractFileContent } from './file-processing';

interface ProcessingInput {
  validationId: string;
  title: string;
  description: string;
  category: string;
  files: string[];
}

export async function startAIProcessing(input: ProcessingInput) {
  try {
    // 1. Update status to processing
    await db.validation.update({
      where: { id: input.validationId },
      data: { status: 'IN_PROGRESS' },
    });

    // 2. Process files and extract text content
    const fileContents = await Promise.all(
      input.files.map(async (fileUrl) => {
        const file = {
          url: fileUrl,
          mimeType: getMimeType(fileUrl), // We need to implement this helper
          name: fileUrl.split('/').pop() || '',
        };
        return extractFileContent(file);
      })
    );

    // Log for debugging
    console.log('Extracted file contents:', fileContents);

    // 3. Combine all input for AI analysis
    const analysisInput = {
      title: input.title,
      description: input.description,
      category: input.category,
      fileContents,
    };

    // 4. Call AI APIs for analysis
    const analysis = await analyzeIdea({
      title: input.title,
      description: input.description,
      category: input.category,
      fileContents,
    });

    // 5. Store results
    await db.validationResult.create({
      data: {
        validationId: input.validationId,
        viralityScore: analysis.viralityScore,
        uniquenessScore: analysis.uniquenessScore,
        problemSolvingScore: analysis.problemSolvingScore,
        overallScore: analysis.overallScore,
        insights: analysis.insights,
        suggestions: analysis.suggestions,
      },
    });

    // 6. Update status to completed
    await db.validation.update({
      where: { id: input.validationId },
      data: { status: 'COMPLETED' },
    });
  } catch (error) {
    console.error('AI Processing error:', error);
    await db.validation.update({
      where: { id: input.validationId },
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
