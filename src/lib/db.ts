import { PrismaClient } from "@prisma/client"

type GlobalWithPrisma = typeof globalThis & {
    prisma: PrismaClient | undefined;
}

const globalWithPrisma = globalThis as GlobalWithPrisma

export const db = globalWithPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalWithPrisma.prisma = db
}