import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { bookingId, amount, paymentType } = await request.json()
    
    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 })
    }
    
    const Razorpay = (await import('razorpay')).default
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      notes: { bookingId, paymentType },
    })

    const payment = await prisma.payment.create({
      data: { bookingId, razorpayOrderId: order.id, amount, paymentType, status: 'PENDING' },
    })

    return NextResponse.json({ order, payment })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
  }
}
