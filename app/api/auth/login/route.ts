import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcyrpt from "bcrypt";
import { signRefreshToken, signToken } from "@/app/lib/jwt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if(!email || !password) {
    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401} 
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if(!user || !user.active) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401} 
      )
    }

    const passwordMatch = await bcyrpt.compare(password, user.password);

    if(!passwordMatch) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 } 
      )
    }

    const token = await signToken({
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
      token,
      refreshToken
    });

  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500} 
    )
  } finally {
    await prisma.$disconnect();
  }
}