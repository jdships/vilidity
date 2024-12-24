import { env } from '@repo/env';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface AnalysisInput {
  title: string;
  description: string;
  category: string;
  fileContents: string[];
}

interface AnalysisResult {
  viralityScore: number;
  uniquenessScore: number;
  problemSolvingScore: number;
  overallScore: number;
  insights: Record<string, any>;
  suggestions: string;
}

export async function analyzeIdea(
  input: AnalysisInput
): Promise<AnalysisResult> {
  try {
    const prompt = `
      Analyze this business idea:
      Title: ${input.title}
      Category: ${input.category}
      Description: ${input.description}
      Additional Documentation: ${input.fileContents.join('\n')}

      Provide a detailed analysis with:
      1. Virality potential (score 0-100)
      2. Uniqueness factor (score 0-100)
      3. Problem-solving effectiveness (score 0-100)
      4. Key insights about market potential
      5. Specific suggestions for improvement
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(
      completion.choices[0]?.message?.content || '{}'
    );

    return {
      viralityScore: analysis.viralityScore || 0,
      uniquenessScore: analysis.uniquenessScore || 0,
      problemSolvingScore: analysis.problemSolvingScore || 0,
      overallScore:
        (analysis.viralityScore +
          analysis.uniquenessScore +
          analysis.problemSolvingScore) /
        3,
      insights: analysis.insights || {},
      suggestions: analysis.suggestions || '',
    };
  } catch (error) {
    console.error('AI Analysis error:', error);
    throw error;
  }
}
