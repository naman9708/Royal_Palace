import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const where = { isActive: true }
  if (category && category !== 'ALL') where.category = category
  const images = await prisma.galleryImage.findMany({ where, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
  return NextResponse.json({ images })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const image = await prisma.galleryImage.create({ data: body })
  return NextResponse.json({ image }, { status: 201 })
}
