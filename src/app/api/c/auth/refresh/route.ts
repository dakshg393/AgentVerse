import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { generateAccessAndRefreshToken } from '@/helpers/generateAccAndRefToken.helpers';
import { apiError } from '@/lib/server/apiError';

export const POST = async (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  try {
    if (!refreshToken) return apiError('No refresh token provided', 404);

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { _id: string };

    const user = await User.findById(decoded._id);
    if (!user) return apiError('User not found', 401);

    // Generate new tokens
    const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    // Save new refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    // Build response after everything is successful
    const response = NextResponse.json({ success: true });

    // Set new access token
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });

    // Set new refresh token
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return apiError('Somthing went wrong ', 500);
  }
};
