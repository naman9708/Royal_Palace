import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const packages = await prisma.package.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } })
  return NextResponse.json({ packages })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const pkg = await prisma.package.create({ data: body })
    return NextResponse.json({ package: pkg }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error?.message || 'Failed to create package' }, { status: 400 })
  }
}
