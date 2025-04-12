// import { dbConnect } from '@/dbConfig/dbConfig';
// import User from '@/models/user.model';
// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { getDataFromToken } from '@/helpers/getDataFromToken';

// dbConnect();

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getDataFromToken(request);
//     const user = await User.findOne({ _id: userId }).select('-password -refreshToken');
//     return NextResponse.json({ message: 'User Found Successfully ', data: user }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: `this error by Get of user ${error.message} ${request.cookies.get('refreshToken')?.value}`,
//       },
//       { status: 200 }
//     );
//   }

//   // try {
//   //   const token = request.cookies.get('accessToken')?.value;
//   //   console.log(token);
//   //   if (!token) {
//   //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   //   }

//   //   let decodedToken;
//   //   try {
//   //     decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
//   //   } catch (err) {
//   //     return NextResponse.json({ error: 'Invalid or expired token' }, { status: 402 });
//   //   }

//   //   const user = await User.findById(decodedToken._id).select('-refreshToken -password');
//   //   if (!user) {
//   //     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   //   }

//   //   return NextResponse.json(
//   //     {
//   //       message: 'User fetched successfully',
//   //       data: user,
//   //     },
//   //     { status: 200 }
//   //   );
//   // } catch (error: any) {
//   //   return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
//   // }
// }

import { dbConnect } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request,"accessToken");

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const user = await User.findOne({ _id: userId }).select('-password -refreshToken');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User Found Successfully', data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Failed to fetch user: ${error.message}`,
        token: request.cookies.get('refreshToken')?.value || 'No refreshToken found',
      },
      { status: 500 }
    );
  }
}
