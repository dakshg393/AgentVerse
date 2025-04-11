import User from '@/models/user.model';
import { apiError } from '@/lib/server/apiError.ts';
import { dbConnect } from '@/dbConfig/dbConfig';

dbConnect();
const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new apiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { newAccessToken: accessToken, newRefreshToken: refreshToken };
  } catch (error) {
    console.error('Token Generation Error:', error);
    throw new apiError(500, 'Something went wrong while generating tokens');
  }
};

export { generateAccessAndRefreshToken };
