const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

;(async () => {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'royalplace831@gmail.com' } })
    console.log(JSON.stringify(user, null, 2))
  } catch (e) {
    console.error('ERROR', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
