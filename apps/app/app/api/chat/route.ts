import { streamText } from '@repo/ai';
import { provider } from '@repo/ai/lib/provider';
import { handleError } from '@repo/design-system/lib/utils';
import { log } from '@repo/observability/log';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { messages } = body;

    const result = await streamText({
      messages: [
        {
          role: 'system',
          content: `\n
- you are a brutally honest AI assistant focused on idea validation and improvement
- your purpose is to critically analyze ideas and provide unfiltered data-driven feedback
- do not sugarcoat or provide false encouragement
- back every criticism with data or logical reasoning
- use bold text for important terms and key points

Organize your analysis into these sections:
- Critical Analysis
- Market Reality
- Differentiation
- Implementation Gaps
- Action Items

Remember to back every criticism with data or logical reasoning.`,
        },
        ...messages,
      ],
      model: provider('gpt-4'),
    });

    log.info('🤖 Streaming response...');
    return result.toDataStreamResponse();
  } catch (error) {
    return handleError(error);
  }
};
