// import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export const getDataFromToken = (request: NextRequest) => {
//   try {
//     const token = request.cookies.get('accessToken')?.value || '';
//     const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     return decodedToken._id;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { _id: string };

    return decodedToken._id;
  } catch (error: any) {
    throw new Error(error.message || 'Invalid or expired token');
  }
};
