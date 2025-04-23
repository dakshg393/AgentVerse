// import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export const getDataFromToken = (request: NextRequest, tokenType: string) => {
//   try {
//     if (tokenType === 'accessToken') {
//       const token = request.cookies.get('accessToken')?.value || '';
//       const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       return decodedToken;
//     } else if (tokenType === 'refreshToken') {
//       const token = request.cookies.get('refreshToken')?.value || '';
//       const decodedToken: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//       return decodedToken;
//     }

//     return null;
//   } catch (error) {
//     return null;
//   }
// };

import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getDataFromToken = (request: NextRequest, tokenType: string) => {
  try {
    const token = request.cookies.get(tokenType)?.value;
    if (!token) return null;

    const secret =
      tokenType === 'accessToken'
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;

    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.log(`[${tokenType}] token error:`, err.message);
    return null;
  }
};
