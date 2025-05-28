import { dbConnect } from '@/dbConfig/dbConfig';
import Session from '@/models/session.model';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function POST(request: NextRequest) {
  try {
    // 1. Parse the request body
    const body = await request.json();
    const { userId, type } = body;

    if (!userId || !type) {
      return NextResponse.json(
        { error: 'userId and type are required' },
        { status: 400 }
      );
    }

    // 2. Update the user's subscription type (assuming 'type' means subscription type)
    const subscribe = await User.findByIdAndUpdate(
      userId,
      { subscription: type },
      { new: true }
    );

    if (!subscribe) {
      return NextResponse.json(
        { error: 'User not found or could not be updated' },
        { status: 404 }
      );
    }

   

    // 4. Return the sessions with a 200 status
    return NextResponse.json(
      {
        data: subscribe,
        message: 'User subscribed successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Subscription Error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. User not subscribed.',
      },
      { status: 500 }
    );
  }
}
