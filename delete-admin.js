const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function deleteAdmin() {
  try {
    const deleted = await prisma.user.delete({
      where: { email: 'royalplace831@gmail.com' }
    })
    console.log('✅ Deleted admin user:', deleted.email)
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await prisma.$disconnect()
  }
}

deleteAdmin()
