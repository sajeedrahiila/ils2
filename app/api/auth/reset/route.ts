import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Always return success to avoid email enumeration
    return NextResponse.json({ message: "If your email exists, a reset link will be sent." });
  }
  // TODO: Generate token, send email (integration needed)
  // For now, just return success
  return NextResponse.json({ message: "If your email exists, a reset link will be sent." });
}
