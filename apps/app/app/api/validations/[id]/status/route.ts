import { db } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const validationId = searchParams.get('id') || id;

    if (!validationId) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const validation = await db.validation.findUnique({
      where: { id: validationId },
      select: {
        id: true,
        status: true,
        result: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!validation) {
      return NextResponse.json(
        { error: 'Validation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ validation });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check validation status' },
      { status: 500 }
    );
  }
}
