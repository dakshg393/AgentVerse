import { dbConnect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: 'Logout User Successfully' },
      { status: 200 }
    );

    // Clear cookies by setting them to empty and expiring them
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error logging out the user: ${error.message}` },
      { status: 400 }
    );
  }
}
