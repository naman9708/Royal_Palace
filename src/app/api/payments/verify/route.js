import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await request.json()
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(sign).digest('hex')
    if (expectedSign !== razorpay_signature) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'COMPLETED' },
    })
    const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: razorpay_order_id } })
    await prisma.booking.update({
      where: { id: bookingId },
      data: { advancePaid: { increment: payment.amount } },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
