import { dbConnect } from '@/dbConfig/dbConfig';
import Session from '@/models/session.model';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Define params type
type Params = {
  params: {
    id: string;
    user: string;
  };
};

dbConnect();
export async function GET(req: Request, context: RouteContext) {
  const { id, user } = await context.params;

  try {
    const sessionDetails = await Session.findOne({
      _id: id,
      createdBy: user,
    });

    if (!sessionDetails) {
      return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Session found', data: sessionDetails });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
