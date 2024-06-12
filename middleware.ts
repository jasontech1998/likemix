import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ['/album/:path*', '/dashboard'],
};
