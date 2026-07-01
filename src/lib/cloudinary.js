import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadImage(file, folder = 'wedding-venue') {
  const result = await cloudinary.uploader.upload(file, { folder })
  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId)
}
