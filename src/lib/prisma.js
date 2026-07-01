import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

let prisma

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (e) {
  // Prisma client not yet generated - will be available after `npx prisma generate`
  console.warn('Prisma client not initialized. Run: npx prisma generate')
  prisma = null
}

export { prisma }
