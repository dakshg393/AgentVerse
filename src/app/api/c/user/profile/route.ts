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

// import { dbConnect } from '@/dbConfig/dbConfig';
// import User from '@/models/user.model';
// import { NextRequest, NextResponse } from 'next/server';
// import { getDataFromToken } from '@/helpers/getDataFromToken';
// import { generateAccessAndRefreshToken } from '@/helpers/generateAccAndRefToken.helpers';

// dbConnect();

// export async function GET(request: NextRequest) {
//   const decodedAcc = await getDataFromToken(request, 'accessToken');
//   const decodedRef = await getDataFromToken(request, 'refreshToken');

//   if (!decodedAcc && decodedRef) {
//     NextResponse.json({ error: 'Token not found ' }, { status: 404 });
//   }

//   if (decodedAcc || decodedRef) {
//     if (decodedAcc) {
//       console.log('Here is decoded accesstoken ', decodedAcc);
//       const user = await User.findOne({ _id: decodedAcc._id }).select('-password -refreshToken');
//       return NextResponse.json({ message: 'User Found Successfully', data: user }, { status: 200 });
//     } else if (decodedRef) {
//       const token = request.cookies.get('refreshToken')?.value;
//       const user = await User.findOne({ _id: decodedRef._id }).select('-password ');
//       if (user.refreshToken === token) {
//         const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);
//         const response = NextResponse.json(
//           { message: 'User Found Successfully', data: user },
//           { status: 200 }
//         );
//         response.cookies.set('accessToken', newAccessToken, {
//           httpOnly: true,
//           secure: true,
//           path: '/',
//           maxAge: process.env.ACCESS_TOKEN_EXPIRY,
//         });
//         response.cookies.set('refreshToken', newRefreshToken, {
//           httpOnly: true,
//           secure: true,
//           path: '/',
//           maxAge: process.env.REFRESH_TOKEN_EXPIRY,
//         });

//         return response;
//       }
//     }
//   } else {
//     const response = NextResponse.json({ error: 'User Not Found' }, { status: 404 });

//     response.cookies.set('accessToken', '', {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//       maxAge: 0,
//     });
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

  // Case 1: both tokens are invalid or expired → force logout
  if (!decodedAcc && !decodedRef) {
    const response = NextResponse.json({ error: 'Authentication required. Please login again.' }, { status: 401 });

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

  // Case 2: access token is valid → return user
  if (decodedAcc) {
    const user = await User.findOne({ _id: decodedAcc._id }).select('-password -refreshToken');
    return NextResponse.json({ message: 'User found successfully', data: user }, { status: 200 });
  }

  // Case 3: access token is invalid, refresh token is valid → regenerate both tokens
  if (decodedRef) {
    const token = request.cookies.get('refreshToken')?.value;
    const user = await User.findOne({ _id: decodedRef._id }).select('-password');

    if (!user || user.refreshToken !== token) {
      // Refresh token is invalid → force logout
      const response = NextResponse.json({ error: 'Invalid refresh token. Please login again.' }, { status: 403 });

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

    // Regenerate and set new tokens
    const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    const response = NextResponse.json(
      { message: 'User found successfully', data: user },
      { status: 200 }
    );

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY || '3600'), // default 1h
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY || '604800'), // default 7d
    });

    return response;
  }
}


// export async function POST(request:NextRequest) {
//   const {fullName,_id}= await request.json()
//   try {
//     if (!fullName &&) {
//        return NextResponse.json({error:"Value not found"},{status:404})
//     }

//    const updatedUser = await User.findByIdAndUpdate(
//   _id,                
//   { fullName },       
//   { new: true }     
//   );

//   return NextResponse.json({message:"User Updated Successfully ",data:updatedUser},{status:404})
//   } catch (error) {
//     return NextResponse.json({error:"Somthing Went Wrong"},{status:404})
//   }
// }