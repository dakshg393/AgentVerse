// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === '/login' || path === '/signup' || path === '/';
//   const accessToken = request.cookies.get('accessToken')?.value;
//   const refreshToken = request.cookies.get('refreshToken')?.value;

//   const token = accessToken || refreshToken;

//   console.log('path:', path);
//   console.log('token:', refreshToken);
//   console.log('isPublicPath:', isPublicPath);

//   // Your existing logic
//   if (isPublicPath && token) {
//     if (accessToken) {
//       console.log('block 1 execited');
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     } else {
//       console.log('block 2 execited');
//       return NextResponse.json(
//         { error: 'Access Token Not Found Refresh The Token' },
//         { status: 404 }
//       );
//     }
//   }

//   if (!isPublicPath && !token) {
//     console.log('block 3 execited');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/', '/login', '/signup', '/api/c/user/:path*'],
// };

import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === '/u/login' ||
    path === '/u/signup' ||
    path === '/' ||
    path.startsWith('/u/forgetpassword');
  // const isPublicPath = ['/u/login', '/u/signup','/u/forgetpassword/','/'].includes(path);
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Prevent infinite redirects
  if (accessToken || refreshToken) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/u/dashboard', request.url));
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/u/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/u/:path*', '/u/login', '/u/signup', '/', '/api/c/user/:path*'],
};
