import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const image = await prisma.galleryImage.findUnique({ where: { id } })
  if (image?.publicId) {
    try {
      const cloudinary = (await import('@/lib/cloudinary')).default
      await cloudinary.uploader.destroy(image.publicId)
    } catch (e) {}
  }
  await prisma.galleryImage.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
