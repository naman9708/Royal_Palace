import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateBookingNumber } from '@/lib/utils'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { customerName, customerEmail, customerPhone, eventType, eventDate, numberOfGuests, packageId, specialRequests } = body

    if (!customerName || !customerEmail || !customerPhone || !eventType || !eventDate || !numberOfGuests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if date is blocked
    const blocked = await prisma.blockedDate.findFirst({
      where: { date: new Date(eventDate) },
    })
    if (blocked) {
      return NextResponse.json({ error: 'This date is not available' }, { status: 400 })
    }

    // Check if date already booked
    const existingBooking = await prisma.booking.findFirst({
      where: {
        eventDate: new Date(eventDate),
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
    })
    if (existingBooking) {
      return NextResponse.json({ error: 'This date is already booked or pending' }, { status: 400 })
    }

    const pkg = packageId ? await prisma.package.findUnique({ where: { id: packageId } }) : null

    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        userId: session?.user?.id,
        customerName,
        customerEmail,
        customerPhone,
        eventType,
        eventDate: new Date(eventDate),
        numberOfGuests: parseInt(numberOfGuests),
        packageId: packageId || null,
        specialRequests,
        totalAmount: pkg?.price,
        advanceAmount: pkg ? pkg.price * 0.3 : null,
      },
      include: { package: true },
    })

    // Send confirmation email
    await sendBookingConfirmation(booking)

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let bookings
    if (session.user.role === 'ADMIN') {
      bookings = await prisma.booking.findMany({
        include: { package: true, user: true, payments: true },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      bookings = await prisma.booking.findMany({
        where: { userId: session.user.id },
        include: { package: true, payments: true },
        orderBy: { createdAt: 'desc' },
      })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
