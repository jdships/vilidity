import { db } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || params.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const validation = await db.validation.findUnique({
      where: { id },
      select: {
        status: true,
        result: {
          select: {
            viralityScore: true,
            uniquenessScore: true,
            problemSolvingScore: true,
            overallScore: true,
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
    return NextResponse.json(
      { error: 'Failed to fetch validation status' },
      { status: 500 }
    );
  }
}
