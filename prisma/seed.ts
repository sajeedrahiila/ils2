import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sameer.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@sameer.com",
      password: adminPassword,
      role: "admin",
    },
  });

  // Create sample catalog items
  const catalogItems = [
    {
      name: "Halal Beef",
      category: "Meat",
      price: 15.99,
      halalCertified: true,
      description: "Premium halal beef cuts",
      stock: 50,
    },
    {
      name: "Islamic Book Collection",
      category: "Books",
      price: 29.99,
      halalCertified: true,
      description: "Collection of Islamic literature",
      stock: 25,
    },
    {
      name: "Prayer Mat",
      category: "Religious Items",
      price: 12.99,
      halalCertified: true,
      description: "Traditional prayer mat",
      stock: 100,
    },
  ];

  for (const item of catalogItems) {
    await prisma.catalogItem.upsert({
      where: { id: `item-${item.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: { id: `item-${item.name.toLowerCase().replace(/\s+/g, '-')}`, ...item },
    });
  }

  // Create sample library entries
  const libraryEntries = [
    {
      type: "quran",
      title: "The Holy Quran",
      author: "Allah",
      language: "Arabic",
      fileUrl: "/library/quran-arabic.pdf",
    },
    {
      type: "quran",
      title: "The Holy Quran - English Translation",
      author: "M.M. Pickthall",
      language: "English",
      fileUrl: "/library/quran-english.pdf",
    },
    {
      type: "hadith",
      title: "Sahih Bukhari",
      author: "Imam Bukhari",
      language: "Arabic",
      fileUrl: "/library/sahih-bukhari.pdf",
    },
    {
      type: "tafsir",
      title: "Tafsir Ibn Kathir",
      author: "Ibn Kathir",
      language: "Arabic",
      fileUrl: "/library/tafsir-ibn-kathir.pdf",
    },
  ];

  for (const entry of libraryEntries) {
    await prisma.libraryEntry.upsert({
      where: { id: `entry-${entry.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: { 
        id: `entry-${entry.title.toLowerCase().replace(/\s+/g, '-')}`, 
        ...entry,
        type: entry.type as any 
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
