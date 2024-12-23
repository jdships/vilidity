import { streamText } from '@repo/ai';
import { provider } from '@repo/ai/lib/provider';
import { log } from '@repo/observability/log';

export const POST = async (req: Request) => {
  const body = await req.json();

  log.info('🤖 Chat request received.', { body });
  const { messages } = body;

  log.info('🤖 Generating response...');
  const result = streamText({
    model: provider('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  log.info('🤖 Streaming response...');
  return result.toDataStreamResponse();
};
