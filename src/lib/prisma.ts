import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  sqliteAdapter: PrismaBetterSqlite3 | undefined;
};

function createClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  const adapter =
    globalForPrisma.sqliteAdapter ??
    new PrismaBetterSqlite3({
      url: databaseUrl,
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.sqliteAdapter = adapter;

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
