import { dbConnect } from '@/dbConfig/dbConfig';
import redis from '@/lib/server/redis';
import Session from '@/models/session.model';
import History from '@/models/history.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(request: NextRequest, context: any) {
  try {
    const { id, user } = context.params as { id: string; user: string };

    // 🔍 Check if summary already exists
    const existingSession = await Session.findOne({ sessionId: id });
    if (existingSession?.summery) {
      return NextResponse.json(
        {
          data: existingSession.summery,
          message: 'Summary already exists, session ended',
        },
        { status: 200 }
      );
    }

    // 📦 Get history from Redis
    const historyKey = `chat:${id}`;
    const redisHistory = await redis.get(historyKey);

    // 💾 Save to DB if available in Redis
    if (redisHistory) {
      await History.create({
        sessionId: id,
        createdBy: user,
        history: redisHistory,
      });
    }

    const sessionHistory = await History.findOne({ sessionId: id });
    if (!sessionHistory) {
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }

    // 📄 Generate summary
    const summery = await generateSessionSummary(sessionHistory.history);

    // ✅ Save summary and mark session ended
    await Session.findOneAndUpdate(
      { sessionId: id },
      {
        $set: {
          summery,
          isEnded: true, // mark session as ended
        },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        data: summery,
        message: 'Summary generated and session marked as ended',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Something went wrong while processing the session',
      },
      { status: 500 }
    );
  }
}
