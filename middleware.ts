import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/jwt";

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { message: 'Token não fornecido' },
      { status: 401 }
    )
  };

  try {
    const decoded = await verifyToken(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id as string);

    if (request.method === 'GET') {
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }

    if (request.method === 'POST') {
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: 'Token Inválido', error: error },
      { status: 403 }
    )
  }
}

export const config = {
 matcher: [
    '/api/appointments/:path*',
    '/api/doctors/:path*/schedule',
    '/api/user',
  ]
}