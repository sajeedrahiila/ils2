import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const calls = await prisma.call.findMany();
  return NextResponse.json({ calls });
}

export async function POST(req: Request) {
  const { type, participants } = await req.json();
  if (!type || !participants || !Array.isArray(participants)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const call = await prisma.call.create({
    data: {
      type: type as any, // Cast to CallType
      callParticipants: {
        create: participants.map((userId: string) => ({ userId })),
      },
    },
    include: { callParticipants: true },
  });
  return NextResponse.json({ call });
}
