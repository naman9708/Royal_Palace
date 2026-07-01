import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body
    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }
    const inquiry = await prisma.contactInquiry.create({ data: { name, phone, email, message } })
    return NextResponse.json({ inquiry }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const inquiries = await prisma.contactInquiry.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ inquiries })
}
