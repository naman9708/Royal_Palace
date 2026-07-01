import dns from 'node:dns'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendVerificationOtp } from '@/lib/email'

const dnsResolveMx = dns.promises.resolveMx

export async function POST(request) {
  try {
    const { name, email, password, phone } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const domain = email.split('@')[1]
    try {
      const mxRecords = await dnsResolveMx(domain)
      if (!mxRecords || mxRecords.length === 0) {
        return NextResponse.json({ error: 'Email domain does not appear to exist' }, { status: 400 })
      }
    } catch (dnsError) {
      return NextResponse.json({ error: 'Email domain does not appear to exist' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedPassword = await bcrypt.hash(password, 12)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    await prisma.emailVerification.upsert({
      where: { email },
      update: { name, phone, password: hashedPassword, otp, expiresAt, createdAt: new Date() },
      create: { name, email, phone, password: hashedPassword, otp, expiresAt },
    })

    try {
      await sendVerificationOtp(email, otp)
    } catch (emailError) {
      console.error('Failed to send verification OTP:', emailError)
      await prisma.emailVerification.deleteMany({ where: { email } })
      return NextResponse.json({ error: 'Unable to send OTP to this email address' }, { status: 500 })
    }

    return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 })
  } catch (error) {
    console.error('Register OTP error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
