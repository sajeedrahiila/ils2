import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.catalogItem.findMany();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const { name, category, price, halalCertified, description, stock } = await req.json();
  if (!name || !category || !price || !description || stock === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const item = await prisma.catalogItem.create({
    data: {
      name,
      category,
      price: Number(price),
      halalCertified: Boolean(halalCertified),
      description,
      stock: Number(stock),
    },
  });
  return NextResponse.json({ item });
}
