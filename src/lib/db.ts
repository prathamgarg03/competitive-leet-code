import { PrismaClient } from "@prisma/client"

declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient | undefined
        }
    }
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db
}