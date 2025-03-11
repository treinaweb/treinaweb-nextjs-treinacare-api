import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/jwt";
import { Role } from "./app/backend/enum/role";

export async function middleware(request: NextRequest) {
  if(request.method === 'GET') {
    return NextResponse.next();
  }

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

    if(request.method === 'DELETE') {
      if(!checkRole(decoded.role as string, [Role.ADMIN])) {
        return NextResponse.json(
          { message: 'Acesso não autorizado' },
          { status: 403 }
        )
      }
    }

    if(request.method === 'POST' || request.method === 'PATCH') {
      if(!checkRole(decoded.role as string, [Role.ADMIN, Role.EDITOR])) {
        return NextResponse.json(
          { message: 'Acesso não autorizado' },
          { status: 403 }
        )
      }
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
  matcher: ['/api/posts/:path*']
}

function checkRole(userRole: string, allowedRoles: Role[]): boolean {
 return allowedRoles.includes(userRole.toLocaleLowerCase() as Role);
}