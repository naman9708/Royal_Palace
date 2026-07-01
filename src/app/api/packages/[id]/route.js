import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request, { params }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const pkg = await prisma.package.update({ where: { id }, data: body })
    return NextResponse.json({ package: pkg })
  } catch (error) {
    return NextResponse.json({ error: error?.message || 'Failed to update package' }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.package.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
