
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import { apiError } from '@/lib/server/apiError';
import { dbConnect } from '@/dbConfig/dbConfig';

dbConnect();
const generateResetToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    const token = jwt.sign(
      {
        _id: user?._id,
        email: user?.email,
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: process.env.TOKEN_EXPIRY || "10m",
      }
    );
    return token;
  } catch (error) {
    console.error('Token Generation Error:', error);
    throw new apiError(500, 'Something went wrong while generating tokens');
  }
};


const verifyResetToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new apiError(401, 'Invalid or expired token');
  }
};

export { generateResetToken ,verifyResetToken};
