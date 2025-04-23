import { dbConnect } from '@/dbConfig/dbConfig';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model.js';
import { generateAccessAndRefreshToken } from '@/helpers/generateAccAndRefToken.helpers';
import ms from 'ms';

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const accessTokenExpiry = ms(process.env.ACCESS_TOKEN_EXPIRY || '1d');
    const refreshTokenExpiry = ms(process.env.REFRESH_TOKEN_EXPIRY || '7d');

    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(1);
    console.log(reqBody);

    if ([email, password].some((field) => field?.trim() === '')) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 }); // Bad request
    }
    console.log(2);
    // Check if user already exists with the provided email
    const user = await User.findOne({ email });
    console.log(3);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User Not Found with this email' },
        { status: 409 }
      ); // Conflict
    }
    console.log(4);

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log(5);
    if (!isPasswordCorrect) {
      return NextResponse({ error: 'Password is Not Correct' }, { status: 400 });
    }
    console.log(6);
    const { newRefreshToken, newAccessToken } = await generateAccessAndRefreshToken(user._id);
    console.log(7);
    const response = NextResponse.json({
      message: 'User Login Successfully ',
      status: 200,
      data: user,
    });
    console.log(9);
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: accessTokenExpiry,
    });

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: refreshTokenExpiry,
    });

    return response;

    // In case the user creation fails for any reason
  } catch (error: any) {
    // Catch any unexpected error
    return NextResponse.json({ error: `Somthing Went Wrong ${error} ` }, { status: 500 }); // Internal server error
  }
};
