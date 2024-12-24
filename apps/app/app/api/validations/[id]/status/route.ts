import { db } from '@repo/database';
import { headers } from 'next/headers';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const abortController = new AbortController();

  try {
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const validation = await db.validation.findUnique({
            where: { id: params.id },
            include: { result: true },
          });

          if (!validation) {
            controller.close();
            break;
          }

          controller.enqueue(
            `data: ${JSON.stringify({
              status: validation.status,
              result: validation.result,
            })}\n\n`
          );

          if (
            validation.status === 'COMPLETED' ||
            validation.status === 'FAILED'
          ) {
            controller.close();
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      },
      cancel() {
        abortController.abort();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Status stream error:', error);
    return new Response('Error', { status: 500 });
  }
}
