import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear())
  const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1))

  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)

  const [bookings, blockedDates] = await Promise.all([
    prisma.booking.findMany({
      where: {
        eventDate: { gte: startDate, lte: endDate },
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
      select: { eventDate: true, status: true },
    }),
    prisma.blockedDate.findMany({
      where: { date: { gte: startDate, lte: endDate } },
      select: { date: true, reason: true },
    }),
  ])

  return NextResponse.json({ bookings, blockedDates })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { date, reason } = await request.json()
  const blocked = await prisma.blockedDate.upsert({
    where: { date: new Date(date) },
    update: { reason },
    create: { date: new Date(date), reason },
  })
  return NextResponse.json({ blocked })
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { date } = await request.json()
  await prisma.blockedDate.delete({ where: { date: new Date(date) } })
  return NextResponse.json({ success: true })
}
