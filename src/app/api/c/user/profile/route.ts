// import { dbConnect } from '@/dbConfig/dbConfig';
// import User from '@/models/user.model';
// import { NextRequest, NextResponse } from 'next/server';
// import { getDataFromToken } from '@/helpers/getDataFromToken';

// dbConnect();

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getDataFromToken(request);

//     if (!userId) {
//       const response = NextResponse.json(
//         { error: 'Unothorize no token Provided' },
//         { status: 401 }
//       );

//       response.cookies.set('accessToken', '', {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 0,
//       });
//       response.cookies.set('refreshToken', '', {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 0,
//       });

//       return response;
//     }

//     const user = await User.findOne({ _id: userId }).select('-password -refreshToken');

//     if (!user) {
//       const response = NextResponse.json({ error: 'User Not Found' }, { status: 404 });

//       response.cookies.set('accessToken', '', {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 0,
//       });
//       response.cookies.set('refreshToken', '', {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 0,
//       });

//       return response;
//     }

//     return NextResponse.json({ message: 'User Found Successfully', data: user }, { status: 200 });
//   } catch (error: any) {
//     const response = NextResponse.json({ error: 'Failed To Fatch User' }, { status: 401 });

//     // ❌ Clear cookies
//     response.cookies.set('accessToken', '', { httpOnly: true, secure: true, path: '/', maxAge: 0 });
//     response.cookies.set('refreshToken', '', {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//       maxAge: 0,
//     });

//     return response;
//   }
// }

import { dbConnect } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { generateAccessAndRefreshToken } from '@/helpers/generateAccAndRefToken.helpers';

dbConnect();

export async function GET(request: NextRequest) {
  const decodedAcc = await getDataFromToken(request, 'accessToken');
  const decodedRef = await getDataFromToken(request, 'refreshToken');

  if (decodedAcc || decodedRef) {
    if (decodedAcc) {
      const user = await User.findOne({ _id: decodedAcc._id }).select('-password -refreshToken');
      return NextResponse.json({ message: 'User Found Successfully', data: user }, { status: 200 });
    } else if (decodedRef) {
      const token = request.cookies.get('refreshToken')?.value;
      const user = await User.findOne({ _id: decodedRef._id }).select('-password ');
      if (user.refreshToken === token) {
        const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);
        const response = NextResponse.json(
          { message: 'User Found Successfully', data: user },
          { status: 200 }
        );
        response.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: process.env.ACCESS_TOKEN_EXPIRY,
        });
        response.cookies.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: process.env.REFRESH_TOKEN_EXPIRY,
        });

        return response;
      }
    }
  } else {
    const response = NextResponse.json({ error: 'User Not Found' }, { status: 404 });

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0,
    });
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0,
    });

    return response;
  }
}

// import { dbConnect } from '@/dbConfig/dbConfig';
// import User from '@/models/user.model';
// import { NextRequest, NextResponse } from 'next/server';
// import { getDataFromToken } from '@/helpers/getDataFromToken';
// import { generateAccessAndRefreshToken } from '@/helpers/generateAccAndRefToken.helpers';

// dbConnect();

// export async function GET(request: NextRequest) {
//   try {
//     const decodedAcc = await getDataFromToken(request, 'accessToken');

//     // If Access Token is valid
//     if (decodedAcc) {
//       const user = await User.findOne({ _id: decodedAcc._id }).select('-password -refreshToken');
//       return NextResponse.json({ message: 'User Found Successfully', data: user }, { status: 200 });
//     }

//     // If Access Token invalid, try refresh
//     const decodedRef = await getDataFromToken(request, 'refreshToken');
//     if (decodedRef) {
//       const oldToken = request.cookies.get('refreshToken')?.value;
//       const user = await User.findOne({ _id: decodedRef._id }).select('-password');
//       if (user && user.refreshToken === oldToken) {
//         const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

//         // Update tokens in cookies
//         const response = NextResponse.json(
//           { message: 'New tokens issued. User Found.', data: user },
//           { status: 200 }
//         );

//         response.cookies.set('accessToken', newAccessToken, {
//           httpOnly: true,
//           secure: true,
//           path: '/',
//           maxAge: 60 * 60, // 1 hour
//         });

//         response.cookies.set('refreshToken', newRefreshToken, {
//           httpOnly: true,
//           secure: true,
//           path: '/',
//           maxAge: 60 * 60 * 24 * 7, // 7 days
//         });

//         // Save new refresh token in DB
//         user.refreshToken = newRefreshToken;
//         await user.save();

//         return response;
//       }
//     }

//     // No valid token
//     const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     response.cookies.set('accessToken', '', { path: '/', maxAge: 0 });
//     response.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
//     return response;
//   } catch (error: any) {
//     console.log('Error in /user/profile:', error.message);
//     const response = NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//     response.cookies.set('accessToken', '', { path: '/', maxAge: 0 });
//     response.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
//     return response;
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { getDataFromToken } from '@/helpers/getDataFromToken';
// import User from '@/models/userModel';
// import { generateAccessAndRefreshToken } from '@/helpers/generateAccessAndRefreshToken';
// import { dbConnect } from '@/dbConfig/dbConfig';

// dbConnect();
// export async function GET(request: NextRequest) {
//   try {
//     let userId = null;
//     let newTokensNeeded = false;

//     const decodedAccess = await getDataFromToken(request, 'accessToken');
//     if (decodedAccess) {
//       userId = decodedAccess._id;
//     } else {
//       // Try refresh token
//       const decodedRefresh = await getDataFromToken(request, 'refreshToken');
//       const oldRefreshToken = request.cookies.get('refreshToken')?.value;

//       if (decodedRefresh) {
//         const user = await User.findById(decodedRefresh._id);

//         if (user && user.refreshToken === oldRefreshToken) {
//           // ✅ Refresh token is valid - issue new tokens
//           const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

//           const response = NextResponse.next(); // create a dummy response to set cookies

//           response.cookies.set('accessToken', newAccessToken, {
//             httpOnly: true,
//             secure: true,
//             path: '/',
//             maxAge: 60 * 60,
//           });

//           response.cookies.set('refreshToken', newRefreshToken, {
//             httpOnly: true,
//             secure: true,
//             path: '/',
//             maxAge: 60 * 60 * 24 * 7,
//           });

//           user.refreshToken = newRefreshToken;
//           await user.save();

//           userId = user._id;
//           newTokensNeeded = true;
//         }
//       }
//     }

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await User.findById(userId).select('-password');
//     const response = NextResponse.json({ message: 'User found', data: user }, { status: 200 });

//     if (newTokensNeeded) {
//       // Set the new tokens if we generated them
//       const newAccessToken = request.cookies.get('accessToken')?.value;
//       const newRefreshToken = request.cookies.get('refreshToken')?.value;

//       response.cookies.set('accessToken', newAccessToken!, {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 60 * 60,
//       });

//       response.cookies.set('refreshToken', newRefreshToken!, {
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 60 * 60 * 24 * 7,
//       });
//     }

//     return response;
//   } catch (err: any) {
//     console.log('💥 Error in /user/profile:', err.message);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }
