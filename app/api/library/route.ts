import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const entries = await prisma.libraryEntry.findMany();
  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const { type, title, author, language, fileUrl } = await req.json();
  if (!type || !title || !author || !language || !fileUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const entry = await prisma.libraryEntry.create({
    data: {
      type: type as any, // Cast to LibraryType
      title,
      author,
      language,
      fileUrl,
    },
  });
  return NextResponse.json({ entry });
}
