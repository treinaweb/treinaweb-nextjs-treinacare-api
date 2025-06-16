import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não identificado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const count = searchParams.get('count');
    const status = searchParams.get('status');
    console.log('Parâmetros recebidos:', { count, status, userId });

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        ...(status && { status })
      },
      include: {
        doctor: true
      },
      orderBy: {
        date: 'asc',
      },
      ...(count && { take: parseInt(count) })
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Erro na API de appointments:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}