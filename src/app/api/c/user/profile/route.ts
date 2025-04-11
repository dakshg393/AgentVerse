import { dbConnect } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 402 });
    }

    const user = await User.findById(decodedToken._id).select('-refreshToken -password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'User fetched successfully',
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
