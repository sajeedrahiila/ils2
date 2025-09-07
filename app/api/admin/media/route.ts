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
  
  const media = await prisma.media.findMany({
    where: { approved: false },
    include: { uploadedBy: { select: { name: true, email: true } } },
    orderBy: { id: "desc" },
  });
  
  return NextResponse.json({ media });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions) as { user?: { role?: string } };
  if (!session?.user?.role || !["admin", "moderator"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { mediaId, approved } = await req.json();
  if (!mediaId || typeof approved !== "boolean") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  
  const media = await prisma.media.update({
    where: { id: mediaId },
    data: { approved },
    include: { uploadedBy: { select: { name: true, email: true } } },
  });
  
  return NextResponse.json({ media });
}
