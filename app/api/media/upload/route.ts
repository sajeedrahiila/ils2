import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/authOptions";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as { user?: { id?: string } };
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const file = formData.get("file") as File;
  if (!title || !type || !file) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Save file to public/uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  // TODO: Watermark logic here
  const media = await prisma.media.create({
    data: {
      title,
      type: type as any, // Cast to MediaType
      url: `/uploads/${file.name}`,
      tags: [],
      approved: false,
      uploadedById: session.user.id,
    },
  });
  return NextResponse.json({ media });
}
