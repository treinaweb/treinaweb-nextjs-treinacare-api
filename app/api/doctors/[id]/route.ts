import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const doctor = await prisma.doctor.findUnique(
    {
      where: {
        id,
      },
    }
  );

  if (!doctor) {
    return NextResponse.json(
      { error: 'Médico não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(doctor);
}