import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken =  request.cookies.get('refreshToken')?.value;

  const token = accessToken || refreshToken;
  // Your existing logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();

  // if (!accessToken && !refreshToken) {
  //   return NextResponse.json({ error: 'Both tokens missing' }, { status: 404 });
  // }

  // try {
  //   if (accessToken) {
  //     return response;
  //   } else {
  //     return NextResponse.json(
  //       { error: 'Access token missing, use refresh token' },
  //       { status: 401 }
  //     );
  //   }
  // } catch (err) {
  //   return NextResponse.json({ error: `Invalid or expired token ${err}` }, { status: 403 });
  // }
}

export const config = {
  matcher: ['/dashboard/', '/login', '/signup', '/api/c/user/:path*'],
};
