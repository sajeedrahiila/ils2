import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const media = await prisma.media.findMany({ where: { approved: true } });
  return NextResponse.json({ media });
}

export async function POST(req: Request) {
  // For admin approval
  const { id, approved } = await req.json();
  if (!id || typeof approved !== "boolean") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const updated = await prisma.media.update({
    where: { id },
    data: { approved },
  });
  return NextResponse.json({ media: updated });
}
