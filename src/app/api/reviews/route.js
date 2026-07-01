import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const reviews = await prisma.review.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ reviews })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const review = await prisma.review.create({ data: body })
  return NextResponse.json({ review }, { status: 201 })
}
