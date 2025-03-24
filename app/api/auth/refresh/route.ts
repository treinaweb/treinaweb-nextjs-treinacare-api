/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { signRefreshToken, signToken, verifyToken } from "@/app/lib/jwt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { refresh } = await request.json();

    if(!refresh) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401} 
      )
    }
  
    const { email } = await verifyToken(refresh);

    const user = await prisma.user.findUnique({
      where: { email: email as string }
    });

    if(!user || !user.active) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401} 
      )
    }

    const newToken = await signToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    const refreshToken = await signRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({
      token: newToken,
      refreshToken
    });

  } catch (error: any) {
    if(error.name === "JWTExpired") {
      return NextResponse.json(
        { message: "Token Expirado" },
        { status: 401 })
    }

    return NextResponse.json(
      { message: error },
      { status: 500} 
    )
  } finally {
    await prisma.$disconnect();
  }
}