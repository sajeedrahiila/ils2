import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/authOptions";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions) as { user?: { role?: string } };
  if (!session?.user?.role || !["admin", "moderator"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  
  return NextResponse.json({ users });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions) as { user?: { role?: string } };
  if (!session?.user?.role || !["admin", "moderator"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { userId, role } = await req.json();
  if (!userId || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  
  // Only admin can assign admin role
  if (role === "admin" && session.user.role !== "admin") {
    return NextResponse.json({ error: "Only admin can assign admin role" }, { status: 403 });
  }
  
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: role as any },
    select: { id: true, name: true, email: true, role: true },
  });
  
  return NextResponse.json({ user });
}
