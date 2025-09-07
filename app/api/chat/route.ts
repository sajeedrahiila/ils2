import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const { authOptions } = require("../../lib/authOptions.js");

const prisma = new PrismaClient();

export async function GET() {
  // For demo: fetch all messages from the first chat
  const chat = await prisma.chat.findFirst({ include: { messages: { include: { sender: true } } } });
  return NextResponse.json({ messages: chat?.messages || [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as { user?: { id?: string } };
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }
  // For demo: use first chat or create one
  let chat = await prisma.chat.findFirst();
  if (!chat) {
    chat = await prisma.chat.create({ data: { name: "General", type: "group" } });
  }
  const message = await prisma.message.create({
    data: {
      content,
      senderId: session.user.id,
      chatId: chat.id,
    },
    include: { sender: true },
  });
  return NextResponse.json({ message });
}
