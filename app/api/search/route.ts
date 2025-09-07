import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  
  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search in approved media
    const mediaResults = await prisma.media.findMany({
      where: {
        approved: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query] } },
        ],
      },
      select: { id: true, title: true, type: true, url: true },
      take: 5,
    });

    // Search in catalog
    const catalogResults = await prisma.catalogItem.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: { id: true, name: true, description: true, category: true },
      take: 5,
    });

    // Search in library
    const libraryResults = await prisma.libraryEntry.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { type: { equals: query.toLowerCase() as any } },
        ],
      },
      select: { id: true, title: true, author: true, type: true },
      take: 5,
    });

    // Format results
    const results = [
      ...mediaResults.map(item => ({
        type: 'media' as const,
        id: item.id,
        title: item.title,
        description: `${item.type} - Media`,
        url: item.url,
      })),
      ...catalogResults.map(item => ({
        type: 'catalog' as const,
        id: item.id,
        title: item.name,
        description: item.description,
      })),
      ...libraryResults.map(item => ({
        type: 'library' as const,
        id: item.id,
        title: item.title,
        description: `by ${item.author} - ${item.type}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
