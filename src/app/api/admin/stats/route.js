import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [totalBookings, pendingBookings, confirmedBookings, totalCustomers, revenue, upcomingEvents] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
    prisma.booking.findMany({
      where: { eventDate: { gte: new Date() }, status: { in: ['CONFIRMED', 'PENDING'] } },
      take: 5, orderBy: { eventDate: 'asc' }, include: { package: true },
    }),
  ])

  return NextResponse.json({
    totalBookings, pendingBookings, confirmedBookings, totalCustomers,
    totalRevenue: revenue._sum.amount || 0, upcomingEvents,
  })
}
