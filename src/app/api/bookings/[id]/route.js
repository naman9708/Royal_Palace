import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendBookingStatusUpdate } from '@/lib/email'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { package: true, payments: true, user: true },
    })
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (session.user.role !== 'ADMIN' && booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ booking })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const booking = await prisma.booking.update({
      where: { id },
      data: body,
      include: { package: true },
    })

    if (body.status === 'CONFIRMED' || body.status === 'REJECTED') {
      await sendBookingStatusUpdate(booking)
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Booking update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
