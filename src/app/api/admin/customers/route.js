import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const customers = await prisma.user.findMany({
    where: {
      role: 'USER',
      OR: search ? [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] : undefined,
    },
    include: { bookings: { include: { package: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ customers })
}
