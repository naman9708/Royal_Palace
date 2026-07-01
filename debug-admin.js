const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkAdmin() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'royalplace831@gmail.com' }
    })
    
    if (!admin) {
      console.log('❌ Admin user NOT found in database')
      return
    }
    
    console.log('✅ Admin user found:')
    console.log('  Email:', admin.email)
    console.log('  Name:', admin.name)
    console.log('  Role:', admin.role)
    console.log('  isVerified:', admin.isVerified)
    console.log('  emailVerified:', admin.emailVerified)
    console.log('  Password hash:', admin.password ? '✅ Present' : '❌ Missing')
    
    // Try to verify password manually
    const bcrypt = require('bcryptjs')
    const testPassword = 'Royal@8434'
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password)
    console.log('  Password "Royal@8434" matches:', isPasswordValid)
    
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmin()
