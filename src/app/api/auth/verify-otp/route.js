import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email, otp } = await request.json()
    if (!email || !otp) {
      return NextResponse.json({ error: 'Missing email or OTP' }, { status: 400 })
    }

    const verification = await prisma.emailVerification.findUnique({ where: { email } })
    if (!verification) {
      return NextResponse.json({ error: 'No pending verification found' }, { status: 400 })
    }

    if (verification.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    if (verification.expiresAt < new Date()) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      await prisma.emailVerification.delete({ where: { email } })
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    await prisma.user.create({
      data: {
        name: verification.name,
        email: verification.email,
        password: verification.password,
        phone: verification.phone,
        isVerified: true,
        emailVerified: new Date(),
      },
    })

    await prisma.emailVerification.delete({ where: { email } })

    return NextResponse.json({ message: 'Email verified. You can now log in.' }, { status: 200 })
  } catch (error) {
    console.error('OTP verify error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
