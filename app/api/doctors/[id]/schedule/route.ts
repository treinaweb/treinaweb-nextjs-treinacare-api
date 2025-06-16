import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não identificado' },
        { status: 401 }
      );
    }

    const doctorId = await params.id;
    const { date, time } = await request.json();

    // Verificar se o médico existe
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId }
    });

    if (!doctor) {
      return NextResponse.json(
        { error: 'Médico não encontrado' },
        { status: 404 }
      );
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: { userId, doctorId, date, time, status: 'aberto' }
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Já existe um agendamento aberto para este horário.' },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        userId,
        date,
        time,
        status: 'aberto'
      }
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Erro na API de agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}