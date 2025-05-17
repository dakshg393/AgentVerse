import { dbConnect } from '@/dbConfig/dbConfig';
import Session from '@/models/session.model';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // 1. Parse the URL to extract query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: 'userId query parameter is required' }, { status: 400 });
    }

    // 2. Fetch all sessions created by this user
    const userSessions = await Session.find({ createdBy: userId }).sort({ createdAt: -1 }).lean();

    // 3. Return the sessions with a 200 status
    return NextResponse.json(
      {
        data: userSessions,
        message: 'Sessions fetched successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('GET /api/sessions error:', error);
    return NextResponse.json(
      {
        error: 'Session not found or something went wrong',
      },
      { status: 500 }
    );
  }
}
