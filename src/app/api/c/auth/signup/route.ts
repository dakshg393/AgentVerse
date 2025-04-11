import { dbConnect } from '@/dbConfig/dbConfig';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model.js';

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { fullName, email, password } = reqBody;

    console.log(reqBody);

    if ([fullName, email, password].some((field) => field?.trim() === '')) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 }); // Bad request
    }

    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 409 }
      ); // Conflict
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if (createdUser) {
      return NextResponse.json({
        message: 'User Signup Successfully',
        status: 200,
        createdUser,
      });
    }

    // In case the user creation fails for any reason
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); // Internal server error
  } catch (error: any) {
    // Catch any unexpected error
    return NextResponse.json({ error: error.message }, { status: 500 }); // Internal server error
  }
};
