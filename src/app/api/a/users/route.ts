import { dbConnect } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const users = await User.find({}).select('-password -refreshToken');

    if (!users) {
      // Refresh token is invalid → force logout
      return NextResponse.json({ error: 'Cant get Users.' }, { status: 403 });
    }

    return NextResponse.json({ message: 'User found successfully', data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Cant get Users.' }, { status: 401 });
  }
}
