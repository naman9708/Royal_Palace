const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
;(async()=>{
  try{
    const user = await prisma.user.findUnique({ where: { email: 'royalplace831@gmail.com' } })
    if(!user){ console.log('no user'); process.exit(0) }
    console.log('hash:', user.password)
    const ok = await bcrypt.compare('Royal@8434', user.password)
    console.log('compare result:', ok)
  }catch(e){ console.error(e) }finally{ await prisma.$disconnect() }
})()
